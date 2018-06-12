(function(){
	var _page = $('.page');
	var second = 60;
	var timer = null;
	var getCode = $('#J_getCode');
	var seCode = $('#J_second');
	var restCode = $('#J_resetCode');
	//倒计时
	function resetCode(){
		ajaxRequest(function(data){
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
	function ajaxRequest(callback){
        $.ajax({
	        url:URL+'/operate/apiphone',
	        type:'get',
	        dataType:'json',
	        success:function(data){
	        	callback(data);
	        }
		});
	};
	function ajaxSubmit(){
		var captcha = $.trim($("input[name='captcha']").val());
		var pwd = $.trim($("input[name='pwd']").val());
		var repeat_pwd = $.trim($("input[name='repeat_pwd']").val());
		var _btn = $(".btn-create");
		if( captcha == ''){
			$.toast('请填写验证码');
			return false;
	    };
	    if(!(/^\d{6}$/.test(captcha))){
			$.toast('请输入6位验证码');
			return false;
	    };
	    if( pwd == '' ){
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
		if(repeat_pwd != pwd){
			$.toast('两次密码不一致');
			return false;
		};
		if(_btn.hasClass('disabled')){
			return false;
		};
		_btn.addClass('disabled');
		$.showPreloader('正在提交');
		$.ajax({
	        url:URL+'/operate/apichangepassword',
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
						$.router.load('/templates/wallet.html?s=0', true)
					});
				}else{
					$.alert(data.msg);
				};
	        }
	    });
	};
	$('#J_getCode').click(function(){
		resetCode();
	});
	$('.btn-create').click(function(){
		ajaxSubmit();
	});
})();
