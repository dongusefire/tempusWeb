(function(){
	$('[data-type="slide-html"]').html('').removeAttr('style');
	$('[data-type="letter"]').html('').removeAttr('style');
	var pageInfo = {'up':null,'down':null};
	var upDefault = false,downDefault=false;
	var _upHTML,_downHTML,_slideHtml,_upInfo={},_downInfo={};
	var _page = $('.page');
	var downSlide,upSlide;
	var enter_index=-1,out_index=-1;
	var downLetter,upLetter;
	$('.content').hide();
	$('.choice-box .img-list').css('min-height','5.55rem');
	function styleInit(){
		var $hd = $('header.bar');
		var $ft = $('nav.bar-footer');
		var $content = $('.content');
		$hd.css('height',$hd.height());
		$ft.css('height',$ft.height());
		$content.css({'top':$hd.height(),'bottom':$ft.height(),'height':($(window).height()-$hd.height()-$ft.height())})
	}
	function resize(){
		var $hd = $('header.bar');
		var $ft = $('nav.bar-footer');
		var $content = $('.content');
		$content.css({'top':$hd.height(),'bottom':$ft.height(),'height':($(window).height()-$hd.height()-$ft.height())})
	}
	function editSecStyle(){
		var $sec = $('.section');
		var _top = $('.choice-box').eq(0).outerHeight();
		var _bottom = $('.choice-box').eq(1).outerHeight();
		var _content = $('.content').height();
		var marr = parseFloat($sec.css('margin').split(' ')[0])*2
		//求出section的高度
		$sec.height(_content-marr-(_top+_bottom));
	};
	styleInit();
	$.showPreloader('正在获取');
	$.ajax({
		type:"get",
		url:URL+"/ApiExchange/exchangehomeapi/1",
		dataType:'json',
		success:function(apiRes){
			if(apiRes.code=='401'){
				$.hidePreloader();
				setTimeout(function(){
					Tologin();
				},10);
				return false;
			};
			if(apiRes.code==0){
				if(pageInfo['up']==null){
					pageInfo['up'] = apiRes.data;
					defaultExchange(apiRes.data,'up');
					if(pageInfo['down']!=null){
						$('.content').show();
						$.hidePreloader();
					}
				};
			};
		}
	});
	$.ajax({
		type:"get",
		url:URL+"/ApiExchange/exchangetarget",
		dataType:'json',
		success:function(getRes){
			if(getRes.code=='401'){
				$.hidePreloader();
				setTimeout(function(){
					Tologin();
				},10);
				return false;
			};
			if(getRes.code==0){
				if(pageInfo['down']==null){
					pageInfo['down'] = getRes.data;
					defaultExchange(getRes.data,'down');
					if(pageInfo['up']!=null){
						$('.content').show();
						$.hidePreloader();
					}
				};
			}
		}
	});
	function defaultExchange(data,type){
		var dataLength;
		if( data.length <3 ){
			dataLength = 1;
		} else {
			dataLength = 2;
		};
		if(type=="up"){
			var youHTML='',_upHTML='';
			if(data.length==0){
				youHTML +='<div class="swiper-slide slide-box" data-id="-1">'+
					   '<div class="slide-default"><div class="slide-img">'+
						   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
					   '</div>'+
					   '<div class="slide-title">我有</div>'+
				   '</div>'+
				   '<div class="slide-active">'+
					   '<div class="slide-img">'+
						   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
					   '</div>'+
				   '</div>'+
		   		'</div>';
		   		dataLength = 0;
			};
			$.each(data,function($key,val){
				if(dataLength == $key) {
					youHTML +='<div class="swiper-slide slide-box" data-id="-1">'+
							   '<div class="slide-default"><div class="slide-img">'+
								   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
							   '</div>'+
							   '<div class="slide-title">我有</div>'+
						   '</div>'+
						   '<div class="slide-active">'+
							   '<div class="slide-img">'+
								   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
							   '</div>'+
						   '</div>'+
				   		'</div>';
				}
				youHTML +='<div class="swiper-slide slide-box" data-id="'+val.id+'" value="'+val.value+'" first_key="'+val.first_key+'"'+
				   ' issue_price="'+val.issue_price+'" recommend_price="'+val.recommend_price+'" isBuild="'+val.isBuild+'">'+
					   '<div class="slide-default"><div class="slide-img">'+
						   '<div class="img-box"><img src="'+val.product_picture+'" /></div>'+
					   '</div>'+
					   '<div class="slide-title">'+val.name+'</div>'+
				   '</div>'+
				   '<div class="slide-active">'+
					   '<div class="slide-img">'+
						   '<div class="img-box"><img src="'+val.product_picture+'" /></div>'+
					   '</div>'+
				   '</div>'+
			   '</div>';
			   if(data.length == 1){
					youHTML +='<div class="swiper-slide slide-box" data-id="-1">'+
							   '<div class="slide-default"><div class="slide-img">'+
								   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
							   '</div>'+
							   '<div class="slide-title">我有</div>'+
						   '</div>'+
						   '<div class="slide-active">'+
							   '<div class="slide-img">'+
								   '<div class="img-box"><img src="../public/images/wyou-icon.png" /></div>'+
							   '</div>'+
						   '</div>'+
				   '</div>';
				}
			   if(!_upInfo[val.first_key]){
			   		_upInfo[val.first_key] = val.id;
			   };
			});
			$.each(_upInfo,function($key,val){
				_upHTML +='<div class="swiper-slide" data-id="'+val+'"  first-key="'+$key+'"><a href="#">'+$key+'</a></div>';
			});
			$('[data-type="slide-html"]').eq(0).html(youHTML);
			$('[data-type="letter"]').eq(0).html(_upHTML);
			$('.choice-box .img-list').eq(0).removeAttr('style');
		}else{
			var yaoHTML='',_downHTML='';
			$.each(data,function($key,val){
				var disabled = '';
				if(val.isBuild==0){
					disabled=' disabled';
				};
				if(dataLength == $key) {
					yaoHTML += '<div class="swiper-slide slide-box" data-id="-1">'+
						   '<div class="slide-default"><div class="slide-img">'+
							   '<div class="img-box"><img src="../public/images/wyao-icon.png" /></div>'+
						   '</div>'+
						   '<div class="slide-title">我要</div>'+
					   '</div>'+
					   '<div class="slide-active">'+
						   '<div class="slide-img">'+
							   '<div class="img-box"><img src="../public/images/wyao-icon.png" /></div>'+
						   '</div>'+
					   '</div>'+
				   '</div>';
				}
				yaoHTML +='<div class="swiper-slide slide-box'+disabled+'" data-id="'+val.id+'" value="'+val.value+'" text="'+val.name+'"'+
				   ' issue_price="'+val.issue_price+'" recommend_price="'+val.recommend_price+'" isBuild="'+val.isBuild+'" first_key="'+val.first_key+'">'+
					   '<div class="slide-default"><div class="slide-img">'+
						   '<div class="img-box"><img src="'+val.product_picture+'" /></div>'+
					   '</div>'+
					   '<div class="slide-title">'+val.name+'</div>'+
				   '</div>'+
				   '<div class="slide-active">'+
					   '<div class="slide-img">'+
						   '<div class="img-box"><img src="'+val.product_picture+'" /></div>'+
					   '</div>'+
				   '</div>'+
			   '</div>';
			   if(data.length == 1){
					yaoHTML += '<div class="swiper-slide slide-box" data-id="-1">'+
						   '<div class="slide-default"><div class="slide-img">'+
							   '<div class="img-box"><img src="../public/images/wyao-icon.png" /></div>'+
						   '</div>'+
						   '<div class="slide-title">我要</div>'+
					   '</div>'+
					   '<div class="slide-active">'+
						   '<div class="slide-img">'+
							   '<div class="img-box"><img src="../public/images/wyao-icon.png" /></div>'+
						   '</div>'+
					   '</div>'+
				   '</div>';
				}
			   if(!_downInfo[val.first_key]){
			   	   _downInfo[val.first_key]=val.id;
			   };
			});
			$.each(_downInfo,function($key,val){
				_downHTML +='<div class="swiper-slide" data-id="'+val+'"  first-key="'+$key+'"><a href="#">'+$key+'</a></div>';
			});
			$('[data-type="slide-html"]').eq(1).html(yaoHTML);
			$('[data-type="letter"]').eq(1).html(_downHTML);
			$('.choice-box .img-list').eq(1).removeAttr('style');
		}
		_page.find('.content').show();
		createSwiper(dataLength,type);
	};
	function $switch(id1,id2){
		var _key1 = -1,_key2 = -1;
		if(id1!=undefined){
			$.each(pageInfo['up'],function($key,val){
				if(val.id==id1){
					_key1=$key;
				};
			});
			if(id1==-1){
				$('.change-you').html('换出');
				$('.change_title .rate').html('<span>1</span>:&nbsp;<span>1</span>');
				$('.zline a').attr('href','#');
				$('.change_inps input').eq(0).val('');
				out_index = -1;
			}else{
				$('.change-you').html(pageInfo['up'][_key1].name.substring(0,5));
				$('.change_inps input').eq(0).val(Math.floor(pageInfo['up'][_key1].value));
			}
		};
		if(id2!=undefined){
			$.each(pageInfo['down'],function($key,val){
				if(val.id==id2){
					_key2=$key;
				};
			});
			if(id2==-1) {
				$('.change-yao').html('换入');
				$('.change_title .rate').html('<span>1</span>:&nbsp;<span>1</span>');
				$('.zline a').attr('href','#');
				$('.change_inps input').eq(1).val('');
				enter_index = -1;
			} else if(id1==undefined || id1==-1){
				$('.change-yao').html(pageInfo['down'][_key2].name.substring(0,5));
				$('.change_inps input').eq(1).val(Math.floor(pageInfo['down'][_key2].value));
			}
		};
		if((id1!=-1 && id1!=undefined) && (id2!=-1 && id2!=undefined)){
			var rate1 = parseFloat(((1/parseFloat(pageInfo['up'][_key1].recommend_price)) / (1/parseFloat(pageInfo['down'][_key2].recommend_price))).toFixed(2));
			$('.change_title .rate').html('<span>1</span>:<span>'+rate1+'</span>').attr('data-tj',1+','+rate1);
			if(_key1 != out_index){
				$('.change-you').html(pageInfo['up'][_key1].name);
				$('.change_inps input').eq(0).val(Math.floor(pageInfo['up'][_key1].value));
			};
			if(_key2 != enter_index){
				$('.change-yao').html(pageInfo['down'][_key2].name);
				$('.change_inps input').eq(1).val(Math.floor(rate1*pageInfo['up'][_key1].value));
			};
			var _href = $('.zline a').attr('_href');
			$('.zline a').attr('href',_href+'?id='+pageInfo['up'][_key1].id+'&targetId='+pageInfo['down'][_key2].id);
			enter_index = _key2;
			out_index = _key1;
		};
	};
	function createSwiper(dataLength,type){
		if(type=='up'){
			var _upId = null;
			var _upkey = null;
			if(GetRequest().product_id){
				var _upSlide = $('#upSlide [data-id="'+GetRequest().product_id+'"]');
				var _pind = _upSlide.index();
				var _pid = _upSlide.attr('data-id');
				_upId = _pind;
				if((pageInfo['down']!=undefined)){
					var _downSlide = $('#downSlide [data-id="'+GetRequest().target_product_id+'"]');
					var _did = _downSlide.length==0? -1:_downSlide.attr('data-id');
					$switch(_pid,_did);
				}else{
					upDefault=false;
					$switch(_pid,undefined);
				};
			}else{
				_upId = dataLength;
				upDefault=true;
				$switch(-1,undefined);
			}
			upLetter = new Swiper('#upLetter',{
				slidesPerView:'auto',
//				slidesPerGroup:5
			});
			function changeUpSlide(demo){
				var _key = $('#upSlide .slide-box').eq(demo).attr('first_key');
				if(_key){
					console.log($('#upLetter').find('[first-key="'+_key+'"]').index());
					upLetter.slideTo($('#upLetter').find('[first-key="'+_key+'"]').index(),800,false);
					$('#upLetter').find('[first-key="'+_key+'"]').addClass('active').siblings().removeClass('active');
				}else{
					$('#upLetter').find('.swiper-slide').removeClass('active');
				};
			}
			upSlide = new Swiper('#upSlide',{
				preloadImages:false,
				slidesPerView: 5,
				spaceBetween: 10,
				centeredSlides: true,
				initialSlide :_upId,
				defaultWdith:0,
				slideActiveClass : 'active',
				onInit:function(swiper_up){
					var slide_w = swiper_up.slides.eq(0).css('width');
					if(slide_w.indexOf('%')!=-1){
						slide_w = $('html').width()*(parseFloat(slide_w)/100);
					};
					changeUpSlide(_upId);
					$('.marquee').eq(0).css({
						'width':parseFloat(slide_w)*1.2,
						'height':parseFloat(slide_w)*1.2,
						'marginLeft':-((parseFloat(slide_w)*1.2)/2)
					});
					//4.19加
					if(swiper_up.slides.length==1){
						var pt =parseFloat( $('.img-list').eq(0).css('padding-top'));
						var pb =parseFloat( $('.img-list').eq(0).css('padding-bottom'));
						$('.img-list').eq(0).css('height',parseFloat(slide_w)*1.2+pt+pb);
					};
					editSecStyle();
				},
				onSlideChangeStart:function(swiper_up){
					if(upDefault){
						var _upid = $('#upSlide .slide-box.active').attr('data-id');
						var _thisSwiper = $('#downSlide .slide-box.active');
						var _thisid = _thisSwiper.attr('data-id');
						$switch(_upid,_thisid);
						changeUpSlide($('#upSlide .slide-box.active').index());
					}else{
						upDefault = true;
					};
				},
				onSlideChangeEnd:function(swiper_down){

				},
				onTap:function(swiper_up){
					upSlide.slideTo(upSlide.clickedIndex,800,true);
				}
			});
			$('#upLetter').on('click','.swiper-slide',function(){
				var _active = $(this).attr('data-id');
				var _id = $('#upSlide [data-id="'+_active+'"]').index();
				$(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
				upSlide.slideTo(_id,800,true);
			});

	//		var _key = $('#upSlide .slide-box').eq(_upId).attr('data-id');
//			var _ind = $('#upLetter [data-id="'+_key+'"]').index();
//			upLetter.slideTo(_ind,800,true);
		}else{
			var _downId=null;
			var _downkey = null;
			if(GetRequest().target_product_id && GetRequest().target_product_id!=0){
				var _downSlide = $('#downSlide [data-id="'+GetRequest().target_product_id+'"]');
				var _dind = _downSlide.index()==-1? dataLength:_downSlide.index();
				var _did = _downSlide.length==0? -1:_downSlide.attr('data-id');
				_downId = _dind;
				if((pageInfo['up']!=undefined)){
					var _upSlide = $('#upSlide [data-id="'+GetRequest().product_id+'"]');
					var _pid = _upSlide.attr('data-id');
					$switch(_pid,_did);
				}else{
					downDefault=false;
					$switch(undefined,_did);
				};
			}else{
				_downId = dataLength;
				$switch(undefined,-1);
				downDefault=true;
			}
			function changeDownSlide(demo){
				var _key = $('#downSlide .slide-box').eq(demo).attr('first_key');
				if(_key){
					downLetter.slideTo($('#downLetter').find('[first-key="'+_key+'"]').index(),800,false);
					$('#downLetter').find('[first-key="'+_key+'"]').addClass('active').siblings().removeClass('active');
				}else{
					$('#downLetter').find('.swiper-slide').removeClass('active');
				};
			}
			downLetter = new Swiper('#downLetter',{
				slidesPerView:'auto'
			});
			downSlide = new Swiper('#downSlide',{
				preloadImages:false,
				slidesPerView: 5,
				spaceBetween: 10,
				centeredSlides: true,
				defaultWdith:0,
				initialSlide :_downId,
				slideActiveClass : 'active',
				onInit:function(swiper_down){
					var slide_w = swiper_down.slides.eq(0).css('width');
					if(slide_w.indexOf('%')!=-1){
						slide_w = $('html').width()*(parseFloat(slide_w)/100);
					}
					changeDownSlide(_downId);
					$('.marquee').eq(1).css({
						'width':parseFloat(slide_w)*1.2,
						'height':parseFloat(slide_w)*1.2,
						'marginLeft':-((parseFloat(slide_w)*1.2)/2)
					});
					editSecStyle();
				},
				onSlideChangeStart:function(){
					if(downDefault){
						var _upid = $('#upSlide .slide-box.active').attr('data-id');
						var _thisSwiper = $('#downSlide .slide-box.active');
						var _thisid = _thisSwiper.attr('data-id');
						if(_thisid!=-1){
							var isbuild = _thisSwiper.attr('isbuild');
							var val = _thisSwiper.attr('value');
							if(isbuild!='0'){
								$switch(_upid,_thisid);
							}else{
								downSlide.lockSwipes();
								Tobuild(_thisSwiper.attr('text'),_thisid);
							};
						}else{
							$switch(_upid,_thisid);
						};
						changeDownSlide($('#downSlide .slide-box.active').index());
					}else{
						downDefault = true;
					};
				},
				onSlideChangeEnd:function(swiper_down){
				},
				onTap:function(swiper_down){
					downSlide.slideTo(downSlide.clickedIndex,800,true);
				}
			});
			$('#downLetter').on('click','.swiper-slide',function(){
				var _active = $(this).attr('data-id');
				var _id = $('#downSlide [data-id="'+_active+'"]').index();
				$(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
				downSlide.slideTo(_id,800,true);
			});
		};
	};
	$('.btn-swap').on('click',function(){
		var _ind1=null,_ind2=null;
		var _id1 = $('#upSlide .slide-box.active').attr('data-id');
		var _id2 = $('#downSlide .slide-box.active').attr('data-id');
		$('#downSlide .slide-box').each(function($key,ele){
			if($(ele).attr('data-id')==_id1){
				_ind2 = $(ele).index();
			};
		});
		$('#upSlide .slide-box').each(function($key,ele){
			if($(ele).attr('data-id')==_id2){
				_ind1 = $(ele).index();
			};
		});
		if(_id1!=_id2){
			upSlide.slideTo(_ind1,800,true);
			downSlide.slideTo(_ind2,800,true);
		};
	});
	$(window).resize(function(){
		resize();
	});
	$('.btn-reset').click(function(){
		var getrate = $('.section span.rate').attr('data-tj').split(',');
		var inps = $('.change_inps input');
		if(inps.eq(0).val()) {
			inps.eq(1).val(Math.floor(getrate[1]*inps.eq(0).val()));
			return;
		}
		if(inps.eq(1).val()) {
			inps.eq(0).val(Math.floor(inps.eq(1).val()/getrate[1]));
			return;
		}
		inps.eq(0).val($('#upSlide .slide-box.active').attr('value'));
		inps.eq(1).val(Math.floor(getrate[1]*$('#upSlide .slide-box.active').attr('value')));
	});
	function flag(){
		setTimeout(function(){
			$('.btn-submit').removeClass('disabled');
		},2000);
	};
	function Tobuild($text,$id){
		modal({
		   status:'7',
		   title:'尚未关联',
		   text:'您需要先关联'+$text+',才能进行兑换',
		   buttons:[
		   	    {
					text:'<a href="#" class="btn btn-continue">取消</a>',
					onClick:function(){
						downSlide.unlockSwipes();
						var Slides = $('#downSlide').find('.slide-box');
						var _upid = $('#upSlide .slide-box.active').attr('data-id');
						downSlide.slideTo(downSlide.previousIndex,800,true);
					}
			    },
			    {
					text:'<a href="#" class="btn btn-confirm">去关联</a>',
					onClick:function(){
						downSlide.unlockSwipes();
						$.ajax({
						 	type:"get",
						 	url:URL+"/user/manualrelation/"+$id,
						 	dataType:'json',
						 	success:function(res){
								if(res.code=='401'){
									Tologin();
									return false;
								};
						 		if(res.code==200){
						 			$.showPreloader('正在跳转 ，请在<span style="color:#f00;">'+$text+'</span>中完成登录授权后关联该账户 ');
						 			setTimeout(function(){
										$.hidePreloader();
						 				setStorage('url',res.data.path);
						 				setStorage('businessname',$text);
										setStorage('id',$id);
						 				$.router.load('/templates/connect.html',true);
						 			},1500);
						 		} else {
						 			$.toast(res.msg);
									var Slides = $('#downSlide').find('.slide-box');
									var _upid = $('#upSlide .slide-box.active').attr('data-id');
									downSlide.slideTo(downSlide.previousIndex,800,true);
						 		};
						 	}
						});
					}
			    }
		   ]
	   });
	   $('.modal-overlay').addClass('nogl');
	};
	if(GetRequest().status ==1){
	   var _href = location.origin+location.pathname;
       history.pushState({},0,_href);
	   $.modal({
		   	'text':'您的挂单已成功，您可以在“我的挂单”页面查看您的挂单',
		   	'extraClass':'gj-modal',
		   	'verticalButtons':true
	   });
	   setTimeout(function(){
	   		$.closeModal('.gj-modal');
	   	 	$.router.load('/templates/wallet.html',true);
	   },1500);
    }else if(GetRequest().status ==2){
	   modal({
		   status:'5',
		   title:'支付失败',
		   text:'支付失败',
		   callback:function(){
			   var _href = location.origin+location.pathname;
			   history.pushState({},0,_href);
		   }
	   });
    };
	$('.btn-submit').click(function(){
		var _upid = $('#upSlide .slide-box.active').attr('data-id');
		var _downid = $('#downSlide .slide-box.active').attr('data-id');
		var inps = $('.change_inps input');
		var _inp1 = $.trim(inps.eq(0).val());
		var _inp2 = $.trim(inps.eq(1).val());
		var re = /^(-?\d+)(\.\d+)?$/;
		var _upid = $('#upSlide .slide-box.active').attr('data-id');
		var _thisSwiper = $('#downSlide .slide-box.active');
		var _thisid = _thisSwiper.attr('data-id');
		if(_upid==-1 || _thisid==-1){
			$.toast('请选择商家');
			return false;
		}else if(_thisSwiper.hasClass('disabled')){
			var isbuild = _thisSwiper.attr('isbuild');
			var val = _thisSwiper.attr('value');
			if(isbuild=='0'){
				Tobuild(_thisSwiper.attr('text'),_thisid);
			};
			return false;
		};
		if($(this).hasClass('disabled')){
			return false;
		};
		if(_inp1==''){
			$.toast('换出数量不能为空');
			flag();
			return false;
		};
		if(parseInt(_inp1)<=0 || _inp1.indexOf('.')!=-1){
			$.toast('换出数量必须大于0的整数');
			flag();
			return false;
		};
		if(_inp1.length>8){
			$.toast('换出数量不能超过8位数');
			flag();
			return false;
		}
		if(isNaN(parseInt(_inp1))){
			$.toast('请输入正确的换出数量');
			flag();
			return false;
		}
		if(_inp2==''){
			$.toast('换入数量不能为空');
			flag();
			return false;
		};
		if(parseInt(_inp2)<=0 || _inp1.indexOf('.')!=-1){
			$.toast('换入数量必须大于0的整数');
			flag();
			return false;
		};
		if(isNaN(parseInt(_inp2))){
			$.toast('请输入正确的换入数量');
			flag();
			return false;
		};
		if(_inp2.length>8){
			$.toast('换入数量不能超过8位数');
			flag();
			return false;
		}
		$.hidePreloader();
		$.showPreloader('正在提交');
		$(this).addClass('disabled');
		createorder({
			product_id:_downid,
        	amount_num:_inp2,
          	pay:[{
          		'product_id':_upid,
          		'amount':_inp1
          	}]
		},function(res){
			$.hidePreloader();
			setTimeout(function(){
				$('.btn-submit').removeClass('disabled');
			},2000);
			if(res.code=='401'){
				Tologin();
				return false;
			};
			if(res.code==0){
				$.modal({
				   	'text':'您的挂单已成功，您可以在“我的挂单”页面查看您的挂单',
				   	'extraClass':'gj-modal',
				   	'verticalButtons':true
			    });
			    setTimeout(function(){
			   		$.closeModal('.gj-modal');
			   	 	$.router.load('/templates/wallet.html',true);
			    },1500);
			}else if(res.code==200){
				location.href = res.data.href;
			}else{
				$.toast(res.msg);
			};
		})
	});
})();
