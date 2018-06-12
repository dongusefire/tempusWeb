 (function(){
    var card_id = GetRequest().id;
    //调用页面新接口
    function showcard(callback){
      $.ajax({
        url:URL+'/card/jsonshow/'+card_id,
        type:'get',
        dataType:'json',
        success:function(data){
          callback(data);
        }
      });
    }

    showcard(function(data){
      if(data.code=='401'){
        Tologin();
        return false;
      }
      if(data.code==0){
        var data_ = data.data;
        var html_ = "";
        var starttime = data_.created_at;
        var endtime = data_.end_at;
        starttime = starttime.substring(0,10);
        endtime = endtime.substring(0,10);
        html_+='<div style="background-color:#f6f6f6;">'+
                '<div style="background: #d6d6e2;">'+
                  '<div>'+
                    '<div>'+
                        '<img src='+data_.image+' class="" alt="img" style="width:100%;">'+
                      '<a href="/templates/cards.html" style="position:absolute; top:10px;left:10px;"><img src="/public/images/guanbi.png" style="width:45px;height:45px;"></a>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                    '<div class="buy">'+
                      '<span class="first"><span style="font-size:20px;color:#ccc;">'+data_.unit_price+'<span style="font-size:12px;">元</span></span> 或<span style="font-size: 12px;"> <span node-type="unit_price">'+data_.true_price+'</span>'+data_.currency_name+'积分</span></span>'+
                      '<div style="float: right; height: 70px;line-height: 70px; width: 50%;">'+
                        '<input type="hidden" name="card_id" value="17">'+
                        '<input type="number" name="number" value="1" id="buy_number" style="display: inline-block;height:49%;border:1px solid red; float: right; width: 24%;border-radius: 5px;text-indent: 6px; width: 33%; margin:18px 10px;">'+
                        '<span class="" id="btn" style="float: right; margin-right: 10%;">门市价：'+data_.unit_price+'元 </span>'+
                      '</div>'+
                    '</div>'+
                '<div class="store">'+
                 '库存：'+data_.card_num+''+
                '<a href="/templates/shoplist.html?card_id" style="display: inline-block; float: right; margin-right: 15px; height: 60px;width: 115px; color:#666666;">'+
                  '<div style=" height: 60px; line-height: 60px; position: relative;">查看使用门店<img src="/public/images/block_particulars_right.png" style="height: 11px;position: absolute;bottom: 24px;right: 0;width:7px;"></div>'+
                  '</a>'+
                '</div>'+
                '<div class="details">'+
                  '<div style="margin-left: 15px; margin-right: 10px;">'+
                     '<p class="mustKnow">购买须知</p>'+
                     '<p>有效期</p>'+
                     '<p><span>•&nbsp;</span>'+starttime+'至'+endtime+'（周末、法定节假日通用）</p>'+
                     '<p>使用时间</p>'+
                     '<p><span>•&nbsp;</span>10:00-20:00</p>'+
                     '<p>使用规则</p>'+
                     '<div style="font-size:15px;">'+data_.description+'</div>'+
                  '</div>'+
                '</div>'+
              '</div>';
            $('.content').html(html_);

            //操纵模块
    $('#buy_number').bind("keyup",function(){
    if(this.value.length==1){
        this.value=this.value.replace(/[^1-9]/g,'');
    } else {
        this.value=this.value.replace(/\D/g,'');
    }
    $('#hole_price').html($(this).val()*$('[node-type="unit_price"]').html());
  });
  var selectpayment = 0;
  $('#submit_btn').click(function(){
    $('#submitAckDiv').css('display','block');
    var val = $('#buy_number').val();
    $('#buyNumber').text(val);
    $('#submitMask').show();
    $.ajax({
    url:URL+'/card/jsonshow/'+card_id,
    type:'GET',
    xhrFields:{withCredentials:true},
    crossDomain:true,
    dataType:'json',
    success:function(json){
      if(json.code=='401'){
        Tologin();
      }
      $('#submitAckDiv').find('img').attr('src',json.data.image);
      $('#submitAckDiv').find('[node-type="showName"]').html(json.data.name);
      $('#submitAckDiv').find('[node-type="buy"]').html('<span style="color: #666666">需要&nbsp;</span>'+json.data.true_price * val+'&nbsp'+json.data.currency_name+'<span style="color:#d8505c;">积分</span>'+'<span style="color:#666666">&nbsp;支付</span>');
    }
  })
  });


    $('#confirm_buy_first').click(function(){
        var number = $('[name="number"]').val();
        var payment;
        $.ajax({
            url:URL+'/card/create',
            data:{"card_id":card_id,"number":number},
            type:'POST',
            dataType:'json',
            success:function(json){
                if(json.code=='401'){
                  Tologin();
                }
                if(json.code == 0){
                    $.router.load('/templates/success_pay.html');
                }else if(json.code == 200){
                      payment = json.data.payment;
                      $.toast('积分余额不足，请使用以下积分支付');
                      showOrgSel(json.data);
                      // $('#store').text(json.data.sku);
                      $('#submitAckDiv').find('[node-type="buy"]').html('');
                      $('#confirm_buy_second').click(function(){
                          var postData = {};
                          postData.card_id = card_id;
                          postData.payment = payment[selectpayment];
                          postData.number = number;
                          $.ajax({
                              url:'/card/submit',
                              data:postData,
                              type:'POST',
                              dataType:'json',
                              success:function(json){
                                if(json.code =='401'){
                                    Tologin();
                                }
                                if(json.code == 0 ) {
                                    $.router.load('/templates/success_pay.html');
                                } else {
                                    $.toast('余额不足，支付失败');
                                    setTimeout(function(){
                                      $.router.load('/templates/not_pay.html');
                                    },1000);
                                }
                              }
                          });
                      });
                } else {
                    $.toast(json.msg);
                    $.router.load('/templates/not_pay.html');
                }
            }
        });
    });
// -----------------------弹出窗--------------------//
orgId = 1;

function btn_offOn(flage)
{
  if(0 == flage)
  // {
  //   $("#submit_btn").unbind("click",showSubmitAck);
  //   $("#submit_btn").css("background-color","#ccc");
  // }
  // else
  // {
    $("#submit_btn").on("click",showSubmitAck);
    $("#submit_btn").css("background-color","#e32c2c");
  
}

// function orgSelected(id)
// {
//  /* jQuery("span[id^=org-sed-g-]").each(function(){
//     jQuery(this).html('');
//   });*/
//   $("#cursedorgicon").attr('src',$("#orglisticon-"+id).attr('src'));
//   $("#scoreOrg").html($("#scoreOrgName-"+id).html());
//   orgId = id;
//   $("#selScoreOrgDiv").slideUp(100,function(){
//     $("#ackBuyDiv").slideDown(300,function(){});
//     // ---------------12.22添加---------------//
//     $('.hea').click(function(){
//       $('.radio').css('background-color','');
//       $(this).find('.radio').css('background-color','red');
//     })
//   });
// }



function showOrgSel( data )
{
    var htm = '';
    for( var i in data.payment ) {
        htm +='<div style="width:100%;background-color:#fff;border-bottom: 1px solid #ccc;" class="hea">'+
                '<div style="width:100%;height:35px;text-align:left;margin-top:10px;padding:0px 20px;margin-bottom:10px;">'+
                    '<div style="overflow:hidden;">'+
                        '<div style="width:100%;line-height:35px;font-size:16px;">'+
                            '<div style="float:left;line-height:35px;padding-left:5px;">'+
                              '<span id="scoreOrgName-1"></span>'+
                              //'<input type="radio" style="border:1px solid #c8c5c5;border-radius: 6px;width: 12px;height: 12px;display: inline-block;" value="'+i+'" class="radio"></span>'+
                                '<a href="#" class="checkbox radio-two" node-data="'+i+'">'+
                              '<span style="color:red;">'+data.currencyName[data.payment[i].source_amount.currency]+'</span>积分'+
                                '</a>'+
                            '</div>'+
                            '<div style="float:right;text-align:right;line-height:35px;">'+
                                '<span id="score-1" style="color:#ce3f40;">'+data.payment[i].source_amount.value+'</span>&nbsp;积分'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    }
    $('#sedScoreYYY').prepend(htm);
    $('.checkbox:first').addClass('radio-two-checked');
    $('.checkbox').click(function(){
        $(this).addClass('radio-two-checked',function(){
            $(this).siblings().removeClass('radio-two-checked');
            console.log($(this).attr('node-data'));
            selectPayment = 10;// $(this).attr('node-data');
        });
    })
    $("#ackBuyDiv").slideUp(100,function(){
        $("#selScoreOrgDiv").slideDown(300,function(){});
    });
}

// orgSelected(orgId);

function setSumScore()
{
  sumScore = 0;
  count = 0;
  $(".inputNum").each(function(){
    number=parseInt($(this).attr("value"));
    score=parseInt($(this).attr("score"));
    sumScore += number*score;
    count += number;
  });
  if(count)
  {
    btn_offOn(1);
  }
  else
  {
    btn_offOn(0);
  }
  $("#sumScore").html(sumScore);
}
$(".inputNum").on("change",function(){
  if(0 == $(this).val().length || isNaN($(this).val()))
  {
    $(this).val(0);
  }
  setSumScore();
});

function disablebk(e)
{
  var e = event || window.event || arguments.callee.caller.arguments[0];
  e.preventDefault();
}

$("#submitMask").on("touchmove",function(e){
  disablebk(e);
});

$("#submitAckDiv").on("touchmove",function(e){
  disablebk(e);
});

function hideSubmitMask()
{
  // $("#footerDiv").show();
  $("#submitMask").hide();
  $("#submitAckDiv").hide();
}


function showSubmitAck()
{
  var scrollTop=0;
  if(document.documentElement&&document.documentElement.scrollTop)
  {
    scrollTop=document.documentElement.scrollTop;
  }
  else if(document.body)
  {
    scrollTop=document.body.scrollTop;
  }
  $("#buyNumber").html($(".inputNum").val());
  $("#submitMask").height(window.screen.availHeight+scrollTop);
  $("#submitMask").show();
  $("#footerDiv").hide();
  //$("#submitAckDiv").show();
  $("#submitAckDiv").addClass('show');
 // $("#Down").show();
}
$('#submitMask').click(function(){
  hideSubmitMask();
})
window.addEventListener("load",function(){setSumScore();});


      }
    });
 })();
 
