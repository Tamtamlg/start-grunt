/*global $, window, objectFitImages, document*/

$(window).on('load', function () {
  'use strict';
  /**
   * preloader
   */
  var preloader = $('#page-preloader');
  var spinner = preloader.find('.spinner');
  spinner.fadeOut();
  preloader.delay(350).fadeOut('slow');
});

function formValidate() {
  $.validate({
    modules: 'security',
    scrollToTopOnError: false
  });
}

/**
 * document.ready
 */
$(function () {
  'use strict';

  svg4everybody();
  
  formValidate()

  objectFitImages('img', {
    watchMQ: true
  });

});