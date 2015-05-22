function cbChange(a, b, c, d) {
    $(a).val(b), $(c).text(d)
}
$.extend(jQuery.fn.dataTableExt.oSort, {"date-uk-pre": function(a) {
        var b;
        try {
            var c = a.replace(/ /g, "").split("/"), d = parseInt(c[0], 10), e = parseInt(c[1], 10), f = parseInt(c[2], 10), g = new Date(f, e - 1, d);
            b = g.getTime()
        } catch (h) {
            b = (new Date).getTime()
        }
        return b
    },"date-uk-asc": function(a, b) {
        return a - b
    },"date-uk-desc": function(a, b) {
        return b - a
    }}), $(function() {
    $("#dataTable").DataTable({iDisplayLength: -1,aLengthMenu: [[5, 10, 20, -1], [5, 10, 20, "---"]],aoColumnDefs: [{bSortable: !1,aTargets: [0]}]}), $("#dataTable2").DataTable({iDisplayLength: -1,aLengthMenu: [[5, 10, 20, -1], [5, 10, 20, "---"]],aoColumnDefs: [{bSortable: !1,aTargets: [0, 9]}, {sType: "date-uk",aTargets: [5]}],aaSorting: [[1, "desc"]]}), $("#dataTable4").DataTable({iDisplayLength: -1,aoColumnDefs: [{bSortable: !1}],aaSorting: !1}), $("#dataTable4a").DataTable({iDisplayLength: -1,aoColumnDefs: [{bSortable: !1}],aaSorting: !1}), $("#dataTable4b").DataTable({iDisplayLength: -1,aoColumnDefs: [{bSortable: !1}],aaSorting: !1});
    $("#dataTable").css("width", "100%"), $("#dataTable2").css("width", "100%"), $(".resizer").click(function(a) {
        $(this).hasClass("open") ? ($(this).removeClass("open"), $(".sidebarContent").fadeIn(), $(".sidebar").animate({left: "-500px"}), $("#mainContent").removeClass("col-xs-offset-2").removeClass("col-xs-10").addClass("col-xs-12"), $(this).removeClass("col-xs-offset-2")) : ($(this).addClass("open"), $(".sidebarContent").fadeOut(), $(".sidebar").animate({left: "0"}), $("#mainContent").addClass("col-xs-offset-2").addClass("col-xs-10").removeClass("col-xs-12"), $(this).addClass("col-xs-offset-2")), a.stopPropagation()
    });
    try {
        $(".select1").select2().on("change", function() {
            $(".select2-container").css("width", "100%"), $(".select2-choice").css("width", "100%")
        })
    } catch (a) {
    }
    $(".select2-container").css("width", "100%"), $(".select2-choice").css("width", "100%"), $(".yellow td:nth-child(3)").addClass("rectYellow"), $(".red td:nth-child(3)").addClass("rectRect"), $(".blue td:nth-child(3)").addClass("rectBlue"), $(".blue2 td:nth-child(3)").addClass("rectBlue2"), $(".green td:nth-child(3)").addClass("rectGreen"), $(".violet td:nth-child(3)").addClass("rectViolet")
});
