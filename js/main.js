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
});
