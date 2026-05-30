/* ============================================================
   PORTFOLIO JAVASCRIPT
   Sections: Cursor → Three.js Hero → Three.js Globe →
             Typed.js → Scroll Reveal → Skill Bars →
             Counters → Tilt → Nav Hamburger →
             Profile Photo → Resume Modal → Contact
   ============================================================ */

/* ─── 0. LOGO ICON CAROUSEL ────────────────────────────────── */
(function initLogoIconCarousel() {
  const wrap = document.getElementById('logo-icon-wrap');
  if (!wrap) return;

  const icons = [
    'assets/icons/python-94.png',
    'assets/icons/database-48.png',
    'assets/icons/aws-64.png',
    'assets/icons/ai-64.png',
    'assets/icons/cloud-64.png',
    'assets/icons/chatgpt-64.png',
    'assets/icons/github-48.png',
    'assets/icons/git-48.png',
    'assets/icons/java-94.png',
    'assets/icons/excel.png',
    'assets/icons/power-bi.png'
  ];
  let currentIdx = 0;

  setInterval(() => {
    const iconEl = wrap.querySelector('img') || wrap.querySelector('i');
    if (!iconEl) return;
    
    // Animate out
    iconEl.style.transform = 'translateY(-30px) scale(0.5)';
    iconEl.style.opacity = '0';

    setTimeout(() => {
      currentIdx = (currentIdx + 1) % icons.length;
      
      if (iconEl.tagName.toLowerCase() === 'img') {
        iconEl.src = icons[currentIdx];
      } else {
        // Fallback for i tags if necessary, but we moved to img
        const newImg = document.createElement('img');
        newImg.src = icons[currentIdx];
        newImg.id = 'logo-img';
        newImg.style.width = '18px';
        newImg.style.height = '18px';
        newImg.style.objectFit = 'contain';
        newImg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
        newImg.style.transform = 'translateY(30px) scale(0.5)';
        newImg.style.opacity = '0';
        wrap.innerHTML = '';
        wrap.appendChild(newImg);
        
        setTimeout(() => {
          newImg.style.transform = 'translateY(0) scale(1)';
          newImg.style.opacity = '1';
        }, 50);
        return;
      }
      
      // Reset position for animate in
      iconEl.style.transform = 'translateY(30px) scale(0.5)';
      
      // Animate in
      setTimeout(() => {
        iconEl.style.transform = 'translateY(0) scale(1)';
        iconEl.style.opacity = '1';
      }, 50);
    }, 400);
  }, 3000);
})();


/* ─── 1. CUSTOM CURSOR ─────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smooth ring follow
  (function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover scale on interactive elements
  document.querySelectorAll(
    'a, button, .cert-card, .project-card, .skill-category, .stat-card, .photo-toggle-btn'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();


/* ─── 3. THREE.JS — ABOUT GLOBE ────────────────────────────── */
(function initAboutGlobe() {
  const canvas = document.getElementById('about-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(280, 280);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 3;

  // Wireframe sphere
  const sphereGeo = new THREE.SphereGeometry(1.1, 28, 28);
  const wireMat   = new THREE.MeshBasicMaterial({
    color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.25
  });
  scene.add(new THREE.Mesh(sphereGeo, wireMat));

  // Solid inner sphere
  const innerGeo = new THREE.SphereGeometry(1.0, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e, transparent: true, opacity: 0.92 });
  scene.add(new THREE.Mesh(innerGeo, innerMat));

  // Particle dots on sphere surface
  const ptCount = 500;
  const ptPos   = new Float32Array(ptCount * 3);
  for (let i = 0; i < ptCount; i++) {
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    ptPos[i * 3]     = 1.05 * Math.sin(phi) * Math.cos(theta);
    ptPos[i * 3 + 1] = 1.05 * Math.sin(phi) * Math.sin(theta);
    ptPos[i * 3 + 2] = 1.05 * Math.cos(theta);
  }
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
  const ptMat = new THREE.PointsMaterial({ color: 0xe879f9, size: 0.025, transparent: true, opacity: 0.75 });
  scene.add(new THREE.Points(ptGeo, ptMat));

  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.008;
    scene.rotation.y = t;
    scene.rotation.x = Math.sin(t * 0.4) * 0.3;
    renderer.render(scene, camera);
  })();
})();


