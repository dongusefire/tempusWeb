(function(){
	var _page = $('.page');
	function load(){
		$.ajax({
			url:'/cardtype',
			type:'GET',
			dataType:'json',
			success:function(json){
				for(var i in json.data ) {
					$("#hot_issue").append("<div onclick=\"setSearchText('"+json.data[i].id+"','"+json.data[i].name+"')\" style=\"float:left;background-color:#f2f8fb;margin-right:10px;margin-bottom:20px;padding:5px 15px;border-radius:4px;font-size:14px;\">"+json.data[i].name+"</div>");
				}
			}
		});
		var history = new Array();
		if(0 == history.length){
		  $("#history").css("padding-left","0px");
		  $("#history").css("text-align","center");
		  $("#history").css("color","#dddddd");
		  $("#history").html("暂无搜索结果");
		}
	};
	load();
	$('[action-type="search"]').click(function(){
		$("#history").html(" ");
		var search = $('#search').val();
		$.ajax({
			url:'/card/search/'+search,
			// url:"/card/json/"+search,
			type:'GET',
			dataType:'json',
			success:function(json){
				for(var i in json.data ) {
					 $('#history').append('<a href="/card/show/'+json.data[i].id+'" style="border-bottom: 1px solid #dcdcdc; position: relative;">'+
							'<div style="width: 100%; height: 84px;">'+
								'<div style="float: left;height: 84px;">'+
									'<img src="'+json.data[i].business_icon+'" style="height: 60px; width: 80px; margin:12px;">'+
								'</div>'+
							'<div>'+
								'<p style="margin-top: 10px;color:#1e1e1e;font-size: 15px; padding-top: 3px;text-align:left;">'+json.data[i].name+'</p>'+
								'<p style="color:#b3b3b3;font-size: 13px;width: 96%;margin-top: 15px;text-align:left;">'+
									'<span style="background-color: #3498db; padding:1px 4px; border-radius: 2px; color:#fff;">'+json.data[i].cardType+'</span>'+
								'</p>'+
							'</div>'+
							'</div>'+
							'<div style="position: absolute; right: -150px;bottom: 9px;">'+
								'<span style="color:#ff3838;font-size: 26px;">'+json.data[i].unit_price+'<span style="font-size: 14px;">积分</span></span>'+
							'</div>'+
						  '</a>')
				}
			}
		});
	})
	function setSearchText(id,text){
		$("#history").html(" ");
		$("#search").val();
			$.ajax({
			url:'/card/searchtype/'+id,
			type:'GET',
			dataType:'json',
			success:function(json){
				for(var i in json.data.data ) {
					$('#history').append('<a style="text-align:left;font-size:14px;color:#666666;margin-right:10px;margin-bottom:20px;padding:3px 13px;border-radius:4px;" href="/card/show/'+json.data.data[i].id+'">'+json.data.data[i].name+'</a>')
				}
			}
		});
	}
})();
