(function(){
	var _page = $('.page');
	var _btn  = $('#bt');
	var _inp = $('#name');
	nickname(_inp,function($ele,res){
		if(res.code=='401'){
			Tologin();
			return false;
		};
		if(res.code==0){
			$ele.attr("placeholder",res.data);
		}else{
			$ele.attr("placeholder","");
		}
	});
	_btn.prop('disabled',true);
	_inp.keyup(function(){
		if($(this).val()==""){
			_btn.prop('disabled',true);
			_btn.css('backgroundColor',"#dadada");
		}else{
			_btn.prop('disabled',false);
			_btn.css('backgroundColor',"#fc5a28");
		};
	});
	_btn.click(function(){
		var val = $.trim(_inp.val());
		if(!/^[0-9a-zA-Z\u4e00-\u9fa5]{3,25}$/.test(val)){
			$.toast('昵称格式必须是3-25位数字、字母或汉字');
			_inp.val("");
			return false;
		}
		$.ajax({
			url:URL+"/operate/setupnickname",
			type:'post',
			dataType:'json',
			data:{name:val},
			success:function(res){
				$.toast(res.msg);
				if(res.code=='401'){
					Tologin();
					return false;
				};
				if(res.code==0){
					$.router.back();
				}else{
					return false;
				}
			},
	    })
	});
})();
