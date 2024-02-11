document.querySelectorAll('.carousel').forEach(($e) => {
  let preventTransition = false;
  let slide = 0;

  const init = () => {
    $e.querySelector('.carousel-inner .carousel-item:nth-child(1)')?.classList.add('selected');
  };

  const setSlide = (value) => {
    if (preventTransition) return;
    const toRight = slide < value;
    slide = value;
    preventTransition = true;

    const { length } = $e.querySelectorAll('.carousel-inner .carousel-item');

    if (value < 0) {
      slide = length - 1;
    } else if (value >= length) {
      slide = 0;
    }

    const currentItem = $e.querySelector('.carousel-inner .carousel-item.selected');
    const nextItem = $e.querySelector(`.carousel-inner .carousel-item:nth-child(${slide + 1})`);

    currentItem?.classList.remove('selected');
    currentItem?.classList.add(toRight ? 'right' : 'left');
    currentItem.ontransitionend = () => {
      currentItem?.classList.remove('left', 'right');
      nextItem?.classList.remove('left', 'right');

      preventTransition = false;
    };

    nextItem?.classList.add('selected');
    nextItem?.classList.add(toRight ? 'right' : 'left');
  };

  $e.querySelector('.prev')?.addEventListener('click', () => {
    setSlide(slide - 1);
  });

  $e.querySelector('.next')?.addEventListener('click', () => {
    setSlide(slide + 1);
  });

  init();
});
