(function(){
	var _page = $('.page');
	var second = 60;
	var timer = null;
	var getCode = $('#J_getCode');
	var seCode = $('#J_second');
	var restCode = $('#J_resetCode');
	// 再次发送短信
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
	}
	function ajaxRequest(phone,callback){
		$.ajax({
	        url:URL+'/register/smssendagain',
	        type:'get',
	        dataType:'json',
	        data:{
	        	'phone':phone
	        },
	        success:function(data){
	        	callback(data);
	        }
		});
	}

	$('.btn-next').click(function(){
		var data = {};
		data.phone = $('input[name="phone_number"]').val();
		data.captche = $('input[name="captche"]').val();
		var _this = $(this);
		if(_this.hasClass('disabled')){
			return false;
		};
		if( data.phone == ''){
			$.toast('请填写手机号');
			return false;
		};
		if( data.phone.length!=11){
			$.toast('手机号应为11位数');
			return false;
		};
		if(data.captche == ''){
			$.toast('请输入图形验证码');
			return false;
		}
		if(data.captche.length!= 4){
			$.toast('图形验证码应为4位数');
			return false;
		}
		_this.addClass('disabled');
		$.ajax({
			url:URL+'/register/resmscaptche',
			type:'post',
			data:data,
			dataType:'json',
			success:function(json){
				$.hidePreloader();
	        	_this.removeClass('disabled');
				if(json.code==0){
					$.toast(json.msg);
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
					$.toast(json.msg);
					sms();
				}
			}
		});
	});
	$('.btn-dnext').click(function(){
		var _this = $(this);
		var smscaptche = $('input[name="Verification_code"]').val();
		if(_this.hasClass('disabled')){
			return false;
		};
		if(smscaptche == ''){
			$.toast('请填写短信验证码');
			return false;
		};
		if(smscaptche.length != 6){
			$.toast('短信验证码应该为六位数');
			return false;
		};
		_this.addClass('disabled');
		$.ajax({
			url:URL+'/register/smsverify',
			type:'post',
			data:{
				smscaptche
			},
			dataType:'json',
			success:function(json){
	      _this.removeClass('disabled');
				if(json.code == 0){
					var than = _this.parents('.tab');
					than.removeClass('active').next().addClass('active');
				}else{
					$.toast(json.msg);
				}
			}
		});
	});

	function sms(){
		var _url = URL+'/admin/operate/regcaptcha';
		var _newUrl = _url+'?'+Math.random();
		$('#registerimg').attr('src',_newUrl);
	}

	function submit(){
		var data = {};
		data.phone = $('input[name="phone_number"]').val();
		data.captche = $('input[name="captche"]').val();
		data.Verification_code = $('input[name="Verification_code"]').val();
		data.password = $('input[name="password"]').val();
		data.repeat_pwd = $('input[name="repeat_pwd"]').val();
		if(data.password == ''){
			$.toast('请填写密码');
			return false;
		};
		if(!(/^[0-9a-zA-Z]+$/.test(data.password))){
			$.toast('密码仅可包含字母、数字');
			return false;
		};
		if( data.repeat_pwd == ''){
			$.toast('请再次填写密码');
			return false;
		};
		if(!(/^[0-9a-zA-Z]+$/.test(data.repeat_pwd))){
			$.toast('密码仅可包含字母、数字');
			return false;
		};
		if(data.password != data.repeat_pwd){
			$.toast('两次密码不一致');
			return false;
		};

		if($('.btn-create').hasClass('disabled')){
			return false;
		}
		$('.btn-create').addClass('disabled');
		$.showPreloader('正在提交');
		$.ajax({
			url:URL+'/register/apiregister',
			type:'post',
			data:data,
			dataType:'json',
			success:function(json){
				$.hidePreloader();
				if(json.code==0){
					$.toast(json.msg);
					$.router.load('/templates/userlogin.html',true);
				}else{
					$.toast(json.msg);
				};
				$('.btn-create').removeClass('disabled');
			},
		})
	};
	$('#registerimg').click(function(){
		sms();
	});
	$('.btn-create').click(function(){
		submit();
	});
	getCode.click(function(){
		var phone = $.trim($('[name="phone_number"]').val());
		resetCode(phone);
	});
})();
