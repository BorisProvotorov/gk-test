$(document).ready(function() {
    // везде: открытие бокового меню
    function openMenu() {
        $('.burger-panel').css({
            'animation-name': 'toRight',
            'animation-duration': '0.3s',
            'animation-timing-function': 'linear',
        });
        $(".background").addClass("opened");
        $("html").addClass("no-scroll");
    };

    // везде: закрытие бокового меню
    function closeMenu() {
        $('.burger-panel').css({
            'animation-name': 'toLeft',
            'animation-duration': '0.3s',
            'animation-timing-function': 'linear'
        });

        setTimeout(function() {
            $(".background").removeClass("opened");
            $("html").removeClass("no-scroll");
        }, 300);
    };

    // модалка: показать/ скрыть пароль
    var passButton = $('.modal__password-btn');

    passButton.click(function() {
        var pasInput = $(this).prev();
        var typeInput = pasInput.attr('type');
        if (typeInput === 'password') {
            $(this).addClass('modal__password-btn-open');
            pasInput.prop("type", "text")
        } else if (typeInput === 'text') {
            $(this).removeClass('modal__password-btn-open');
            pasInput.prop("type", "password");
        }
    });

    const $rubricNews = $(".rubric-news");
    const $toggleBtn = $(document); // будем использовать делегирование
    
    // Инициализируем обработчик клика один раз (делегирование)
    $toggleBtn.on('click', '.rubric-item__toggle', function () {
        $rubricNews.toggleClass('hide');
        // Предполагается, что `slider` определён в глобальной/родительской области видимости
        if (typeof slider !== 'undefined' && slider.slick) {
            slider.slick("slickSetOption", "draggable", true, true);
        }
    });
    
    function resizeContent() {
        if (!$rubricNews.length) return;
    
        if (window.innerWidth > 768) {
            $rubricNews.removeClass('hide');
        } else {
            $rubricNews.addClass('hide');
        }
    }
    
    // Запуск при инициализации
    resizeContent();

    // везде: закрыть горячую новость
    $(".attention .button--close").click(function(evt) {
        evt.preventDefault();
        $(this).closest(".attention").css({
            display: "none"
        });
    });

    // везде: нижний фиксированный баннер ПЕРЕДЕЛАТЬ НА ФУНКЦИИ
    $(".button--banner").click(function(evt) {
        evt.preventDefault();
        $(this).toggleClass("button--banner-close");
        var elem = $(this).closest(".banner-wide--fixed");

        if (window.innerWidth > 1024) {
            if (elem.hasClass("banner-wide--fixed-desc-open") == true) {
                elem.removeClass("banner-wide--fixed-desc-open");
            } else {
                elem.addClass("banner-wide--fixed-desc-open");
            }
        } else {
            elem.removeClass("banner-wide--fixed-desc-open");
        }
    });

    $(".button--burger").click(function(evt) {
        evt.preventDefault();
        if ($(".burger-panel").hasClass("opened-flex") == false) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    $(".button--dark-close").click(function() {
        if ($(".burger-panel").hasClass("opened-flex") == true) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    $(".background").click(function() {
        closeMenu();
    });

    // toggle вход/ регистрация

    $(".enter__link").click(function() {
        $(".modal-enter__button").removeClass("modal-enter__button--active");
        if ($(this).data("btn") == "enter") {
            $("#enterbtn").addClass("modal-enter__button--active");
            $(".login").show();
            $(".registration").hide();
        } else if ($(this).data("btn") == "registr") {
            $("#registrbtn").addClass("modal-enter__button--active");
            $(".login").hide();
            $(".registration").show();
        }
    });

    $("#enterbtn").click(function() {
        $(".modal-enter__button").removeClass("modal-enter__button--active");
        $("#enterbtn").addClass("modal-enter__button--active")
        $(".login").show();
        $(".registration").hide();
    });

    $("#registrbtn").click(function() {
        $(".modal-enter__button").removeClass("modal-enter__button--active");
        $("#registrbtn").addClass("modal-enter__button--active")
        $(".login").hide();
        $(".registration").show();
    });

    // переворот стрелочки
    $(".button--arrow").click(function() {
        $(this).toggleClass("button--arrow--rotate");
    });

    $(".button[data-button='hotnews']").click(function() {
        $(".news-feed").slideToggle().toggleClass("closed");
    });

    // modals
    $(".search__link").fancybox();

    $(".modal-enter__link").click(function() {
        $.fancybox.close(true);
    });

    // закрытие нижнего баннера
    $('.button--fixbanner-close').click(function(evt) {
        evt.preventDefault()
        $(this).closest('.banner-wide--fixed').remove()
    });

    // sliders
    // ГЛАВНАЯ слайдер рубрик
    if ($('.is-js-rubric-slider').length > 0) {
        var slider = $('.is-js-rubric-slider').slick({
            fade: true,
            cssEase: 'linear',
            adaptiveHeight: true,
            prevArrow: $('.slick-prev'),
            nextArrow: $('.slick-next'),
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            }]
        });

        $('.is-js-rubric-slider').removeClass('hide')
    }

    if ($('.third-card-slider').length > 0) {
        $('.third-card-slider').slick({
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true
        });

        $('.third-card-slider').removeClass('visually-hide')
    }

    if ($('.half-card-slider').length > 0) {
        $('.half-card-slider').slick({
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true
        });

        $('.half-card-slider').removeClass('visually-hide')
    }

    if ($('.photorep-slider').length > 0) {
        $('.photorep-slider').slick({
            dots: true,
            adaptiveHeight: true,
        })

        $('.photorep-slider').removeClass('hide')
    }

    // commercial
    if ($('.review').length > 0) {
        $('.review').slick({
            speed: 500,
            adaptiveHeight: true,
            arrows: true,
            autoplay: true
        });

        $('.review').removeClass('hide')
    }

    // добавить смайлы
    if ($('.progect-textarea--add-comment').hasClass('add-smile')) {
        var emojiPicker = $(".add-smile").emojioneArea({
            events: {
                keyup: function(button, event) {
                    if (event.key === 'Escape') {
                        this.hidePicker();
                        $('.add-comment__smile').removeClass('active');
                    }
                },
                keypress: function(button, event) {
                    this.hidePicker();
                    $('.add-comment__smile').removeClass('active');
                }
            }
        });

        emojiPicker[0].emojioneArea.on('blur', function() {
            $('.add-comment__smile').removeClass('active');
        });

    }

    $('.add-comment__smile-open').on('click', function() {
        $('.add-comment__smile').addClass('active');
        $(".emojionearea-button-open").trigger("click");
    });


    $('.add-comment__smile-close').on('click', function() {
        $('.add-comment__smile').removeClass('active');
        $(".emojionearea-button-close").trigger("click");
    });

    $(window).resize(function() {

        if (window.innerWidth > 1024) {
            $(window).scroll(function() {
                var left = $(this).scrollLeft();
                $('.headhesive').css({
                    'left': -left,
                    'min-width': "1280px"
                });
            });

            $('.news-feed').removeClass('closed')
            $('.news-feed').removeAttr('style')

        } else if (window.innerWidth <= 1024) {
            $(window).scroll(function() {
                $('.headhesive').removeAttr('style')
            })

            $(".button--banner").removeClass("button--banner-close");
            $(".banner-wide--fixed").removeClass("banner-wide--fixed-desc-open")

        }

        resizeContent()

    });

    if (window.innerWidth <= 1024) {
        $(".rubric__news").hide();
        $(".rubric__more").hide();
        $(".rubric__sub-text").click(function() {
            $(".rubric__news").toggle();
            $(".rubric__more").toggle();
            slider.slick("slickSetOption", "adaptiveHeight", true, true);
        });
    }

    function getScrollPercentPage() {
        var scrollTop = window.pageYOffset;
        var windowHeight = window.innerHeight;
        var documentHeight = document.body.clientHeight;
        var percentScroll = (scrollTop / (documentHeight - windowHeight)) * 100;

        return percentScroll;
    }


    function handleShowBannerFix() {
        var bannerFixed = document.querySelector('.banner-wide--fixed');
        var scrollPagePercent = bannerFixed.getAttribute('data-scroll-percent');

        if (getScrollPercentPage() > scrollPagePercent) {
            bannerFixed.classList.add('banner-wide--fixed-show');
        }
    }

    if (window.innerWidth <= 767 && sessionStorage.getItem('mobile_item_show') === null) {
        var pushBannerContainer = document.querySelector('#check_banner');
        var observerPushpushBanner;

        var observerPush = new MutationObserver(function(mutations) {
            var addedNodes = mutations[0].addedNodes.length;
            observerPushpushBanner = addedNodes;
            this.disconnect();
        });

        if (pushBannerContainer) {
            observerPush.observe(pushBannerContainer, {
                childList: true,
            });
        }
        //Поочередное появление баннеров: верхнего, пуш и нижнего фиксированного
        function handleAlternatelyShowBanners() {
            var pushBanner = document.querySelector('#float-banner');
            var pushBannerClose = document.querySelector('.push-bunner__close');


            function handleShowPushBanner() {
                pushBanner.classList.add('is-open');
                document.body.style = "overflow: hidden;"
            }

            function handleHidePushBanner() {
                pushBanner.classList.remove('is-open');
                document.body.removeAttribute('style');
            };

            if (observerPushpushBanner > 0) {

                setTimeout(function() {
                    handleShowPushBanner();

                    pushBanner.classList.add('is-open');
                    document.body.style = "overflow: hidden;"
                }, 500);

                sessionStorage.setItem('mobile_item_show', true);
            }

            if (pushBannerClose) {
                pushBannerClose.addEventListener('click', function() {
                    handleHidePushBanner();
                });
            }
        }

        var topBannerContainer = document.querySelector('#top-banner');
        if (topBannerContainer) {

            var observerTopBanner = new MutationObserver(function(mutations) {
                var addedNodes = mutations[0].addedNodes.length;

                if (addedNodes > 0) {
                    handleAlternatelyShowBanners();
                }

                this.disconnect();
            });

            observerTopBanner.observe(topBannerContainer, {
                childList: true,
            });

        }
    }

    window.onload = function() {
        window.addEventListener('scroll', handleShowBannerFix);
    }

    if (window.innerWidth > 1024) {

        $(window).scroll(function() {
            var left = $(this).scrollLeft();
            $('.headhesive').css({
                'left': -left,
                'min-width': "1280px"
            });
        });
    } else if (window.innerWidth <= 1024) {
        $(window).scroll(function() {
            $('.headhesive').removeAttr('style')
        })
    }

    // var uniqueid = $.cookie('uniqueid');
    // if (!uniqueid) {
    //     var client = new ClientJS();
    //     var fingerprint = client.getCanvasPrint();
    //     var text = fingerprint.toString();
    //     $.cookie('uniqueid', forge_sha256(text), { expires: 90, path: '/' });
    // }
});

$(document).ready(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400 && $(this).scrollTop() < 410 && window.innerWidth < 767) {
            $('.news-fix').addClass('show'); // отображаем кнопку
        }
        if ($(this).scrollTop() < 400 && window.innerWidth < 767) {
            $('.news-fix').removeClass('show');
        }
    });

    var reactions = document.querySelector('.reactions');
    if (reactions) {

        var reactionItemsRender = function(reactionsArr) {
            var reactionItems = '';
            if (typeof reactionsArr === 'object' || Array.isArray(reactionsArr)) {
                for (var i = 0; i < Object.keys(reactionsArr).length; i += 1) {
                    var index = i + 1;
                    var reactionValue = reactionsArr[index];
                    reactionItems += '<button class="reactions__item" data-reaction="' + (index) + '">' +
                        '<img class="reactions__icon"  width="20" height="20" src="/static/img/icon-reaction-s' + (index) + '.svg" loading="lazy" alt="">' +
                        '<span class="reactions__value">' + reactionValue + '</span></button>'
                }
            }

            return reactionItems;
        }

        //Вывод количества реакций
        var urlGetReaction = reactions.getAttribute('data-reaction-url');
        $.ajax({
            url: urlGetReaction,
            type: "GET",
            success: function(data) {

                var reactionsArr = data;
                reactions.innerHTML = reactionItemsRender(reactionsArr);

                reactions.addEventListener('click', function(evt) {
                    var urlSetReaction = evt.target.getAttribute('data-reaction');
                    console.log(urlSetReaction);

                    if (urlSetReaction) {
                        $.ajax({
                            url: urlGetReaction + "?reaction=" + urlSetReaction,
                            type: "GET",
                            success: function(data) {

                                var reactionsArr = data;
                                for (var i = 0; i < Object.keys(reactionsArr[0]).length; i += 1) {
                                    reactions.children[i].children[1].textContent = reactionsArr[0][i + 1];
                                }
                            },
                            error: function() {
                                console.log("Возникла ошибка");
                            },
                        });
                    }
                });

            },
            error: function() {
                console.log("Возникла ошибка");
            },
        });
    }

});

