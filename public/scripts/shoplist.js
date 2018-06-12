(function(){
    var card_id = GetRequest().id;
	function getLocalTime(nS) {     
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
	}
	$(window).scroll(function () {
    //$(window).scrollTop()这个方法是当前滚动条滚动的距离
    //$(window).height()获取当前窗体的高度
    //$(document).height()获取当前文档的高度
    var bot = 50; //bot是底部距离的高度
    var html = '';
    console.log(bot + $(window).scrollTop());
    console.log($(document).height() - $(window).height());
	/*var	province_name = '';
	var	city_name = '';*/
    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height()) && $('[node-type="store_list"]').attr('is_load')==0 ) {
        $('[node-type="store_list"]').attr('is_load','1');
        //当底部基本距离+滚动的高度〉=文档的高度-窗体的高度时；
        //我们需要去异步加载数据了
        var $page = parseInt($('[node-type="store_list"]').attr('page'))+1;
        if( $page > $('[node-type="store_list"]').attr('totalPage')) {
            return false;
        }
        $.getJSON(URL+"/shoplist/josnshop/"+card_id, { page: $page }, function (json) {

            for( var i in json.data.data ) {
            	var href ="#";
				var province_name = '';
				var city_name = '';
				$.ajax({
					type:"get",
					url:URL+"/card/province",
					async: false,
					data:{province_id: json.data.data[i].province},
					datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
					success: function(province){
						province_name = province.region_name;
						console.log(province_name);
					}
				});
				$.ajax({
					type:"get",
					url:URL+"/card/city",
					async: false,
					data:{city_id: json.data.data[i].city},
					datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
					success: function(city){
						city_name = city.region_name;
						console.log(city_name);
					}
				});
            	html += '<div style=" white-space:nowrap;">';
            	html += '<div style="margin-left: 3%;margin-right:3%;height: 60px;border-bottom: 1px solid #dcdcdc;">';
            	html += '<div style="float: left; width: 85%; padding-top: 10px;">';

            	html += '<a href="/shoplist/shopdetail/'+json.data.data[i].id+'">';
            	html += '<p style="font-size: 14px; width: 95%; overflow:hidden; text-overflow:ellipsis; color:#000">'+json.data.data[i].name+'<span style="font-size: 12px; color:#575757;"> ( 电话:'+json.data.data[i].contact_telphone+' )</span></p>';
            	html += '<p style="color:#7A7A7A; width: 97%; overflow:hidden; text-overflow:ellipsis; margin-top:5px">地址：'+ province_name+city_name +json.data.data[i].contact_address+'</p>';
            	html += '</a>';
            	html += '</div>';

            	html += '<div style="float: right;width: 15%; height: 60px;">';
            	html += '<div style="height: 35px;margin-top: 15px;border-left: 1px solid #dcdcdc;">';
            	html += '<a href="tel:'+json.data.data[i].contact_telphone+'" style="height: 40px;"><img src="/hnair/images/Phone.png" style="width: 21px; height: 21px; top:7px;margin:0 auto;"></a>';
            	html += '</div>';
            	html += '</div>';
            	html += '</div>';
            	html += '</div>';
            }
            var totalPage = Math.ceil(json.data.total/json.data.per_page);
            $('[node-type="store_list"]').attr('totalPage',totalPage);
            $('[node-type="store_list"]').attr('page',$page);
            if( $page == totalPage || json.data.total == 0) {
                html += '<div style="background-color:#fff;"><div style="text-align: center; margin-top: 20px;    font-size: 15px;padding-bottom:15px">没有更多了</div></div>';
            }
            $('[node-type="store_list"]').attr('is_load','0');
            $('[node-type="store_list"]').append(html);
        });
    	};
	});
})();