$(document).ready(function() {
  let formData = {
    'name': $('#name').val(),
    'email': $('#email').val(),
    'budget': $('#budget').val(),
    'description': $('#description').val()
  };

  $('.contact__popup').hide();

  $('#contact').submit(function(e) {
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