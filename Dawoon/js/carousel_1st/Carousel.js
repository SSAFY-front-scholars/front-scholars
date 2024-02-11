document.querySelectorAll('.carousel').forEach(($e) => {
  let preventTransition = false;
  let slide = 0;

  const setSlide = (value) => {
    if (preventTransition) return;
    const toRight = slide < value;
    $e.querySelector(`.carousel-indicator:nth-child(${slide + 1})`)?.classList.remove('selected');
    slide = value;
    preventTransition = true;

    const { length } = $e.querySelectorAll('.carousel-inner .carousel-item');

    if (value < 0) {
      slide = length - 1;
    } else if (value >= length) {
      slide = 0;
    }

    $e.querySelector(`.carousel-indicator:nth-child(${slide + 1})`)?.classList.add('selected');

    const $currentItem = $e.querySelector('.carousel-inner .carousel-item.selected');
    const $nextItem = $e.querySelector(`.carousel-inner .carousel-item:nth-child(${slide + 1})`);
    const $progress = $e.querySelector('.carousel-timer-progressbar-child');

    $currentItem?.classList.remove('selected');
    $currentItem?.classList.add(toRight ? 'right' : 'left');
    $currentItem.ontransitionend = () => {
      $currentItem?.classList.remove('left', 'right');
      $nextItem?.classList.remove('left', 'right');
      preventTransition = false;
      $progress?.classList.add('active');
    };

    $nextItem?.classList.add('selected');
    $nextItem?.classList.add(toRight ? 'right' : 'left');

    $e.querySelector('.carousel-timer-container span.current').innerHTML = `0${slide + 1}`.slice(
      -2,
    );
    $progress.classList.remove('active');
  };

  const init = () => {
    const $container = $e.querySelector('.carousel-indicator-container');
    const { length } = $e.querySelectorAll('.carousel-inner .carousel-item');
    $e.querySelector('.carousel-inner .carousel-item:nth-child(1)')?.classList.add('selected');

    $e.querySelectorAll('.carousel-inner .carousel-item').forEach((element, index) => {
      const $indicator = document.createElement('button');
      $indicator.classList.add('carousel-indicator');
      $indicator.addEventListener('click', () => {
        if (index === slide) return;
        setSlide(index);
      });
      $container.append($indicator);
    });
    $e.querySelector('.carousel-indicator:nth-child(1)')?.classList.add('selected');
    $e.querySelector('.carousel-timer-container span.current').innerHTML = '01';
    $e.querySelector('.carousel-timer-container span.last').innerHTML = `0${length}`.slice(-2);

    const $progress = $e.querySelector('.carousel-timer-progressbar-child');
    $progress.classList.add('active');
    $progress?.addEventListener('transitionend', () => {
      setSlide(slide + 1);
    });
  };

  $e.querySelector('.prev')?.addEventListener('click', () => {
    setSlide(slide - 1);
  });

  $e.querySelector('.next')?.addEventListener('click', () => {
    setSlide(slide + 1);
  });

  init();
});
