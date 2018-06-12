(function(){
	var _id = GetRequest().id;
	function tradeshow(callback){
		$.ajax({
			url:URL+'/trade/showjson/'+_id,
			type:'get',
			dataType:'json',
			success:function(data){
				callback(data);
			}
		})
	}
	tradeshow(function(data){
		if(data.code=='401'){
			Tologin();
			return false;
		};
		removePageLoad();
		if(data.code==0){
			var _data = data.data;
			var _html = '';
			_html+='<div style="margin-bottom:40px;">'+
            '<div style="float:left; width:100%;background-color: #fff;padding: 20px 0 10px;">'+
				'<a style="color: black;display: block;"  href="/templates/project_list.html?id='+_data.project_id+'">'+
					'<img src="'+_data.cover+'" style="border-radius:50%;width:60%; margin-left: 20%;" alt="img">'+
				'</a>'+
			'</div>'+
			'<div class="exchange" style="border-top: 0;">	'+			
				'<div style="float:left; width:100%; margin-left:7px;text-align: center;">'+
					'<p style="font-weight:600; letter-spacing: 2px;"><a style="color: black;" href="/templates/project_list.html?id='+_data.project_id+'">'+_data.title+'</a></p>'+
				'</div>'+
			'</div>'+
			'<div class="exchange_fen"></div>'+
			'<div class="exchange_bottom">'+
					'<p>订单编号：<a style="color:#000;">'+_data.id+'</a></p>'+
					'<p>创建时间：<a style="color:#000;">'+_data.created_at+'</a></p>'+
			'</div>	'+
		    '<div class="exchange_fen"></div>'+
			'<div class="exchange_bottom">'+
					'<p>交易类型：<a style="color:#000;">积分捐赠</a></p>'+
					'<p>支付积分：<a style="color:#f78f4a;">'+_data.amount+'积分</a></p>'+
					'<p>支付方式：<a style="color:#ce3f3f;">'+_data.access+'</a></p>'+
			'</div>	'+
			'</div>'+
			'<div class="decoration"></div>'+
			'<div style="position:fixed; bottom:0;width:100%; background-color:#fff;  border-top:solid 1px #ccc;">'+
				'<a href="/templates/trade_plan.html?id='+_data.id+'">'+
					'<div style="margin:10px auto;">'+
						'<img src="/public/market/images/track_progress.png" style="margin-left: 5%;width: 90%;">'+
					'</div>'+
				'</a>'+
			'</div>';
			$('[data-type="tradeshow"]').html(_html);
		}
	});
})();