(function(){
	var _page = $('.page');
	var _loading = false;
	var _than = $('[data-type="integralDetail"]');
	var nowIndex = 0;
	var tid = -1;
	var bid = -1;
	function business_list(){
		$.ajax({
			type:"get",
			url:URL+"/business/list",
			dataType:'json',
			success:function(res){
				if(res.code=='401'){
					Tologin();
					return false;
				};
				if(res.code==0){
					var _html = '';
					$.each(res.data,function($key,val){
						_html +='<li data-id="'+val.id+'">'+val.name+'</li>';
					});
					$('#integratin_type').html(_html);
				};
			}
		});
	};
	business_list();
	var _callback = function(res){
		if(res.code=='401'){
			Tologin();
			return false;
		};
		if(res.code==0){
			_loading = false;
			  var _html = '';
			  var jsonData = res.data.data!=undefined? res.data.data:res.data.list.data;
			  var current_page = res.data.current_page!=undefined? res.data.current_page:res.data.list.current_page;
			  var last_page = res.data.last_page!=undefined? res.data.last_page:res.data.list.last_page;
			  $.each(jsonData,function(key,val) {
				var _class = '-',name = '积分交换';
				if(val.tran_type==1){
				  _class='+';
				};
				console.log(val.type);
				if(val.tran_type==0){
					name+='-冻结';
				}else if(val.tran_type==3){
					name+='-换入';
					_class='+';
				}else if(val.tran_type==4){
					name+='-换出';
				};
				_html +='<li class="item-content">'+
				  '<div class="pull-left">'+
					'<div class="image-text">'+
					  '<div class="image-box">'+
						'<img src="'+val.icon+'"/>'+
					  '</div>'+
					  '<div class="text-box">'+
						'<h3>'+val.name+'</h3>'+
						'<span>'+name+'</span>'+
					  '</div>'+
					'</div>'+
				 ' </div>'+
				  '<div class="pull-right">'+
				   ' <h3>'+_class+val.amount+'</h3>'+
					'<span>'+val.created_at+'</span>'+
				  '</div>'+
				'</li>';
			  });
			  if(res.data.count==0){
			  	$('.content .list-block').hide();
				$('.infinite-scroll-preloader').hide();
				$('.box-null').show();
				_than.attr('page-min',0);
				_than.attr('page-max',0);
			  }else{
				  	if(res.data.current_page==1 && jsonData==0){
				  		if($('.filter a.active').index()==0){
							_page.addClass('dataNull');
						}else{
							_page.removeClass('dataNull');
						};
						$('.content .list-block').hide();
						$('.infinite-scroll-preloader').hide();
						$('.box-null').show();
						_than.attr('page-min',0);
						_than.attr('page-max',0);
						return false;
				    }else{
						$('.content .list-block').show();
						$('.infinite-scroll-preloader').show();
						$('.box-null').hide();
						_than.attr('page-min',current_page);
						_than.attr('page-max',last_page);
				    };
			  };
			  if(res.data.current_page==1 || res.data.list.current_page==1){
					_than.html(_html);
			  }else{
					_than.append(_html);
			  };
			  if(current_page >= last_page){
				 $('.infinite-scroll-bottom').find('.infinite-scroll-preloader').hide();
			  }else{
				 $('.infinite-scroll-bottom').find('.infinite-scroll-preloader').show();
			  };
			  $.refreshScroller();
		};
	};
	apirecordList(1,_callback);
	function trade_apilist($tid,$bid,num){
		var _data = {'page':num};
		if($tid!=-1){
			_data['tid'] = $tid;
		};
		if($bid!=-1){
			_data['bid'] = $bid;
		};
		$.ajax({
			type:"get",
			url:URL+"/trade/apilists",
			data:_data,
			dataType:'json',
			success:function(res){
				_callback(res);
			}
		});
	};
	_page.on('infinite', '.infinite-scroll-bottom', function(){
		  if (_loading) return;
		  _loading = true;
		  var current_page = _than.attr('page-min');
		  var last_page = _than.attr('page-max');
		  setTimeout(function(){
//			 _loading = false;
			 if(current_page>=last_page){
				$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').hide();
			 }else{
			 	$('.infinite-scroll-bottom').find('.infinite-scroll-preloader').show();
			 };
			 switch(nowIndex){
			 	case 0:
			 		apirecordList(parseInt(current_page)+1,_callback);
			 	break;
			 	case 1:
			 	case 2:
			 		trade_apilist(tid,bid,parseInt(current_page)+1);
			 		trade_apilist(tid,bid,parseInt(current_page)+1);
			 	break;
			 };
			 $.refreshScroller();
		  },1000);
	});
	function tabs($ind){
	 	var list_box = $('.filter-list');
	 	var filter_bg = $('.filter-bg');
	 	var flag = true;
	 	if(list_box.hasClass('show')){
	 		flag = false;
	 	};
	 	switch ($ind){
	 		case -1:
	 			filter_bg.hide();
	 			list_box.removeClass('show');
	 		break;
			case 0:
				tid = -1;
				bid = -1;
				filter_bg.hide();
				list_box.removeClass('show');
				list_box.find('li').removeClass('active');
	 			apirecordList(1,_callback);
			break;
			case 1:
			case 2:
				list_box.children().eq($ind-1).addClass('active').siblings().removeClass('active');
				filter_bg.show();
				if(flag){
					list_box.addClass('show');
				};
			break;
		};
	};
	$('.choose_title li').on('click',function(){
		nowIndex = $(this).index();
		if(!$(this).find('a').hasClass('active')){
			$('.choose_title a').removeClass('active');
			$('.choose_title a').eq(nowIndex).addClass('active');
		};
		tabs(nowIndex);
	});
	$('.filter-bg').click(function(){
		tabs(-1);
	});
	$('#business_type li').click(function(){
		var $ind = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		tid = $ind+1;
		trade_apilist(tid,bid,1);
		tabs(-1);
	});
	$('#integratin_type').on('click','li',function(){
		bid = $(this).attr('data-id');
		$(this).addClass('active').siblings().removeClass('active');
		trade_apilist(tid,bid,1);
		tabs(-1);
	});
})();
