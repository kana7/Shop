/*Plug in générant des aides contextuelles cliquables avec popups*/

(function ($) {
    $.fn.tooltip = function (options)
    {
        //paramètres par défaut du plug-in
        var defauts =
                {
                    'url': 'http://shop.internet.lu/Scripts/sql.exe?id=',
                    'id': 0,
                    'position': 'bottom right',
                    'size': 300
                };

        var parametres = $.extend(defauts, options);

        /*Insert icon tooltip à cote de l'element specifie dans le selecteur
         * Si la popup n'existe pas encore sur la page, elle est cree
         * */
        var htmlTip = '<span class="tooltip3" data-id="'+parametres.id+'"><a href="#" class="align center"><i class="fa fa-question"></i></a></span>';
        this.after(htmlTip);
        if (!($('#popup_tooltip').length)) {
            var htmlPopup = '<div id="popup_tooltip" class="popupTips text"></div>';
            $('body').before(htmlPopup);
            $('#popup_tooltip').css({
                width: parametres.size + 'px'
            });
        }

        $('.tooltip1').click(function () {
            event.stopPropagation();
            $('#popup_tooltip').empty();
            /*On recupere l'information à l'id correspondant*/
            var content = '<p class="bold">Url est:<br>' + parametres.url + $(this).attr('data-id') + '</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a consectetur dui. Praesent bibendum dolor ac ultricies commodo. </p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et augue auctor, imperdiet felis nec, gravida felis. </p><p class="link right"><a href="#">Plus de détails</a></p>';
            /*$.ajax({
                type: 'GET',
                url: parametres.url+$(this).attr('data-id'),
                success: function (content) {
                    $('#popup_tooltip').append(content.info);
                },
                error: function () {
                    content='<p style="color:red; text-align: center;">Erreur lors de la récupération des données!</p><p>URL invalide ou pas de connexion</p>';
                    $('#popup_tooltip').append(content);
                }
            });*/
            /*$.get(parametres.url+$(this).attr('data-id'), function(data, status){
                if (status==="success"){
                    content=data;
                }else{
                    content='<p style="color:red; text-align: center;">Erreur lors de la récupération des données!</p><p>URL invalide ou pas de connexion</p>';
                }
            });*/
            $('#popup_tooltip').append(content);

            /*Au clic sur l'icon tips, on affiche la fenetre popup à l'emplacement de celle-ci en fonction du parametre position*/
            var pos = $(this).offset();
            var tipWidth = $(this).outerWidth();
            var popHeight = $('#popup_tooltip').outerHeight();
            var popWidth = $('#popup_tooltip').outerWidth();

            if (parametres.position === 'bottom right') {
                $('#popup_tooltip').css({
                    top: (pos.top + tipWidth) + 'px',
                    left: (pos.left + tipWidth) + 'px'
                });

            } else if (parametres.position === 'right') {
                $('#popup_tooltip').css({
                    top: (pos.top - ((popHeight - tipWidth) / 2)) + 'px',
                    left: (pos.left + tipWidth) + 'px'
                });

            } else if (parametres.position === 'top right') {
                $('#popup_tooltip').css({
                    top: (pos.top - popHeight) + 'px',
                    left: (pos.left + tipWidth) + 'px'
                });

            } else if (parametres.position === 'top') {
                $('#popup_tooltip').css({
                    top: (pos.top - popHeight) + 'px',
                    left: (pos.left - ((popWidth - tipWidth) / 2)) + 'px'
                });

            } else if (parametres.position === 'top left') {
                $('#popup_tooltip').css({
                    top: (pos.top - popHeight) + 'px',
                    left: (pos.left - popWidth) + 'px'
                });

            } else if (parametres.position === 'left') {
                $('#popup_tooltip').css({
                    top: (pos.top - ((popHeight - tipWidth) / 2)) + 'px',
                    left: (pos.left - popWidth) + 'px'
                });

            } else if (parametres.position === 'bottom left') {
                $('#popup_tooltip').css({
                    top: (pos.top + tipWidth) + 'px',
                    left: (pos.left - popWidth) + 'px'
                });

            } else if (parametres.position === 'bottom') {
                $('#popup_tooltip').css({
                    top: (pos.top + tipWidth) + 'px',
                    left: (pos.left - ((popWidth - tipWidth) / 2)) + 'px'
                });

            } else {
                $('#popup_tooltip').css({
                    top: 'auto',
                    left: 'auto'
                });
            }
            $('#popup_tooltip').show();
        });

        /*Si on clic ailleurs que sur une icon tips ou la popup elle-même, la fenetre popup est cachée*/
        $('html').click(function (event) {
            var element = $('#popup_tooltip, .tooltip2');
            if (!element.is(event.target) && element.has(event.target).length === 0) {
                if ($('#popup_tooltip').is(':visible')) {
                    $('#popup_tooltip').css({
                        position: 'absolute',
                        top: 'auto',
                        left: 'auto'
                    }).empty().hide();
                }
            }
        });

        return this;
    };
})(jQuery);