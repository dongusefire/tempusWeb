(function(){
	var _page = $('.page');
	var second = 60;
	var timer = null;
	var getCode = $('#J_getCode');
	var seCode = $('#J_second');
	var restCode = $('#J_resetCode');
	var $Codeimg = $('#Codeimg');
	//倒计时
	function resetCode(phone){
		ajaxRequest(phone,function(data){
			if(data.code=='401'){
				Tologin();
				return false;
			};
			$.toast(data.msg);
			if(data.code==0){
				getCode.hide();
				seCode.html('60');
				restCode.show();
				timer = setInterval(function(){
					--second;
					if(second >0 ){
						seCode.html(second);
					}else{
						clearTimeout(timer);
						second = 60;
						getCode.show();
						restCode.hide();
					};
				},1000);
			};
		});
	};
	function ajaxRequest(phone,callback){
        $.ajax({
	        url:URL+'/operates/smscaptcha',
	        type:'get',
	        dataType:'json',
	        data:{
	        	'phone':phone
	        },
	        success:function(data){
	        	callback(data);
	        }
		});
	};
	function ajaxSubmit(){
		var pwd = $.trim($("input[name='pwd']").val());
		var repeat_pwd = $.trim($("input[name='repeat_pwd']").val());
		var captcha = $.trim($("input[name='captcha']").val());
		var _btn = $(".btn-create");
		if( captcha == ''){
			$.toast('请填写验证码');
			return false;
	    };
	    if(captcha.length!=6){
	    	$.toast('验证码应为六位数');
	    	return false;
	    }
		if(pwd == ''){
			$.toast('请填写密码');
			return false;
		};
		if(!(/^[0-9a-zA-Z]+$/.test(pwd))){
			$.toast('密码仅可包含字母、数字');
			return false;
		};
		if( repeat_pwd == ''){
			$.toast('请填写密码');
			return false;
		};
		if(!(/^[0-9a-zA-Z]+$/.test(repeat_pwd))){
			$.toast('密码仅可包含字母、数字');
			return false;
		};
		if(pwd != repeat_pwd){
			$.toast('两次密码不一致');
			return false;
		};
		if(_btn.hasClass('disabled')){
			return false;
		};
		_btn.addClass('disabled');
		$.showPreloader('正在提交');
		$.ajax({
	        url:URL+'/operate/apipwdrecovery',
	        type:"post",
	        dataType:"json",
	        data:{
	        	"captcha":captcha,
				"pwd":pwd,
				"repeat_pwd":repeat_pwd
			},
	        success:function(data){
	        	$.hidePreloader();
	        	_btn.removeClass('disabled');
				if(data.code=='401'){
					Tologin();
					return false;
				};
				if(data.code==0){
					$.alert(data.msg,function(){
						$.router.load('/templates/userlogin.html', true)
					});
				}else{
					$.alert(data.msg);
				};
	        }
	    });
	};

	$('.btn-next').click(function(){
		var phone = $.trim($('[name="phoneNumber"]').val());
		var authCode = $.trim($('#authCode').val());
		var _this = $(this);
		if(_this.hasClass('disabled')){
			return false;
		};
		if( phone == ''){
			$.toast('请填写手机号');
			return false;
	    };
	    if( phone.length!=11){
			$.toast('手机号应为11位数');
			return false;
	    };
	    if( authCode == ''){
			$.toast('请填写图像验证码');
			return false;
	    };
	    if( authCode.length!=4){
			$.toast('图像验证码应为四位数');
			return false;
	    };
	    _this.addClass('disabled');
	    $.ajax({
	        url:URL+'/operate/apiphonerecovery',
	        type:"post",
	        dataType:"json",
	        data:{
	        	'phone':phone,
				"authCode":authCode
			},
	        success:function(data){
	        	$.hidePreloader();
	        	_this.removeClass('disabled');
				if(data.code==0){
					var than = _this.parents('.tab');
					than.removeClass('active').next().addClass('active');
					getCode.hide();
					seCode.html('60');
					restCode.show();
					timer = setInterval(function(){
						--second;
						if(second >0 ){
							seCode.html(second);
						}else{
							clearTimeout(timer);
							second = 60;
							getCode.show();
							restCode.hide();
						};
					},1000);
				}else{
					$.alert(data.msg);
					// $.toast(data.msg);
					var _url = '/operate/captcha';
					var _newUrl = _url+'?'+Math.random();
					// $Codeimg.find('img').attr('src',_newUrl);
					
				};
	        }
	    });
	});
	getCode.click(function(){
		var phone = $.trim($('[name="phoneNumber"]').val());
		resetCode(phone);
	});
	$Codeimg.click(function(){
		var _url = '/admin/operate/captcha';
		var _newUrl = _url+'?'+Math.random();
		$(this).find('img').attr('src',_newUrl);
	});
	$('.btn-create').click(function(){
		ajaxSubmit();
	});
})();
