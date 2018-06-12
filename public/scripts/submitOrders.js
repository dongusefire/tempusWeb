(function(){
	var _page = $('.page');
	
	var orgId = 1;
	var sumScore =0,number=null,score=null,count=0;

	function btn_offOn(flage)
	{
	  if(0 == flage)
	  {
		$("#submit_btn").unbind("click",showSubmitAck);
		$("#submit_btn").css("background-color","#ccc");
	  }
	  else
	  {
		$("#submit_btn").on("click",showSubmitAck);
		$("#submit_btn").css("background-color","#e32c2c");
	  }
	}

	function orgSelected(id)
	{
	 /* $("span[id^=org-sed-g-]").each(function(){
		$(this).html('');
	  });*/
	  $("#cursedorgicon").attr('src',$("#orglisticon-"+id).attr('src'));
	  $("#scoreOrg").html($("#scoreOrgName-"+id).html());
	  orgId = id;
	  $("#selScoreOrgDiv").hide();
	  $("#ackBuyDiv").show();
	}

	function showOrgSel()
	{
	  $("#selScoreOrgDiv").show();
	  $("#ackBuyDiv").hide();
	}

	orgSelected(orgId);

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
	  $(".inputNum").each(function(){
		number=parseInt($(this).attr("value"));
		score=parseInt($(this).attr("score"));
		sumScore += number*score;
		count += number;
	  });
	  if(count)
	  {
		btn_offOn(1);
	  }else{
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
	  $("#footerDiv").show();
	  $("#submitMask").hide();
	  $("#submitAckDiv").removeClass('up');
	}
	function showSubmitAck(){
	  $("#buyNumber").html($(".inputNum").val());
	  $("#submitMask").show();
	  $("#footerDiv").hide();
	  //$("#submitAckDiv").show();
	  $("#submitAckDiv").addClass('up');
	 // $("#Down").show();
	}
	$('#submitMask').click(function(){
		hideSubmitMask();
	});

	$('.replace').click(function(){
		showOrgSel();
	});
	$('.btn-create').click(function(){
		hideSubmitMask();
		setTimeout(function(){
			$.router.load('/templates/market/success_pay.html',true);
		},400);
	});
	$('#sedScoreYYY .select-item').click(function(){
		var _id = $(this).attr('data-id');
		orgSelected(_id);
	});
	setSumScore();
})();