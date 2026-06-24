// ===================================================
//  karya.js — Filter & Lightbox untuk halaman Karya
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── FILTER TOMBOL ─────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const karyaItems = document.querySelectorAll('.karya-item, .tulisan-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update tombol aktif
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      // Filter item
      karyaItems.forEach(item => {
        const tag = item.dataset.tag;
        if (filter === 'semua' || tag === filter) {
          item.classList.remove('hidden');
          // Re-trigger fade kalau belum visible
          setTimeout(() => item.classList.add('is-visible'), 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ─── LIGHTBOX (hanya untuk halaman desain) ──────
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox) {
    // Klik gambar karya → buka lightbox
    document.querySelectorAll('.karya-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img || item.querySelector('.img--fallback')) return;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Tutup lightbox
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ─── AUTO BUKA SUB-MENU KARYA di sidebar ───────
  const karyaSub    = document.getElementById('karyaSub');
  const karyaToggle = document.getElementById('karyaToggle');
  const karyaItem   = karyaToggle?.closest('.nav-item-karya');

  if (karyaSub && karyaToggle) {
    karyaSub.classList.add('is-open');
    karyaItem?.classList.add('is-open');
    karyaToggle.setAttribute('aria-expanded', 'true');
  }

});