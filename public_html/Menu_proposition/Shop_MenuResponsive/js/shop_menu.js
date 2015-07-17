function moveIcon() {
    var user = $('#user');
    var logout = $('#logout');
    user.detach();
    if (viewport().width >= 992) {
        user.insertAfter($('#nav>li:last'));
        logout.insertAfter($('#nav>li:last'));
    } else if (viewport().width < 992 && viewport().width >= 520) {
        user.insertBefore($('#nav>li:eq(0)'));
        logout.insertAfter($('#nav>li:eq(3)'));
    } else if (viewport().width < 519) {
        user.insertAfter($('#nav>li:eq(0)'));
        logout.insertAfter($('#nav>li:eq(1)'));
    }
}
function open_in_new_window(href) {
    window.open(href);
    return false;
}
function open_in_site_window(href) {
    window.open(href, "site");
    return false;
}
function logout(_link) {
    $(location).attr('href', _link);
}
function remove_empty_menu(i_level)
{
    if ($(".menu_level_" + i_level).length > 0)
    {
        $(".menu_level_" + i_level).each(function () {
            if ($(".child_of_" + $(this).attr("data-id_menu")).length == 0)
                $(this).remove();
        });
        remove_empty_menu(i_level + 1);
    }
}

$(function () {
    moveIcon();
    var docHeight = $('.main_zone').height();
    $('#canvas').append("<div id='overlay' class='hidden display-tab display-phone'></div>");
    $("#overlay").height(docHeight);
    // Ecoute blur
    $(window).blur(function (e) {
        $(".dropdown.open").toggleClass("open");
    });
    $(document).click(function () {
        $(".dropdown.open").toggleClass("open");
    });

    $(".dropdown").click(function (e) {
        if ($(this).hasClass("home"))
        {
            $(".open").toggleClass("open");
        } else if ($(this).hasClass("favoris") && viewport().width < 991) {
            $(".open").toggleClass("open");
            $('#overlay').addClass('open');
            $('#page').toggleClass('open-usermenu');
        } else {
            if ($(this).hasClass("open") == false)
            {
                $(".open").toggleClass("open");
            }
            $(this).toggleClass("open");
            if ($(this).hasClass("open"))
            {
                if (viewport().width > 992) {
                    $(this).find(".dropdown_menu").position(
                            {
                                of: $(this),
                                my: "left top",
                                at: "left bottom"
                            });
                } else if (viewport().width <= 992) {
                    $('.dropdown-menu').each(function () {
                        $(this).css('position', 'initial');
                    });
                }
                if ($(this).hasClass('up')) {
                    $(this).find(".dropdown_menu").position(
                            {
                                of: $(this),
                                my: "left top",
                                at: "left bottom"
                            });
                } else if (viewport().width <= 992) {
                    $('.dropdown-menu').each(function () {
                        $(this).css('position', 'initial');
                    });
                }
            }
        }
        e.stopPropagation();
        return false;
    });

    $('button.dropdown-toggle').click(function () {
        $(this).siblings('ul.dropdown-menu').toggleClass('active');
    });
    $('button#toggle-nav').click(function () {
        event.stopPropagation();
        if (viewport().width > 992) {
            $(this).toggleClass('open');
            if ($('#page').hasClass('open-usermenu')) {
                $('.LogoArea').css({"width": $('.LogoArea').innerWidth()});
                $('#userProfil').css({"width": $('#userProfil').outerWidth()});
            } else {
                $('.LogoArea').css({"width": (viewport().width) * 0.16666666666666667});
                $('#userProfil').css({"width": (viewport().width) * 0.16666666666666667});
            }
            $('#page').toggleClass('open-usermenu');
            if (('#page.open-usermenu')) {
                $('#overlay').addClass('open');
            } else {
                $('#overlay').removeClass('open');
            }
        }
    });
    $('html').click(function (event) {
        if (viewport().width <= 992) {
            var element = $('.menu_user_zone');
            if (!element.is(event.target) && element.has(event.target).length === 0) {
                $('#page.open-usermenu').removeClass('open-usermenu');
                $('#overlay.open').removeClass('open');
            }
        }
    });
    var doit;
    $(window).resize(function () {
        moveIcon();
        $('.main_zone, .menu_user_zone').addClass('notransition');
        $('.LogoArea').css({"width": "100%"});
        $('#userProfil').css({"width": "100%"});
        $('#overlay.open').removeClass('open');
        $('#page.open-usermenu').removeClass('open-usermenu');
        clearTimeout(doit);
        doit = setTimeout(function () {
            $('.main_zone.notransition, .menu_user_zone.notransition').removeClass('notransition');
        }, 100);
    });
});