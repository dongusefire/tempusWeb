var URL = 'http://bj.ecosysnet.com:7080';
function integral(callback,defaultId,stock){
  $.ajax({
        url:URL+'/user/integral/'+defaultId,
        type:'get',
        dataType:'json',
        success:function(data){
          if(stock){
            callback(data,stock);
          }else{
            callback(data);
          };
        }
    });
}
function integralratio(callback,$pid){
  var id = GetRequest().id;
  $.ajax({
        url:URL+'/user/integralratio/'+id+'/'+$pid,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function  formatDate(now,type) {
  var   d= new Date();
  var   year=d.getFullYear();
  var   month=d.getMonth()+1;
  var   _date=d.getDate();
  var   hour=d.getHours();
  var   minute=d.getMinutes();
  var   second=d.getSeconds();
  if(month<10){
    month = '0'+month;
  };
  if(_date<10){
    _date = '0'+_date;
  };
  if(hour<10){
    hour = '0'+hour;
  };
  if(minute<10){
    minute = '0'+minute;
  };
  if(second<10){
    second = '0'+second;
  };
  switch (type){
    case "1":
      return   year+"-"+month+"-"+_date+" "+hour+":"+minute+":"+second;
    break;
    case "2":
      console.log(year+'/'+month+'/'+'/'+_date+" "+hour+":"+minute);
      return year+'/'+month+'/'+_date+" "+hour+":"+minute;
    break;
  }
}
/**
 *  获得url后面的字符串
 *
*/
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/**
 *  读取Cookie
 *
 */
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name,value,time)
{
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str)
{
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s") {
        return str1*1000;
    } else if (str2=="h") {
        return str1*60*60*1000;
    } else if (str2=="d") {
        return str1*24*60*60*1000;
    }
}
function getIntegrallist(callback,$id){
  if($id == undefined) {
    $id == 0;
  }
  $.ajax({
        url:URL+'/user/estimate/'+$id,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function getAllChange(callback,$id){
  if($id == undefined) {
    $id == 0;
  }
  $.ajax({
        url:URL+'/user/directorder/'+$id,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function getIntegralvaluelist(callback,$pid){
  $.ajax({
        url:URL+'/user/integralvaluelist/'+$pid,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function notrelated(callback){
  $.ajax({
        url:URL+'/ApiExchange/notrelated',
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function relateMember(callback){
  $.ajax({
        url:URL+'/ApiExchange/relation',
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function showDataLineMintue($time,$id,$pid) {
    if($pid == undefined) {
        $pid = '';
    }
    $.ajax({
        url:URL+'/ApiExchange/'+$time+'data/'+$id+'/'+$pid,
        type:'get',
        dataType:'json',
        success:function(data){
                Highcharts.chart('container', {
//                  data:data.data,
                    // chart: {
                    //     zoomType: 'x'
                    // },
                    title: {
                        text:formatDate(0,"2")+'（北京时间）',
                        style:{ "color": "#333333", "fontSize": "15px" },
                        x:-50
                    },
                    subtitle: {
                        enabled:false
                    },
                    xAxis: {
                        type:'datetime',
                        dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%m-%d',
                            week: '%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                        },
                        tickInterval: 1,
                        categories:data.data[0],
                        labels:{
                          formatter: function(){
                              return this.value;
                          }
                        }
                    },
                    yAxis: {
                        softMax: 1,
                        softmin: 0,
                        title: {
                            text: null,
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        spline: {
                            states: {
                                hover: {
                                    lineWidth: 5
                                }
                            },
                        },
                        series:{
                            lineWidth: 3,
                        }
                    },
                    series: [{
                        type: 'line',
                        data:data.data[1],
                        marker:{
                          radius:0,
                          lineWidth:0,
                          lineColor:'#fba845',
                          fillColor:'#fba845',
                          states:{
                              hover:{
                                enabled:false
                              }
                          }
                        }
                    }],
                    exporting:false,
                    credits:false,
                });
        }
    });
}
function getUnit(defaultId,callback){
    var html = '';
    $.ajax({
        url:URL+'/product/unit',
        type:'get',
        dataType:'json',
        async:false,
        success:function(data){
            html = callback(data,defaultId);
        }
    });
    return html;
}
function getallUnit(defaultId,callback,$disableId){
    var html = '';
    $.ajax({
        url:URL+'/product/units',
        type:'get',
        dataType:'json',
        async:false,
        success:function(data){
            html = callback(data,defaultId,$disableId);
        }
    });
    return html;
}
function addType(defaultId,callback){
    var html = '';
    $.ajax({
        url:URL+'/ApiExchange/paytype',
        type:'get',
        dataType:'json',
        async:false,
        success:function(data){
            html = callback(data,defaultId);
        }
    });
    return html;
}
function unitHtml(defaultId,type){
  var callback = function(data,$id){
    if(data.code=='401'){
      Tologin();
      return false;
    };
        if(data.code == 0 ) {
          var _html='<div class="list-block media-list"><ul>';
            for(var i=0;i<data.data.length;i++){
                var checked = '';
                if(data.data[i].id == $id) {
                    checked = 'checked="checked"';
                };
                if($id==-1 && i==0){
                    checked = 'checked="checked"';
                };
                _html += '<li data-nogl="'+data.data[i].combination+'"><label class="label-checkbox item-content">'+
                      '<input type="radio" '+checked+' name="unit" value="'+data.data[i].id+'">'+
                      '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                          '<div class="item-title" text="'+data.data[i].unit+'">'+data.data[i].name+data.data[i].unit+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</label>'+
                  '</li>';
                };
            _html +='</ul></div>';
            return _html;
        }
   };
   if(type=='addType'){
    return addType(defaultId,callback);
   }else{
    return getUnit(defaultId,callback);
   };
}

function allunitHtml(defaultId,type,$disableId,$callback){
  var callback = function(data,$id,$disableId){
    if(data.code=='401'){
      Tologin();
      return false;
    };
        if(data.code == 0 ) {
          var _html='<div class="list-block media-list"><ul>';
            for(var i=0;i<data.data.length;i++){
                var checked = '';
                var disable = '';
                if(data.data[i].id == $id) {
                    checked = 'checked="checked"';
                };
                if($id==-1 && i==0){
                    checked = 'checked="checked"';
                };
                if(data.data[i].id == $disableId) {
                   continue;
                }
                _html += '<li data-nogl="'+data.data[i].combination+'"><label class="label-checkbox item-content">'+
                      '<input type="radio" '+checked+' '+disable+' name="unit" value="'+data.data[i].id+'">'+
                      '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                          '<div class="item-title" text="'+data.data[i].unit+'">'+data.data[i].unit+'</div>'+
                        '</div>'+
                      '</div>'+
                    '</label>'+
                  '</li>';
                };
            _html +='</ul></div>';
            return _html;
        }
   };
   if(type=='addType'){
    return addType(defaultId,callback);
   }else{
    return getallUnit(defaultId,callback,$disableId,$callback);
   };
}
function modal(data){
  var _title,_text=data.text,_buttons=[],_imgSuccess,_imgError,_className=['gj-modal'];
  _imgSuccess = '<i><img src="../public/images/modal-success-icon.png"/></i>';
  _imgError = '<i><img src="../public/images/modal-error-icon.png"/></i>';
  _imgInfo = '<i><img src="../public/images/modal-info-icon.png"/></i>';
  switch (data.status){
    case '1':
      _title = _imgSuccess+'挂单成功';
//      _buttons.push({
//        text:'<a href="#" class="btn btn-continue">继续兑换</a>',
//        onClick:function(){
//          console.log('兑换成功');
//        }
//      })
    break;
    case '2':
      _title = _imgError+'挂单失败';
//      _buttons.push({
//        text:'<a href="#" class="btn btn-continue">立即充值</a>',
//        onClick:function(){
//          console.log('兑换失败');
//        }
//      });
    break;
    case '3':
      _title = _imgSuccess+'挂单成功';
    break;
    case '4':
      _title = _imgSuccess+data.title;
    break;
    case '5':
      _title = _imgError+data.title;
    break;
    case '6':
      _title = _imgInfo+data.title;
    break;
    case '7':
      _title = data.title;
    break;
  };
  if(!data.buttons && data.status!='6' ){
    _buttons.push({
      text:'<a href="#" class="btn btn-confirm">确认</a>',
      onClick:data.callback? data.callback:function(){}
    });
  }else{
    _buttons = data.buttons;
  };
  $.modal({
      title: _title,
      text: _text,
      extraClass:_className,
      buttons: _buttons
   })
};
/*选择单位
 title 选中radio的title
 value 选中radio的值
 id 默认选中的value
 callback  点击确定后的回调函数
 */
function radio_unit(data){
  this.than = $('.gj-modal');
  this.title = data.title? data.title:'单位';
  this.value = '';
    this.text = '';
  this.id = data.id;
  this.combination = data.combination? data.combination:'';
  this.type = data.type? data.type:'';
  this.callback = data.callback;
  this.init();
};
radio_unit.prototype.create_modal = function(){
  var _this = this;
  $.modal({
      title: _this.title,
      text: unitHtml(_this.id,_this.type),
      extraClass:['gj-modal'],
      buttons: [{
        text:'<a href="#" class="btn btn-confirm">确认</a>',
        close:false,
        onClick:function(){
          $('.gj-modal').find('[name="unit"]').each(function(key,ele){
            if($(ele).prop('checked')){
              console.log( $(ele).val());
              _this.value = $(ele).val();
              _this.title = $(ele).parents('label').find('.item-title').text();
              _this.text = $(ele).parents('label').find('.item-title').attr('text');
              _this.combination = $(ele).parents('li').attr('data-nogl');
            };
          });
          _this.callback();
        }
      }]
  });
};
radio_unit.prototype.init = function(){
  var _this = this;
  _this.create_modal();
};

/*选择所有单位
 title 选中radio的title
 value 选中radio的值
 id 默认选中的value
 callback  点击确定后的回调函数
 */
function all_radio_unit(data){
  if($('.modal-overlay-visible').length!=0){
    return false;
  };
  this.than = $('.gj-modal');
  this.title = data.title? data.title:'单位';
  this.value = '';
    this.text = '';
  this.id = data.id;
  this.combination = data.combination? data.combination:'';
  this.type = data.type? data.type:'';
  this.callback = data.callback;
  this.disableId = data.disableId?data.disableId:0;
  this.init();
};
all_radio_unit.prototype.create_modal = function(){
  var _this = this;
  var html = allunitHtml(_this.id,_this.type,_this.disableId);
  var model = $.modal({
      title: _this.title,
      text: html,
      extraClass:['gj-modal'],
      buttons:[{
        text:'<a href="#" class="btn btn-confirm">关闭</a>',
      }]
  });
  $('.modal-text').find('.label-checkbox').each(function(){
      $(this).unbind('click').bind('click',_this.callback);
  })
 //  click(function(){
 //    alert(1);
 // //   _this.callback;
 //  });//_this.callback);
};
all_radio_unit.prototype.init = function(){
  var _this = this;
  _this.create_modal();
};
function Stock(data){
  this.num = data.num;
  this.min = data.min? data.min:0;
  this.max = data.max? data.max:0;
  this.unit = data.unit;
  this.addBtn = data.addBtn;
  this.subtractBtn = data.subtractBtn;
  this.inp = data.inp;
  this.inp.val(this.num);
  this.callback = data.callback;
  this.bindEvent();
}
Stock.prototype.bindEvent = function(){
  var _this = this;
  _this.addBtn.click(function(){
    var _num = parseInt(_this.num);
    if(_num>=_this.max){
      $.toast('最多兑换'+_this.max+_this.unit);
    }else{
      _num++;
      _this.num = _num;
      _this.inp.val(_num);
      _this.callback();
    };
  });
  _this.inp.change(function(){
    var _val = parseInt($(this).val());
    var _off = true;
    var _title = '';
    if(isNaN(_val)){
      _title = '兑换数量不能为空';
      _off = false;
    }else if(_val>_this.max){
      _title = '最多兑换'+_this.max+_this.unit
      _off = false;
    }else if(_val<_this.min){
      _title = '最少兑换'+_this.min+_this.unit;
      _off = false;
    };
    if(_off){
      _this.num = _val;
      $(this).val(_this.num);
      _this.callback()
    }else{
      $(this).val(_this.num);
      $.toast(_title);
    };
  });
  _this.subtractBtn.click(function(){
    var _num = parseInt(_this.num);
    if(_num<=_this.min){
      $.toast('最少兑换'+_this.min+_this.unit);
    }else{
      _num--;
      _this.num = _num;
      _this.inp.val(_num);
      _this.callback();
    };
  });
};
function changeDataTime(demo,$id,$pid){
    demo.unbind('click').bind('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var time = $(this).attr('node-data');
        var $formatter;
        switch(time) {
            case 'minute':
            case 'day':
            case "week":
            case "month":
                $formatter = function(){
                    return this.value;
                }
              break;
        }
        showDataLineMintue(time,$id,$pid);
    })
}
function apimyexchange(page,status,callback){
  $.ajax({
        url:URL+'/order/apimyexchange',
        type:'get',
        data:{
          'page':page,
          'status':status
        },
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function apirecordList(page,callback){
    $.ajax({
        url:URL+'/trade/apilist?page='+page,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
}
function apimyexchangelist($id,page,callback,$pid){
  if($pid == undefined) {
    $pid = 0;
  }
  $.ajax({
        url:URL+'/order/apimyexchangelist/'+$id+'/'+$pid,
        type:'get',
        dataType:'json',
        data:{
          'page':page
        },
        success:function(data){
          callback(data);
        }
    });
}
function getScript($url,callback){
  var _time=new Date().getTime();
  $.getScript($url+'?v='+_time,function(){
    if(typeof(callback) == 'function'){
            callback();
        }
  });
};
function getDefaultProductId(callback,id){
  if(!id) {
      id = 0;
  }
  $.ajax({
        url:URL+'/product/defaultid/'+id,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
    });
};
function createorder(data,callback){
  $.ajax({
        url:URL+'/score/createorder',
        type:'POST',
        dataType:'json',
        data:{
          product_id:data.product_id,
          amount:data.amount_num,
            pay:data.pay
        },
        success:function($data){
          callback($data);
        }
    });
}
function nickname(ele,callback){
  $.ajax({
    url:URL+"/operate/nickname",
    type:'post',
    dataType:'json',
    success:function(res){
      callback(ele,res)
    }
   });
};
function helpSlide(){
  var _html = '<div id="help-slide">'+
    '<div class="help-title">帮助</div>'+
      '<div class="swiper-container">'+
        '<div class="swiper-wrapper">'+
          '<div class="swiper-slide"><img src="../public/images/bzh1.png" alt=""></div>'+
          '<div class="swiper-slide"><img src="../public/images/bzh2.png" alt=""></div>'+
          '<div class="swiper-slide"><img src="../public/images/bzh3.png" alt=""></div>'+
          '<div class="swiper-slide"><img src="../public/images/bzh4.png" alt=""></div>'+
          '<div class="swiper-slide"><img src="../public/images/bzh5.png" alt=""></div>'+
        '</div>'+
    '</div>'+
    '<div class="close-slide">'+
      '<i><img src="../public/images/close-icon.png"></i>'+
    '</div>'+
    '</div>';
    $('.page-group').append(_html);
    var _slide = $('#help-slide');
//  setTimeout(function(){
//    var _swiper =  new Swiper('.swiper-container', {
//          scrollbar: '.swiper-scrollbar',
//          scrollbarHide: true,
//          slidesPerView: 'auto',
//          centeredSlides: true,
//          spaceBetween: 30,
//          grabCursor: true
//      });
//  },100);
    _slide.find('.close-slide').click(function(){
      _slide.remove();
    });
};
function banoper(type){
  var _html='<div class="banoper"></div>';
  if(type=='add'){
    $.showIndicator();
    $('.page-group').append(_html);
  }else{
    $.hideIndicator();
    $('.banoper').remove();
  };
};
function Tologin(){
  if($('.gj-modal').length==1){
    return false;
  };
  modal({
     status:'6',
     title:'系统提示',
     text:'为了您能获得更好的体验，请先登录',
     buttons:[
        {
          'text':'<a href="#" class="btn btn-confirm">登录</a>',
          onClick:function(){
          $.router.load('/templates/userlogin.html',true);
          }
        }
     ]
  });
};
function setStorage($key,$val){
  localStorage.setItem($key,$val);
};
function getStorage($key){
  return localStorage.getItem($key);
};
function pageInitial(id){
  var $con = $('#'+id).find('.content');
  var style = {'height':'auto','top':0,'bottom':0};
  if(id=='integral_detail'){
    var _filterH = $con.siblings('.filter').height();
    var _hdH = $con.siblings('header.bar').height();
    style.top = _filterH+_hdH;
  }else if(id=='myList'){
    var _tabH = $con.siblings('.tab').height();
    var _hdH = $con.siblings('header.bar').height();
    style.top = _tabH+_hdH;
  }else if(id=='page-index'){
    var _topH = $con.siblings('.top').find('.header').height()+$('.integral-box').height();
    var _ftH = $con.siblings('nav.bar-footer').height();
    style.top = _topH;
    style.bottom = _ftH;
  }else if(id=='card'){
  	var _topH = $con.siblings('.line').height()+$con.siblings('.search-box').height();
    var _ftH = $con.siblings('nav.bar-footer').height();
    style.top = _topH;
    style.bottom = _ftH;
  }else{
    var _hdH = $con.siblings('header.bar').length!=1? 0:$con.siblings('header.bar').height();
    var _ftH = $con.siblings('nav.bar-footer').length!=1? 0:$con.siblings('nav.bar-footer').height();
    style.top = _hdH;
    style.bottom = _ftH;
  };
  $con.css(style);
};
function removePageLoad(){
	$('.page-load').addClass('fadeout');
	setTimeout(function(){
		$('.page-load').remove();
	},500);
};
$(function(){
  $(window).resize(function(){
    var id = $('.page').length>1? $('.page').eq($('.page').length-1).attr('id'):$('.page').attr('id')
    pageInitial(id);
  });
  /*钱包首页*/
    $(document).on('pageInit','#page-index',function(e,id,page){
        getScript('/public/scripts/wallet.js');
        if(GetRequest().s != undefined){
              var _href = location.origin+location.pathname;
              history.pushState({},0,_href);
              $.openPanel("#qb-lpanel");
        }
        pageInitial('page-index');
    });
  /*兑换首页*/
    $(document).on('pageInit','#page-exchange',function(e,id,page){
        getScript('/public/Swiper/dist/js/swiper.jquery.min.js',function(){
          getScript('/public/scripts/exchange.js');
        });
        pageInitial('page-exchange');
    });
  /*兑换详情页*/
  $(document).on('pageInit','#page-exchange-details',function(e,id,page){
        getScript('/public/plugins/highcharts.js',function(){
          console.log('highcharts');
            getScript('/public/plugins/exporting.js',function(){
              console.log('exporting');
                getScript('/public/plugins/charts/js/Chart.js',function(){
                  console.log('Chart');
                    getScript('/public/scripts/exchange_details.js');
                });
            });
        });
        pageInitial('page-exchange-details');
  });
  /*全部兑换*/
  //   $(document).on('pageInit','#onekeyExchange',function(){
    // getScript('/public/scripts/onekeyExchange.js');
   //   });
    /*钱包界面侧栏*/
    $(document).on('open','#qb-lpanel',function(){
    $('.panel-overlay').css({
      'background':'rgba(0, 0, 0, 0.8)',
      'opacity':'1',
      'margin-left': '0'
    });
    });
    /*交换页面侧栏*/
    $(document).on('open','#qb-lpanel2',function(){
    $('.panel-overlay').css({
      'background':'rgba(0, 0, 0, 0.8)',
      'opacity':'1',
      'margin-left': '0'
    });
    });
    /*我的挂单*/
  $(document).on('pageInit','#myList',function(e,id,page){
    getScript('/public/scripts/myList.js');
    pageInitial('myList');
  });
  /*积分明细*/
  $(document).on('pageInit','#integral_detail',function(e,id,page){
    getScript('/public/scripts/integral_detail.js');
    pageInitial('integral_detail');
  });
  /*兑换输入页面*/
  $(document).on('pageInit','#exchange_num',function(e,id,page){
    getScript('/public/scripts/exchange_num.js');
    pageInitial('exchange_num');
  });
  /*昵称修改*/
  $(document).on('pageInit','#modify_name',function(e,id,page){
    getScript('/public/scripts/modify_name.js');
    pageInitial('modify_name');
  });
  /*绑定手机号*/
  $(document).on('pageInit','#bind_phoneNumber',function(e,id,page){
    getScript('/public/scripts/bind_phoneNumber.js');
    pageInitial('bind_phoneNumber');
  });
  /*密码修改*/
  $(document).on('pageInit','#modify_password',function(e,id,page){
    getScript('/public/scripts/change_pwd.js');
    pageInitial('modify_password');
  });
  /*找回密码*/
  $(document).on('pageInit','#back_password',function(e,id,page){
    getScript('/public/scripts/back_pwd.js');
    pageInitial('back_password');
  });
  /*新全部兑换*/
   $(document).on('pageInit','#change_all',function(){
      getScript('/public/scripts/change_all.js');
      pageInitial('change_all');
  });
  $(window).on('popstate', function () {
      if($('.gj-modal').length){
        $.closeModal('.gj-modal')
        window.history.pushState('forward', null, '#');
            window.history.forward(1);
      };
    });
  /*商城首页*/
  $(document).on('pageInit','#market',function(){
      getScript('/public/Swiper/dist/js/swiper.jquery.min.js',function(){
          getScript('/public/scripts/market.js');
        });
        pageInitial('market');
  });
  /*卡券首页*/
 $(document).on('pageInit','#card',function(){
      getScript('/public/scripts/cards.js');
      pageInitial('card');
  });
  /*卡券详情*/
 $(document).on('pageInit','#cardshow',function(){
      getScript('/public/scripts/cardshow.js');
      pageInitial('cardshow');
  });
 /*门店列表*/
 $(document).on('pageInit','#shoplist',function(){
      getScript('/public/scripts/shoplist.js');
    pageInitial('shoplist');
  });
  /*搜索页*/
  $(document).on('pageInit','#searchPage',function(){
    getScript('/public/scripts/searchPage.js');
    pageInitial('searchPage');
  });
  /*分类页*/
  $(document).on('pageInit','#commodity',function(){
        getScript('/public/Swiper/dist/js/swiper.jquery.min.js',function(){
          getScript('/public/scripts/commodity.js');
        });
        pageInitial('commodity');
    });
  /*购物车*/
  $(document).on('pageInit','#shoppingCar',function(){
    getScript('/public/scripts/shoppingCar.js');
    pageInitial('shoppingCar');
  });
  /*订单管理*/
  $(document).on('pageInit','#submitOrders',function(){
    getScript('/public/scripts/submitOrders.js');
    pageInitial('submitOrders');
  });
  /*我的订单*/
  $(document).on('pageInit','#myOrder',function(){
    getScript('/public/scripts/myOrder.js');
    pageInitial('myOrder');
  });
  /*登录界面*/
  $(document).on('pageInit',"#user_login",function(){
   getScript('/public/scripts/common.js');
   pageInitial('user_login');
  });
  /*我的积分账户*/
  $(document).on('pageInit','#my_account',function(){
    getScript('/public/scripts/my_account.js');
    pageInitial('my_account');
  });
  /*未关联积分*/
  $(document).on('pageInit','#notRelated',function(){
    getScript('/public/scripts/notRelated.js');
    pageInitial('notRelated');
  });
  /*商品详情*/
  $(document).on('pageInit','#marketShow',function(){
      getScript('/public/Swiper/dist/js/swiper.jquery.min.js',function(){
        getScript('/public/scripts/marketShow.js');
      });
      pageInitial('marketShow');
  });
  /*商家关联页*/
  $(document).on('pageInit','#connect',function(){
	/* $('#jump').off('load').on('load',function(){
		if(document.getElementById('jump').contentWindow.document.getElementById('page-index')!=null){
			$.showPreloader('两秒后自动返回钱包页');
			setTimeout(function(){
				$.hidePreloader();
				$.router.load('/templates/wallet.html',true);
			},2000);
		};
	}); */
    var aimurl = getStorage('url');
    var business_name = getStorage('businessname');
    var id = getStorage('id');
    $('.jump').attr('src',aimurl); //iframe
    // $('.jump').attr('data',aimurl);  //object
    $('.title').html('关联'+business_name);
    var storage = window.localStorage;
    storage.clear();
    pageInitial('connect');
  });

  /*注册页*/
  $(document).on('pageInit','#register',function(){
    getScript('/public/scripts/register.js');
    pageInitial('register');
  });
  /*公益详情页*/
  $(document).on('pageInit','#project_list',function(){
     getScript('/public/scripts/project_list.js');
     pageInitial('project_list');
  });
  /*公益首页*/
  $(document).on('pageInit','#project',function(){
     getScript('/public/scripts/project.js');
     pageInitial('project');
  });
  /*捐赠详情*/
  $(document).on('pageInit','#tradeShow',function(){
     getScript('/public/scripts/trade_show.js');
     pageInitial('tradeShow');
  });
  /*捐赠进度*/
  $(document).on('pageInit','#tradeplan',function(){
     getScript('/public/scripts/trade_plan.js');
     pageInitial('tradeplan');
  });
  $(document).on('click','.modal-overlay-visible',function(){
    if(!$(this).hasClass('nogl')){
      $.closeModal('.gj-modal');
    };
    if($('.all-list').length==1){
      $('.all-list').css('overflow','auto');
    }
  });
  $.init();
});
