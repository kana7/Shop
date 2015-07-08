/*
 * Appliqué la classe "sticky" à la balise <table> de votre tableau pour obtenir un thead fixe au scroll de la page.
 * Ne pas oublier de créer un wrapper: $('table.tableau').wrap('<div class="wrapper" style="overflow-x:scroll; width:100%;clear:both"/>');
 * dans une balise script dans la page pour détecter le overflow du tableau (même chose que hideShowColumn.js).
 */

//function detecte un overflow
(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollWidth > this.width();
    };
})(jQuery);

(function ($) {
    $.fn.stickyTableHeader = function () {
        this.each(function () {
            if ($(this).is('table')) {
                var $table = $(this);
                //On repère le haut du tableau de référence
                var tableOffset = $table.offset().top;

                //On créer un tableau dans lequel on clone le header du tableau de référence
                var $header = $table.children('thead').clone();
                $table.after('<table id="header-fixed" style="position:fixed; top:0px; display:none;"></table');
                var $fixedHeader = $("#header-fixed").append($header);

                //Event permettant de reconstruire le header lors d'un changement de taille ou du nombre de colonnes
                $($fixedHeader).on('refreshHead', function () {
                    $($fixedHeader).css('width', $table.width());
                    $($fixedHeader).find('thead th').each(function () {
                        $(this).css('display', $table.find('th[id=' + $(this).attr('id') + ']').css('display'));
                        $(this).width($table.find('th[id=' + $(this).attr('id') + ']').width());
                    });
                    //On affiche pas le header fixe si le tableau est plus large que le conteneur
                    if ($('div.scroll-table-wrapper')) {
                        if ($('div.scroll-table-wrapper').hasScrollBar()) {
                            $fixedHeader.css('display', 'none');
                        }
                    }
                    //On refresh au chargement de la page
                }).trigger('refreshHead');

                //affiche on scroll
                $(window).on("scroll", function () {
                    var offset = $(this).scrollTop();
                    if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
                        if ($('div.scroll-table-wrapper')) {
                            if (!($('div.scroll-table-wrapper').hasScrollBar())) {
                                $fixedHeader.show();
                            }
                        }
                    }
                    else if (offset < tableOffset) {
                        $fixedHeader.hide();
                    }
                });
                //refresh on resize
                $(window).on("resize", function () {
                    $($fixedHeader).trigger('refreshHead');
                    tableOffset = $table.offset().top;

                });
                //refresh on show
                $table.find('thead th').on("show", function () {
                    $($fixedHeader).trigger('refreshHead');
                });
                //refresh on hide
                $table.find('thead th').on("hide", function () {
                    $($fixedHeader).trigger('refreshHead');
                });
            } else {
                console.log('Plugin stickyTableHeader: Element is not a table');
            }
        });
        return this;
    };
})(jQuery);