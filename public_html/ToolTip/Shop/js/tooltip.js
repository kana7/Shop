/*Plug in générant des aides contextuelles cliquables avec popups*/


function resetPopup($popup) {
    $popup.css({
        position: 'absolute',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto'
    });
    $($popup).attr('tooltip-id', '');
    $popup.removeClass('up').removeClass('bottom');
    $popup.children('.arrow').removeClass('right').removeClass('left');
}


(function ($) {
    $.fn.tooltip = function (options)
    {
        //paramètres par défaut du plug-in
        var defauts =
                {
                    'url': 'http://shop.internet.lu/Scripts/sql.exe?id=',
                    'id': 0,
                    'size': 300
                };

        var parametres = $.extend(defauts, options);

        $('html').unbind().on('click', function (event) {
            var element = $('#popup_tooltip, .tooltip2');
            console.log('click out event');
            if (!element.is(event.target) && element.has(event.target).length === 0) {
                $('#popup_tooltip.open').removeClass('open');
                $('.tooltip2>button.active').removeClass('active');
                resetPopup($('#popup_tooltip'));
            }
        });

        this.each(function () {

            /*Insert icon tooltip à cote de l'element specifie dans le selecteur
             * Si la popup n'existe pas encore sur la page, elle est cree
             * */
            var htmlTip = '<span class="tooltip2" tip-size="' + parametres.size + '" tip-id="' + parametres.id + '"><button>i</button></span>';
            $(this).after(htmlTip);
            if (!($('#popup_tooltip').length)) { //si la fenêtre popup n'a pas été créée 
                var htmlPopup = '<div id="popup_tooltip" class="popupTips text"><div class="content"/><div class="arrow"/></div>';
                $('body').prepend(htmlPopup);
                $('#popup_tooltip').css({
                    width: parametres.size + 'px'
                });
            }

            $('.tooltip2').unbind().on('click', function () {
                event.stopPropagation();
                $('.tooltip2>button.active').removeClass('active');
                $(this).children('button').toggleClass('active');
                /*if(!($(this).children('button').hasClass('active'))){
                    $(this).children('button').addClass('active');
                }else{
                    $(this).children('button').removeClass('active');
                }*/
                //Si on reclic sur la même icon tooltip quand popup est visible==> on clean la popup et on la cache

                if (($('#popup_tooltip.open')) && ($(this).attr('tip-id') === $('#popup_tooltip').attr('tooltip-id'))) {
                    $('#popup_tooltip').removeClass('open');
                    resetPopup($('#popup_tooltip'));
                    console.log('click again event');
                } else {
                    resetPopup($('#popup_tooltip'));
                    $('#popup_tooltip>.content').empty();
                    /*On recupere l'information à l'id correspondant*/
                    $('#popup_tooltip').attr('tooltip-id', $(this).attr('tip-id')); //enregistrement du dernier id dans le l'attr de la popup
                    var content = '<p class="bold">Url est:<br>' + parametres.url + $(this).attr('tip-id') + '</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a consectetur dui. Praesent bibendum dolor ac ultricies commodo. </p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et augue auctor, imperdiet felis nec, gravida felis. </p><p class="link right"><a href="#">Plus de détails</a></p>';
                    /*$.ajax({
                     type: 'GET',
                     url: parametres.url+$(this).attr('tip-id'),
                     success: function (content) {
                     $('#popup_tooltip').append(content.info);
                     },
                     error: function () {
                     content='<p style="color:red; text-align: center;">Erreur lors de la récupération des données!</p><p>URL invalide ou pas de connexion</p>';
                     $('#popup_tooltip').append(content);
                     }
                     });*/
                    /*$.get(parametres.url+$(this).attr('tip-id'), function(data, status){
                     if (status==="success"){
                     content=data;
                     }else{
                     content='<p style="color:red; text-align: center;">Astuce non disponible actuellement</p>';
                     }
                     });*/

                    $('#popup_tooltip>.content').append(content);

                    /*Au clic sur l'icon tips, on affiche la fenetre popup à l'emplacement de celle-ci en fonction du parametre position*/
                    var pos = $(this).offset(); //position du tooltip cliqué
                    var tipWidth = $(this).outerWidth(); //largeur de l'icon tooltip
                    var middleWidthPage = ((viewport().width) / 2); //milieu de la page en x
                    var middleHeightPage = ((viewport().height) / 2); //milieu de la page en y
                    var popHeight = $('#popup_tooltip').outerHeight(); //hauteur de la popup
                    var popWidth = $('#popup_tooltip').outerWidth();  //largeur de la popup
                    var spaceL = 13.75;
                    var spaceH = 15.75;

                    console.log('position en hauteur: ' + pos.top);
                    console.log('position à gauche hauteur: ' + pos.left);
                    console.log('largeur : ' + viewport().width + '\nMilieu de la page en X : ' + middleWidthPage);
                    console.log('hauteur : ' + viewport().height + '\nMilieu de la page en Y : ' + middleHeightPage);

                    if ((pos.left >= middleWidthPage) && (pos.top < middleHeightPage)) { //en haut à droite
                        $('#popup_tooltip').addClass('up');
                        $('#popup_tooltip>.arrow').addClass('right');
                        $('#popup_tooltip').css({
                            top: (pos.top + tipWidth + spaceH) + 'px',
                            right: (viewport().width - (pos.left + (2 * tipWidth) + spaceL)) + 'px'
                        });

                    } else if ((pos.left >= middleWidthPage) && (pos.top >= middleHeightPage)) { //en bas à droite
                        $('#popup_tooltip').addClass('bottom');
                        $('#popup_tooltip>.arrow').addClass('right');
                        $('#popup_tooltip').css({
                            top: (pos.top - (popHeight + (spaceH + 9))) + 'px',
                            right: (viewport().width - (pos.left + (2 * tipWidth) + spaceL + 1)) + 'px'
                        });
                    } else if ((pos.left < middleWidthPage) && (pos.top >= middleHeightPage)) { //en bas à gauche
                        $('#popup_tooltip').addClass('bottom');
                        $('#popup_tooltip>.arrow').addClass('left');
                        $('#popup_tooltip').css({
                            top: (pos.top - (popHeight + (spaceH + 9))) + 'px',
                            left: (pos.left - (spaceL - 1)) + 'px'
                        });
                    } else if ((pos.left < middleWidthPage) && (pos.top < middleHeightPage)) {  //en haut à gauche
                        $('#popup_tooltip').addClass('up');
                        $('#popup_tooltip>.arrow').addClass('left');
                        $('#popup_tooltip').css({
                            top: (pos.top + tipWidth + spaceH) + 'px',
                            left: (pos.left - (spaceL - 1)) + 'px'
                        });
                    }
                    /*if ($(this).attr('data-position') === 'bottom right') {
                     $('#popup_tooltip').css({
                     top: (pos.top + tipWidth) + 'px',
                     left: (pos.left + tipWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'right') {
                     $('#popup_tooltip').css({
                     top: (pos.top - ((popHeight - tipWidth) / 2)) + 'px',
                     left: (pos.left + tipWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'top right') {
                     $('#popup_tooltip').css({
                     top: (pos.top - popHeight) + 'px',
                     left: (pos.left + tipWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'top') {
                     $('#popup_tooltip').css({
                     top: (pos.top - popHeight) + 'px',
                     left: (pos.left - ((popWidth - tipWidth) / 2)) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'top left') {
                     $('#popup_tooltip').css({
                     top: (pos.top - popHeight) + 'px',
                     left: (pos.left - popWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'left') {
                     $('#popup_tooltip').css({
                     top: (pos.top - ((popHeight - tipWidth) / 2)) + 'px',
                     left: (pos.left - popWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'bottom left') {
                     $('#popup_tooltip').css({
                     top: (pos.top + tipWidth) + 'px',
                     left: (pos.left - popWidth) + 'px'
                     });
                     
                     } else if ($(this).attr('data-position') === 'bottom') {
                     $('#popup_tooltip').css({
                     top: (pos.top + tipWidth) + 'px',
                     left: (pos.left - ((popWidth - tipWidth) / 2)) + 'px'
                     });
                     
                     } else {
                     $('#popup_tooltip').css({
                     top: 'auto',
                     left: 'auto'
                     });
                     }*/

                    $('#popup_tooltip').css({
                        width: $(this).attr('data-size')
                    });
                    $('#popup_tooltip').addClass('open');
                }
            });
            /*Si on clic ailleurs que sur une icon tips ou la popup elle-même, la fenetre popup est cachée*/
        });
        return this;
    };
})(jQuery);