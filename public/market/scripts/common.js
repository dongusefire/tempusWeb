//jquery.validate表单验证
$(document).ready(function(){
	//登录表单验证
	$("#loginForm").validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,
		rules:{
			phone_number:{
				required:true,
				phone_number:true,//自定义的规则
				digits:true,//整数
			},
			password:{
				required:true,
				minlength:3,
				maxlength:32,
			},
		},
		//错误信息提示
		messages:{
			phone_number:{
				required:"请输入正确的手机号码",
				// minlength:"用户名至少为3个字符",
				// maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			element.val('');
       		element.attr("placeholder",error.html());
		},
	});
	//注册表单验证
	$("#registerForm").validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
				remote:{
					url:"http://kouss.com/demo/Sharelink/remote.json",//用户名重复检查，别跨域调用
					type:"post",
				},
			},
			password:{
				required:true,
				minlength:3,
				maxlength:32,
			},
			email:{
				required:true,
				email:true,
			},
			confirm_password:{
				required:true,
				minlength:3,
				equalTo:'.password'
			},
			phone_number:{
				required:true,
				phone_number:true,//自定义的规则
				digits:true,//整数
			}
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				minlength:"用户名至少为3个字符",
				maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
			email:{
				required:"请输入邮箱地址",
				email: "请输入正确的email地址"
			},
			confirm_password:{
				required: "请再次输入密码",
				minlength: "确认密码不能少于3个字符",
				equalTo: "两次输入密码不一致",//与另一个元素相同
			},
			phone_number:{
				required:"请输入手机号码",
				digits:"请输入正确的手机号码",
			},
		
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			element.val('');
       		element.attr("placeholder",error.html());
		},
	});
	$('#modifyusernameForm').validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:11,//最多20个字符
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				// minlength:"用户名至少为3个字符",
				// maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			element.val('');
       		element.attr("placeholder",error.html());
		},
	});
	$('#bindphoneForm').validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,
		rules:{
			captche:{
				required:true,
				digits:true,
				maxlength:4,
			},
			phoneNumber:{
				required:true,
				phone_number:true,//自定义的规则
				digits:true,//整数
			},
			Verification_code:{
				required:true,
				digits:true,//整数
				maxlength:6,
			}
		},
		messages:{
			captche:{
				required:"请输入正确的验证码",
			},
			phoneNumber:{
				required:"请输入手机号码",
				digits:"请输入正确的手机号码",
			},
			Verification_code:{
				required:"请输入短信验证码",
			}
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			element.val('');
       		element.attr("placeholder",error.html());
		},
	});
	$('#changephoneForm').validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,
        rules:{
        	captche:{
        		required:true,
        		digits:true,
        		maxlength:4,
        	},
        	phone:{
        		required:true,
        		phone_number:true,
        		digits:true,
        	},
        	Verification_code:{
        		required:true,
        		digits:true,
        		maxlength:6,
        	}
        },
        messages:{
        	captche:{
        		required:"请输入正确的验证码",
        	},
        	phone:{
        		required:"请输入手机号码"
        	},
        	Verification_code:{
        		required:"请输入短信验证码"
        	}
        }
	})
	$('#changepasswordForm').validate({
		onkeyup:false,
        onblur:true,
        onfocus:false,
        onkeydown:false,

		rules:{
			captcha:{
				required:true,
				digits:true,
				maxlength:4,
			},
			smsCaptcha:{
				required:true,
				digits:true,//整数
				maxlength:6,
			},
			password:{
				required:true,
				minlength:6,
				maxlength:20,
			},
			password_confirmation:{
				minlength:6,
				maxlength:20,
				equalTo: "#password"
			},
		},
		messages:{
			captcha:{
				required:"请输入正确的验证码",
			},
			smsCaptcha:{
				required:"请输入收到的短信验证码",
				maxlength:"请输入6位短信验证码",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为6个字符",
				maxlength:"密码至多为20个字符",
			},
			password_confirmation:{
				minlength:"密码至少为6个字符",
				maxlength:"密码至多为20个字符",
				equalTo:'两次密码输入不一致'
			},
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			element.val('');
       		element.attr("placeholder",error.html());
		},
	});
	//添加自定义验证规则
	jQuery.validator.addMethod("phone_number", function(value, element) {
		console.log(value);
		var length = value.length; 
		var phone_number = /^(1[0-9]{1}[0-9]{1}\d{8})$/ 
		return this.optional(element) || (length == 11 && phone_number.test(value)); 
	}, "手机号码格式错误"); 
});
