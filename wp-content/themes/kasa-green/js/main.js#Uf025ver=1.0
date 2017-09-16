jQuery(document).ready(function(){	
	// sub-menu hover
	jQuery('.menutop li').hover(function(){
		jQuery(this).children('a').addClass('hover');
		jQuery(this).children('.sub-menu').stop().slideDown(200);
	}, function(){
		jQuery(this).children('a').removeClass('hover');
		jQuery(this).children('.sub-menu').stop().slideUp(200);
	});	
	// menutopmob drop down
	jQuery('a.menuicon').click(function(eventObject) {
		eventObject.preventDefault();
	}).toggle(function(){
		jQuery(this).parents('.menucontainer').find('.menutopmob').stop().slideDown(200);
	}, function(){
		jQuery(this).parents('.menucontainer').find('.menutopmob').stop().slideUp(200);
	});	
	//input focus
	jQuery(".contactinfo_form :text, .contactinfo_form textarea, .comment-form :text, .comment-form textarea, .search_form :text").focus(function(){
		var value = jQuery(this).attr("value");
		if (value == "")
		var attrfor = jQuery(this).attr('id');
		jQuery("label[for=" + attrfor + "]").css({"display":"none"});
	});
	jQuery(".contactinfo_form :text, .contactinfo_form textarea, .comment-form :text, .comment-form textarea, .search_form :text").blur(function(){
		var value = jQuery(this).attr("value");
		if (value == "")
		var attrfor = jQuery(this).attr('id');
		jQuery("label[for=" + attrfor + "]").css({"display":"block"});
	});	
	// portfolio_item hover
	jQuery('.portfolio_item').hover(function(){
		jQuery(this).find('.overlay_link').stop().fadeIn(200);
	}, function(){
		jQuery(this).find('.overlay_link').stop().fadeOut(200);
	});
	
	// some css fix
	jQuery('.menutop .sub-menu li:first-child').addClass('first');
	jQuery('.menutop .sub-menu li:last-child, .menufooter li:last-child').addClass('last');
	
}); //Final ready