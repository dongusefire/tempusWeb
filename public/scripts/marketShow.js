(function(){
	var _page = $('.page');
	var mySwiper = new Swiper('.swiper-container',{
		slidesPerView:'auto',
		spaceBetween:10
	})
	$('.click-collect').click(function(){
        if($(this).attr('isCollect') == 0) {
            $(this).attr('isCollect',1);
            $(this).find('img').attr('src','/hnair/images/click-collect-none.png');
        } else {
            $(this).attr('isCollect',0);
            $(this).find('img').attr('src','/hnair/images/click-collect.png');
        }
    });
})();