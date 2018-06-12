(function(){
	var _pageInfo_ = {
		product_id:-1,
		amount_num:100
	};
	var _page = $('.page');
	var _Stock;
	function getIntegral($pid,$stock){
		integral(function(data){
			if(data.code=='401'){
				Tologin();
				return false;
			};
			if(data.code==0){
				_Stock.num = data.data.value;
				_Stock.max = data.data.value;
				_Stock.unit = data.data.unit;
				$('.figure input[name="num"]').val(_Stock.num)
				_pageInfo_.amount_num = _Stock.max;
			};
	 	},$pid,$stock);
	};
	getDefaultProductId(function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		if(data.code == 0 ) {
			_pageInfo_.product_id = data.data.id;
		    $('.radio-unit').html(data.data.name);
		    integral(function(data){
				if(data.code=='401'){
					Tologin();
					return false;
				};
		    	if(data.code==0){
		    		_Stock = new Stock({
						num:data.data.value,
						min:1,
						max:data.data.value,
						unit:data.data.unit,
						inp:$('.figure input[name="num"]'),
						addBtn:$('.figure .btn-add'),
						subtractBtn:$('.figure .btn-subtract'),
						callback:function(){
							_pageInfo_.amount_num = this.num;
						}
					});
		    	};
		    },data.data.id);
		};
	})
	relateMember(function(data){
	  if(data.code=='401'){
			Tologin();
			return false;
	  };
	  if(data.code==0){
		  var _data = data.data;
		  var _html='';
		  $.each(_data, function(key,val) {
				 _html += '<li class="account-box">'+
				  '<a href="#">'+
					  '<div class="assount-img">'+
						  '<img src="'+val.icon+'"/>'+
					  '</div>'+
					  '<div class="assount-info">'+
						  '<span>余额</span>'+
						  '<span>'+val.value+'</span>'+
					  '</div>'+
				  '</a>'+
			  '</li>';
		  });
		  $('[node-type="relateMember"]').html(_html);
	  };
	});
	changeDataTime($('[action-type="changeTimeData"]').find('li'));
	$('[action-type="changeTimeData"]').find('li').eq(0).click();
	_page.on('click','.radio-unit',function(){
		var _unit = new radio_unit({
			id:_pageInfo_.product_id,
			callback:function(){
				if(this.value!=''){
					$('.radio-unit').html(this.title);
					_pageInfo_.product_id = this.value;
					getIntegral(this.value,_Stock)
					$.closeModal('.gj-modal');
				}else{
					$.toast('请选择一个单位');
				};
			}
		});
	});
	_page.on('click','.btn_onekey',function(){
		$.confirm('是否一键全部兑换？',function(){
			$.showPreloader('正在提交');
			createorder({
				product_id:_pageInfo_.product_id,
				amount_num:_pageInfo_.amount_num,
				pay:true
			},function(data){
				$.hidePreloader();
				if(data.code=='401'){
					Tologin();
					return false;
				};
				if(data.code==0){
					$.alert(data.msg,'成功');
				} else {
					$.alert(data.msg,'失败');
				}
			});
		});
	});
})();