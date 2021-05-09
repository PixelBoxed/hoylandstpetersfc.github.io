(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
  
    $.fn.visible = function(partial) {
      
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
      
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  
    };
      
  })(jQuery);

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('header').outerHeight();
var navOpen = false;

var win = $(window);
var allMods = $(".promo-item");

// Already visible modules
allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  }
});

win.scroll(function(event) {

  didScroll = true;
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true) && !el.hasClass("already-visible")) {
      if (el.hasClass("promo-item--left"))
      {
        el.addClass("come-in--right");
      } else {
        el.addClass("come-in--left");  
      }
    } 
  });
  
});



setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {

    //Close the nav menu
    closeNav();

    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > headerHeight){
        // Scroll Down
        $('header').addClass('header-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('header-up');
        }
    }
    
    lastScrollTop = st;
}

function toggleNav() {
    if ($('.nav-list--open').length) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    $('.nav-toggle').text('Close');
    $('.nav-list').addClass('nav-list--open').removeClass('nav-list');
}

function closeNav() {
    $('.nav-toggle').text('Menu');
    $('.nav-list--open').addClass('nav-list').removeClass('nav-list--open');
}



/* ============================================================================ */
/* NAV                                                                          */
/*                                                                              */
/* Injects a navigation button on mobile devices that allows users to 'drop' in */
/* a menu from the top of the screen.                                           */
/*                                                                              */
/* Created by: Richard Kingston                                                 */
/* Date: 5th May 2021                                                           */
/* ============================================================================ */

$('nav').prepend('<ul class="nav-control"><li class="nav-item"><a href="javascript:void(0);" class="nav-link nav-toggle" onclick="toggleNav()">Menu</a></li></ul>');





/* ============================================================================ */
/* GAMECARD                                                                     */
/*                                                                              */
/* Controls the interactivity of the gamecards, allowing rows to be clicked so  */
/* that they reveal the number matches underneath them. This script adds all    */
/* the necessary classes to trigger the CSS visiblity and animations.           */
/*                                                                              */
/* Created by: Richard Kingston                                                 */
/* Date: 5th May 2021                                                           */
/* ============================================================================ */

var line = $(".gamecard-line");
var row = $(".gamecard-row");
var arrow = $(".gamecard-arrow");
var filter = $("#filter");

line.toggleClass("gamecard-line--hidden");
row.addClass("gamecard-row--clickable");
arrow.toggleClass("gamecard-arrow--right");
filter.toggleClass("filter--hidden");

row.click(function() {
  var thisLine = $(this).children(".gamecard-line");
  var thisArrow = $(this).children(".gamecard-control").children(".gamecard-arrow");
  thisLine.toggleClass("gamecard-line--hidden");
  thisArrow.toggleClass("gamecard-arrow--right");
});

filter.change(function() {
  if (this.value == "ALL") {
    row.removeClass("gamecard-row--hidden");
  } else {
    var hideRows = $(".gamecard-row[data-attribute!='" + this.value + "']");
    var showRows = $(".gamecard-row[data-attribute='" + this.value + "']");
    showRows.removeClass("gamecard-row--hidden");
    hideRows.addClass("gamecard-row--hidden");
  }
});