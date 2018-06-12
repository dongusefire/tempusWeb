(function(){
	var _page = $('.page');
	function getIntegral($pid){
		integral(function(data){
			if(data.code==0){
				var val = data.data.value;
				$('[data-type="asset"]').html(val);
				$('#zf').removeClass().html('');
				if(parseInt(data.data.extent)>0) {
					$('#zf').addClass('arrow_s_up');
					$('[data-type="increase"]').html(parseFloat(data.data.extent)+'%');
			 	}else if(parseInt(data.data.extent)<<0){
			 		$('#zf').addClass('arrow_s_down');
			 		$('[data-type="increase"]').html(parseFloat(data.data.extent)+'%');
			 	}else{
			 		$('[data-type="increase"]').html('-');
			 	}
				$('.radio-unit').html(data.data.unit);
				$('.radio-unit').attr('radio-unit',data.data.pid);
			};
	 	},$pid);
	}
	getIntegral(0);
	nickname($('.user_title'),function(ele,res){
	 	if(res.code==0){
	 		ele.html(res.data);
	 	};
	 });
	function getvaluelist($pid) {
		getIntegralvaluelist(function(data){
			if(data.code==0){
				 var _data = data.data;
				 var _html='';
				 $.each(_data, function(key,val) {
				 	var _value = parseInt(val.value)==0? '-':val.value;
				 	var _class = '';
				 	if(parseInt(val.value)>0) {
				 		_class = 'arrow_s_up';
				 	}else if(parseInt(val.value)<0){
				 		_class = 'arrow_s_down';
				 	}else{
				 		_class = 'zero';
				 	}
					_html += '<a href="/templates/exchange_details.html?id='+val.id+'" class="list">'+
							'<div class="left">'+
								'<div class="icon">'+
									'<img src="'+val.product_picture+'">'+
								'</div>'+
								'<span>'+val.name+'</span>'+
							'</div>'+
							'<div class="right">'+
								'<span class="d_left" style=";width:3rem;">'+
								'<span style="position:relative; height:3rem; display:inline-block;">'
								+_value+
								'<span class="'+_class+'"></span>'+
								'</span>'+
								'</span>'+
								'<span class="d_right">'+val.unit+'</span>'+
							'</div>'+
						'</a>';
				 });
				 $('[data-type="getIntegralvaluelist"]').html(_html);
				 $('.all_list .zff').html('-');
			};
	 	},$pid);
	};
	getvaluelist(0);
	_page.on('click','.radio-unit,.radio-unit-nochange',function(){
		var _unit = new radio_unit({
			id:$('.radio-unit').attr('radio-unit'),
			callback:function(){
				if(this.value!=''){
					$('.radio-unit').attr('radio-unit',this.value).html(this.text);
					$.closeModal('.gj-modal');
					getIntegral(this.value);
					getvaluelist(this.value);
				}else{
					$.toast('请选择一个单位');
				};
			}
		});
	});
})();