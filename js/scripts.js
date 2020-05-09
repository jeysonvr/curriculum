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

// Load background video

console.log('se ejecuto');
$('.sections').tubular({
    videoId: 'HujI6v38Y0c',
    wrapperZIndex: -1
});


// Tout tip guide

$(document).ready(function($) {
    if( $(document).width() > 999 ) {
        $.ttgTour({
            next   : "Siguiente",
            prev   : "Anterior",
            finish : "Lo tengo!",
            elements:[{
                id:      "navbar",
                title:   "Conoce mi página",
                content: "Aquí encontrarás mis experiencias y proyectos más recientes.",
                img:     "plugins/tourtipguide/static/img/right_click.png"
            },
            {
                id:      "btnMoreOptions",
                title:   "¿Quieres contactarme?",
                color:   "#5DB4D8",
                content: "Dando clic aquí, podrás envirme un mensaje (y seguirme en instagram)",
                fa:      "fa-envelope-o",
                position:"bottom"
            },
            {
                id:      "socialMedia",
                title:   "Por último!",
                color:   "#D75452",
                fa:      "fa-star-o fa-spin",
                content: "Si quieres conocer más de mi, aquí te dejo mis redes sociales",
                img:     "plugins/tourtipguide/static/img/right_click.png",
                position:"top"
            }]
        });
    } else {
        $(document).ready(function($) {

			$.ttgSlideshow({
				color: "#540DA9",
				animation: "bounceIn",
				closebutton: "Ok!",
                elements:[{
                        img: 'plugins/tourtipguide/static/img/comments.jpg',
                        imgclass:'demoImg1', // I create custom class for a better style
                        content: 'Conoce mi página <br><br> Aquí encontrarás mis experiencias y proyectos más recientes.'
                    },
                    {
                        img: 'plugins/tourtipguide/static/img/touch.png',
                        imgclass:'demoImg2', // I create custom class for a better style
                        content: 'Podrás envirme un mensaje <b>y seguirme en instagram</b>'
                    },
                    {
                        fa: 'fa-star-o fa-3x',
                        iconcolor: "#1f7cba",
                        content: 'También encontrarás mis redes sociales (Para que me conozcas más y te enteres de mis nuevos proyectos)'
                    }]
       		 });	
		});
    }

});


// 8XXwZXPej3Q
// U6QMlmIeIG8
// HujI6v38Y0c
// XkagRCnJyV8
// $("#wrapper").append(tubularContainer);