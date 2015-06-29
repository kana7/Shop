/*Plug in générant des aides contextuelles cliquables avec popups*/

(function ($) {
    $.fn.tooltip = function (id)
    {
        /*Insert icon tooltip à cote de l'element specifie dans le selecteur
         * Si la popup n'existe pas encore sur la page, elle est cree
         * */
        var htmlTip = '<span class="tooltip2" data-id="' + id + '"><button>i</button></span>';
        this.after(htmlTip);
        if (!($('#popup_tooltip').length)) {
            var htmlPopup = '<div id="popup_tooltip" class="popupTips">Hello moto</div>';
            $('body').before(htmlPopup);
        }

        /*Au clic sur l'icon tips, on affiche la fenetre popup à l'emplacement de celle-ci*/
        $('.tooltip2').click(function () {
            event.stopPropagation();
            var pos = $(this).offset();
            var width = $(this).outerWidth();
            alert('data id: ' + $(this).attr('data-id'));
            $('#popup_tooltip').css({
                position: 'absolute',
                top: pos.top + 'px',
                left: (pos.left + width) + 'px'
            }).show();
        });

        /*Si on clic ailleurs que sur une icon tips ou la popup elle-même, la fenetre popup est cachée*/
        $('html').click(function (event) {
            var element = $('#popup_tooltip, .tooltip2');
            if (!element.is(event.target) && element.has(event.target).length === 0) {
                if ($('#popup_tooltip').is(':visible')) {
                    $('#popup_tooltip').hide();
                }
            }
        });
        return this;
    };
})(jQuery);