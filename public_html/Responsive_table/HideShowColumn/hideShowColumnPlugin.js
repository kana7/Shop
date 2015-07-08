/*
 * Plus de détails sur l'affichage en responsive dans hideShowColumn.css
 * 
 * Permet de générer un menu composé de checkBoxes pour afficher et cacher les colonnes d'un tableau.
 * 
 * Dans votre HTML, veillé à ce que votre tableau soit composé des balises: <thead>, <tbody>, <tfoot>.
 * assigner la classe "tableau" à votre <table>
 * Englober votre <table class="tableau"> dans un <div> de classe "table-wrapper"
 * 
 *  Ne pas oublier de créer un wrapper: $('table.tableau').wrap('<div class="wrapper" style="overflow-x:scroll; width:100%;clear:both"/>');
 * dans une balise script dans la page pour appliquer un scroll horizontal à la table quand le contenue prend trop de place.
 * 
 * 
 * Intégrer ce script ainsi que le css hideShowColumn.css pour rendre le script fonctionnel.
 * 
 * 
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

function setHideShowColumn(idTable) {
    var isDataTable;
    if ($.fn.dataTable.isDataTable('#' + idTable)) {
        isDataTable = 1;
    } else {
        isDataTable = 0;
    }
    alert(isDataTable);

    /*var table = $('table.tableau');
     var container = $('<div class="table-menu table-menu-hidden"><ul /></div>');*/

    var table = $('#' + idTable);
    var container = $('<div class="table-menu table-menu-hidden"><ul/></div > ');

    table.addClass("hideShow");
    //table.attr('id', 'mainTab');

    $("#" + idTable + " thead tr th, #" + idTable + " thead tr td").each(function (i) {
        var th = $(this),
                id = th.attr("id"),
                classes = '';
        if (th.hasClass('persist'))
            classes = classes + ' persist';
        if (th.hasClass('essential'))
            classes = classes + ' essential';
        if (th.hasClass('optional'))
            classes = classes + ' optional';
        //classes = th.attr("class"); // essential, optional (or other content identifiers)

        // On assigne un ID au colonne du header
        if (!th.id) {
            th.id = ("col-") + i;
            th.attr("id", th.id);
        }
        

        // On loop sur chaque ligne pour assigner à la colonne un attribut header
//égal à l'id de la colonne header correspondante
        var cell;
        var j;
        if (isDataTable) {
            var nodes = $("#" + idTable).dataTable().fnGetNodes();
            for (j = 0; j < nodes.length; j++) {
                cell = $(nodes[j]).find('td, th').eq(i);
                cell.attr("headers", th.id);
                if (classes) {
                    cell.addClass(classes);
                }
            }
        } else {
            $("#" + idTable + " tbody tr").each(function () {
                cell = $(this).find("th, td").eq(i);
                cell.attr("headers", th.id);
                if (classes) {
                    cell.addClass(classes);
                }
            });
        }
        // On assigne un ID au colonne du header
        /*if (!id) {
         id = ("col-") + i;
         th.attr("id", id);
         }
         ;
         // On loop sur chaque ligne pour assigner à la colonne un attribut header 
         //égal à l'id de la colonne header correspondante
         $("table.hideShow>tbody tr").each(function () {
         var cell = $(this).find("th, td").eq(i);
         cell.attr("headers", id);
         if (classes) {
         cell.addClass(classes);
         }
         ;
         });*/

        // creation du menu hide/show
        if (!th.is(".persist")) { //si la colonne (header) n'a pas la classe persist

            // chaque attribut "value" de l'input correspond à l'id du header sur lequel il est assigné
            // cette input checkbox controlera la visiblité de la colonne
            var text = th.text().trim();
            if (text === '') {
                text = th.data('label');
                if (text === '')
                    text = th.find(':hidden').text();
            }
            alert(th.id);
            //On créer l'input
            var toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' + i + '" value="' + th.id + '"/> <label for="toggle-col-' + i + '">' + text + '</label></li>');

            // On l'ajoute dans le menu
            container.find("ul").append(toggle);

            // assignation de l'event sur l'input
            toggle.find("input")
                    // quand la checkbox est selectionnée...
                    .change(function () {
                        var cols; //selecteur de la colonne
                        var input = $(this),
                                val = input.val();
                        if (isDataTable) {
                            if (input.is(':checked')) {
                                $('#' + val).show();
                            } else {
                                $('#' + val).hide(); //Show/hidecolumn header
                            }
                            cols = $('#' + idTable).DataTable().column('#' + val).nodes();
                            for (j = 0; j < cols.length; j++) {//show/hide non-header column elements
                                if (input.is(":checked")) {
                                    $(cols[j]).show();
                                } else {
                                    $(cols[j]).hide();
                                }
                            }
                        } else {
                            cols = $("#" + val + ", [headers=" + val + "]");
                            if (input.is(':checked')) {
                                cols.show();
                            } else {
                                cols.hide();
                            }
                        }
                    })

                    // event appellé quand la taille de fenêtre change ou quand elle est réorientée (mobile)
                    .on("updateCheck", function () {
                        //check si l'attibut table cell est appliqué
                        /*if ($('table.tableau thead th[id=' + $(this).attr('value') + ']').css("display") == 'none') {
                         $(this).attr('checked', false);
                         }
                         else {
                         $(this).attr('checked', true);
                         };*/

                        if ($('#' + idTable + ' thead td[id=' +
                                $(this).attr('value') + '], #' + idTable + ' thead th[id=' +
                                $(this).attr('value') + ']').css('display') === 'none') {
                            $(this).prop('checked', false);
                        } else {
                            $(this).prop('checked', true);
                        }
                    })
                    // appel l'event au chargement
                    .trigger("updateCheck");

        }
        ; // fin de la condition if(!th.is(.persist))
    }); // fin du loop
    // update l'input au resize
    $(window).resize(function () {
        $('.table-menu input').each(function () {
            /*if ($('table.tableau thead th[id=' + $(this).attr('value') + ']').css("display") == 'none') {
             $(this).prop('checked', false);
             }
             else {
             $(this).prop('checked', true);
             }*/
            if ($('#' + idTable + ' thead tr td[id=' +
                    $(this).attr('value') + '], #' + idTable + ' thead th[id=' +
                    $(this).attr('value') + ']').css('display') === 'none') {
                $(this).prop('checked', false);
            }
            else {
                $(this).prop('checked', true);
            }
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
    // click away pour fermer le popup menu
    $(document).click(function (e) {
        if (!$(e.target).is(container) && !$(e.target).is(container.find("*"))) {
            container.addClass("table-menu-hidden");
        }
    });
}