(function(){
    $.ajax({
        url:URL+'/operate/checkbind',
        type:'POST',
        data:{},
        dataType:'json',
        success:function(data){
            if(data.code=='401'){
                Tologin();
                return false;
            } else if (data.code == 0) {
                $('.title').html('绑定手机号').attr('bindStatus',0);
            } else{
                $('.title').html('修改手机号').attr('bindStatus',1);
            }
        }
    });
    var countdown=60;
    var _btn = $('#btn');
    var _submit = $('#submit');
    function sendmessage(){
        var _btn = $("#btn");
        var data = {};
        data.phone = $('[name="phoneNumber"]').val()?$('[name="phoneNumber"]').val():'';
        var ajaxUrl = URL+'/operate/sendsms';
        if($('.title').attr('bindStatus') == 1 ) {
            ajaxUrl = URL+'/operate/sendsmschange';
        }
        $.ajax({
            url:ajaxUrl,
            type:'POST',
            data:data,
            dataType:'json',
            success:function(json){
                if(json.code=='401'){
                    Tologin();
                    return false;
                };
                $.toast(json.msg);
                if( json.code == 0 ) {
                    settime(_btn);
                } else {
                    _btn.prop('disabled',false);
                }
            }
        });
        $("#submit").text("确认");
    };
    function settime(obj) { //发送验证码倒计时
        if (countdown == 0) {
            obj.prop('disabled',false); 
            obj.html("获取验证码");
            countdown = 60; 
            obj.css('background-color','#fc5a28');
            return;
        } else {
            obj.prop('disabled',true);
            obj.css('color','#fff');
            obj.css('background-color','#dadada');
            obj.html("重新发送(" + countdown + ")");
            countdown--; 
        }
        setTimeout(function() {
            settime(obj) }
        ,1000)
    };
    _btn.click(function(){
        sendmessage();
    });
    _submit.click(function(){
        var data_ = {};
        data_.phone = $.trim($('[name="phoneNumber"]').val());
        data_.captche = $.trim($('[name="verification_code"]').val());
        if( data_.phone == ''){
            $.toast('请填写手机号');
            return false;
        };
        if(!(/\d/.test(data_.phone))){
            $.toast('手机号仅为数字');
            return false;
        };
        if( data_.phone.length!=11){
            $.toast('手机号为11位字符');
            return false;
        };
        if( data_.captche == '' ){
            $.toast('请填写验证码');
            return false;
        };
        if(!(/\d/.test(data_.captche))){
            $.toast('验证码仅为数字');
            return false;
        };
        if( data_.captche.length!=6 ){
            $.toast('验证码为6个字符');
            return false;
        };
        if($(this).hasClass('disabled')){
            return false;
        };
        $(this).addClass('disabled');
        var ajaxUrl = URL+'/operate/build';
        if($('.title').attr('bindStatus') == 1 ) {
            ajaxUrl = URL+'/operate/changephone';
        }
        $.ajax({
            url:ajaxUrl,
            type:'POST',
            data:data_,
            dataType:'json',
            success:function(json){
                _submit.removeClass('disabled');
                if(json.code=='401'){
                    Tologin();
                    return false;
                };
                if( json.code == 0 ) {
                    $.alert(json.msg,function(){
                        $.router.load('/templates/wallet.html',true);
                    });
                }else{
                    $.alert(json.msg);
                };
            }
        });
    });
})();