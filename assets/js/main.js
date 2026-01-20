// Navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.getAttribute('data-open') === 'true';
    navMenu.setAttribute('data-open', String(!open));
    navToggle.setAttribute('aria-expanded', String(!open));
  });
  // Close menu after clicking a nav link (mobile only)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        navMenu.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Contact form -> mailto composer
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nume = data.get('nume');
    const email = data.get('email');
    const mesaj = data.get('mesaj');
    const subject = encodeURIComponent('Cerere consultanță contabilă');
    const body = encodeURIComponent(
      `Nume: ${nume}\nEmail: ${email}\nMesaj:\n${mesaj}\n\nTrimis de pe site.`
    );
    window.location.href = `mailto:hello@asevcont.example?subject=${subject}&body=${body}`;
  });
}

// Progressive reveal (IntersectionObserver)
const revealEls = document.querySelectorAll('.card, .industry, .price-card');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('js-reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => obs.observe(el));
}

// Accordion for service subsections
const accordionTitles = document.querySelectorAll('.accordion__title');
accordionTitles.forEach(btn => {
  // Toggle on click
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const content = btn.nextElementSibling;
    if (content) {
      content.hidden = expanded;
    }
  });

  // Open on hover
  btn.addEventListener('mouseenter', () => {
    btn.setAttribute('aria-expanded', 'true');
    const content = btn.nextElementSibling;
    if (content) {
      content.hidden = false;
    }
  });
  // Close on mouse leave (from button or content)
  const content = btn.nextElementSibling;
  if (content) {
    // Hide when mouse leaves both button and content
    let hoverTimeout;
    const closeAccordion = () => {
      btn.setAttribute('aria-expanded', 'false');
      content.hidden = true;
    };
    btn.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(closeAccordion, 120);
    });
    content.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
    });
    content.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(closeAccordion, 120);
    });
  }
});
