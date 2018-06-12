(function(){
	var _page = $('.page');
	function delSelected()
	{
	  $(".selected").each(function($key,ele){
		  if($(ele).attr('value')==1){
			  obj = $(this).parent().parent().parent();
			  obj.remove();
		  };
	  });
	  setSumScore();
	}

	function btn_offOn(flage){
	  if(0 == flage){
		$("#submit_btn").css("background-color","#ccc");
		$('#submit_btn').unbind('click');
	  }else{
		$("#submit_btn").css("background-color","#ce3f40");
		$('#submit_btn').on('click',function(){ $.router.load('/templates/market/submitOrders.html',true);});
	  }
	}
	$('#submit_btn').on('click',function(){$.router.load('/templates/market/submitOrders.html',true);});

	$(".selected").on("click",function(e){
	  var _ind = 0;
	  btn_enable=0;
	  value = $(this).attr("value");
	  if(1 == value){
		$(this).attr("src","/hnair/images/selected_02.png");
		$(this).attr("value",0);
	  }else{
		$(this).attr("src","/hnair/images/selected_01.png");
		$(this).attr("value",1);
	  }
	  $(".selected").each(function($key,ele){
		  if($(ele).attr('value')==1){
			  _ind++;
		  };
	  });
	  if(0 == _ind){
		btn_offOn(0);
	  }else{
		btn_offOn(1);
	  }
	  setSumScore();
	});

	$(".jia").on("click",function(){
	  input=$(this).prev(".number").children("input");
	  if(0 == input.val().length || isNaN(input.val()))
	  {
		input.val("0");
	  }
	  num = parseInt(input.val())+1;
	  input.val(num);
	  setSumScore();
	});

	$(".jian").on("click",function(){
	  input=$(this).next(".number").children("input");
	  if(0 == input.val().length || isNaN(input.val()))
	  {
		input.val("0");
	  }
	  num = parseInt(input.val());
	  if(0 >= num)
	  {
		input.val(0);
	  }
	  else
	  {
		input.val(num-1);
	  }
	  setSumScore();
	});

	function setSumScore()
	{
	  sumScore = 0;
	  count = 0;
	  $(".selected").each(function($key,ele){
		if($(ele).attr('value')==1){
			obj = $(this).parents('.item-box').find('.inputNum');
			number=parseInt(obj.attr("value"));
			count+=number;
			score=parseInt(obj.attr("score"));
			sumScore += number*score;
		};
	  });
	  $("#sumScore").html(sumScore);
	  if(count){
		btn_offOn(1);
	  }else{
		btn_offOn(0);
	  }
	}
	$(".inputNum").on("change",function(){
	  if(0 == $(this).val() || isNaN($(this).val()))
	  {
		$(this).val(0);
	  }
	  setSumScore();
	});
	$('.empty').click(function(){
		delSelected();
	});
	setSumScore();
})();