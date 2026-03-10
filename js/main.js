document.addEventListener('DOMContentLoaded', () => {
  const headerCtas = document.querySelectorAll('a[href="#line-estimate"]');

  headerCtas.forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetId = button.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealTargets = document.querySelectorAll('.price-card, .reason-card, .pain-list li, .guarantee-card, .card-illustration');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealTargets.forEach((element) => {
      element.classList.add('reveal-on-scroll');
      observer.observe(element);
    });
  }
});
