(function(){
	var _id = GetRequest().id;
	function tradeplan(callback){
		$.ajax({
			url:URL+'/trade/planjson/'+_id,
			type:'get',
			dataType:'json',
			success:function(data){
				callback(data);
			}
		});
	}
	tradeplan(function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		}
		removePageLoad();
		if(data.code==0){
			var _data = data.data;
			var _html = '';
			var percent = (_data.progress/_data.money*100,2);
			_html+='<div style="margin-bottom:6%;" class="clearfix">'+
					'<div style="width:94%;float:right;">'+
						'<div style="font-size: 12px;">'+_data.project_created_at+'</div>	'+			
						'<div style="float:left; border: solid 1px #cccccc; border-radius:10px; height:90px; width: 94%;">'+
							'<div style="padding:5px 0 0 10px;">'+
								'<div style="font-size:18px;">项目发起</div>'+
								'<span style="font-size: 12px;">此项目由'+_data.org_title+'在'+_data.created_at+'日发起，项目的目标额为：'+_data.money+'元。</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div style="float:right; width:5%; margin:50px -1px 0 0;">'+
						'<img src="/public/market/images/plan_text_left.png" width="100%">'+
					'</div>	'+
					'</div>'+
					'<div style="margin-bottom:6%;" class="clearfix">'+
					'<div style="width:94%;float:right;">'+
						'<div style="font-size: 12px;">'+_data.created_at+'</div>	'+			
						'<div style="float:left; border: solid 1px #cccccc; border-radius:10px; height:90px; width: 94%;">'+
						 '<div style="padding:5px 0 0 10px;">'+
								'<div style="font-size:18px;">我的捐款</div>'+
								'<span style="font-size: 12px;">您的捐款数目为'+_data.trade_money+'。</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div style="float:right; width:5%; margin:50px -1px 0 0;">'+
						'<img src="/public/market/images/plan_text_left.png" width="100%">'+
					'</div>'+
					'</div>'+
					'<div style="margin-bottom:6%;" class="clearfix">'+
					'<div style="width:94%;float:right;">'+
						'<div style="font-size: 12px;">'+_data.project_created_at+'</div>'+				
						'<div style="float:left; border: solid 1px #cccccc; border-radius:10px; height:90px; width: 94%;">'+
							'<div style="padding:5px 0 0 10px;">'+
								'<div style="font-size:18px;">捐款中，项目进度'+percent+'</div>'+
								'<span style="font-size: 12px;">此项目正在筹集善款，目标额度为人民币'+_data.money+'元，现已凑集善款'+_data.progress+'元，项目进度为'+percent+'。</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div style="float:right; width:5%; margin:50px -1px 0 0;">'+
						'<img src="/public/market/images/plan_text_left.png" width="100%">'+
					'</div>'+
					'</div>';	
					$('[data-type="tradeplan"]').html(_html);
		}
	})
})();