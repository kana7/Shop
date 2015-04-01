/*
 * Appliqué la classe "sticky" à la balise <table> de votre tableau pour obtenir un thead fixe au scroll de la page. 
 */

// permet de créer un event onHide et onShow
(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

$(function () {
    var tableOffset = $("table.sticky").offset().top;
    var $header = $("table.tableau > thead").clone();
    $("table.tableau").append('<table id="header-fixed" style="position:fixed; top:0px; display:none;"></table');
    var $fixedHeader = $("#header-fixed").append($header);
    $($fixedHeader).css('width', $("table.tableau").width());
    $($fixedHeader).find('thead th').each(function () {
        $(this).width($('table.tableau thead th[id=' + $(this).attr('id') + ']').width());
    });

    $($fixedHeader).on('refreshHead', function () {
        $($fixedHeader).css('width', $("table.tableau").width());
        $($fixedHeader).find('thead th').each(function () {
            $(this).width($('table.tableau thead th[id=' + $(this).attr('id') + ']').width());
        });
    });

    $(window).on("scroll", function () {
        var offset = $(this).scrollTop();
        if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
            $fixedHeader.show();
        }
        else if (offset < tableOffset) {
            $fixedHeader.hide();
        }
    });
    $(window).on("resize", function () {
        $($fixedHeader).trigger('refreshHead');
        tableOffset = $("table.sticky").offset().top;
    });
    $('table.sticky thead th').on("show", function () {
        $($fixedHeader).trigger('refreshHead');
    });
    $('table.sticky thead th').on("hide", function () {
        $($fixedHeader).trigger('refreshHead');
    });
    $('.table-menu input').on("change", function () {
        $($fixedHeader).trigger('refreshHead');
    });
});
