import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

import Swiper from 'swiper';
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Keyboard,
  Mousewheel,
  FreeMode,
  A11y,
} from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  const testimonialSwiper = new Swiper('.testimonials-swiper_wrapper', {
    modules: [EffectFade, Autoplay, Navigation, Keyboard, Mousewheel, A11y],
    wrapperClass: 'testimonials-swiper_list',
    slideClass: 'testimonials-swiper_item',
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 0,
    a11y: true,
    allowTouchMove: false,
    grabCursor: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {},
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.ColumnGap = 'unset';
      },
      slideChange: (swiper) => {
        swiper.slides[swiper.activeIndex]
          .querySelectorAll('[animate="count"]')
          .forEach((counter) => {
            createVerticalCounter(counter, parseInt(counter.getAttribute('val'), 10));
          });
      },
    },
  });

  const testimonialNavigation = new Swiper('.clients-swiper_wrapper', {
    modules: [EffectFade, Autoplay, Navigation, Keyboard, Mousewheel, A11y],
    wrapperClass: 'clients-swiper_list',
    slideClass: 'clients-swiper_item',
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 0,
    a11y: true,
    grabCursor: true,
    breakpoints: {},
    mousewheel: { forceToAxis: true },
    keyboard: {
      onlyInViewport: true,
    },
    navigation: {
      prevEl: '[swiper-control="prev"]',
      nextEl: '[swiper-control="next"]',
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.ColumnGap = 'unset';
      },
      click: (swiper, event) => {
        const clickedSlide = event.target.closest('.clients-swiper_item');
        if (clickedSlide) {
          swiper.slides.forEach((slide) => {
            slide.classList.remove('swiper-slide-active');
          });
          clickedSlide.classList.add('swiper-slide-active');
          const clickedIndex = swiper.slides.indexOf(clickedSlide);
          testimonialSwiper.slideTo(clickedIndex);
        }
      },
      slideChange: (swiper) => {
        testimonialSwiper.slideTo(swiper.realIndex);
      },
    },
  });

  function createVerticalCounter(element, targetValue) {
    const targetTens = Math.floor(targetValue / 10);
    const targetOnes = targetValue % 10;

    element.innerHTML = `
    <div style="display: flex; align-items: center;">
      <div style="position: relative; width: 0.6em; height: 1.2em; overflow: hidden; ">
        <div class="tens-strip" style="position: absolute; top: 0; left: 0; display: flex; flex-direction: column; align-items: center;">
          ${Array.from({ length: 10 }, (_, i) => `<div style="height: 1.2em; display: flex; align-items: center; justify-content: center; width: 100%;">${i}</div>`).join('')}
        </div>
      </div>
      <div style="position: relative; width: 0.6em; height: 1.2em; overflow: hidden; ">
        <div class="ones-strip" style="position: absolute; top: 0; left: 0; display: flex; flex-direction: column; align-items: center;">
          ${Array.from({ length: 10 }, (_, i) => `<div style="height: 1.2em; display: flex; align-items: center; justify-content: center; width: 100%;">${i}</div>`).join('')}
        </div>
      </div>
      <div>%</div>
    </div>
  `;

    const tensStrip = element.querySelector('.tens-strip');
    const onesStrip = element.querySelector('.ones-strip');

    gsap.set(tensStrip, { y: '-1.2em' });
    gsap.set(onesStrip, { y: '0em' });

    const tensPosition = targetTens === 0 ? -1.2 : -targetTens * 1.2;
    const onesPosition = -targetOnes * 1.2;

    gsap.to(tensStrip, {
      y: `${tensPosition}em`,
      duration: 1.5,
      ease: 'power2.out',
    });
    gsap.to(onesStrip, {
      y: `${onesPosition}em`,
      duration: 1.5,
      ease: 'power2.out',
    });
  }

  const sectionOneNavigation = new Swiper('.grow-swiper_wrapper', {
    modules: [FreeMode, EffectFade, Autoplay, Navigation, Keyboard, Mousewheel, A11y],
    wrapperClass: 'grow-swiper_list',
    slideClass: 'grow-swiper_item',
    slidesPerView: 'auto',
    speed: 200,
    spaceBetween: 0,
    a11y: true,
    freeMode: {
      enabled: true,
      sticky: true,
    },
    grabCursor: true,
    keyboard: {
      onlyInViewport: true,
    },
    mousewheel: { forceToAxis: true },
    breakpoints: {},
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.ColumnGap = 'unset';
      },
      click: (swiper, event) => {
        const clickedSlide = event.target.closest('.grow-swiper_item');
        if (clickedSlide) {
          swiper.slides.forEach((slide) => {
            slide.classList.remove('swiper-slide-active');
          });
          clickedSlide.classList.add('swiper-slide-active');
          const clickedIndex = swiper.slides.indexOf(clickedSlide);
          sectionOneSwiper.slideTo(clickedIndex);
        }
      },
      slideChange: (swiper) => {
        sectionOneSwiper.slideTo(swiper.realIndex);
      },
    },
  });

  const sectionOneSwiper = new Swiper('.process-swiper_wrapper', {
    modules: [EffectFade, Autoplay, Navigation, Keyboard, Mousewheel, A11y],
    wrapperClass: 'process-swiper_list',
    slideClass: 'process-swiper_item',
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 0,
    a11y: true,
    grabCursor: false,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {},
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.ColumnGap = 'unset';
      },
      slideChange: (swiper) => {
        swiper.slides[swiper.activeIndex]
          .querySelectorAll('[animate="count"]')
          .forEach((counter) => {
            createVerticalCounter(counter, parseInt(counter.getAttribute('val'), 10));
          });
      },
    },
  });

  document.querySelectorAll('.scroll-anchor').forEach((scroller, index) => {
    const line = document.querySelectorAll('.process-nav_progress-line')[index];

    ScrollTrigger.create({
      trigger: scroller,
      start: 'top center',
      end: 'bottom center',
      markers: false,
      scrub: true,
      onUpdate: (status) => {
        gsap.to(line, {
          transformOrigin: 'center left',
          ease: 'none',
          scaleX: status.progress == 1 ? 0 : status.progress,
          duration: 0,
        });
      },
      onLeave: () => {
        console.log('done');
        gsap.set(line, { scaleX: 0 });
      },
    });

    if (scroller.id === '07') {
      ScrollTrigger.create({
        trigger: scroller,
        start: 'top bottom',
        end: 'bottom center',
        markers: false,
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: '#22211F',
            duration: 0.2,
          });
          document
            .querySelectorAll('.process-nav_link, .process-nav_progress-wrap')
            .forEach((item) => {
              item.classList.add('is-inverse');
            });
        },
        onLeaveBack: () => {
          gsap.to('body', {
            backgroundColor: '#FFFFFF',
            duration: 0.2,
          });
          document
            .querySelectorAll('.process-nav_link, .process-nav_progress-wrap')
            .forEach((item) => {
              item.classList.remove('is-inverse');
            });
        },
      });
    }

    if (scroller.id === '08') {
      ScrollTrigger.create({
        trigger: scroller,
        start: 'top center',
        end: 'bottom bottom',
        markers: false,
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: '#22211F',
            duration: 0.2,
          });
          document
            .querySelectorAll('.process-nav_link, .process-nav_progress-wrap')
            .forEach((item) => {
              item.classList.add('is-inverse');
            });
        },
        onLeave: () => {
          gsap.to('body', {
            backgroundColor: '#FFFFFF',
            duration: 0.2,
          });
          document
            .querySelectorAll('.process-nav_link, .process-nav_progress-wrap')
            .forEach((item) => {
              item.classList.remove('is-inverse');
            });
        },
      });
    }
  });

  document.fonts.ready.then(function () {
    document.querySelectorAll('[animate="title"]').forEach((title) => {
      let split = SplitText.create(title, {
        type: 'words, lines',
        mask: 'lines',
        linesClass: 'line-split',
        autoSplit: true,
      });

      gsap.from(split.words, {
        opacity: 0,
        yPercent: 100,
        rotateZ: 10,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.001,
        scrollTrigger: {
          trigger: title,
          markers: false,
          start: 'top bottom',
          end: 'bottom top+=10%',
          toggleActions: 'play none none none',
        },
      });
    });

    // document.querySelectorAll('[animate="title-mask"]').forEach((title) => {
    //   let split = SplitText.create(title, {
    //     type: 'words, lines, chars',
    //     mask: 'lines',
    //     autoSplit: true,
    //   });

    //   console.log(split.chars);

    //   split.chars[0].style.display = 'none';
    //   gsap.set(split.chars[0], { color: 'red' });

    //   // ScrollTrigger.create({
    //   //   trigger: title,
    //   //   start: 'top center',
    //   //   end: 'bottom center',
    //   //   scrub: true,
    //   //   markers: true,
    //   //   animation: gsap.from(split.chars, { opacity: 1, stagger: 0.1 }),
    //   // });
    // });
  });
});
