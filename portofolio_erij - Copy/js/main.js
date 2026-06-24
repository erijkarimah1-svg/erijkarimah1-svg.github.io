// ===================================================
//  PORTOFOLIO ERIJ — main.js
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Elemen sidebar ---
  const hamburger    = document.getElementById('hamburger');
  const sidebar      = document.getElementById('sidebar');
  const overlay      = document.getElementById('overlay');
  const sidebarClose = document.getElementById('sidebarClose');
  const karyaToggle  = document.getElementById('karyaToggle');
  const karyaSub     = document.getElementById('karyaSub');
  const karyaItem    = karyaToggle?.closest('.nav-item-karya');

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.classList.add('is-open');
    sidebar.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.classList.remove('is-open');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
  sidebarClose?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

  // Sub-menu Karya
  karyaToggle?.addEventListener('click', () => {
    const isOpen = karyaSub.classList.contains('is-open');
    karyaSub.classList.toggle('is-open');
    karyaItem?.classList.toggle('is-open');
    karyaToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // =============================================
  // FADE-UP — berlaku di semua halaman
  // =============================================
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Aktifkan skill bar kalau ada di dalam elemen ini
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width || bar.style.width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  // =============================================
  // KHUSUS HERO PAGE — fade trigger setelah gambar load
  // =============================================
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    function triggerHeroFade() {
      document.querySelectorAll('.hero .fade-up').forEach(el => {
        el.classList.add('is-visible');
      });
    }
    if (heroImg.complete) {
      triggerHeroFade();
    } else {
      heroImg.addEventListener('load', triggerHeroFade);
      heroImg.addEventListener('error', triggerHeroFade);
    }
  }

  // =============================================
  // SKILL BAR ANIMASI
  // =============================================
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    // Simpan target width, reset ke 0 dulu
    skillFills.forEach(bar => {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0';
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach(bar => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width;
            }, 200);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-list').forEach(list => {
      skillObserver.observe(list);
    });
  }

});