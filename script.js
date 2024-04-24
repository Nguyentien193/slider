document.addEventListener("DOMContentLoaded", function() {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let startTranslate = 0;
  let currentTranslate = 0;

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function updateSlider() {
    const slideWidth = slides[currentIndex].clientWidth;
    currentTranslate = -currentIndex * slideWidth;
    sliderWrapper.style.transition = 'transform 0.5s ease';
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    toggleButtonState();
  }

  function toggleButtonState() {
    if (currentIndex === 0) {
      prevBtn.setAttribute('disabled', 'disabled');
    } else {
      prevBtn.removeAttribute('disabled');
    }
    if (currentIndex === slides.length - 1) {
      nextBtn.setAttribute('disabled', 'disabled');
    } else {
      nextBtn.removeAttribute('disabled');
    }
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  sliderWrapper.addEventListener('mousedown', e => {
    isDragging = true;
    startPos = e.clientX;
    startTranslate = currentTranslate;
    sliderWrapper.style.transition = 'none';
  });

  sliderWrapper.addEventListener('mousemove', e => {
    if (isDragging) {
      const dist = e.clientX - startPos;
      currentTranslate = startTranslate + dist;
      sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  sliderWrapper.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      const slideWidth = slides[currentIndex].clientWidth;
      const dragThreshold = slideWidth * 0.2;
      if (Math.abs(currentTranslate - startTranslate) > dragThreshold) {
        if (currentTranslate < startTranslate) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        updateSlider();
      }
    }
  });

  sliderWrapper.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      updateSlider();
    }
  });
  prevBtn.setAttribute('disabled', 'disabled');
});


