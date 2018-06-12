(function(){
	var _page = $('.page');
	var curClassId = 0;
	var loadNum = 0;
	var myFunc = null;
	var datas = new Array(
		new Array(
		["/hnair/images/jiadian_6.png","/hnair/images/shangpin_fulihui_logo_01.png","小米（MI）定制版Ninebot九号平衡车9号 黑色","2599","海航","42142","剩3天",0],
		["/hnair/images/jiadian_5.png","/hnair/images/shangpin_fulihui_logo_01.png","金河田（Golden field）超越荣耀版 白色 中塔机箱","399","海航","1124","新上线",0],
		["/hnair/images/shangpin_img_02.png","/hnair/images/shangpin_fulihui_logo_01.png","卡姿兰（Carslan）丝缎美形唇膏02#浅玫红2.8g","550","海航","17529","剩3天",0],
		["/hnair/images/shangpin_img_03.png","/hnair/images/shangpin_kaola_logo_01.png","迪奥（Dior）真我香水(EDP)100ml","620","海航","17529","剩6时",0],
		["/hnair/images/shangpin_img_04.png","/hnair/images/shangpin_jingdong_logo_01.png","佰魅伊人气垫BB霜","150","海航","17529","新上线",0],
		["/hnair/images/shangpin_img_05.png","/hnair/images/shangpin_kaola_logo_01.png","Chanel香奈儿5号女士香水 NO5五号 -正装50ml","770","海航","17529","剩3时",0]),
		new Array(
			
		["/hnair/images/jiadian_1.png","/hnair/images/shangpin_fulihui_logo_01.png","无尘袋家用静音吸尘器D-9","233","海航","34529","剩2天",1],
		["/hnair/images/jiadian_2.png","/hnair/images/shangpin_fulihui_logo_01.png","格兰仕（Galanz）微波炉 光波烘烤","651","海航","566121","剩5天",0],
		["/hnair/images/jiadian_3.png","/hnair/images/shangpin_jingdong_logo_01.png","飞利浦（Philips）HU4801/00空气加湿器","99","海航","6412","剩6天",0],
		["/hnair/images/jiadian_4.png","/hnair/images/shangpin_fulihui_logo_01.png","飞利浦（PHILIPS）AC4072空气净化器除甲醛","2310","海航","25512","剩3时",1],
		["/hnair/images/jiadian_5.png","/hnair/images/shangpin_fulihui_logo_01.png","金河田（Golden field）超越荣耀版 白色 中塔机箱","399","海航","1124","新上线",0],
		["/hnair/images/jiadian_6.png","/hnair/images/shangpin_fulihui_logo_01.png","小米（MI）定制版Ninebot九号平衡车9号 黑色","2599","海航","42142","剩3天",0]
		),
		new Array(
		["/hnair/images/shangpin_img_02.png","/hnair/images/shangpin_fulihui_logo_01.png","卡姿兰（Carslan）丝缎美形唇膏02#浅玫红2.8g","550","海航","17529","剩3天",0],
		["/hnair/images/shangpin_img_03.png","/hnair/images/shangpin_kaola_logo_01.png","迪奥（Dior）真我香水(EDP)100ml","620","海航","17529","剩6时",0],
		["/hnair/images/shangpin_img_04.png","/hnair/images/shangpin_jingdong_logo_01.png","佰魅伊人气垫BB霜","150","海航","17529","新上线",0],
		["/hnair/images/shangpin_img_05.png","/hnair/images/shangpin_kaola_logo_01.png","Chanel香奈儿5号女士香水 NO5五号 -正装50ml","770","海航","17529","剩3时",1]
		),
		new Array(
		),
		new Array(
		["/hnair/images/huwai_1.png","/hnair/images/shangpin_fulihui_logo_01.png","登山杖碳素伸缩 户外手杖拐棍老年人拐杖","130","海航","17529","剩3天",0],
		["/hnair/images/huwai_2.png","/hnair/images/shangpin_kaola_logo_01.png","旅行双肩包男女背包休闲电脑包骑行背囊","190","海航","17529","剩6时",1],
		["/hnair/images/huwai_3.png","/hnair/images/shangpin_jingdong_logo_01.png","户外全自动帐篷 双人 3-4人","520","海航","17529","新上线",0],
		["/hnair/images/huwai_4.png","/hnair/images/shangpin_kaola_logo_01.png","双肩男女多功能休闲旅游旅行背包骑行背包","120","海航","17529","剩6时",0]
		)
	);
	_page.find('.content').on('scroll',myFunc=function(){
		var _this = _page.find('.content');
		if ((_this.scrollTop()) >= ($('.contentDiv').height() - _this.height())) {
			scroll_load_data();
		}
	});

	function scroll_load_data()
	{
		if(2 >= loadNum && 6 <= datas[id].length)
		{
			loadNum++;
			/*展现正在加载效果*/
			$("#loadingDiv").html("正在加载...");
			setTimeout(function(){load_data();},1000); 
		}else{
			$("#loadingDiv").html("无更多内容");
		}
	};
	function load_data(){
		id = curClassId;
		if(id >= datas.length)
		{
			return;
		}
		if(6 >= datas[id])
		{
			return;
		}
		for(i=0;i<datas[id].length;i++)
		{
			remai_div = "<div class=\"remai_icon\" style=\"position:absolute;z-index:3;left:100%;\"><img src=\"/hnair/images/shangpin_remai_01.png\" style=\"width:100%;height:100%;\"></div>";
			if(0 == datas[id][i][7])
			{
				remai_div = "";
			}
			div="<div style=\"float:left;width:50%;padding:5px 5px;\">" +
					remai_div +
					"<div style=\"width:100%;background-color:#fff;border-radius:8px;\">" +
						"<div style=\"width:100%;\">" +
							"<img class=\"commodityItem\" src=\""+datas[id][i][0]+"\" style=\"display: inline-block;width:100%;\">" +
						"</div>" +
						"<div style=\"width:100%;line-height:20px;height:50px;padding:0px 10px;font-size: 12px;color: #666;\">" +
							"<div style=\"display:inline;\"><img src=\""+datas[id][i][1]+"\" style=\"width:20px;height:20px;\"></div>" +
								"&nbsp;"+datas[id][i][2]+
						"</div>" +
						"<div style=\"width:90%;border-bottom:solid 1px #f1f1f1;height:1px;margin:0px auto;\"></div>"+
						"<div style=\"width:100%;height:25px;line-height:30px;top:5px;color:#ce3f40; padding:0px 10px;font-size:14px;\">" +
							"<span >"+datas[id][i][3]+"</span>"+datas[id][i][4]+"积分" +
						"</div>" +
						"<div style=\"width:100%;line-height:25px;font-size:10px;color:#1e1e1e;padding:0px 10px;\" class=\"clearfix\">" +
							"<div style=\"float:left;\">已售"+datas[id][i][5]+"件</div>" +
							"<div style=\"float:right;\">"+datas[id][i][6]+"</div>" +
						"</div>" +
					"</div>" + 
				"</div>";
			$("#contentDiv").append(div); 
		}
		
		height = 0;
		remai_width = 0;
		$(".commodityItem").each(function(){
			if(0 == height)
			{
				remai_width = parseInt($(this).width()*0.3);
				height = $(this).width();
			}
			$(this).height(height);
		});
		$(".remai_icon").css("margin-left",0-remai_width);
		$(".remai_icon").css("width",remai_width-5);
		$(".remai_icon").css("height",remai_width-5);
		/*下拉获取数据*/
		$("#loadingDiv").show();
		if(0 < datas[id].length && 6 > datas[id].length)
		{
			$("#loadingDiv").html("无更多内容");
		}
		else
		{
			$("#loadingDiv").html("下拉获取更多商品");
		}
	}

	function init_data(id)
	{
	  $("#contentDiv").html("");
	  if("undefined" == typeof(datas[id]) || 0 == datas[id].length)
	  {
		div = "<div style=\"margin-top:70%;\"><div style=\"width:100%;text-align:center;color:#ccc;\">此分类暂无商品</div></div>";
		$("#contentDiv").append(div);
		$("#loadingDiv").hide();
		return;
	  }
	  load_data();
	}
	function disablebk(e)
	{
	  var e = event || window.event || arguments.callee.caller.arguments[0];
	  e.preventDefault();
	}


	function hideClassDown()
	{
	  if("1" == $("#classDownImg img").attr("status"))
	  {
		showClassDown();
	  }
	}

	classTitleDiv_left = 0;
	function showClassDown(e){
	  var scrollTop=0;
	  if(document.documentElement&&document.documentElement.scrollTop){
		scrollTop=document.documentElement.scrollTop;
	  }else if(document.body){
		scrollTop=document.body.scrollTop;
	  };
	  if("0" == $("#classDownImg img").attr("status")){
		classTitleDiv_left = $("#classTitleDiv").parent().scrollLeft();
		$("#classTitleDiv").parent().scrollLeft(0);
		$("#classTitleDiv").parent().css("overflow-x","hidden");
		$("#classDownMask").height(window.screen.availHeight+scrollTop);
		$("#classDownMask").show();
		$("#classDown").show();
		$("#allClassDiv").show();
		$("#classDownImg img").attr('src','/hnair/images/shangpinfenlei_xiala_02.png');
		$("#classDownImg img").attr("status","1");
		
	  }else{
		$("#allClassDiv").hide();
		$("#classDownMask").hide();
		$("#classDown").hide();
		$("#classDownImg img").attr("status","0");
		$("#classDownImg img").attr('src','/hnair/images/shangpinfenlei_xiala_01.png');
	  }
	};
	var classTitle=new Array("精选","家用电器","时尚美妆","奢侈品","运动户外","腕表珠宝","贴心旅行","酒店住宿","电脑周边");

	function commodityClass_load()
	{
	  for(i=0;i<classTitle.length;i++)
	  {
		titleDiv = "<div class='swiper-slide'><a id='classTitle_"+i+"' data_id=\""+i+"\" class=\"classTitle\">"+classTitle[i]+"</a></div>";
		$("#classTitleDiv .swiper-wrapper").append(titleDiv);
		downDiv = "<li data-id="+i+">"+classTitle[i]+"</li>";
		$("#classDown ul").append(downDiv);
	  }
	};
	function sedClassTitle(ind)
	{
	  obj = $("#classTitle_"+ind);
	  hideClassDown();
	  classTitle_click("classTitle_"+ind);
	  obj.attr('selected',1);
	}

	function classTitle_click(id)
	{
	  $(".classTitle").each(function(){
		$(this).attr("selected",0);
		$(this).css("border-bottom","0px");
	  });
	  $("#"+id).attr("selected",1);
	  $("#"+id).css("border-bottom","solid 2px #ce3f40");
	  curClassId = $("#"+id).attr("data_id");
	  loadNum=0;
	  init_data($("#"+id).attr("data_id"));
	}



	commodityClass_load();
	sedClassTitle("0");
	$(".classTitle").on("click",function(){
	  classTitle_click($(this).attr('id'));
	});
	$('#classDownImg').click(function(){
		showClassDown();
	});
	$('#classDownMask').click(function(){
		showClassDown();
	});
	$('#classDown li').click(function(){
		var id = $(this).attr('data-id');
		sedClassTitle(id);
	});
	var mySwiper = new Swiper('#classTitleDiv',{
		slidesPerView: 'auto',
	});
})();