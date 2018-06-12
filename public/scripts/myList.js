(function(){
	var _page = $('.page');
	var _loading = false;
	var _than = $('[data-type="apimyexchange"]');
	var _callback = function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		if(data.code==0){
			var _html = '';
			$.each(data.data.data,function(key,val) {
				var _class = '';
				var _status = '进行中…';
				var _text = '撤销';
				if(val.order_status==4){
					_class=' cancel';
					_status = '已撤销';
					_text = '已撤销';
				};
				if(val.order_status==3){
					_class=' cancel';
					_status = '已完成';
					_text = '已完成';
				};
				if(val.order_status==2){
					_class=' cancel';
					_status = '您未支付';
					_text = '已关闭';
				};
				_html +='<a class="details'+_class+'" data-id="'+val.id+'">'+
					'<div class="shell">'+
						'<div class="firstFloor">'+
							'<span class="above">'+ _status +'</span>'+
							'<button class="btn-reset">'+_text+'</button>'+
						'</div>'+
						'<div class="secondFloor">'+
							'<div>'+
								'<span class="pull-right">'+val.created_at+'</span>'+
								'<img src="/public/images/dui.png"> '+ '<span class="above">'+val.business.name+'兑换'+val.target_business.name+'</span>'+
							'</div>'+
							'<div>'+
								'<img src="/public/images/huobi.png"> '+ '<span class="above">'+val.source_amount+val.business.name+'兑换'+val.target_amount+val.target_business.name+'</span>'+
							'</div>'+
							'<div>'+
								'<img src="/public/images/shi.png"> '+ '<span class="above">已换入'+val.change_into+val.target_business.name+',剩余'+val.balance+val.business.name+'</span>'+
							'</div>'+
						'</div>'+
						'<div class="ThirdFloor">'+
						'</div>'+
					'</div>'+
				'</a>';
			});
			if(data.data.current_page==1 && data.data.data.length==0){
				$('[data-type="apimyexchange"]').hide();
				$('.infinite-scroll-preloader').hide();
				$('.box-null').show();
				_than.attr('page-min',0);
				_than.attr('page-max',0);
				return false;
			}else{
				$('[data-type="apimyexchange"]').show();
				$('.infinite-scroll-preloader').show();
				$('.box-null').hide();
			};
			if(data.data.current_page==1){
				_than.html(_html);
			}else{
				_than.append(_html); 
			};
			if(parseInt(data.data.current_page)>=parseInt(data.data.last_page)){
				$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').remove();
			};
			_than.attr('page-min',data.data.current_page);
			_than.attr('page-max',data.data.last_page);
		};
	};
	apimyexchange(1,0,_callback);
	//没有数据时加载动画
	_page.on('infinite','.infinite-scroll-bottom',function(){
		if (_loading) return;
		_loading = true;
		var current_page = parseInt(_than.attr('page-min'));
		var last_page = parseInt(_than.attr('page-max'));
		setTimeout(function(){
			_loading = false;
			if(current_page>=last_page){
				$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').remove();
			};
			apimyexchange(parseInt(_than.attr('page-min'))+1,$('.tab-items li.active').attr('data-status'),_callback);
			$.refreshScroller();
		},1000);
	});
	//撤销挂单 
	_page.on('click','.btn-reset',function(){
	 	var _than = $(this).parents('.details');
	 	var _id = _than.attr('data-id');
 		if(!_than.hasClass('cancel')){
 			$.confirm('您确定要撤销该挂单吗？',function(){
 				$.ajax({
			        type:'post',
			        url:URL+'/resetorder/resetorder',
			        data:{'id':_id},
			        dataType:'json',
			        success:function(data){
						if(data.code=='401'){
							Tologin();
							return false;
						};
						if(data.code=='400'){
							$.alert(data.msg);
							return false;
						}
			            if(data.code==0){
						   $.alert(data.msg);
			               _than.addClass('cancel');
			               _than.find('.firstFloor .above').html('已关闭');
			               _than.find('.btn-reset').html('已撤销');
			               return;
			            };
			        }
			    });	
 			});
 		};
	 });
	function resetLocation(obj)
	{
	  // alert($(obj).parent().attr("class"));
	  $(obj).parent().parent().scrollLeft(0);
	}
	$('.tab-items li').click(function(){
        var status = $(this).attr('data-status');
    	$(this).addClass('active').siblings().removeClass('active');
    	apimyexchange(1,status,_callback);
    });
})();