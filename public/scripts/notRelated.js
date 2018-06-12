(function(){
	var _page = $('.page');
	notrelated(function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		if(data.code==0){
			var _data = data.data;
			var _html='';
			$.each(_data, function(key,val) {
				var _pl="";
				console.log(val.auto_relation);
				if(val.auto_relation == 0 || val.auto_relation == 1) {
					_pl+='class="gray"';
				}
			   _html += '<li '+_pl+' data-id="'+val.id+'" data-name="'+val.name+'">'+
		                    '<i class="aim-logo"><img src="'+val.icon+'"></i>'+
	                        '<div class="clearfix">'+
	                            '<span class="aim-name">'+val.name+'</span>'+
	                            '<span class="btn-gl">关联</span>'+
	                        '</div>'+
	                        '<div class="border_quarter"></div>'
             			'</li>';
			});
			if(_data.length<=2){
				$('.showmoreB').hide();
			}else{
				$('.showmoreA').show().attr('href','/templates/not_related.html');
			};
			$('[data-type="notrelated"]').html(_html);
		};

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
		 				location.href = '/templates/connect.html';
		 			},1500);
		 		} else {
		 			$.toast(res.msg);
		 		};
		 	}
		});
	});
})();
