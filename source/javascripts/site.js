$(function() {
  var getDribbbleShots;
  const { random, atan2, cos, sin, hypot } = Math;
  const max = 200;
  const canvas = document.querySelector('#teaserOverlay');
  const $canvas = canvas.getContext('2d');
  const body = document.body;
  const particles = [];

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let point = { x: width/2, y: height/2 };
  let hue = 0;

  function Particle(){};

  Particle.prototype = {
    init(){
      this.hue = hue;
      this.alpha = 0;
      this.size = 1;
      this.x = this.random(0, width);
      this.y = this.random(0, height);
      this.velocity = this.size * .5;
      this.changed = null;
      this.changedFrame = 0;
      this.maxChangedFrames = 50;
      return this;
    },
    draw(){
      $canvas.fillStyle = `hsla(${this.hue}, 100%, 40%, ${this.alpha})`;
      $canvas.beginPath();
      $canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      $canvas.fill();
      this.update();
    },
    update(){
      if(this.changed){
        this.alpha *= .5;
        this.changedFrame++;
        if(this.changedFrame > this.maxChangedFrames){
          this.reset();
        }
      } else if(this.distance(point.x, point.y) < 10){
        this.changed = true;
      } else {
        let dx = point.x - this.x;
        let dy = point.y - this.y;
        let angle = atan2(dy, dx);
        
        this.alpha += .01;
        this.x += this.velocity * cos(angle);
        this.y += this.velocity * sin(angle);
        this.velocity += .02;
      } 
    },
    reset(){
      this.init();
    },
    distance(x, y){
      return hypot(x - this.x, y - this.y); 
    },
    random(min, max) {
      return random() * (max - min) + min;
    }
  }

  function animate(){
    $canvas.fillStyle = `rgba(0,0,0, .2)`;
    $canvas.fillRect(0, 0, width, height);
    particles.forEach((p) => {
      p.draw();
    });
    hue += .3;
    window.requestAnimationFrame(animate);
  }

  function touches(e){
    point.x = e.touches ? e.touches[0].clientX : e.clientX;
    point.y = e.touches ? e.touches[0].clientY : e.clientY;
  }

  function setup(){
    for(let i=0; i<max; i++){
      setTimeout(() => {
        let p = new Particle().init();
        particles.push(p);
      }, i * 10);
    }
    
    canvas.addEventListener("mousemove", touches);
    canvas.addEventListener("touchmove", touches);
    canvas.addEventListener("mouseleave", () => {
      point = { x: width/2, y: height/2 };
    });
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      point = { x: width/2, y: height/2 };
    });
    animate();
  }

  setup();


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

    var makeWP = function(elementId, elementClass) {
      return new Waypoint.Inview({
        element: document.getElementById(elementId),
        enter: function(direction) {
          if (direction == 'up') {
            $('body').addClass(elementClass);
          }
        },
        entered: function(direction) {
          if (direction == 'down') {
            $('body').addClass(elementClass);
          }
        },
        exit: function(direction) {
          if (direction == 'up') {
            $('body').removeClass(elementClass);
          }
        },
        exited: function(direction) {
          if (direction == 'down') {
            $('body').removeClass(elementClass);
          }
        }
      });
    }

    var wpWork = makeWP('work', 'index--work');
    var wpTestimonials = makeWP('testimonials', 'index--testimonials');
    var wpAbout = makeWP('about', 'index--about');
    var wpSkills = makeWP('skills', 'index--skills');
    var wpContact = makeWP('contact', 'index--contact');

    return $('#testimonials_slider').flickity({
      contain: true,
      parallax: true,
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: false
    });
  });
});
