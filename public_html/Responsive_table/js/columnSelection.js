function isEmpty(el) {
    return !$.trim(el.html());
}

$(function () {
//Create column selection buttons
    var numberCol;
    var nameCol = [];
    
    $('table thead tr th').each(function () {
        if ((isEmpty($(this)))) {
            nameCol[$(this).index()] = "col "+($(this).index()+1);
        }else{
            nameCol[$(this).index()] = $(this).text();
        }
    });
    console.log(JSON.stringify(nameCol));
    var i;
    for (i = 0; i < nameCol.length; ++i) {
        $('div.select-column .btn-group').append("<label class=\"btn btn-primary\"><input id=\"" + i + "\" type=\"checkbox\">" + nameCol[i] + "</label>");
    }


    $('div.select-column label input').click(function () {
        $(this).parent().toggleClass('active');
        numberCol=$(this).attr('id');
        console.log(numberCol);
        $('table.fixed-header thead tr th').eq(numberCol).toggle(500);
        $('table.fixed-header tbody tr').each(function () {
            $(this).children().eq(numberCol).toggle(500);
        });
    });
});
/*
 < label class = "btn btn-primary" >
 < input type = "checkbox" > Option 1
 < /label>
 */