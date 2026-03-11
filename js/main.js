document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll logic for header CTA
  const headerCtas = document.querySelectorAll('a[href^="#"]');

  headerCtas.forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetId = button.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Scroll detection for animations
  const revealTargets = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealTargets.forEach((element) => {
      element.classList.add('is-visible');
    });
  }

  // --- Case Studies Modal & Swiper Logic ---
  const caseModal = document.getElementById('case-modal');
  const caseModalOverlay = document.querySelector('.case-modal-overlay');
  const caseModalClose = document.querySelector('.case-modal-close');
  const caseCards = document.querySelectorAll('.case-card');

  // Initialize Swiper
  let caseSwiper;
  if (typeof Swiper !== 'undefined') {
    caseSwiper = new Swiper('.case-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      grabCursor: true, // Show grab cursor for swipe
    });
  }

  // Open Modal function
  const openModal = (index) => {
    if (caseModal) {
      caseModal.classList.add('is-active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      if (caseSwiper) {
        // Swiper uses real indexes, add slider init logic
        caseSwiper.slideToLoop(index, 0); // instantly jump to current slide
      }
    }
  };

  // Close Modal function
  const closeModal = () => {
    if (caseModal) {
      caseModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  // Attach click events to cards
  caseCards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-index'), 10);
      openModal(index);
    });
  });

  // Attach close events
  if (caseModalClose) {
    caseModalClose.addEventListener('click', closeModal);
  }
  if (caseModalOverlay) {
    caseModalOverlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModal.classList.contains('is-active')) {
      closeModal();
    }
  });

});
