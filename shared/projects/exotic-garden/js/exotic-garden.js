jQuery(document).ready(function($){

    $("#intro #intro-content").slideUp(0).delay(1500).fadeIn(750);
    $("#intro #intro-content h1").slideUp(0).delay(3600).slideDown(1250);
    $("#intro #intro-content h2").slideUp(0).delay(5000).slideDown(750);

    // slider    
    $("a").click( function(){ 
        $("#intro-content h1").slideUp(0).delay(3600).slideDown(1250);
    });
    
    // Stop YouTube video on Modalbox.close
    $(".modal-open").click(function() { 
        $("html").addClass("overflow-hidden"); 
        $(".cd-slider-navigation").slideUp(150); 
        $("#header").delay(500).slideUp(150); 
    });
    $('iframe[src*="https://www.youtube.com/embed/"]').addClass("youtube-video");
    $(".modal-close").click(function() {
        $('.youtube-video').each(function(index) {
            $(this).attr('src', $(this).attr('src'));
            return false;
        });
        $("html").removeClass("overflow-hidden");
        $(".cd-slider-navigation").delay(850).slideDown(350); 
        $("#header").delay(300).slideDown(350); 
    });


    
    /* 
        Modalboxes 
    */

    /* Tour detais */
    $(".modal-open#tour-details-01").click(function() {
        $("#tour-details-01-content").slideDown();
        $("#tour-details-02-content, #tour-details-03-content").slideUp();
    });
    $(".modal-open#tour-details-02").click(function() {
        $("#tour-details-02-content").slideDown();
        $("#tour-details-01-content, #tour-details-03-content").slideUp();
    });
    $(".modal-open#tour-details-03").click(function() {
        $("#tour-details-03-content").slideDown();
        $("#tour-details-01-content, #tour-details-02-content").slideUp();
    });

    /* Workshop detais */
    $(".modal-open#workshop-details-01").click(function() {
        $("#workshop-details-01-content").slideDown();
        $("#workshop-details-02-content, #workshop-details-03-content, #workshop-details-04-content").slideUp();
    });
    $(".modal-open#workshop-details-02").click(function() {
        $("#workshop-details-02-content").slideDown();
        $("#workshop-details-01-content, #workshop-details-03-content, #workshop-details-04-content").slideUp();
    });
    $(".modal-open#workshop-details-03").click(function() {
        $("#workshop-details-03-content").slideDown();
        $("#workshop-details-01-content, #workshop-details-02-content, #workshop-details-04-content").slideUp();
    });
    $(".modal-open#workshop-details-04").click(function() {
        $("#workshop-details-04-content").slideDown();
        $("#workshop-details-01-content, #workshop-details-02-content, #workshop-details-03-content").slideUp();
    });

});