$(document).ready(function () {
  const menu = $('.mobile-menu');
  function disableScroll() {
    $('body').addClass('fixed');
  }

  function enableScroll() {
    let elem = $(this).closest('.popup-container');
    $('body').removeClass('fixed');
    elem.remove();
  }
  function popupContainer() {
    $('body').on('click', '.center-block__currency', function () {
      $.get('http://data.fixer.io/api/latest?access_key=a375c76f7e493a26ebc73f7ff5450aae', function (data) {
        let container = '<div class="popup-container"><div class="popup"><p class="heading">Курс валют</p><div class="container"><div class="right-section">Курс доллара <br>&#61;<br> ' + data.rates.USD + '</div><div class="center-section"><p>Курс рубля к доллару <br>&#61;<br>' + data.rates.RUB + ' = ' + data.rates.USD + '</p></div><div class="left-section">Текущая дата <br>&#61;<br>' + data.date + '</div></div></div></div>';
        $('body').append(container);
        $('.popup-container').fadeIn(600, disableScroll);
        $('.popup').animate({
          height: '200px',
          width: '400px'
        }, 600)
      });
    });
  }
  popupContainer();
  $('body').on('click', '.popup-container', function (e) {
    if (e.target == this) {
      $(this).fadeOut(600, enableScroll);
      $('.popup').animate({
        height: 0,
        width: 0
      }, 600);
    }
  });

  function close() {
    $('body').on('click', '.mobile-menu', function (e) {
      if (e.target == this) {
        menu.fadeOut(500);
        $('.mobile-menu__list').animate({
          left: '-300px'
        }, 300)
        $('.nav-burger').removeClass('nav-burger__active');
        $('body').removeClass('fixed');
      };
    });
  };

  function arrowmenu() {
    dropmenu = $('.dropmenu');
    $('body').on('click', '.menu__link-scroll', function (e) {
      e.preventDefault();
      $('.menu__link-scroll').toggleClass('menu__link-scroll-active');
      if (dropmenu.css('display') !== 'block') {
        dropmenu.fadeIn(200);
        dropmenu.animate({ height: '195px' }, 0)
      } else if (dropmenu.css('display') !== 'none') {
        dropmenu.fadeOut();
        dropmenu.animate({ height: 0 }, 0)
      }
    });
  }
  arrowmenu();

  function mobileMenu() {
    $('body').on('click', '.nav-burger', function (e) {
      e.preventDefault;
      $(this).toggleClass('nav-burger__active');
      if (menu.css('display') !== 'block') {
        menu.fadeIn(500);
        $('.mobile-menu__list').animate({
          left: 0
        }, 500)
        $('body').toggleClass('fixed');
      } else if (menu.css('display') !== 'none') {
        menu.fadeOut(500);
        $('.mobile-menu__list').animate({
          left: '-300px'
        }, 500)
        $('.nav-burger').removeClass('nav-burger__active');
        $('body').removeClass('fixed');
      };
    });
  };
  mobileMenu();
  close();
});