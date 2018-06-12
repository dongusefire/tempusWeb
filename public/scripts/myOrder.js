(function(){
	var _page = $('.page');
	function delItem(obj)
	{
	  $(obj).parent().parent().remove();
	}
	$(".delBtn").on("click",function(e){
	  delItem(this);
	});
})();