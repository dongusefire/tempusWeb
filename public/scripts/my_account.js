(function(){
	var getIntegrallist_=function(){
		getIntegrallist(function(data){
			if(data.code=='401'){
				Tologin();
				return false;
			};
			 if(data.code==0){
				 var _data = data.data;
				 var _html='';
				 var count = 0;
					if(GetRequest().unit != undefined){
						var unit_ = GetRequest().unit;
					};
				 $.each(_data, function(key,val) {
				 	var _search = 'target_product_id='+'0'+'&product_id='+val.id;
					_html +='<li class="clearfix" data-id="'+val.id+'" style="position:relative;">'+
							'<a class="clearfix" href="/templates/exchange.html?'+_search+'" data-no-cache="true">'+
							'<span class="b_logo">'+
								'<img src="'+val.product_picture+'">'+
							'</span>'+
							'<div>'+
								'<p style="font-size:0.74rem;">'+val.name+'</p>'+
								'<p class="balance"><span>'+val.unit+'</span>余额:&nbsp;<span>'+val.value+'</span></p>'+
							'</div>'+
							'<div class="estimate">估值&nbsp;<span>'+val.realVal+'</span>'+unit_+'</div>'+
							'</a>'+
							'</li>';
							count += val.realVal;
				 },$('.radio-unit').attr('radio-unit'));
				 $('[data-type="asset"]').html(count.toFixed(2));
				 $('[data-type="getIntegrallist"]').html(_html);
			 };
		},$('.radio-unit').attr('radio-unit'));
	}
	getIntegrallist_();
})()
