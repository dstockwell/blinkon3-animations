addEventListener('load', function() {
  var slides = [].concat.apply([], document.body.children);
  slides.forEach(function(slide, i) {
    slide.index = i;
  });

  document.body.style.width = slides.length * 100 + 'vw';

  var current = 0;

  var timing = {
    duration: 500,
    easing: 'ease-in-out',
    fill: 'both',
  }

  var player;
  function goto(n) {
    slides[current].classList.remove('current');
    current = n;  
    slides[current].classList.add('current');
    var start = getComputedStyle(document.body).transform;
    var target = 'translateX(-' + current * 100 + 'vw)';
    player && player.cancel();
    player = document.body.animate([
      {transform: start},
      {transform: target},
    ], timing)
  }

  function overview() {
    player && player.cancel();
    var start = getComputedStyle(document.body).transform;
    player = document.body.animate([
      {transform: start},
      {transform: 'scale(' + 1/slides.length},
    ], timing)
  }

  function seek(n) {
    goto(Math.min(Math.max(0, current + n), slides.length - 1));
  }

  addEventListener('keydown', function(e) {
    if (e.keyIdentifier == 'Left') seek(-1);
    if (e.keyIdentifier == 'Right') seek(+1);
    if (e.keyIdentifier == 'Up') overview();
  });
});;