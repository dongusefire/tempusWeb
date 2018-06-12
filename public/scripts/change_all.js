(function(){
	var _pageInfo_ = {
		product_id:-1,
		amount_num:0
	};
	var _page = $('.page');
	var _Stock;
	var getAjax = {'defaultId':null,'order':null};
	banoper('add');
	function createallorder(data,callback){
		$.ajax({
	        url:URL+'/score/createallorder',
	        type:'POST',
	        dataType:'json',
	        data:{
	        	product_id:data.product_id,
	        	amount:data.amount_num,
	          	pay:data.pay
	        },
	        success:function($data){
	        	callback($data);
	        }
	    });
	}
	// 根据页面id来决定radio的值和相对应积分余额。
	var urlId = GetRequest().id;
	if(urlId == undefined) {
		urlId = 0;
		getAjax.defaultId = true;
	}
	$('.radio-unit').attr('radio-unit',urlId);
	if(urlId!=0){
		getDefaultProductId(function(data){
			getAjax.defaultId = true;
			if(getAjax.order){
				banoper('remove');
			};
			$('.radio-unit').attr('radio-unit',data.data.id);
			$('.radio-unit').html(data.data.unit);
			_pageInfo_.product_id = data.data.id;
		},urlId);
	}else{
		getAjax.defaultId = true;
	};
	var getIntegrallist_ = function(){
		getAllChange(function(data){
				if(data.code=='401'){
					Tologin();
					return false;
				};
				 if(data.code==0){
					 getAjax.order = true;
					if(getAjax.defaultId){
						banoper('remove');
					};
					 var _data = data.data;
					 var _html='';
					 var count = 0;
					 var disable = '';
					 var checked = 'checked';
					 var unchecked = '';
					 $.each(_data, function(key,val) {
					 	var inner_val = "";
					 	var inner_realVal = "";
					 	_pl = '';
					 	if(val.isBuild == 0){
					 		_pl = '';
							if(val.auto_relation == 0 || val.auto_relation == 1) {
								_pl+=' gray';
							}
					 		inner_val += '<span class="btn-gl" >关联</span>';
					 		inner_realVal += '<span>-</span>';
					 	}else{
					 		inner_val +='<span>'+Math.ceil(val.value)+'</span>';
					 		inner_realVal +='<span>'+Math.ceil(val.realVal)+'</span>';
					 	}
					 	if(val.value ==0 ||val.realVal ==0){
					 		disable=' disable';
					 		checked = '';
					 		unchecked = 'unchecked';
					 	} else {
					 		disable=' ';
					 		checked = 'checked';
					 		unchecked = '';
					 	};
                        _html +='<li class="item clearfix '+disable+' '+_pl+'" data-name="'+val.name+'" data-id="'+val.id+'" source_amount="'+Math.ceil(val.value)+'" target_amount="'+Math.ceil(val.realVal)+'">'+
									'<div>'+
										'<span class="radio">'+
											'<span class="'+checked+''+unchecked+'"></span>'+
										'</span>'+
									'</div>'+
									'<div class="has_logo quater">'+
										'<img src="'+val.product_picture+'">'+
										'<span>'+val.name+'</span>'+
									'</div>'+
									'<div class="quater">'+inner_val+'</div>'+
									'<div class="quater">'+inner_realVal+'</div>'+
								'</li>';
                        	count += Math.ceil(val.realVal);
					 },$('.radio-unit').attr('radio-unit'));
					 $('[data-type="asset"]').html(Math.ceil(count));
					 _pageInfo_.amount_num = Math.ceil(count);
					 $('[data-type="getIntegrallist"]').html(_html);

				 };
		},$('.radio-unit').attr('radio-unit'));
	}
	getIntegrallist_();
	_page.on('click','.btn-gl',function(){
		if($(this).parents('li').hasClass('gray')) {
			$.toast('敬请期待');
			return false;
		}
		var than = $(this).parents('li');
		var _id = than.attr('data-id');
		var _name = than.attr('data-name');
		$.ajax({
		 	type:"get",
		 	url:URL+"/user/manualrelation/"+_id+"/1",
		 	dataType:'json',
		 	success:function(res){
				if(res.code=='401'){
					Tologin();
					return false;
				};
		 		if(res.code==200){
		 			$.showPreloader('正在跳转 ，请在<span style="color:#f00;">'+_name+'</span>中完成登录授权后关联该账户 ');
		 			setTimeout(function(){
						$.hidePreloader();
		 				setStorage('url',res.data.path);
		 				setStorage('businessname',_name);
						setStorage('id',_id);
		 				$.router.load('/templates/connect.html',true);
		 			},1500);
		 		}else{
		 			$.toast(res.msg);
		 		};
		 	}
		});
	});
	if(GetRequest().relationStatus==1){
		var _data = GetRequest();
		$.ajax({
		 	type:"get",
		 	url:URL+"/product/business/"+_data.businessId,
		 	dataType:'json',
		 	success:function(res){
				if(res.code=='401'){
					Tologin();
					return false;
				};
		 		if(res.code==0){
		 			$.modal({
				    	title: '绑定成功',
				      	text: '<div class="bind_account"><div class="account-img"><img src="'+res.data.icon+'" alt=""></div><div class="account-info"><span>余额</span><span>'+_data.value+'</span></div><p>恭喜你,你已经成功绑定'+res.data.name+'账户了</p></div>',
				      	extraClass:['gj-modal'],
				      	buttons: [{
				      		text:'<a href="#" class="btn btn-confirm">确认</a>',
				      		close:true,
				      	}]
				  	});
		 		};
		 	}
		});
	};

	_page.on('click','.radio-unit',function(){
		var _unit = new all_radio_unit({
			id:$('.radio-unit').attr('radio-unit'),
			callback:function(){
//				if(this.value!=''){
//					$('.radio-unit').attr('radio-unit',this.value);
//					$('.radio-unit').html(this.title);
//					_pageInfo_.product_id = this.value;
//					getIntegrallist_();
//					$.closeModal('.gj-modal');
//				}else{
//					$.toast('请选择一个单位');
//				};
			}
		});
		$('.all-list').css('overflow','hidden');
	});
	$(document).on('change','.gj-modal [name="unit"]',function(){
		var id = $(this).val();
		var than = $(this).parents('li');
		$('.radio-unit').attr('radio-unit',id);
		$('.radio-unit').html(than.find('.item-title').text());
		_pageInfo_.product_id = id;
		$.closeModal('.gj-modal');
		$('.all-list').css('overflow','auto');
		getAjax.order = false;
		banoper('add');
		getIntegrallist_();
	});
	_page.on('click','.change_now',function(){
		$.confirm('是否一键全部兑换？',function(){
			var _pay = [];
			$('.substance .item').each(function(ind,ele){
				var $ele = $(ele);
				var _span = $ele.find('span.checked');
				var _id = $ele.attr('data-id');
				var _source_amount = $ele.attr('source_amount');
				var _target_amount = $ele.attr('target_amount');
				if(_span.length!=0){
					_pay.push({'product_id':_id,'source_amount':_source_amount,'target_amount':_target_amount})
				}
			});
			if($('[data-type="asset"]').html()<=0||_pay.length==0){
				$.toast('数量为0，不能提交');
				return false;
			}
			$.showPreloader('正在提交');
			createallorder({
				product_id:_pageInfo_.product_id,
				amount_num:_pageInfo_.amount_num,
				pay:_pay
			},function(data){
				$.hidePreloader();
				if(data.code=='401'){
					Tologin();
					return false;
				};
				if(data.code==200){
					$.modal({
				   	'text':'您的挂单已成功，您可以在“我的挂单”页面查看您的挂单',
				   	'extraClass':'gj-modal',
				   	'verticalButtons':true
				    });
				    setTimeout(function(){
				   		$.closeModal('.gj-modal');
				   	 	$.router.load('/templates/wallet.html',true);
			    	},1500);
				} else {
					$.alert(data.msg,'失败');
				}
			});
		});
	});
	_page.on('click','.item',
		function () {
			var this_ = $(this).find('.radio span');
			if(!$(this).hasClass('disable')){
				if(this_.hasClass('checked')) {
					_pageInfo_.amount_num -= $(this).attr('target_amount');
					_pageInfo_.amount_num = Math.ceil(_pageInfo_.amount_num);
					$('[data-type="asset"]').html(_pageInfo_.amount_num);
					$(this).find('.radio span').removeClass("checked");
				} else {
					_pageInfo_.amount_num += parseFloat($(this).attr('target_amount'));
					_pageInfo_.amount_num = Math.ceil(_pageInfo_.amount_num);
					$('[data-type="asset"]').html(_pageInfo_.amount_num);
					$(this).find('.radio span').addClass("checked");
				}
			};
		}
	);
	var radio_text = $('.radio-unit');

	function all_list_h(){
		var all_list = $('.all-list')
		var offset = all_list.offset();
		var top = offset.top;
		var hd_h = $('header.bar').height();
		var bottom = $('.cn_father').height();
		var box_h = $('.content').height();
		all_list.height(box_h-(top-hd_h+bottom))
	};
	all_list_h();
})();
