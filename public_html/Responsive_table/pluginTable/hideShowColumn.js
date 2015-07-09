/*
 * Plus de détails sur l'affichage en responsive dans hideShowColumn.css
 * 
 * Permet de générer un menu composé de checkBoxes pour afficher et cacher les colonnes d'un tableau.
 * 
 * Dans votre HTML, veillé à ce que votre tableau soit composé des balises: <thead>, <tbody>, <tfoot>.
 * Appliquer ensuite les différentes classes (persist, essential, optional) aux balises th, td de la balise thead
 * 
 * Intégrer ce fichier ainsi que le css hideShowColumn.css à votre page pour rendre le plugin fonctionnel.
 * 
 * ex: $('table').hideShowColumn();
 */

(function ($) {
    $.fn.hideShowColumn = function () {

        this.each(function () {
            if ($(this).is('table')) {
                var wrapper = '<div class="table-wrapper"></div>';
                var table = $(this); //recupere la table assigné au plug in
                var tableId = table.attr('id');
                table.wrap(wrapper); //insert la table dans un container

                //on vérifie si dataTable est activé
                var isDataTable;
                if (jQuery().dataTable) {
                    if ($.fn.dataTable.isDataTable(tableId)) {
                        isDataTable = 1;
                    } else {
                        isDataTable = 0;
                    }
                }else{
                     isDataTable = 0;
                }

                var container = $('<div class="table-menu table-menu-hidden"><ul/></div > ');

                table.addClass("hideShow");

                $("#" + tableId + " thead tr th, #" + tableId + " thead tr td").each(function (i) {
                    var th = $(this);
                    var id = th.attr("id");
                    var classes = '';
                    if (th.hasClass('persist'))
                        classes = classes + ' persist';
                    if (th.hasClass('essential'))
                        classes = classes + ' essential';
                    if (th.hasClass('optional'))
                        classes = classes + ' optional';

                    // On assigne un ID au colonne du header
                    if (!id) {
                        id = ("col-") + i;
                        th.attr("id", id);
                    }

                    /* On loop sur chaque ligne pour assigner à la colonne un attribut header égal à l'id de la colonne header correspondante */
                    var cell;
                    var j;
                    if (isDataTable) {
                        var nodes = $("#" + tableId).dataTable().fnGetNodes();
                        for (j = 0; j < nodes.length; j++) {
                            cell = $(nodes[j]).find('td, th').eq(i);
                            cell.attr("headers", id);
                            if (classes) {
                                cell.addClass(classes);
                            }
                        }
                    } else {
                        $("#" + tableId + " tbody tr").each(function () {
                            cell = $(this).find("th, td").eq(i);
                            cell.attr("headers", id);
                            if (classes) {
                                cell.addClass(classes);
                            }
                        });
                    }

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
                        //On créer l'input
                        var toggle = $('<li><input type="checkbox" name="toggle-cols" id="'+tableId+'-toggle-col-' + i + '" value="' + id + '"/><label for="'+tableId+'-toggle-col-' + i + '">' + text + '</label></li>');

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
                                            $('#'+tableId+' #'+val).show();
                                        } else {
                                            $('#'+tableId+' #'+val).hide(); //Show/hidecolumn header
                                        }
                                        cols = $('#' + tableId).DataTable().column('#' + val).nodes();
                                        for (j = 0; j < cols.length; j++) {//show/hide non-header column elements
                                            if (input.is(":checked")) {
                                                $(cols[j]).show();
                                            } else {
                                                $(cols[j]).hide();
                                            }
                                        }
                                    } else {
                                        cols = $('#'+tableId+ ' #' +val+ ',#'+tableId+' [headers=' + val + ']');
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
                                    if ($('#' + tableId + ' thead td[id=' +
                                            $(this).attr('value') + '], #' + tableId + ' thead th[id=' +
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
                //
                // update l'input au resize
                $(window).resize(function () {
                    $('.table-menu input').each(function () {
                        if ($('#' + tableId + ' thead tr td[id=' +
                                $(this).attr('value') + '], #' + tableId + ' thead th[id=' +
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
                $(table).wrap('<div class="scroll-table-wrapper" style="overflow-x:scroll; width:100%;clear:both"/>');

                // click away pour fermer le popup menu
                $(document).click(function (e) {
                    if (!$(e.target).is(container) && !$(e.target).is(container.find("*"))) {
                        container.addClass("table-menu-hidden");
                    }
                });
            } else {
                console.log('Plugin hideShowColumn: Element is not a table');
            }
        });
        return this;
    };
})(jQuery);




