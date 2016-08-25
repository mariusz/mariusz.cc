#= require jquery/dist/jquery.min
#= require jribbble/dist/jribbble.min
#= require flickity/dist/flickity.pkgd

$ ->
  $.jribbble.setToken '2436518deac736cbcdf145c359fb78db1ea983e46701fbf01496df7476565866';

  getDribbbleShots = ->
    $.jribbble.users('mariusz').shots({per_page: 8}).then (playerShots) -> 
      html = []

      $.each playerShots, (i, shot) ->
        console.log(shot)
        html.push '<li>'
        html.push '<a href="' + shot.html_url + '">'
        html.push '<img src="' + shot.images.teaser + '" '
        html.push 'alt="' + shot.title + '"></a></li>'
        html.push '</li>'

      $('#dribbble_shots').html html.join('')


  $('[role=navigation] a, .teaser .button').click ->
    sectionName = $('body').find($(this).attr("href").split("/").pop())

    $('html, body').animate(
      scrollTop: sectionName.offset().top
    , 750)

    return false

  $('.contact-me .button').click ->
    mixpanel.track('Contact button clicked')

  $(document).ready ->
    getDribbbleShots()

    $('#testimonials_slider').flickity
      contain: true
      parallax: true
      wrapAround: true
      adaptiveHeight: true
      prevNextButtons: false