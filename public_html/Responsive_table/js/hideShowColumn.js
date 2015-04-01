/*
 * Permet de générer un menu composé de checkBoxes pour afficher et cacher les colonnes d'un tableau.
 * 
 * Dans votre HTML, veillé à ce que votre tableau soit composé des balises: <thead>, <tbody>, <tfoot>.
 * assigner la classe "tableau" à votre <table>
 * Englober votre <table class="tableau"> dans un <div> de classe "table-wrapper"
 * Intégrer ce script ainsi que le css hideShowColumn.css pour rendre le script fonctionnel.
 * 
 * Plus de détails sur l'affichage en responsive dans hideShowColumn.css
 */

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
    var table = $('table.tableau');
    var container = $('<div class="table-menu table-menu-hidden"><ul /></div>');

    table.addClass("hideShow");
    table.attr('id', 'mainTab');

    $("thead th").each(function (i) {
        var th = $(this),
                id = th.attr("id"),
                classes = th.attr("class"); // essential, optional (or other content identifiers)

        // On assigne un ID au colonne du header
        if (!id) {
            id = ("col-") + i;
            th.attr("id", id);
        }
        ;
        // On loop sur chaque ligne pour assigner à la colonne un attribut header 
        //égal à l'id de la colonne header correspondante
        $("tbody tr").each(function () {
            var cell = $(this).find("th, td").eq(i);
            cell.attr("headers", id);
            if (classes) {
                cell.addClass(classes);
            }
            ;
        });

        // creation du menu hide/show
        if (!th.is(".persist")) { //si la colonne (header) n'a pas la classe persist

            // chaque attribut "value" de l'input correspond à l'id du header sur lequel il est assigné
            // cette input checkbox controlera la visiblité de la colonne

            //On créer l'input
            var toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' + i + '" value="' + id + '" /> <label for="toggle-col-' + i + '">' + th.text() + '</label></li>');

            // On l'ajoute dans le menu
            container.find("ul").append(toggle);

            // assignation de l'event sur l'input
            toggle.find("input")
                    // quand la checkbox est selectionnée...
                    .change(function () {
                        var input = $(this),
                                val = input.val(),
                                cols = $("#" + val + ", [headers=" + val + "]"); //selecteur de la colonne

                        if (input.is(":checked")) {
                            cols.show();
                        }
                        else {
                            cols.hide();
                        };
                    })
                    // event appellé quand la taille de fenêtre change ou quand elle est réorientée (mobile)
                    .on("updateCheck", function () {
                        //check si l'attibut table cell est appliqué
                        if ($('table.tableau thead th[id=' + $(this).attr('value') + ']').css("display") == 'none') {
                            $(this).attr('checked', false);
                        }
                        else {
                            $(this).attr('checked', true);
                        }
                        ;
                    })
                    // appel l'event au chargement
                    .trigger("updateCheck");

        }
        ; // fin de la condition if(!th.is(.persist))
    }); // fin du loop
    // update l'input au resize
    $(window).resize(function () {
        $('.table-menu input').each(function () {
            console.log($(this).attr('value')+":"+$('#mainTab thead th[id=' + $(this).attr('value') + ']').css("display"));
            if ($('table.tableau thead th[id=' + $(this).attr('value') + ']').css("display") == 'none') {
                $(this).prop('checked', false);
            }
            else {
                $(this).prop('checked', true);
            };
        });
    });

    var menuWrapper = $('<div class="table-menu-wrapper" />'),
            menuBtn = $('<a href="#" class="table-menu-btn">Affichage</a>');

    menuBtn.click(function () {
        container.toggleClass("table-menu-hidden");
        return false;
    });

    menuWrapper.append(menuBtn).append(container);
    table.before(menuWrapper);  // on ajoute le menu avant la table
    //
    //ajout d'un wrapper pour assigner un scroll horizontal au tableau quand trop grand
    table.wrap('<div class="wrapper"></div>');

    // click away pour fermer le popup menu
    $(document).click(function (e) {
        if (!$(e.target).is(container) && !$(e.target).is(container.find("*"))) {
            container.addClass("table-menu-hidden");
        }
    });
});