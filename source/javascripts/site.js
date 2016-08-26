$(function() {
  var getDribbbleShots;

  $.jribbble.setToken('2436518deac736cbcdf145c359fb78db1ea983e46701fbf01496df7476565866');

  getDribbbleShots = function() {
    return $.jribbble.users('mariusz').shots({
      per_page: 8
    }).then(function(playerShots) {
      var html;
      html = [];
      $.each(playerShots, function(i, shot) {
        console.log(shot);
        html.push('<li>');
        html.push('<a href="' + shot.html_url + '">');
        html.push('<img src="' + shot.images.teaser + '" ');
        html.push('alt="' + shot.title + '"></a></li>');
        return html.push('</li>');
      });
      return $('#dribbble_shots').html(html.join(''));
    });
  };

  $('[role=navigation] a, .teaser .button').click(function() {
    var sectionName;
    sectionName = $('body').find($(this).attr("href").split("/").pop());
    $('html, body').animate({
      scrollTop: sectionName.offset().top
    }, 750);
    return false;
  });

  $('.contact-me .button').click(function() {
    return mixpanel.track('Contact button clicked');
  });

  $('#btn_contact_submit').click(function() {
    return mixpanel.track('Contact form submitted');
  });

  $(document).ready(function() {
    getDribbbleShots();
    return $('#testimonials_slider').flickity({
      contain: true,
      parallax: true,
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: false
    });
  });
});
