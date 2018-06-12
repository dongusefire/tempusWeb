(function(){
    var _page = $('.page');
    var imgHeight = document.body.scrollWidth*0.44;
    function getList(){
        var html = '';
        if ($('[node-type="project-list"]').attr('is_load')== 0 ) {
            $('[node-type="project-list"]').attr('is_load','1');
            var $page = parseInt($('[node-type="project-list"]').attr('page'))+1;
            if( $page > $('[node-type="project-list"]').attr('totalPage')) {
                return false;
            }
            if( $('[node-type="project-list"]').attr('list') == 0 ) {
                $.getJSON(URL+"/project/page", { page: $page }, function (json) {
                    for( var i in json.data.data) {
                        html += '<div class="adaptive-item" style="background-color:#fefefe;">';
                        html +='<a href="/templates/project/project_list.html?id='+json.data.data[i].id+'" data-no-cache="true" class="swipebox" title="Caption Goes Here">'+
                            '<img class="responsive-image" src="'+json.data.data[i].cover+'" alt="img" style="height:'+imgHeight+'px;width:'+imgHeight+'px;';
                        if(!json.data.data[i].tag) {
                            html += '-webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%);filter: grayscale(100%); filter: gray;"';
                        } else {
                            html += '"';
                        }
                        html+='>';
                        if(!json.data.data[i].tag ) {
                            html += '<img src="../../public/images/status_red.png" style="position: absolute;top: 0;right: 0; width:45%;">';
                        }
                        html +='</a>'+
                        '<h4 style="height: 20px;">'+json.data.data[i].title+'</h4>'+
                        '<p style="height:60px;line-height:15px;letter-spacing:0px; margin-bottom:0px;">'+
                            json.data.data[i].description+
                        '</p>'+
                        '<div class="clearfix">'+
                            '<div style="float:right;">已完成'+(json.data.data[i].progress/json.data.data[i].money*100).toFixed(2)+'%</div>'+
                            '<div style="float:left;">进度</div>'+
                        '</div>'+
                        '<div style="width:100%;height:10px;line-height:20px;">'+
                                '<div style="width:100%;border-radius:8px;background-color:#cccccc;">'+
                                    '<div style="width:'+(json.data.data[i].progress/json.data.data[i].money*100).toFixed(2)+'%;height:4px;background-color:#ec7c02;"> </div>'+
                                '</div>'+
                        '</div>'+
                        '<p style="height:32px;line-height:32px;float:left; font-size:12px; margin-bottom: 0px; margin-left:1px; width:45%;"><a style="color:#ce403f;display:inline;">'+json.data.data[i].number+'</a>人已捐</p><p style="float:right; height:32px; line-height:32px; font-size:12px; width:52%; margin-bottom: 0px;text-align: right;">'+json.data.data[i].org_name+'</p>'+
                        '</div>';
                    }
                    var totalPage = Math.ceil(json.data.total/json.data.per_page);
                    $('[node-type="project-list"]').attr('totalPage',totalPage);
                    $('[node-type="project-list"]').attr('page',$page);

                    $('[node-type="project-list"]').attr('is_load','0');
                    $('[node-type="project-list"]').append(html);
                });
            } else if($('[node-type="project-list"]').attr('list') == 1) {
                $.getJSON("/trade/mytradelist", { page: $page }, function (json) {
                    for( var i in json.data.data ) {
                        html +='<a href="#" action-type="trade_show" action-data="'+json.data.data[i].project_id+'">';
                        html +='<div class="jifenlist_bottom" style="padding-right: 5%;">';
                        html +='<div class="jifenlist_bottom_img">';
                        html +='<img src="'+json.data.data[i].project_cover+'"  style="border-radius:15px; width:100%; height:100%;"/>';
                        html +='</div>';
                        html +=' <div class="jifenlist_bottom_text_left">';
                        html +='<p style="height:12vw; line-height:23px; font-size:15px; color:#000; font-weight: 600;">'+json.data.data[i].project_title+'</p>';
                        html +='</div>';
                        html +='<div class="jifenlist_bottom_text_right" >';
                        html +='<p style=" font-size: 16px; color:#ce403f; letter-spacing: 1px; font-weight: 600;">'+json.data.data[i].total_amount+'积分</p></br>';
                        html +='</div>';
                        html +='</div>';
                        html +='<div style="width:96%;border-bottom:1px solid #e6e6e6;margin:0 auto;"></div>';
                        html +='</a>';
                    }
                    var totalPage = Math.ceil(json.data.total/json.data.per_page);
                    $('[node-type="project-list"]').attr('totalPage',totalPage);
                    $('[node-type="project-list"]').attr('page',$page);

                    $('[node-type="project-list"]').attr('is_load','0');

                    $('[node-type="project-list"]').append(html);

                    tradeShow($('[action-type="trade_show"]'));
                });
            } else {
                $.getJSON("/trade/mytradeshow/"+ $('[node-type="project-list"]').attr('project_id'), { page: $page }, function (json) {
                    for( var i in json.data.data ) {
                        var status = '捐赠成功';
                        if( json.data.data[i].status == 0 ) {
                            status = '等待付款';
                        } else if( json.data.data[i].status == 2 ) {
                            status = "失败";
                        }
                        html +='<a href="/templates/project/trade_show.html?id='+json.data.data[i].id+'" data-no-cache="true">';
                        html +='<div class="jifenlist_bottom" style="padding-right: 5%;">';
                        html +='<div class="jifenlist_bottom_img">';
                        html +='<img src="'+json.data.data[i].project_cover+'"  style="border-radius:15px; width:100%; height:100%;"/>';
                        html +='</div>';
                        html +=' <div class="jifenlist_bottom_text_left">';
                        html +='<p style="line-height:23px; font-size:15px; color:#000; font-weight: 600;">'+json.data.data[i].project_title+'</p>';
                        html +='<p style="color:#484848; font-size: 14px;">'+json.data.data[i].created_at+'</p>';
                        html +='</div>';
                        html +='<div class="jifenlist_bottom_text_right" >';
                        html +='<p style=" font-size: 16px; color:#ce403f; letter-spacing: 1px; font-weight: 600;">'+json.data.data[i].amount+'积分</p></br>';
                        html +='<p style=" font-size: 13px; color:#898989;">'+status+'</p>';
                        html +='</div>';
                        html +='</div>';
                        html +='<div style="width:96%;border-bottom:1px solid #e6e6e6;margin:0 auto;"></div>';
                        html +='</a>';
                    }
                    var totalPage = Math.ceil(json.data.total/json.data.per_page);
                    $('[node-type="project-list"]').attr('totalPage',totalPage);
                    $('[node-type="project-list"]').attr('page',$page);

                    $('[node-type="project-list"]').attr('is_load','0');

                    $('[node-type="project-list"]').append(html);
                });
            }
        }
    };
    $('[node-type="project-list"]').attr('page','0');
    getList();
    _page.find('.content').scroll(function(){
        var $con = $('.content');
        if(($con[0].scrollHeight-100) <= ($con.scrollTop()+$con.height())){
          getList();
        }
    });
    $('[action-type="project_list"]').click(function(){
        $('[node-type="project-list"]').attr({"page":"0","totalPage":1,"is_load":0,"list":0});
        $('[node-type="project-list"]').html(' ');
        $(this).css({"color":"#cf271a"});
        $('[action-type="myTrade"]').css({"color":"#1e1e1e"});
        getList();
    });
    $('[action-type="myTrade"]').click(function(){
        $('[node-type="project-list"]').html(' ');
        $(this).css({"color":"#cf271a"});
        $('[action-type="project_list"]').css({"color":"#1e1e1e"});
        $('[node-type="project-list"]').attr({"page":"0","totalPage":1,"is_load":0,"list":1});
        getList();
    });
    function tradeShow(demo){
        demo.click(function(){
            $('[node-type="project-list"]').html(' ');
            $(this).css({"color":"#cf271a"});
            $('[action-type="project_list"]').css({"color":"#1e1e1e"});
            $('[node-type="project-list"]').attr({"page":"0","totalPage":1,"is_load":0,"list":2,"project_id":$(this).attr('action-data')});
              getList();
        });
    }
    tradeShow($('[action-type="trade_show"]'));
})();