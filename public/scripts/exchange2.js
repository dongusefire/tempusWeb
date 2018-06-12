(function(){
	var pageInfo,_letterHTML,_slideHtml,_lettersInfo;
	var _page = $('.page');
	var _slide = {'wyou':'../public/images/wyou-icon.png','wyao':'../public/images/wyao-icon.png'};
	$.ajax({
		type:"get",
		url:URL+"/ApiExchange/exchangehomeapi/1",
		dataType:'json',
		beforeSend:function(){
			$.showPreloader('正在获取');
		},
		success:function(res){
			$.hidePreloader();
			if(res.code==0){
				pageInfo = res.data;
				defaultExchange(pageInfo);
			};
		}
	});
	function defaultExchange(data){
		var _obj = {},youHTML='',yaoHTML='';
		_letterHTML='';_slideHtml='';
		$.each(data,function($key,val){
			_slideHtml +='<div class="swiper-slide slide-box" data-id="'+val.id+'" value="'+val.value+'"'+
			   ' issue_price="'+val.issue_price+'" recommend_price="'+val.recommend_price+'">'+
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
		   if(!_obj[val.first_key]){
		   		_obj[val.first_key] = val.id;
		   };
		});
		_lettersInfo =_obj;
		$.each(_obj,function($key,val){
			_letterHTML +='<div class="swiper-slide" data-id="'+val+'">'+$key+'</div>';
		});
		youHTML = '<div class="swiper-slide slide-box" data-id="-1">'+
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
	   yaoHTML = '<div class="swiper-slide slide-box" data-id="-1">'+
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
		$('[data-type="slide-html"]').eq(0).html(youHTML+_slideHtml);
		$('[data-type="slide-html"]').eq(1).html(yaoHTML+_slideHtml);
		$('[data-type="letter"]').html(_letterHTML);
		$switch(-1);
		_page.find('.content').show();
		createSwiper();
	};
	function $switch(id1,id2){
		var _key1 = -1,_key2 = -1;
		if(id1==-1||id2==-1){
			$('.change-you').html('换入');
			$('.change-yao').html('换出');
			$('.change_title .rate').html('<span>1</span>:<span>1</span>');
			return false;
		};
		$.each(pageInfo,function($key,val){
			if(val.id==id1){
				_key1=$key;
			};
			if(val.id==id2){
				_key2=$key;
			};
		});
		var rate1 = (1/(1/parseInt(pageInfo[_key1].recommend_price)))*(1/parseInt(pageInfo[_key2].recommend_price))
		$('.change-you').html(pageInfo[_key1].name);
		$('.change-yao').html(pageInfo[_key2].name);
		$('.change_title .rate').html('<span>1</span>:<span>'+rate1+'</span>').attr('data-tj',1+','+rate1);
		$('.change_inps input').eq(0).val('100');
		$('.change_inps input').eq(1).val(rate1*100);
	};
	function createSwiper(){
		var upLetter = new Swiper('#upLetter',{
			slidesPerView:'auto',
			prevButton:'.upLetter-left',
			nextButton:'.upLetter-right',
			slidesPerGroup:3,
			onInit:function(swiper){
				$('#upLetter .swiper-slide').eq(swiper.activeIndex).removeClass('swiper-slide-active');
			}
		});
		var downLetter = new Swiper('#downLetter',{
			slidesPerView:'auto',
			prevButton:'.downLetter-left',
			nextButton:'.downLetter-right',
			slidesPerGroup:3,
			onInit:function(swiper){
				$('#downLetter .swiper-slide').eq(swiper.activeIndex).removeClass('swiper-slide-active');
			}
		});
		var upSlide = new Swiper('#upSlide',{
			slidesPerView: 5,
			spaceBetween: 10,
			centeredSlides: true,
			initialSlide :0,
			slideActiveClass : 'active',
			onTransitionEnd:function(swiper){
				var _thisid = $('#upSlide .slide-box.active').attr('data-id');
				var _downid = $('#downSlide .slide-box.active').attr('data-id');
				$switch(_thisid,_downid);
			}
		});
		var downSlide = new Swiper('#downSlide',{
			slidesPerView: 5,
			spaceBetween: 10,
			centeredSlides: true,
			initialSlide :0,
			slideActiveClass : 'active',
			onTransitionEnd:function(swiper){
				var _upid = $('#upSlide .slide-box.active').attr('data-id');
				var _thisid = $('#downSlide .slide-box.active').attr('data-id');
				$switch(_upid,_thisid);
			}
		});
		$('#upLetter').on('click','.swiper-slide',function(){
			var _active = $(this).attr('data-id');
			var _id = $('#upSlide [data-id="'+_active+'"]').index();
			$(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
			upSlide.slideTo(_id,800,false);
			setTimeout(function(){
				var _thisid = $('#upSlide .slide-box.active').attr('data-id');
				var _downid = $('#downSlide .slide-box.active').attr('data-id');
				$switch(_thisid,_downid);
			},800);
		});
		$('#downLetter').on('click','.swiper-slide',function(){
			var _active = $(this).attr('data-id');
			var _id = $('#downSlide [data-id="'+_active+'"]').index();
			$(this).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
			downSlide.slideTo(_id,800,false);
			setTimeout(function(){
				var _upid = $('#upSlide .slide-box.active').attr('data-id');
				var _thisid = $('#downSlide .slide-box.active').attr('data-id');
				$switch(_upid,_thisid);
			},800);
		});
		$('.btn-swap').on('click',function(){
			var _ind1 = $('#upSlide .slide-box.active').index();
			var _ind2 = $('#downSlide .slide-box.active').index();
			if(_ind1!=_ind2){
				upSlide.slideTo(_ind2,800,false);
				downSlide.slideTo(_ind1,800,false);
				setTimeout(function(){
					var _upid = $('#upSlide .slide-box.active').attr('data-id');
					var _thisid = $('#downSlide .slide-box.active').attr('data-id');
					$switch(_upid,_thisid);
				},800);
			};
		});
	}
	$('.btn-reset').click(function(){
		var getrate = $('.section span.rate').attr('data-tj').split(',');
		var inps = $('.change_inps input');
		inps.eq(0).val(getrate[0]);
		inps.eq(1).val(getrate[1]);
	});
})();