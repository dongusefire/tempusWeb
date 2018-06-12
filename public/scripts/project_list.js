(function(){
	var showId = GetRequest().id;
	function time(_date){ //判断活动是否已结束，结束返回false
		var start_time = new Date();
		var end_time = new Date(_date);   //结束时间
		var t = end_time.getTime()-start_time.getTime();  //求出时间戳
		if(t<=0){
			return false;
		}else{
			return true;
		}
	}
	init();
	function init(){
		$.ajax({
	        url:URL+'/project/showjson/'+showId,
	        xhrFields:{withCredentials:true},
			crossDomain:true,
	        type:'get',
	        dataType:'json',
	        success:function(res){
	          if(res.code=='401'){
			      Tologin();
			      return false;
			  };
			  var _data = res.data;
			  removePageLoad();
			  if(res.code==0){
			  	$('.project_cover').attr('src','/'+_data.project.cover);
			  	var _money = _data.project.money? _data.project.money:0,
			  	_progress = _data.project.progress? _data.project.progress:0,
			  	_number = _data.project.number? _data.project.number:0;
			  	var Completion = '<div style="width:100%;" class="clearfix">'+
                      '<div style="float:right;margin-left:10px;letter-spacing:0px;line-height:20px;">'+parseFloat(_data.project.proportion).toFixed(2)+'%</div>'+
                          '<div style="overflow:hidden;margin-top:7px;">'+
                              '<div style="width:100%;height:5px;border-radius:5px;background-color:#cccccc;">'+
                                  '<div style="width:'+parseInt(_data.project.proportion)+'%;height:5px;background-color:#ec7c02;border-radius:5px;"></div>'+
                              '</div>'+
                          '</div>'+
                      '</div>'+
                  '<div style="width:100%;padding:0px 0px 5px 0px;" class="clearfix">'+
                      '<div style="float:left;">目标额度</div>'+
                      '<div style="float:left;margin-left:15px;letter-spacing: 0px;color:#ec7c02">'+_money+'</div>'+
                      '<div style="float:left;margin-left:1px;">元</div>'+
                      '<div style="float:right;">'+
                          '<div style="float:left;">已捐</div>'+
                          '<div style="float:left;margin-left:15px;letter-spacing: 0px;color:#ec7c02">'+_progress+'</div>'+
                          '<div style="float:left;margin-left:1px;">元</div>'+
                      '</div>'+
                  '</div>'+
                  '<div style="width:100%;">'+
                      '<div style="float:left;">捐款人数</div>'+
                      '<div style="float:left;margin-left:15px;letter-spacing: 0px;color:#ec7c02">'+_number+'</div>'+
                      '<div style="float:left;margin-left:1px;">人</div>'+
                  '</div>';
			  	$('.Completion').html(Completion);
			  	$('#text').html(_data.project.text? _data.project.text:'未知');
			  	$('.donation_date').html(formatDate(_data.project.start_at,'1')+'----'+formatDate(_data.project.end_at,'1'));
			  	$('.orgName').html(_data.project.orgName? _data.project.orgName:'交换平台');
			  	var _btn = '';
			  	if(_data.project.status==2 || !time(formatDate(_data.project.end_at,'2'))){
			  		_btn = '<span class="button button-red" style="height:40px;width:90%;border-radius:5px;margin-top:10px;background-color:#cccccc;"><span style="display:inline-block;vertical-align:middle;padding:0px 10px 4px 0px;"><img style="width:24px;height:20px;float:left;" src="/public/market/images/juanzeng_button_icon.png" /></span><span style="">已结束</span></span>';
			  	};
			  	if(_data.project.status==1 ){
			  		_btn = '<span class="button button-red btn-jz" style="height:40px;width:90%;border-radius:5px;margin-top:10px;"><span style="display:inline-block;vertical-align:middle;padding:0px 10px 4px 0px;"><img style="width:24px;height:20px;float:left;" src="/public/market/images/juanzeng_button_icon.png" /></span><span style="">我要捐赠</span></span>';
			  	};
			  	if(_data.project.status==0 ){
			  		_btn = '<span class="button button-red" style="height:40px;width:90%;border-radius:5px;margin-top:10px;background-color:#cccccc;"><span style="display:inline-block;vertical-align:middle;padding:0px 10px 4px 0px;"><img style="width:24px;height:20px;float:left;" src="/public/market/images/juanzeng_button_icon.png" /></span><span style="">审核中</span></span>';
			  	};
			  	$('#bottomnav').html(_btn);
			  	$('.copy_url').html(location.href);
			  	var _list = '';
			  	var defaultId = 0;
			  	$.each(_data.list,function($key,val){
			  		var _img = '';
			  		if($key==0){
			  			defaultId = val.accessKey;
			  		};
			  		_list+='<div style="width:100%;height:35px;text-align:left;margin-top:10px;margin-left:25px;margin-bottom:10px;" class="orgSelected" data-accessKey="'+val.accessKey+'">'+
				        '<div style="float:left;">'+
				            '<img class="seller_icon" id="orglisticon-'+val.accessKey+'" src="'+val.icon+'" width="35" height="35" style="border-radius:8px;border:solid 1px #cccccc;" />'+
				        '</div>'+
				        '<div style="float:left;margin-left:10px;line-height:15px;">'+
				            '<div style="float:none;">'+
				                '<span style="float:none;width:100%;font-size:13px;" id="scoreOrgName-'+val.accessKey+'">'+val.name+'</span>'+
				            '</div>'+
				            '<div style="float:none;height:20px;top:3px;width:100%;font-size:11px;color:#cccccc;">'+
				                '可用积分<span id="score-'+val.accessKey+'">'+val.amount+'</span>'+
				            '</div>'+
				        '</div>'+
					    '<div id="org-sed-g-'+val.accessKey+'" data="'+val.id+'" style="float:right;margin-right:50px;top:8px;">'+
					       _img+
					    '</div>'+
					'</div>'+
					'<div style="border-top:1px solid #e3e3e3;width:95%;margin:0 auto;"></div>';
			  	});
			  	$('.integral_list').html(_list);
			  	orgSelected(defaultId,1);
			  	_Event();
			  }else{
			  	$.toast(_data.msg);
			  }
	        }
	    });
	};
    var _page = $('.page');
    var adv = document.getElementById("bottomnav");
    adv.scrollTop = adv.scrollHeight;

    var scoreSel = document.getElementById("scoreSelect");
    scoreSel.scrollTop = scoreSel.scrollHeight;

    var orgId = 0;
    function showBGdiv() {
        var div = document.getElementById("bg");
        div.style.height = document.body.scrollHeight+"px";
        div.style.width = "100%";
        div.style.display="block";
        $('#juanzeng').css({'bottom':'0px'},300);
    }
    $('[action-type="hideShareWx"]').click(function(){
        var div = document.getElementById("bg");
        div.style.display="none";
        $("#shareWx").css('bottom','-1000px');
    })
    $('[action-type="showShare"]').click(function(){
        var div = document.getElementById("bg");
        div.style.height = document.body.scrollHeight+"px";
        div.style.width = "100%";
        div.style.display="block";
        $('#shareWx').css({'bottom':'0px'});
    });
    function hideBGdiv(){
        var div = document.getElementById("bg");
        div.style.display="none";
        $('#juanzeng').css('bottom','-150px');
        $("#scoreSelect").css('bottom','-250px');
        $("#shareWx").css('bottom','-1000px');
    }


    function borderColor(obj,color)
    {
      obj.css('borderColor',color);
    }

    function showScoreSelect()
    {
      $("#scoreSelect").css('display',"block");
      $("#scoreSelect").css({'bottom':'0px'});
      $("#juanzeng").css('bottom',parseInt($('#scoreSelect').css('height'))+10+"px");
    }

    function hideScoreSelect()
    {
      $("#scoreSelect").css('bottom','-250px');
      $("#juanzeng").css('bottom','0px');
    }

    function orgSelected(id,mode)
    {
     /* $("span[id^=org-sed-g-]").each(function(){
        $(this).html('');
      });*/
      $("#org-sed-g-"+orgId).html('');
      $("#org-sed-g-"+id).html('<img src="/public/market/images/juanzeng_button_g.png" width="20px" height="15px" border="0"/>');
      $("#cursedorgicon").attr('src',$("#orglisticon-"+id).attr('src'));
      if(!mode)
      {
        $("#scoreSelect").css('bottom','-250px');
        $("#juanzeng").css('bottom','0px');
      }
      $("#scoreOrg").html($("#scoreOrgName-"+id).html());
      orgId = id;
    }
    function sleep(numberMillis) {
	    var now = new Date();
	    var exitTime = now.getTime() + numberMillis;
	    while (true) {
	    now = new Date();
	    if (now.getTime() > exitTime)
	    	return;
	    }
    }
    function isPInt(str) {
        var g = /^[1-9]*[1-9][0-9]*$/;
        return g.test(str);
    }
    function submit()
    {
        var sendScore = parseFloat($("#inputScore").val());
        //alert('score:'+score+",orgID:"+orgId);
        var curScore = parseFloat($("#score-"+orgId).html());
        if(isNaN(sendScore) || 0.1 > sendScore) {
            $.toast('捐赠积分数量不能低于0.1');
            return false;
        }
        if(!isPInt(sendScore)) {
            $.toast('捐赠积分数量必须为正整数');
            return false;
        }
        if(sendScore > curScore) {
            $.toast('您的积分不足!');
            return false;
        }
        $('#bg').css('display','none');
        $('#status').css('display','block');
        $('#status').find('em').text('正在提交，请稍候')
        $('#preloader').css({'background-color':'rgba(255, 255, 255, 0.80);','display':'block'})
        $('#juanzeng').css('bottom','-150px');
        $("#scoreSelect").css('bottom','-250px');
        $("input[name=amount]").val(sendScore);
        $("input[name=business_id]").val($("#org-sed-g-"+orgId).attr('data'));
        $("input[name=accesskey]").val(orgId);
        //$('#form1').submit();
	    $.ajax({
	        type:'post',
	        url:URL+'/project/donate',
	        xhrFields:{withCredentials:true},
			crossDomain:true,
	        data:{"project_id":showId,"accesskey":orgId,"business_id":$("input[name=business_id]").val(),'amount':sendScore},
	        dataType:'json',
	        success:function(data){
	          if(data.code=='401'){
			      Tologin();
			      return false;
			  };
	          if(200 == data['code']){
	            //location.href = data.link;
	            $.toast(data.msg);
	          }else{
	            $.toast(data.msg);
	          }
	        }
	    });
    }
    function _Event(){
    	$('.btn-jz').click(function(){
	      showBGdiv();
	    });
	    $('.ScoreSelect').click(function(){
	      showScoreSelect();
	    });
	    $('.hideScoreSelect').click(function(){
	      hideScoreSelect();
	    });
	    $('#bg').click(function(){
	      hideBGdiv();
	    })
	    $('#submit').click(function(){
	    	submit();
	    });
	    $('#inputScore').focus(function(){
	    	borderColor($(this),'rgb(255,0,0)');
	    });
	    $('#inputScore').blur(function(){
	    	borderColor($(this),'rgb(204,204,204)');
	    });
	    $('.orgSelected').click(function(){
	    	var _key = $(this).attr('data-accessKey'); 
	    	orgSelected(_key);
	    })
    };
    if(GetRequest().status ==1){
       modal({
		   status:'4',
		   title:'支付成功',
		   text:'支付成功',
		   callback:function(){
			   var _id = GetRequest().id;
			   var _href = location.origin+location.pathname+'?id='+_id;
		       history.pushState({},0,_href);
		   }
	   });
    }else if(GetRequest().status ==2){
	   modal({
		   status:'5',
		   title:'支付失败',
		   text:'支付失败',
		   callback:function(){
			   var _id = GetRequest().id;
			   var _href = location.origin+location.pathname+'?id='+_id;
		       history.pushState({},0,_href);
		   }
	   });
    };
})();
 