(function(){
	var phone = $('[name="phone_number"]');
	var pwd = $('[name="password"]');
	function judge(){
		var phone_val = $.trim(phone.val());
		var pwd_val = $.trim(pwd.val());
		if(phone_val==''){
			$.toast('手机号不得为空');
			return false;
		};
		if(phone_val.length!=11){
			$.toast('手机号为11个字符');
			return false;
		};
		if(isNaN(Number(phone_val))){
			$.toast('手机号仅包含数字');
			return false;
		};
		if(pwd_val==''){
			$.toast('密码不能为空');
			return false;
		};
		if(pwd_val.length<6 || pwd_val.length>25){
			$.toast('密码为6-25个字符');
			return false;
		};
		if(!/^[0-9a-zA-Z]+$/.test(pwd_val)){
			$.toast('密码仅可包含字母、数字');
			return false;
		};
		return true;
	};
	$('#submit').click(function(){
		if(!(judge())){
			return false;
		};
		$.showPreloader('正在提交');
		$.ajax({
			type:"post",
			url:URL+"/userlogin",
			data:{
				'phone_number':phone.val(),
				'password':pwd.val()
			},
			dataType:'json',
			success:function(res){
				$.hidePreloader();
				if(res.code==200){
					$.router.load("/templates/wallet.html",true);
				}else{
					$.alert(res.msg);
				};
			}
		});
	});
	if($('.panel-overlay').length > 0){
		$('.panel-overlay').remove();
	};
})()