/* ─── 4. TYPED.JS ───────────────────────────────────────────── */
(function initTyped() {
  if (typeof Typed === 'undefined') return;
  new Typed('#typed-text', {
    strings: [
      'Data Analyst',
      'Data Engineer',
      'Pipeline Architect',
      'BI Developer',
      'Cloud Data Specialist',
    ],
    typeSpeed: 60,
    backSpeed: 35,
    loop: true,
    backDelay: 1800,
  });
})();


/* ─── 5. GSAP HERO ENTRANCE ─────────────────────────────────── */
(function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.to('#hero-tag',        { opacity: 1, y: 0, duration: 0.7 }, 0.3)
    .to('#hero-name',       { opacity: 1, y: 0, duration: 0.8 }, 0.5)
    .to('#hero-typed-wrap', { opacity: 1, y: 0, duration: 0.7 }, 0.8)
    .to('#hero-ctas',       { opacity: 1, y: 0, duration: 0.7 }, 1.1);
})();


/* ─── 6. SCROLL REVEAL ──────────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();


/* ─── 7. SKILL BAR ANIMATION ────────────────────────────────── */
(function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate each bar fill inside the visible category
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        entry.target.querySelectorAll('.bar-shadow').forEach(shadow => {
          shadow.style.width = shadow.dataset.pct + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(cat => observer.observe(cat));
})();


/* ─── 8. STAT COUNTERS ──────────────────────────────────────── */
(function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const target = parseInt(el.dataset.count, 10);
          let current  = 0;
          const step   = target / 60;
          const timer  = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target + '+';
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current) + '+';
            }
          }, 20);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) observer.observe(statsRow);
})();


/* ─── 9. 3D CARD TILT ───────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.project-card, .cert-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const cx   = rect.width  / 2;
      const cy   = rect.height / 2;
      const rotX = ((y - cy) / cy) * 8;
      const rotY = -((x - cx) / cx) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ─── 10. MOBILE NAV HAMBURGER ──────────────────────────────── */
(function initHamburger() {
  const btn   = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('mobile-open');
    // Don't set body overflow to hidden - allow scrolling
    // Animate hamburger lines
    btn.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      btn.classList.remove('open');
    });
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (links.classList.contains('mobile-open') && !links.contains(e.target) && !btn.contains(e.target)) {
      links.classList.remove('mobile-open');
      btn.classList.remove('open');
    }
  });
})();


/* ─── 11. PROFILE PHOTO (Optional Toggle + Upload) ──────────── */
let photoVisible = false;

window.togglePhoto = function () {
  photoVisible = !photoVisible;
  const wrap  = document.getElementById('profileWrap');
  const hint  = document.getElementById('photoHint');
  const input = document.getElementById('photoInput');

  if (photoVisible) {
    wrap.classList.add('visible');
    hint.style.display = 'block';
    // Click on photo wrap triggers upload
    wrap.addEventListener('click', triggerPhotoUpload);
  } else {
    wrap.classList.remove('visible');
    hint.style.display = 'none';
    wrap.removeEventListener('click', triggerPhotoUpload);
  }
};

function triggerPhotoUpload() {
  document.getElementById('photoInput').click();
}

window.handlePhotoUpload = function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img         = document.getElementById('profileImg');
    const placeholder = document.getElementById('photoPlaceholder');
    img.src           = ev.target.result;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
};


/* ─── 12. RESUME MODAL ──────────────────────────────────────── */
window.openResume = function (e) {
  if (e) e.preventDefault();
  document.getElementById('resumeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeResume = function () {
  document.getElementById('resumeModal').classList.remove('open');
  document.body.style.overflow = '';
};

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeResume();
    });
  }
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeResume();
});


/* ─── 13. CONTACT FORM ──────────────────────────────────────── */
(function initContact() {
  const btn = document.querySelector('.form-submit');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const original = this.innerHTML;
    this.innerHTML = '✓ Message Sent! <i class="fas fa-check"></i>';
    this.style.background = 'linear-gradient(135deg,#00f5d4,#00b894)';
    setTimeout(() => {
      this.innerHTML = original;
      this.style.background = '';
    }, 3000);
  });
})();


/* ─── 14. ACTIVE NAV HIGHLIGHT ON SCROLL ────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--cyan)';
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
})();