$('.news-fix__close').on('click touchstart', function() {
    $('.news-fix').removeClass('show');
});

// Cookies
const btnCookies = document.querySelector('.notifycation__button');
const notifyCookies = document.querySelector('.notifycation');
const valueCookies = document.cookie.match(/notify=(.+?)(;|$)/);
const headerTop = document.querySelector('.headhesive');

if (!valueCookies) {
  notifyCookies.classList.add('active');
  // поджимаем окно вверх при аннимации header в процессе scroll
  headerTop && window.addEventListener("scroll", () => {
    setTimeout(() => {
      if(headerTop.classList.contains('headhesive--stick')) {
        notifyCookies.classList.add('add-gap')
      } else {
        notifyCookies.classList.remove('add-gap')
      };
    }, 200);
  });
} else {
  notifyCookies.classList.remove('active');
  document.cookie = 'notify=true; expires=Tue, 19 Jan 2038 03:14:07 GMT;';
  setTimeout(() => {
    notifyCookies.remove();  
  }, 400)
};
const date = new Date();
btnCookies && btnCookies.addEventListener('click', () => {
  document.cookie = `notify=true; expires=Tue, 19 Jan 2038 03:14:07 GMT;`;
  notifyCookies.classList.remove('active');
  setTimeout(() => {
    notifyCookies.remove();
  }, 400)
});