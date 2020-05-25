$('.header-action-button').on('click', function(event) {
    event.preventDefault();
    $('.slide-out-overlay').fadeIn(250);
    $('.slide-out').addClass('open');
});

$('.slide-out-close').on('click', function(event) {
    event.preventDefault();
    $('.slide-out-overlay').fadeOut(250);
    $('.slide-out').removeClass('open');
});
$('.slide-out-overlay').on('click', function(event) {
    event.preventDefault();
    $('.slide-out-overlay').fadeOut(250);
    $('.slide-out').removeClass('open');
});

$('.nav-link').click(function(e) {
    e.preventDefault();
    var hrefTarget = $(this).attr('href');
    var nextPosition = $('#' + hrefTarget).position().left;
    var prevPosition = $('.sections-wraper').scrollLeft();


    $('.sections-wraper').animate({ scrollLeft: prevPosition + nextPosition }, 500);
    $('.active').removeClass('active');
    $('.nav-item a[href="' + hrefTarget + '"]').parent('li').addClass('active');
});

$('.nav-link[href="section3"]').click(function() {
    setTimeout(function() {
        $('div.progress-bar').each(function() {
            $(this).css('width', $(this).attr('aria-valuenow') + '%');

            $('.conocimientoEspecifico .row img.animate').addClass('animated pulse');
            $('.conocimientoEspecifico .row img.animate').removeClass('animate');

            $('.languageSkill img').addClass('animated flipInY');
            $('.languageSkill img').css('opacity', '1');


            // console.log($(this).attr('aria-valuenow'))
        });
    }, 510);

});


// Tout tip guide

$(document).ready(function($) {
    if (!getCookie('ttg')) {

        if ($(document).width() > 999) {
            $.ttgTour({
                next: "Siguiente",
                prev: "Anterior",
                finish: "Lo tengo!",
                elements: [{
                        id: "navbarOptions",
                        title: "Conoce mi página",
                        color: "#32a3b5d9",
                        content: "Aquí encontrarás mis experiencias y proyectos más recientes.",
                        img: "images/icons/logo.png"
                    },
                    {
                        id: "btnMoreOptions",
                        title: "¿Quieres contactarme?",
                        color: "#32a3b5d9",
                        content: "Dando clic aquí, podrás envirme un mensaje (y seguirme en instagram)",
                        fa: "fa-envelope-o",
                        position: "bottom"
                    },
                    {
                        id: "socialMedia",
                        title: "Por último!",
                        color: "#32a3b5d9",
                        fa: "fa-star-o fa-spin",
                        content: "Si quieres conocer más de mi, aquí te dejo mis redes sociales",
                        img: "plugins/tourtipguide/static/img/right_click.png",
                        position: "top"
                    }
                ]
            });
        } else {
            $(document).ready(function($) {

                $.ttgSlideshow({
                    color: "#32a3b5d9",
                    animation: "bounceIn",
                    closebutton: "Ok!",
                    elements: [{
                            img: 'images/icons/test.png',
                            imgclass: 'demoImg1',
                            content: 'Conoce mi página <br><br> Aquí encontrarás mis experiencias y proyectos más recientes.'
                        },
                        {
                            img: 'images/ttg/moreOptions1.png',
                            imgclass: 'demoImg2',
                            content: 'Podrás envirme un mensaje <b>y seguirme en instagram</b>'
                        },
                        {
                            img: 'images/ttg/socialMedia1.png',
                            content: 'También encontrarás mis redes sociales (Para que me conozcas más y te enteres de mis nuevos proyectos)'
                        }
                    ]
                });
            });
        }
        setCookie('ttg', 'true', 365);
    }


});



// Cookies functions
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires = " + d.toGMTString();
    document.cookie = cname + "=" + cvalue + " ; " + expires + "; path=/;";
}


// Swipe event
$(document).ready(function() {
    let initialPos = 0;
    let finalPos = 0;

    let = $(document).width() * ($('.sections-wraper section').length - 1);

    $('.sections-wraper').on('touchstart', function(e) {
        initialPos = e.originalEvent.touches[0].pageX;
    });

    $('.sections-wraper').on('touchend', function(e) {
        finalPos = e.changedTouches[0].pageX;
        validateScroll();
    });

    const validateScroll = () => {
        if (finalPos > (initialPos + 60)) {
            $('.nav-item.active').prev().children(0).click();

        } else if (finalPos < (initialPos - 60)) {
            $('.nav-item.active').next().children(0).click();
        }
    }

});


// Validate form
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Contact form Google
                    setTimeout(() => {
                        $('#gform')[0].reset();
                        $('#gform div').last().before('<div class="msgSend">Tu mensaje se ha enviado!</div>');
                        $('#gform .msgSend').fadeIn(1000);
                    }, 1000);
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


// Masonry
$(document).ready(function() {
    setTimeout(() => {

        $('.grid').masonry({
            // set itemSelector so .grid-sizer is not used in layout
            itemSelector: '.grid-item',
            columnWidth: 350
                // percentPosition: false
        });
    }, 1000);
})