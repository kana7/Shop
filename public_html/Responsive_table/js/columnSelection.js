function isEmpty(el) {
    return !$.trim(el.html());
}

//size of viewport
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
}

function showAllColumn() {
    $('div.btn-group label.active').removeClass('active');
    $('table.fixed-header tbody tr').each(function () {
        $(this).children().show();
    });
    $('table.fixed-header thead tr th').show();
    $('tfoot tr td').attr("colspan", $("table.fixed-header thead tr th:visible").size());
    $('table.fixed-header tfoot').show();
}

function renameInput(colName) {
    if (viewport().width < 768) {
        $('div.btn-group label span').each(function (index) {
            $(this).text(index+1);
        });
    } else {
        $('div.btn-group label span').each(function (index) {
            $(this).text(colName[index]);
        });
    }
}

var flag = true;
$(function () {
//Create column selection buttons
    var ColId;
    var ColName = [];
    $('table.fixed-header thead tr th').each(function () {
        ColName[$(this).index()] = $(this).text();
    });
    $('table thead tr th').each(function () {
        if (viewport().width < 768) {
            
            if ($(this).hasClass('prime')) {
                $('div.select-column .btn-group').append("<label class=\"btn btn-primary prime\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + ($(this).index() + 1) + "</span></label>");
                
            } else {
                $('div.select-column .btn-group').append("<label class=\"btn btn-primary\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + ($(this).index() + 1) + "</span></label>");
            }
            
        } else {
            if ((isEmpty($(this)))) {
                
                if ($(this).hasClass('prime')) {
                    $('div.select-column .btn-group').append("<label class=\"btn btn-primary prime\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + "col " + ($(this).index() + 1) + "</span></label>");
                    
                } else {
                    $('div.select-column .btn-group').append("<label class=\"btn btn-primary\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + "col " + ($(this).index() + 1) + "</span></label>");
                }
                
            } else {
                if ($(this).hasClass('prime')) {
                    $('div.select-column .btn-group').append("<label class=\"btn btn-primary prime\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + $(this).text() + "</span></label>");
                    
                } else {
                    $('div.select-column .btn-group').append("<label class=\"btn btn-primary\"><input id=\"" + $(this).index() + "\" type=\"checkbox\"><span>" + $(this).text() + "</span></label>");
                }
            }
        }
    });
    $('div.select-column label input').click(function () {
        $(this).parent().toggleClass('active');
        ColId = $(this).attr('id');
        $('table.fixed-header tbody tr').each(function () {
            $(this).children().eq(ColId).toggle();
        });
        $('table.fixed-header thead tr th').eq(ColId).toggle(function () {
            $('tfoot tr td').attr("colspan", $("table.fixed-header thead tr th:visible").size());
            if (($("table.fixed-header thead tr th:visible").size()) === 0) {
                $('tfoot tr td').hide();
            } else {
                $('tfoot tr td').show();
            }
        });
    });
    $(window).load(function () {
        if (viewport().width < 768) {
            flag = false;
            console.log('load');
            renameInput(null);
            $('div.select-column label input:not(div.select-column label.prime input)').click();
        }
    });
    
    $(window).resize(function () {
        if (flag) {
            if (viewport().width < 768) {
                console.log('resize to phone');
                renameInput(null);
                $('div.select-column label input:not(div.select-column label.prime input)').click();
                flag = false;
            }
        }
        if (viewport().width >= 768) {
            if (!flag) {
                console.log('resize to other');
                renameInput(ColName);
                showAllColumn();
                flag = true;
            }
        }
    });
});