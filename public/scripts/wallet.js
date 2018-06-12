(function(){
	var _page = $('.page');
	var get = $('#get');
	var walletAjax = {'estimate':null,'notrelated':null};
	var _topH = $('.top').height();
    var _ftH = $('nav.bar-footer').height();
    _page.find('.content').css({'height':'auto','top':_topH,'bottom':_ftH})
	//Y,N用来做商家关联与否的flag,在后面进行判断
	var Y = true;
	var N = true;
	 nickname($('.user_title'),function(ele,res){
	 	console.log(res);
		if(res.code=='401'){
			Tologin();
			return false;
		};
	 	if(res.code==0){
	 		ele.html(res.data);
	 	};
	 });
	 banoper('add');
	 function alerthelp(callback){
	 	$.ajax({
	 		type:"get",
	 		url:URL+"/members/alerthelp",
	 		dataType:"json",
	 		success:function(res){
				if(res.code=='401'){
					Tologin();
					return false;
				};
				if(res.code=='401'){
					Tologin();
					return false;
				};
	 			if(res.data && typeof(callback)=='function'){
	 				callback();
	 			};
	 		}
	 	});
	 };
	 function checkalerthelp(){
	 	$.ajax({
	 		type:"get",
	 		url:URL+"/members/checkalerthelp",
	 		dataType:"json",
	 		success:function(){}
	 	});
	 }
	 var empower = null;
	 function each_gl(data,index){
	 	var _arr = data;
	 	$('.scan_info').html('<span>已关联'+(index+1)+'个账户</span><span>"'+_arr[index].name+'"正在认证中</span>');
 	 	setTimeout(function(){
			$('.scan_info').html('<span>已关联'+(index+1)+'个账户</span><span>"'+_arr[index].name+'"正在认证中</span>');
			if(_arr[index+1]){
				each_gl(data,index);
			}else{
				$.closeModal('.gj-modal');
				var _html = '<div class="relevance"><div class="account-list"><ul>';
				$.each(data,function(key,val){
					_html +='<li class="account-box"><a href="#"><div class="assount-img"><img src="'+val.icon+'"></div><div class="assount-info"><span>余额</span><span>'+val.value+'</span></div></a></li>';
				});
				_html +='</ul></div></div>';
				modal({
					'title':'成功关联'+(index+1)+'个账户',
					'status':'7',
					'text':_html,
					buttons:[
						{
							'text':'<a href="#" class="btn btn-confirm">确认</a>',
							onClick:function(){
								location.reload();
							}
						}
					]
				});
				$('.gj-modal').addClass('nogl');
			};
		},800);
	 };

	var getIntegrallist_ = function(){
		getIntegrallist(function(data){
			if(data.code=='401'){
				Tologin();
				return false;
			};
			 if(data.code==0){
			 	walletAjax.estimate = true;
			 	if(walletAjax.notrelated){
			 		banoper('remove');
			 	};
				 var _data = data.data;
				 var _html='';
				 var count = 0;
				 $.each(_data, function(key,val) {
				 	var _search = 'target_product_id='+$('.radio-unit').attr('radio-unit')+'&product_id='+val.id;
				 	// 4.14加
				 	var display = 'display:block';
				 	// if(key>2 && (Y)){
				 	// 	display = 'display:none';
				 	// }
					_html +='<li class="clearfix" data-id="'+val.id+'">'+
							'<a class="clearfix" href="/templates/exchange.html?'+_search+'" data-no-cache="true">'+
							'<span class="b_logo">'+
								'<img src="'+val.product_picture+'">'+
							'</span>'+
							'<div>'+
								'<p style="font-size:0.74rem;">'+val.name+'</p>'+
								'<p class="balance"><span>'+val.unit+'</span>余额:&nbsp;<span>'+val.value+'</span></p>'+
							'</div>'+
							'<div class="estimate">估值&nbsp;<span>'+val.realVal+'</span>'+$('.radio-unit').html()+'</div>'+
							'</a><i class="bor"></i>'+
							'</li>';
							count += val.realVal;
				 },$('.radio-unit').attr('radio-unit'));
				 $('.showmoreA').html('查看更多');
				 if(_data.length<=3){
				 	$('.showmoreA').hide();
				 }else{
				 	$('.showmoreA').show().attr('href','/templates/my_account.html?unit='+$('.radio-unit').html());
				 };
				 if(_data.length<=0){
				 	$('.all_list .isOrNot').removeClass('hide').siblings('ul').hide();
				 }else{
				 	$('.all_list .isOrNot').addClass('hide').siblings('ul').show();
				 }
				 $('[data-type="asset"]').html(count.toFixed(2));
				 $('[data-type="getIntegrallist"]').html(_html);
			 };
		},$('.radio-unit').attr('radio-unit'));
	}
	getIntegrallist_();
	notrelated(function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		if(data.code==0){
			walletAjax.notrelated = true;
		 	if(walletAjax.estimate){
		 		banoper('remove');
		 	};
			var _data = data.data;
			var _html='';
			$.each(_data, function(key,val) {
				var _pl="";
				var display = 'display:block';
			 	// if(key>2 && (N)){
			 	// 	display = 'display:none';
			 	// }
				console.log(val.auto_relation);
				if(val.auto_relation == 0 || val.auto_relation == 1) {
					_pl+='class="gray"';
				}
				   _html += '<li '+_pl+' data-id="'+val.id+'" data-name="'+val.name+'">'+
			                    '<i class="aim-logo"><img src="'+val.icon+'"></i>'+
		                        '<span class="aim-name">'+val.name+'</span>'+
		                        '<span class="btn-gl">关联</span>'+
		                        '<div class="border_quarter"></div>'+
                 			'</li>';
			});
			if(_data.length<=3){
				$('.showmoreB').hide();
			}
			if(_data.length<=0){
			 $('.business .isOrNot').removeClass('hide').siblings('ul').hide();
			}else{
			 $('.business .isOrNot').addClass('hide').siblings('ul').show();
			}
			$('[data-type="notrelated"]').html(_html);
		};

	});
	_page.on('click','.radio-unit',function(){
		var _unit = new all_radio_unit({
			id:$('.radio-unit').attr('radio-unit'),
			disableId:$('.radio-unit').attr('radio-unit'),
			callback:function(){
				walletAjax.estimate = false;
				banoper('add');
				var value = $(this).find('[name="unit"]').val(),text = $(this).find('.item-title').attr('text');
				if(value!=''){
					$('.radio-unit').attr('radio-unit',value).html(text);
					$.closeModal('.gj-modal');
					getIntegrallist_();
					var get = $('#get');
					get.attr('href','/templates/change_all.html?id='+$('.radio-unit').attr('radio-unit'));
				}else{
					$.toast('请选择一个单位');
				};
			}
		});
	});
	$(document).on('click','.span_select',function(){
		$(this).toggleClass('checked');
	});
	$(document).on('click','.empower p',function(e){
		if(e.target.tagName!='A'){
			$(this).find('.span_select').toggleClass('checked');
		}else{
//			$.closeModal('.gj-modal');
//			$.router.load($(this).find('a').attr('data-href'), true);
		};
	});
	_page.on('click','.modal-gl',function(){
		if($('.gj-modal').length>=1){
			return false;
		}
		modal({
			'title':'授权确认',
			'status':'6',
			'text':'<div class="empower"><div class="empower_info">快捷关联其它账户之前，需要您授权X钱包关联授权</div><p><span class="span_select checked"></span><span>已阅读并同意<a href="#" data-href="/templates/extensible_protocol.html" style="color:#787878;">《积分交换平台关联账户授权书》</a></span></p></div>',
			buttons:[
				{
					'text':'<a href="#" class="btn btn-continue">取消</a>'
				},
				{
					'text':'<a href="#" class="btn btn-confirm">授权</a>',
					'close':false,
					onClick:function(){
						if($('.gj-modal .span_select').hasClass('checked')){
							empower = $.ajax({
							 	type:"get",
							 	url:URL+"/user/autorelation",
							 	dataType:'json',
							 	success:function(res){
							 		$.closeModal('.gj-modal');
									if(res.code=='401'){
										Tologin();
										return false;
									};
							 		if(res.code==0){
							 			if(res.data[0]){
							 				modal({
												'title':'积分雷达扫描中……',
												'status':'7',
												'text':'<div class="scan"><div class="scan_box"><img src="../public/images/scan-icon.png"></div><div class="scan_info"></div></div>'
											});
											each_gl(res.data,0);
							 			}else{
							 				$.toast('没有要关联的账户');
							 			};
							 		} else {
		 								$.alert(res.msg);
							 		}
							 	}
							 });
						}else{
							$.toast('您还没有同意本协议');
						};
					}
				}
			]
		});
	});
	_page.on('click','.btn-gl',function(){
		var than = $(this).parents('li');
		var _id = than.attr('data-id');
		var _name = than.attr('data-name');
		if($(this).parents('li').hasClass('gray')) {
			$.toast('敬请期待');
			return false;
		}
		$.ajax({
		 	type:"get",
		 	url:URL+"/user/manualrelation/"+_id,
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
		 		} else {
		 			$.toast(res.msg);
		 		};
		 	}
		});
	});
	$('[action-type="logout"]').click(function(){
		$.ajax({
		 	type:"get",
		 	url:URL+"/logout",
		 	dataType:'json',
		 	success:function(res){
		 		if(res.code==0){
		 			$.showPreloader('退出登录成功，即将跳转到登录页面。');
					$.closePanel();
		 			setTimeout(function(){
		 				$.hidePreloader();
		 				$.router.load('/templates/userlogin.html',true);
		 			},1500);
		 		} else {
		 			$.toast(res.msg);
		 		};
		 	}
		});
	});
	$('[action-type="clickIntegral"]').click(function(){
		$.modal({
	    	title: '估值说明',
	      	text: '<p style="font-size:0.8rem;line-height:1.2rem; text-align: left;text-indent: 2em;"><font color="red">积分资产总估值</font>是系统根据实时成交价格，'+
	      	'将您所有关联的积分账户中积分资产余额换算成一种积分的总和。</p>'+
	      	'<p style="font-size:0.8rem;line-height:1.2rem; text-align: left;text-indent: 2em;">资产总值的<font color="red">单位</font>是通过您关联的积分作为单位进行衡量的，'+
	      	'您可以点击积分总估值后的<font color="red">单位按钮</font>切换衡量单位。</p>',
	      	extraClass:['gj-modal'],
	      	buttons: [{
	      		text:'<a href="#" class="btn btn-confirm">确认</a>',
	      		close:true,
	      	}],
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
	console.log(getCookie('isShowHelp'));
	if(getCookie('isShowHelp') == 0) {
		alerthelp(function(){
			setTimeout(function(){
				$('.modal-overlay-visible').addClass('nogl');
			},100);
			$.modal({
		    	title: '帮助',
		      	text: '<p style="font-size:0.8rem;line-height:1.2rem; text-align: left;text-indent: 2em;"><font color="red">微积分</font>是虚拟资产（积分、卡券）交换的平台。您可以将自己持有的各类积分、卡券与他人进行交换。</p>'+
		      	'<p style="text-align:left;" class="noprompt"><span class="span_select"></span>不再提示</p>',
		      	extraClass:['gj-modal'],
		      	buttons: [{
		      		text:'<a href="/templates/assistance.html" class="btn btn-confirm">查看帮助</a>',
		      		onClick:function(){
//		      			setTimeout(function(){
//		      				helpSlide();
//		      			},500);
		      		}
		      	},{
		      		text:'<a href="#" class="btn btn-confirm">确认</a>',
		      		close:true,
		      		onClick:function(){
		      			if($('.noprompt').find('.span_select').hasClass('checked')){
		      				checkalerthelp();
		      			};
		      		}
		      	}]
		  	});
		});
		setCookie('isShowHelp',1,"h12");
	}
	get.attr('href','/templates/change_all.html?id='+$('.radio-unit').attr('radio-unit'));
})();
