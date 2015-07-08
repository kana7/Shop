function setHideShowColumns2(idTable) {
if ($.fn.dataTable.isDataTable('#' + idTable)){
var isDataTable = 1;
} else{
var isDataTable = 0;
        }
/*
 if (typeof $.fn.DataTable == 'function')
 if(isDataTable && !$.fn.DataTable.isDataTable( 
 '#'+$('table.tableau').attr('id')))
 return 0; //do not proceed if table is supposed to be a 
 datatable, but hasn't been initialized yet
 */
var table = $('#' + idTable);
        var container = $('<div class="table-menu table-menu-hidden"><ul/></div > ');
        table.addClass("hideShow");
        $("#" + idTable + " thead tr th, #" + idTable + " thead tr td").each(function (i) {
var th = $(this);
        id = th.attr("id");
        classes = '';
        if (th.hasClass('persist'))
        classes = classes + ' persist';
        if (th.hasClass('essential'))
        classes = classes + ' essential';
        if (th.hasClass('optional'))
        classes = classes + ' optional';
//classes = th.attr("class"); // essential, optional (or other content identifiers)
// On assigne un ID au colonne du header

// On loop sur chaque ligne pour assigner à la colonne un attribut header
//égal à l'id de la colonne header correspondante
        if (isDataTable){
var nodes = $("#" + idTable).dataTable().fnGetNodes();
        for (j = 0; j < nodes.length; j++){
cell = $(nodes[j]).find('td, th').eq(i);
        // cell.attr("headers", id);
        if (classes){
cell.addClass(classes);
}
}
} else{
$("#" + idTable + " tbody tr").each(function () {
var cell = $(this).find("th, td").eq(i);
        // cell.attr("headers", id);
        if (classes){
cell.addClass(classes);
}
});
}

// creation du menu hide/show
if (!th.is(".persist")){ //si la colonne (header) n'a pas la classe persist

// chaque attribut "value" de l'input correspond à l'id du header sur lequel il est assigné
// cette input checkbox controlera la visiblité de la colonne

//titre visible de la colonne
/*var clone = th.clone();
 clone.appendTo('body').find(':hidden').remove();
 var text = clone.text();
 clone.remove();*/
text = th.text().trim();
        if (text == '') {
text = th.data('label');
        if (text == '')
        text = th.find(':hidden').text();
}
//On créer l'input
var toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' + i + '" value="' + th.id + '"/> <label for="toggle-col-' + i + '">' + text + '</label></li>');
// On l'ajoute dans le menu
        container.find("ul").append(toggle);
// assignation de l'event sur l'input
        toggle.find("input")
// quand la checkbox est selectionnée...
        .change(function () {
        var input = $(this),
                val = input.val();
                if (isDataTable){
        if (input.is(":checked")){
        $('#' + val).show();
        } else{
        $('#' + val).hide(); //show/hide column header
        }
        cols = $('#' + idTable).DataTable().column('#' + val).nodes();
                for (j = 0; j < cols.length; j++){//show/hide non-header column elements
        if (input.is(":checked")){
        $(cols[j]).show();
        } else{
        $(cols[j]).hide();
        }
        }
        }
        else
        {
        cols = $("#" + val + ", [headers=" + val + "]");
//selecteur de la colonne
                if (input.is(":checked")) cols.show(); else cols.hide();
        }
        })
// event appellé quand la taille de fenÃªtre change ou quand elle est réorientée (mobile)
//alert($('#'+idTable+' thead td[id=' + $(this).attr('value') + 
        .on("updateCheck", function (){
//check si l'attribut table cell est appliqué
                if ($('#' + idTable + ' thead td[id=' +
                        $(this).attr('value') + '], #' + idTable + ' thead th[id=' +
                        $(this).attr('value') + ']').css('display') == 'none') {
        $(this).prop('checked', false);
        }
        else {
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
if ($('#' + idTable + ' thead tr td[id=' +
        $(this).attr('value') + '], #' + idTable + ' thead th[id=' +
        $(this).attr('value') + ']').css('display') == 'none') {
$(this).prop('checked', false);
}
else {
$(this).prop('checked', true);
}
;
});
});
        var menuWrapper = $('<div class="table-menu-wrapper" />'),
        menuBtn = $('<a href="#" 
                class = "table-menu-btn" > Affichage < /a>');

                menuBtn.click(function () {
                container.toggleClass("table-menu-hidden");
                        return false;
                });
                menuWrapper.append(menuBtn).append(container);
                table.before(menuWrapper); // on ajoute le menu avant la table
// click away pour fermer le popup menu
                $(document).click(function (e) {
        if (!$(e.target).is(container) &&
                !$(e.target).is(container.find("*"))) {
        container.addClass("table-menu-hidden");
        }
        });
        }

