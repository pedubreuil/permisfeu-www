fixNavLayout = function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").removeClass("nav-over-header");
        $(".navbar-brand").removeClass("hidden");
    } else if ($("header").length) {
        $(".navbar-fixed-top").addClass("nav-over-header");
        $(".navbar-brand").addClass("hidden");
    }
};


$(document).ready(function () {
    console.log('document ready');
    $('[data-toggle="tooltip"]').tooltip();

    //--------------------------------------
    //---- COOKIES REMOVED IF ASKED      ---

    //    $.cookieCuttr({
    //        cookieAnalytics: true,
    //        cookieNotificationLocationBottom:true,
    //        //        cookieDiscreetLink: true,
    //        cookieDeclineButton: true,
    //        //        cookiePolicyLink: "/privacy-policy/",
    //
    //        cookieAnalyticsMessage: "Ce site web fait des mesures anonymes d'audience pour en améliorer l'expérience. Acceptez-vous d'y participer ?",
    //        cookieAcceptButtonText:"J'accepte",
    //        cookieDeclineButtonText:"Je refuse",
    //        cookieResetButtonText:"Je supprime les cookies",
    //        //        cookieDiscreetLinkText:"Cookies",
    //        //        cookieDiscreetPosition:"topright",
    //        cookieWhatAreLinkText:"Qu'est ce c'est ?",
    //        cookieWhatAreTheyLink: 'http://www.cnil.fr/vos-droits/vos-traces/les-cookies/',
    //        cookieDomain: "moventes.com",
    //        reloadOnAccept: false
    //        //
    //
    //    });
    //    if( ! $.cookieDeclined() ) {
    //
    //        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    //        ga('create', 'UA-62586585-1', 'auto');
    //        ga('send', 'pageview');
    //
    //
    //        //--------------------------------------
    //        //---- MODAL displayed after timeout ---
    //
    //        if(! ($.cookie('modal_timeout')) && !$.cookie('modal_completed')){
    //            //first time
    //            console.debug('init cookie modal_timeout');
    //            $.cookie("modal_timeout", 0, { expires: 3, path: '/' });
    //        }
    //        window.setTimeout(modalTimeoutFn, refreshFrequency);
    //    }


    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------

    fixNavLayout();

    //jQuery to collapse the navbar on scroll
    $(window).scroll(function () {
        fixNavLayout();
    });

    // for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        console.log('click for page-scroll ', $(this));
        var $anchor = $(this);
        console.log($($anchor.attr('href')).offset().top);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------


    var bLazy = new Blazy({
        breakpoints: [{
                width: 768,
                src: 'data-src-small'
	     },
            {
                width: 1200, // max-width
                src: 'data-src-medium'
	   }]
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------
    //---------------------------------------------------------------


    // console.log('form',$('#contactForm'));
    $('#mc-embedded-subscribe-form').bootstrapValidator({
            message: 'Ce champ n\'est pas valide',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',
            submitButtons: 'input[type="submit"]',
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Quel est votre adresse mail?'
                        },
                        emailAddress: {
                            message: 'Une erreur dans votre adresse mail?'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();
            e.stopImmediatePropagation();

            var $form = $(e.target),
                validator = $form.data('bootstrapValidator'),
                submitButton = validator.getSubmitButton();

            var dataToSend = $form.serialize();
            console.log('data to send', dataToSend);
            $form.find(':input').prop('disabled', true)

            submitButton.replaceWith('<i class="fa fa-spinner fa-spin"></i>');

            var posting = $.post($form.attr('action'), dataToSend, function (result) {
                console.log('result', result);
            });
            posting.done(function (data) {
                console.log("done !", data);
                var response = jQuery.parseJSON(data);
                console.log('success', response.success);
                if (response.success) {
                    $(".subscription-body").empty().append('<div class="alert alert-success"  role="alert">' + response.message + '</div>');
                } else {
                    $(".subscription-body").empty().append('<div class="alert alert-danger"  role="alert">' + response.message + '<br/>Nous nous excusons pour cet incident technique.<br/> Merci de nous contacter par email : <a href="mailto:contact@moventes.com">contact@moventes.com</a></div>');
                }
            }).fail(function () {
                $(".subscription-body").empty().append('<div class="alert alert-danger"  role="alert">La requête a échoué. <br/>Nous nous excusons pour cet incident technique.<br/> Merci de nous contacter par email : <a href="mailto:contact@moventes.com">contact@moventes.com</a></div>');
            });

        });

});
