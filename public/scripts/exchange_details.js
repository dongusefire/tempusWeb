(function(){
	var _page = $('.page');
	var _loading = false;
	var _than = $('[data-type="apimyexchangelist"]');
	var change_now = $('#change_now a');
	var _getName = '';
	var nowId = -1;
	var _detail = {'radioUnit':null,'getData':true,'list':null};
//	if(change_now.attr('href').indexOf('id')==-1){
//		change_now.attr('href',change_now.attr('href')+'?id='+GetRequest().id);
//	};
	banoper('add');
	function getIntegralratio($id,$pid){
		$.ajax({
	        url:URL+'/user/integralratio/'+$id+'/'+$pid,
	        type:'get',
	        dataType:'json',
	        success:function(data){
				if(data.code=='401'){
					Tologin();
					return false;
				};
	          	if(data.code==0){
					_detail.radioUnit=true;
					if(_detail.getData && _detail.list){
						banoper('remove');
					};
					$('[node-type="value"]').html(data.data.value);
				  	$('[node-type="name"]').html(data.data.name);
				  	$('[node-type="name"]').attr('radio-unit',data.data.id);
				  	$('[node-type="targetName"]').html(data.data.targetName);
					$('[node-type="ratio"]').html(data.data.ratio);
					$('[node-type="name"]').attr('id',data.data.id);
					$('[node-type="targetValue"]').html(data.data.targetValue);
					$('[node-type="extent"]').html(data.data.extent);
					$('[node-type="extentData"]').html(data.data.extentData);
					$('[node-type="targetName"]').attr('radio-unit',data.data.targetId);
					nowId = data.data.id;
					apimyexchangelist(nowId,1,_callback,data.data.targetId);
				};
	        }
	   });
	}
	getIntegralratio(GetRequest().id,GetRequest().targetId);
	changeDataTime($('[action-type="changeTimeData"]').find('li'),GetRequest().id,GetRequest().targetId);
	showDataLineMintue('minute',GetRequest().id,GetRequest().targetId);
	//	    getIntegralvaluelist(function(data){
	//	        if(data.code==0){
	//	            var _data = data.data;
	//	            var _html='';
	//	            $.each(_data, function(key,val) {
	//	               _html += '<a href="/templates/exchange_details.html?id='+val.id+'" class="list">'+
	//	                       '<div class="left">'+
	//	                           '<div class="icon">'+
	//	                               '<img src="'+val.product_picture+'">'+
	//	                           '</div>'+
	//	                           '<span>'+val.name+'</span>'+
	//	                       '</div>'+
	//	                       '<div class="right">'+
	//	                           '<span class="d_left">'+val.value+'</span>'+
	//	                           '<span class="d_right">福币</span>'+
	//	                       '</div>'+
	//	                   '</a>';
	//	            });
	//	            $('[data-type="apimyexchangelist"]').html(_html);
	//	        };
	//	    });
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
	          	//$('h1.title').html(data.data.name);
	          };
	        }
	    });
	};
	//defaultid();
	var _callback = function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		if(data.code==0){
			_detail.list=true;
			if(_detail.getData && _detail.radioUnit){
				banoper('remove');
			};
			var _html = '';
			$.each(data.data.data,function(key,val) {
				_html += '<ul class="clearfix fa">'+
					'<li>'+val.business.name+'</li>'+
					'<li>'+val.source_amount+'</li>'+
					'<li>'+val.target_business.name+'</li>'+
					'<li>'+val.target_amount+'</li>'+
					'<li>'+val.created_at.replace(/-/g,'.')+'</li>'+
				'</ul>';
			});
			if(data.data.current_page==1){
				_than.html(_html);
			}else{
				_than.append(_html);
			};
			if(data.data.current_page>=data.data.last_page){
				$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').remove();
			};
			_than.attr('page-min',data.data.current_page);
			_than.attr('page-max',data.data.last_page);
		};
	};
	_page.on('infinite','.infinite-scroll-bottom',function(){
		if (_loading) return;
		_loading = true;
		var current_page = _than.attr('page-min');
		var last_page = _than.attr('page-max');
		setTimeout(function(){
			_loading = false;
			if(current_page>=last_page){
				$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').remove();
			};
			apimyexchangelist(nowId,parseInt(_than.attr('page-min'))+1,_callback,$('.radio-unit').attr('radio-unit'));
			$.refreshScroller();
		},1000);
	});
	_page.on('click','.radio-unit',function(){
		var _this = $(this);
		var radio_unit = _this.attr('radio-unit');
		_getName = $(this).attr('node-type');
		var _unit = new all_radio_unit({
			id:radio_unit,
			callback:function(){
				if(this.value!=''){
					
				} else {
					$.toast('请选择一个单位');
				};
			},
		});
	});
	$(document).on('change','.gj-modal [name="unit"]',function(){
		var val = $(this).val();
		var than = $(this).parents('li');
		console.log($('.switch_btn[node-type="'+_getName+'"]'))
		$('.switch_btn[node-type="'+_getName+'"]').attr('radio-unit',val).html(than.find('.item-title').text());
		var $id = $('.switch_btn[node-type="name"]').attr('radio-unit');
		var $pid = $('.switch_btn[node-type="targetName"]').attr('radio-unit');
		getIntegralratio($id,$pid);
		changeDataTime($('[action-type="changeTimeData"]').find('li'),$id,$pid);
		showDataLineMintue('minute',$id,$pid);
		_detail.radioUnit=false;
		_detail.list=false;
		banoper('add');
		$.closeModal('.gj-modal');
	})
	$('#change_now a').click(function(){
		var _href = $(this).attr('_href');
		var $id = $('.switch_btn[node-type="name"]').attr('radio-unit');
		var $pid = $('.switch_btn[node-type="targetName"]').attr('radio-unit');
		$.router.load(_href+'?target_product_id='+$pid+'&product_id='+$id,true);
	});
})();