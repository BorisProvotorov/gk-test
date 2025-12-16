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

    function resizeContent() {
        if ($(".rubric-news").length > 0) {
            if (window.innerWidth > 768) {
                $(".rubric-news").removeClass('hide')
            } else if (window.innerWidth <= 768) {
                $(".rubric-news").addClass('hide')

                $(document).on('click', '.rubric-item__toggle', function() {
                    $(".rubric-news").toggleClass('hide')
                    slider.slick("slickSetOption", "draggable", true, true)
                })
            };
        }
    }

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

    //Показ нижнего баннера когда докрутили до него
    function handleShowBannerFix() {
        var bannerFixed = document.querySelector('.banner-wide--fixed');
        var mainHeader = document.querySelector('.top-container');
        var headerRect = mainHeader.getBoundingClientRect();

        if (bannerFixed && headerRect.bottom < 0) {
            bannerFixed.classList.add('banner-wide--fixed-show');
        }
    }

    function handleIsHasBanner(bannerMainParent, idPseudoEl) {
        var pseudoEl = document.createElement('div');
        pseudoEl.setAttribute('id', idPseudoEl);
        bannerMainParent.prepend(pseudoEl);

        console.log(bannerMainParent.querySelectorAll('#is-banner').length, bannerMainParent.children.length);

        if (bannerMainParent.querySelectorAll('#is-banner').length === 1 && bannerMainParent.children.length === 1) {
            return false;
        }

        if (bannerMainParent.querySelectorAll('#is-banner').length === 1 && bannerMainParent.children.length > 1) {
            return true;
        }

        return false;
    }

    if (window.innerWidth <= 767 && sessionStorage.getItem('mobile_item_show') === null) {

        setTimeout(function() {
            console.log(document.querySelector('#check_banner'));
            var pseudoEl = document.createElement('div');
            pseudoEl.setAttribute('id', 'my-id');
            document.querySelector('#check_banner').append(pseudoEl);

        }, 5000);

        //Поочередное появление баннеров: верхнего, пуш и нижнего фиксированного
        function handleAlternatelyShowBanners() {
            var pushBanner = document.querySelector('#float-banner');
            var pushBannerClose = document.querySelector('.push-bunner__close');
            var pushBannerContainer = document.querySelector('#check_banner');

            function handleShowPushBanner() {
                if (!handleIsHasBanner(pushBannerContainer, 'is-banner')) {
                    pushBanner.classList.remove('is-open');
                } else {
                    pushBanner.classList.add('is-open');
                    document.body.style = "overflow: hidden;"
                }
            }

            function handleHidePushBanner() {
                pushBanner.classList.remove('is-open');
                document.body.removeAttribute('style');

                setTimeout(function() {
                    window.addEventListener('scroll', function() {
                        var scrollTop = window.pageYOffset;
                        var windowHeight = window.innerHeight;
                        var documentHeight = document.body.clientHeight;
                        var percentScroll = (scrollTop / (documentHeight - windowHeight)) * 100;

                        //Процент прокрутки определяем в настройках админки
                        var bannerFixed = document.querySelector('.banner-wide--fixed');
                        var scrollPagePercent = bannerFixed.getAttribute('data-scroll-percent');

                        if (percentScroll > scrollPagePercent) {
                            handleShowBannerFix();
                        }
                    });
                }, 500);
            };

            var observerPush = new MutationObserver(function(mutations) {
                var addedNodes = mutations[0].addedNodes.length;
                if (addedNodes > 0) {
                    setTimeout(function() {
                        handleShowPushBanner();

                        pushBanner.classList.add('is-open');
                        document.body.style = "overflow: hidden;"
                    }, 500);

                    sessionStorage.setItem('mobile_item_show', true);
                }

                this.disconnect();
            });

            handleShowPushBanner();

            if (pushBannerContainer) {
                observerPush.observe(pushBannerContainer, {
                    childList: true,
                });
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

            handleAlternatelyShowBanners();

            observerTopBanner.observe(topBannerContainer, {
                childList: true,
            });

        }
    }

    if (window.innerWidth > 1024) {
        window.addEventListener('scroll', handleShowBannerFix);

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


    var client = new ClientJS();
    var fingerprint = client.getCanvasPrint();
    var text = fingerprint.toString();
    var setCookie = function setCookie(name, value, days, path, domain, secure) {
        var cookie = "".concat(name, "=").concat(encodeURIComponent(value));

        // Add expiry date
        if (days) {
            var expiry = new Date();
            expiry.setDate(expiry.getDate() + days);
            cookie += "; expires=".concat(expiry.toUTCString());
        }

        // Add Path, Domain, and Secure
        if (path) cookie += "; path=".concat(path);
        if (domain) cookie += "; domain=".concat(domain);
        if (secure) cookie += "; secure";

        // Set an HTTP cookie
        document.cookie = cookie;
    };
    setCookie('userhash', forge_sha256(text), 90);
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

            for (var i = 0; i < Object.keys(reactionsArr[0]).length; i += 1) {
                var index = i + 1;
                var reactionValue = reactionsArr[0][index];
                reactionItems += '<a class="reactions__item" data-reaction="s' + (index) + '">' +
                    '<img class="reactions__icon" width="20" height="20" src="img/icon-reaction-s' + (index) + '.svg" alt="">' +
                    '<span class="reactions__value">' + reactionValue + '</span></a>'
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
                            url: "/?reaction=" + urlSetReaction,
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