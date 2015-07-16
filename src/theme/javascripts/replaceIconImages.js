$(document).ready(function() {
  $('img[src$="https://cdn1.readmore.de/img/themes/readmore/side_left_setup2.png"]').replaceWith('<i class="fa fa-cog"></i>');
  $('img[src$="https://cdn1.readmore.de/img/themes/readmore/icon_plus.jpg"]').replaceWith('<i class="fa fa-plus"></i>');
  $('img[src$="https://cdn1.readmore.de/img/themes/readmore/icon_minus.jpg"]').replaceWith('<i class="fa fa-minus"></i>');
  $('img[src$="https://cdn1.readmore.de/img/themes/readmore/arrow_last_item.gif"]').replaceWith('<i class="fa fa-angle-right"></i>');
  $('img[src$="https://cdn1.readmore.de/img/themes/readmore/arrow_last_item2.gif"]').replaceWith('<i class="fa fa-angle-double-right"></i>');

  var forumButtons = $('.controls li input').get(0).outerHTML.replace(/^<input/, "<button");
  $('.controls li input').replaceWith(forumButtons);

  $('.controls li:nth-child(1) button').append('<i class="fa fa-bold"></i>');
  $('.controls li:nth-child(2) button').append('<i class="fa fa-italic"></i>');
  $('.controls li:nth-child(3) button').append('<i class="fa fa-underline"></i>');
  $('.controls li:nth-child(4) button').append('<i class="fa fa-strikethrough"></i>');
  $('.controls li:nth-child(5) button').append('<i class="fa fa-quote-left"></i>');
  $('.controls li:nth-child(6) button').append('<i class="fa fa-plus"></i>');
  $('.controls li:nth-child(7) button').append('<i class="fa fa-link"></i>');
  $('.controls li:nth-child(8) button').append('<i class="fa fa-image"></i>');
  $('.controls li:nth-child(9) button').append('<i class="fa fa-youtube"></i>');
  $('.controls li:nth-child(10) button').append('<i class="fa fa-eye"></i>');

});
