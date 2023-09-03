/* 
    ****************************
    ********* GRUPO 06 *********
    ****************************
    * CIA DE ATORES INVISIVEIS *
    ****************************
*/


// Splash Screen
$(document).ready(function(){
    $("#splash").delay(250).delay(5500).slideUp(750);
    $("#splash-logo").delay(250).animate({top: '0'}).delay(200).animate({top: '15%'}, 500).delay(4450).slideUp(500);
    $("#splash-logo-01").delay(500).slideDown(500);
    $("#splash-logo-02").delay(800).slideDown(800);
    $("#splash-logo-03").delay(2000).fadeIn(500);
    $("#splash-logo-04").delay(2600).slideDown(500);
    $("#splash-logo-05").delay(2900).slideDown(500);
    $(".sidebar-nav").hide(0).delay(6500).slideDown(500);
    $("#page-content-wrapper").hide(0).delay(7250).slideDown(1000);
});

// Menu Toggle Script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("opened");
});

// Navigation
$(window).scroll(function() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
        $('#page-content-wrapper section').each(function(i) {
            if ($(this).position().top <= windscroll - 20) {
                $('.nav-link.active').removeClass('active');
                $('.nav-link').eq(i).addClass('active');
            }
        });
    } else {
        $('.nav-linknav').removeClass('fixed');
        $('.nav-link.active').removeClass('active');
        $('.nav-link:first').addClass('active');
    }
}).scroll();

// Menu Mobile or Desktop
$(document).ready(function(){
    var current_width = $(window).width();
    // Mobile
    if(current_width < 750)
        $('html').removeClass("desktop").addClass("mobile");
        $('#wrapper').removeClass("opened");
        $('#page-content-wrapper, .mobile .sidebar-nav a').click(function(){
            $('.mobile #wrapper').removeClass("opened");
            swiper_home.update()
            swiper_galeria.update()
        }); 
    // Desktop
    if(current_width > 751)
        $('html').removeClass("mobile").addClass("desktop");
        $('#wrapper').addClass("opened");
        $('.desktop .sidebar-nav a').click(function(){
            swiper_galeria.update()
        }); 
});
$(window).resize(function(){
    var current_width = $(window).width();
    if(current_width < 750)
        $('html').removeClass("desktop").addClass("mobile");
        $('.mobile #wrapper').removeClass("opened");
    if(current_width > 751)
        $('html').removeClass("mobile").addClass("desktop");
        $('.desktop #wrapper').addClass("opened");
});

// Smooth Scroll
$('.sidebar-nav a').click(function(){
   // $('h1').slideUp(250);
   // $('p').slideUp(350);
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 750);
   // $('h1').delay(1000).slideDown(350);
   // $('p').delay(1250).slideDown(500);
    return false;
});
