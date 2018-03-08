$(document).ready(function() {
  $('.contact__popup').hide();

  $('#contact').submit(function(e) {
    let formData = {
      'name': $('#name').val(),
      'email': $('#email').val(),
      'budget': $('#budget').val(),
      'description': $('#description').val()
    };

    $.ajax({
      type: 'post',
      url: 'https://formspree.io/xzravgyx',
      data: formData,
      dataType: 'json' 
    }).done(function(data) {
      $('#success').fadeIn();
    }).fail(function(data) {
      $('#error').fadeIn();
    });

    e.preventDefault();
  });
});