/* window.addEventListener("load", () => {


    $(function () {
        $(".box-producto").slice(0, 8).show();
        $("#loadMore").on('click', function (e) {
            e.preventDefault();
            $(".box-producto:hidden").slice(8, 16).slideDown();
            if ($(".box-producto:hidden").length == 0) {
                $("#load").fadeOut('slow');
            }
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1500);
        });
    });

    $('a[href=#top]').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.totop a').fadeIn();
        } else {
            $('.totop a').fadeOut();
        }
    });
}) */