(function(){
    function typeList(demo){
        var html = '<li><a href="javascript:void(0)" action-type="action-type" action-data="0">全部分类</a></li>'+'<div class="border_quarter"><div></div></div>';
        if(demo.attr('node-data') == 0) {
            $.ajax({
                url:URL+'/cardtype',
                xhrFields:{withCredentials:true},
                crossDomain:true,
                type:'GET',
                dataType:'json',
                success:function(json){
                	if(json.code=='401'){
		                Tologin();
		            }
                    for(var i in json.data ) {
                        html += '<li><a href="javascript:void(0)" action-type="action-type" action-data="'+json.data[i].id+'">'+json.data[i].name+'</a></li>'+'<div class="border_quarter"><div></div></div>';
                    }
                    demo.attr('node-data',1)
                    demo.html(html);
                    $('[action-type="action-type"]').click(function(){
                        $('[node-type="cardList"]').html(' ');
                        $('[node-type="cardList"]').attr('type',$(this).attr('action-data')).attr('page',0).attr('totalPage',1);
                        $('.all_kinds').html($(this).html());
                        CardList();
                        $('html').scrollTop(0);
                        $('[node-type="type_list"]').removeClass('active').hide();
                        hideMask();
                    });
                    $('.show li').click(function(){
                      $(this).addClass('effect');
                      $(this).siblings().removeClass('effect');
                    });
                }
            });
        }
    }
    $('.show li').click(function(){
            $(this).addClass('effect');
            $(this).siblings().removeClass('effect');
    });
    function CardList() {
        var html = '';
        $('[node-type="cardList"]').attr('is_load','1');
        var $page = parseInt($('[node-type="cardList"]').attr('page'))+1;
        var $type = $('[node-type="cardList"]').attr('type');
        var $city = $('[node-type="cardList"]').attr('city');
        var $order = $('[node-type="cardList"]').attr('order');

        if( $page > $('[node-type="cardList"]').attr('totalPage')) {
            return false;
        }
        $.getJSON(URL+"/card/json", { page: $page,type:$type ,'city':$city,'order':$order}, function (json) {
            if(json.code=='401'){
                Tologin();
                return false;
            }
            if(json.code==0){
            for( var i in json.data.data ) {
                html +='<a href="/templates/cardshow.html?id='+json.data.data[i].id+'" style="border-bottom: 0px solid #cfcfcf; position: relative;">'+
                    '<div style="width: 100%; height: 84px;">'+
                        '<div style="float: left;height: 84px;">'+
                            '<img src="'+json.data.data[i].business_icon+'" style="height: 60px; width: 80px; margin:12px;">'+
                        '</div>'+
                    '<div>'+
                        '<p style="margin-top: 10px;color:#1e1e1e;font-size: 15px; padding-top: 3px;">'+json.data.data[i].name+'</p>'+
                        '<p style="color:#b3b3b3;font-size: 13px;width: 96%;margin-top: 15px;">'+
                            '<span style="background-color: #3498db; padding:1px 4px; border-radius: 2px; color:#fff;">'+json.data.data[i].cardType+'</span>'+
                        '</p>'+
                    '</div>'+
                    '</div>'+
                    '<div style="position: absolute; right: 12px;bottom: 9px;">'+
                        '<span style="color:#ff3838;font-size: 24px;">'+json.data.data[i].unit_price+'<span style="font-size: 12px;"> 元</span></span>'+
                    '</div>'+
                  '</a>'+'<div class="border_quarter"><div></div></div>'
                  ;
            }
            var totalPage = Math.ceil(json.data.total/json.data.per_page);
            $('[node-type="cardList"]').attr('totalPage',totalPage);
            $('[node-type="cardList"]').attr('page',$page);
            if( $page == totalPage || json.data.total == 0) {
                html += '<div style="background-color:#f3f3f3;"><div style="text-align: center;line-height:50px;font-size: 15px;">没有更多了</div></div>';
            }
            $('[node-type="cardList"]').attr('is_load','0');
            $('[node-type="cardList"]').append(html);
            }
        });
    }
    CardList();
    $(window).scroll(function () {
        var bot = 150;
        if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height()) && $('[node-type="cardList"]').attr('is_load')==0 ) {
            CardList();
        }
    });
    //第一个list
    $('.all_kinds').click(function(){
        $(this).parent().siblings().find('.show').hide();
        typeList($('[node-type="type_list"]'));
        // if($('[node-type="type_list"]').is(':hidden')) {
        //     showMask();
        //     $('[node-type="type_list"]').show();
        //     $('[node-type="type_list"]').animate({
        //         height:'40%',
        //     },'fast');
        // } else {
        //     $('[node-type="type_list"]').animate({
        //         height:'0',
        //     },'fast',function(){
        //         $(this).hide();
        //         hideMask();
        //     });
        // }
        if($('[node-type="type_list"]').hasClass('active')){
            $('[node-type="type_list"]').removeClass('active').hide();
            hideMask();
        }else{
            showMask();
            $('[node-type="type_list"]').addClass('active').show();
        }
        $('.show').css('overflow','scroll')
    });
    //第二个项目点击时执行的函数
    function regionList(demo) {
        var html = '<li><a href="javascript:void(0)" action-type="action-region" action-data="0">全国</a></li>'+'<div class="border_quarter"><div></div></div>';
        if(demo.attr('node-data') == 0) {
            $.ajax({
                url:URL+'/card/region/1',
                type:'GET',
                dataType:'json',
                success:function(json){
                    console.log("成功");
                    if(json.code=='401'){
                        Tologin();
                    }
                    if(json.code==0){
                        for(var i in json.data ) {
                        html += '<li><a href="javascript:void(0)" action-type="action-region" action-data="'+json.data[i].id+'">'+json.data[i].region_name+'</a></li>'+'<div class="border_quarter"><div></div></div>';
                    }
                    demo.attr('node-data',1);
                    demo.html(html);
                    $('[action-type="action-region"]').click(function(){
                        var cityHtml = '';
                        var regionShow = $(this).attr('action-data');
                        $.ajax({
                            url:URL+'/card/region/'+regionShow,
                            type:'GET',
                            dataType:'json',
                            success:function(json){
                            	if(json.code=='401'){
					                Tologin();
					            }
                                    cityHtml += '<li><a href="javascript:void(0)" action-type="action-regionshow" action-data="'+regionShow+'">全部</a></li>'+'<div class="border_quarter"><div></div></div>';
                                for(var i in json.data ) {
                                    cityHtml += '<li><a href="javascript:void(0)" action-type="action-regionshow" action-data="'+json.data[i].id+'">'+json.data[i].region_name+'</a></li>'+'<div class="border_quarter"><div></div></div>';
                                }
                                $('[node-type="regionshow_list"]').html(cityHtml).show();

                                $('[action-type="action-regionshow"]').click(function(){
                                    $('[node-type="cardList"]').html(' ');
                                    $('[node-type="cardList"]').attr('city',$(this).attr('action-data')).attr('page',0).attr('totalPage',1);
                                    $('[action-type="region"]').html($(this).html());
                                    CardList();
                                    $('html').scrollTop(0);
                                    // $('[node-type="regionList"]').animate({
                                    //     height:'0',
                                    // },'fast',function(){
                                    //     $(this).hide();
                                    //     hideMask();
                                    // });
                                    $('[node-type="regionList"]').removeClass('active').hide();
                                    hideMask();
                                });
                                // 1.10加
                                $('.erza li').click(function(){
                                  $(this).addClass('effect');
                                  $(this).siblings().removeClass('effect');
                                });
                            }
                        });
                    });
                    // demo.find('[action-type="action-region"]:first').click();
                    demo.find('[action-data="0"]').click();
                    //1.10加
                    $('.far li').click(function(){
                      $(this).addClass('effect');
                      $(this).siblings().removeClass('effect');
                    });
                    }
                }
            });
        }
    }
    $('[action-type="region"]').click(function(){
        var list = $('[node-type="regionList"]');
        $(this).parent().siblings().find('.show').hide();
        regionList($('[node-type="region_list"]'));
        // if(list.is(':hidden')) {
        //     showMask();
        //     list.show();
        //     list.animate({
        //         height:'40%',
        //     },'fast');
        // } else {
        //     list.animate({
        //         height:'0',
        //     },'fast',function(){
        //         $(this).hide();
        //         hideMask();
        //     });
        // }
        if(list.hasClass('active')){
            list.removeClass('active').hide();
            hideMask();
        }else{
            list.addClass('active').show();
            showMask();
        }
        $('[node-type="region_list"]').css('overflow','scroll');
    });
    //第三个项目点击
    $('.sort').click(function(){
        showMask();
        $(this).parent().siblings().find('.show').hide();
        var list = $(this).siblings('.show');
        // if(list.is(':hidden')) {
        //     showMask();
        //     list.show();
        //     list.animate({
        //         height:'120px',
        //     },'fast');
        // } else {
        //     list.animate({
        //         height:'0',
        //     },'fast',function(){
        //         $(this).hide();
        //         hideMask();
        //     });
        // }

        if(list.hasClass('active')){
            list.removeClass('active').hide();
            hideMask();
        }else{
            list.addClass('active').show();
            showMask();
        }
    });
    //第三个项目的子项目
    $('[action-type="order"] li a').click(function(){
        var order = $(this).attr('action-data');
        $('[node-type="cardList"]').html(' ');
        $('[node-type="cardList"]').attr('order',$(this).attr('action-data')).attr('page',0).attr('totalPage',1);
        $('.sort').html($(this).html());
        CardList();
        $('html').scrollTop(0);
        // $('[node-type="regionList"]').animate({
        //     height:'0',
        // },'fast',function(){
        //     $(this).hide();
        //     hideMask();
        // });
        $('[node-type="regionList"]').removeClass('active').hide();
        hideMask();
    });
    function showMask(){
        $("#mask").css("height",$('.content').height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
        // $('[node-type="changeCardList"]').find('.show').animate({
        //         height:'0',
        // },'fast',function(){
        //     $(this).hide();
        // });
        $('[node-type="changeCardList"]').find('.show').removeClass('active').hide();
    }
    $('#mask').click(function(){
        hideMask();
    });
})();