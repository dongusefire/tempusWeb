(function(){
	var _page = $('.page');
	var _pageInfo_ = {
		product_id:-1,
		amount_num:1
	};
	var _Stock = new Stock({
		num:1,
		min:1,
		max:1000,
		unit:'个',
		inp:$('.J_Stock input[name="num"]'),
		addBtn:$('.J_Stock .btn-add'),
		subtractBtn:$('.J_Stock .btn-substract'),
		callback:function(){
			_pageInfo_.amount_num = this.num;
		}
	});
	function defaultid(){
	    var id = GetRequest().id;
	    $.ajax({
	        url:URL+'/product/defaultid/'+id,
	        type:'get',
	        dataType:'json',
	        success:function(data){
			  if(data.code=='401'){
					Tologin();
					return false;
			  };
	          if(data.code==0){
	          	$('h1.title').html(data.data.name);
	          };
	        }
	    });
	};
	defaultid();
	getUnit(-1,function(data,$id){
		if(data.code=='401'){
			Tologin();
			return false;
		};
        if(data.code == 0 ) {
        	$('.typeList .items-block').eq(0).attr('data-id',data.data[0].id);
        	$('.typeList .items-block').eq(0).attr('data-nogl',data.data[0].combination);
        	$('.typeList .items-block').eq(0).attr('data-name',data.data[0].name);
        	$('.radio_unit .select_input').html(data.data[0].name);
        }
   });
   if(GetRequest().status ==1){
	   modal({
		   status:'3',
		   text:'挂单成功',
		   callback:function(){
			   var _href = location.origin+location.pathname+GetRequest().id;
			   history.pushState({},0,_href);
		   }
	   })
   }else if(GetRequest().status ==2){
	   modal({
		   status:'5',
		   title:'支付失败',
		   text:'支付失败',
		   callback:function(){
			   var _href = location.origin+location.pathname+GetRequest().id;
			   history.pushState({},0,_href);
		   }
	   });
   };
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
	_page.on('click','.radio_unit',function(){
		var _than = $(this).parents('.items-block');
//		var _this = $('.radio_unit');
		var _id = _than.attr('data-id'); 
		var _unit = new radio_unit({
			id:_id,
			callback:function(){
				if(this.value!=''){
					_than.find('.select_input').html(this.title);
					_than.attr('data-id',this.value);
					_than.attr('data-nogl',this.combination);
        			$('.typeList .items-block').eq(0).attr('data-name',this.title);
					$.closeModal('.gj-modal');
				};
			}
		});
	});
	_page.on('click','.form_btn a',function(){
		var _arr = [];
		var _flag = false;
		var _name = '';
		$('.typeList .items-block').each(function(key,ele) {
			var _id = $(ele).attr('data-id');
			var _nogl = $(ele).attr('data-nogl');
			_arr.push(_id);
			if(_nogl=="2"){
				_flag = true;
				_name = $(ele).attr('data-name');
			};
		});
		if(_flag && _arr.length>1){
			$.toast(_name+'不支持组合支付');
			return false;
		};
		var _unit = new radio_unit({
			id:"-1",
			title:"积分类型",
			type:'addType',
			callback:function(){
				if(this.value!=''){
					console.log(_arr,this.value)
					if(_arr.indexOf(this.value)!=-1){
						$.closeModal('.gj-modal');
						$.toast('不可重复添加');
						return false;
					};
					var _html = '<div class="items-block" data-id="'+this.value+'" data-nogl="'+this.combination+'">'+
						'<span class="close-icon"><img src="../public/images/close-icon.png"/></span>'+
						'<span class="input_text">'+
							'<input type="text" name="num" value="1" />'+
						'</span>'+
						'<div class="select_box radio_unit">'+
							'<span class="select_input">'+this.title+'</span>'+
							'<span class="select_down"></span>'+
						'</div>'+
					'</div>';
					$('.typeList').append(_html);
					$('.typeList').find('.close-icon').css('display','block');
					$.closeModal('.gj-modal');
				};
			}
		});
	});
	_page.on('click','.typeList .close-icon',function(){
		var _than = $(this).parent();
		_than.remove();
		if($('.typeList .items-block').length==1){
			$('.typeList .close-icon').css('display','none');
		};
	});
	_page.on('click','.change_now',function(){
		var _arr = [];
		var _num = [];
		var _flag = false;
		var _name = '';
		var _repeat = false;
		var pay = [];
		if($(this).hasClass('disabled')){
			return false;
		};
		$('.typeList .items-block').each(function(key,ele) {
			var _id = $(ele).attr('data-id');
			var _nogl = $(ele).attr('data-nogl');
			var num = $(ele).find('[name="num"]').val();
			if(_arr.indexOf(_id)!=-1){
				_repeat = true;
			};
			_arr.push(_id);
			_num.push(num);
			if(_nogl=="2"){
				_flag = true;
				_name = $(ele).find('.select_input').text();
			};
		});
		if(_flag && _arr.length>1){
			$.toast(_name+'不支持组合支付');
			return false;
		};
		if(_repeat){
			$.toast('支付不能重复选择');
			return false;
		};
		$.each(_num,function(key,val){
			pay.push({
				amount:val,
				product_id:_arr[key]
			})
		});
		$(this).addClass('disabled');
		$.showPreloader('正在提交');
		createorder({
			product_id:GetRequest().id,
        	amount_num:_pageInfo_.amount_num,
          	pay:pay
		},function(data){
			$.hidePreloader();
			$('.change_now').removeClass('disabled');
			if(data.code=='401'){
				Tologin();
				return false;
			};
			if(data.code==0){
				modal({
					text:data.msg,
					status:"1",
					callback:function(){
						$.router.load('/templates/exchange_details.html?id='+GetRequest().id,true)
					}
				});
			}else if(data.code==200){
				location.href = data.data.href;
			}else{
				modal({
					text:data.msg,
					status:"2"
				});
			}
		})
	});
})();