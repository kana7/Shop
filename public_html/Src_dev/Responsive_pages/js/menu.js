$(function(){
	
	$("#menu li").click(function (event) {
		if(!$(this).parent().hasClass("menu")){
			$(this).parentsUntil(".main").toggle();// cache tout les parents jusqu'a main
		}
		// console.log("menu: "+$(this).find("span").eq(0).text()+" "+$(this).parent().actual('width')+" parent size"+$(this).parent().parent().innerWidth());
		
		event.stopPropagation();// comme ça il appelle pas le onclick des LI parents 
	});
	
	$("#menu li").hover(function(){
		
		$(this).find("ul:first").children('li').show();//affiche tout les li du ul qui sont caché
		$(this).addClass("menu_hover");// ajoute le hover sur le li
		if(!$(this).find("ul:first").is("visible")){// si le ul dans le li est caché il fait le fadin
			if(!$(this).parent().hasClass("menu")){
				$(this).find("ul:first").css("margin-left",($(this).parent().width()-1)+"px");
			}
			$(this).find("ul:first").show();// fadeIn("fast") pour un effet plus joli 
													//Peut être changé par show()
	
		}
	},function(){
		$(this).removeClass("menu_hover");
		if($(this).find("ul").length>0){//cherche les ul dans le li 
			$(this).find("ul").hide();// fadeOut("fast") cache le ul 
											   // Peut etre remplacé par hide();
		}
	});
	
	$("._remove_no_right").remove();
});