// Dalawai Hospital Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const isOpen = mobileNavDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a nav link is clicked
    const drawerNavLinks = mobileNavDrawer.querySelectorAll('.nav-link, .btn-appointment');
    drawerNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Navbar Scroll Shadow Effect
  const navbar = document.querySelector('.site-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Smooth Navigation Scroll & Active Section Highlight
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Appointment Form Handling
  const bookingForm = document.getElementById('appointmentForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your appointment request has been submitted. Our team will contact you shortly.');
      bookingForm.reset();
    });
  }
});
