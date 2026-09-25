document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = Array.from(document.querySelectorAll('.fade-in-up'));
  fadeElements.sort((a, b) => {
    const ao = parseInt(a.dataset.order || '0', 10);
    const bo = parseInt(b.dataset.order || '0', 10);
    if (ao || bo) return (ao || 0) - (bo || 0);
    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
  });
  const STAGGER = 160;
  fadeElements.forEach((el, i) => {
    window.setTimeout(() => el.classList.add('visible'), 80 + STAGGER * i);
  });

  const appData = {
    sk: {
      name: "SK Auto Clicker",
      desc: "A lightweight, reliable, and user-friendly automation tool designed to eliminate monotonous repetitive actions. Whether you need to automate routine office tasks, test software, speed up data entry, or streamline a workflow, this app handles it effortlessly by automating both mouse clicks and keyboard keystrokes.",
      store1: "https://apps.microsoft.com/detail/9p3nw1fw6n4q?hl=eng-ENG&gl=ENG",
      screenshots: [
        'Image/screenshots/screenshot1.jpeg',
        'Image/screenshots/screenshot2.jpeg',
        'Image/screenshots/screenshot3.jpeg',
        'Image/screenshots/screenshot4.jpeg',
        'Image/screenshots/screenshot5.jpeg'
      ]
    },
    pro: {
      name: "SK Auto Clicker PRO",
      desc: "The PRO version is currently in development.",
      store1: "https://www.microsoft.com/store/apps/sk-auto-clicker-pro"
    }
  };

  const heroTitle = document.getElementById('app-title');
  const heroCopy = document.querySelector('.hero-copy');
  const heroLogo = document.querySelector('.hero-logo');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroInfo = document.getElementById('hero-info');
  const appList = document.getElementById('app-list');
  const releaseGrid = document.getElementById('release-grid');
  const releasesTitle = document.getElementById('releases-title');
  const heroCard = document.querySelector('.hero-card');
  const heroActions = document.getElementById('hero-actions');
  const downloadBtn = document.getElementById('download-button');
  const backBtn = document.getElementById('back-button');
  const shotPrev = document.getElementById('screenshot-prev');
  const shotNext = document.getElementById('screenshot-next');
  const shotImg = document.getElementById('screenshot-img');

  function replayAppearance(elements) {
    const targets = elements.filter(Boolean);

    targets.forEach(el => {
      el.classList.remove('view-appear');
      el.style.removeProperty('--view-delay');
    });

    void document.body.offsetHeight;

    targets.forEach((el, index) => {
      el.style.setProperty('--view-delay', `${index * 70}ms`);
      el.classList.add('view-appear');
      el.addEventListener('animationend', () => {
        el.classList.remove('view-appear');
        el.style.removeProperty('--view-delay');
      }, { once: true });
    });
  }

  function resetHub() {
    const pageShell = document.querySelector('.page-shell');
    if (appList) appList.classList.remove('hidden');
    if (releaseGrid) { releaseGrid.classList.add('hidden'); releaseGrid.innerHTML = ''; }
    if (heroCard) {
      heroCard.classList.remove('hero-expanded');
      heroCard.classList.remove('hero-expanded-light');
      heroCard.classList.remove('hero-info-open');
    }
    if (pageShell) pageShell.classList.remove('cover');
    document.body.classList.remove('no-scroll');
    if (heroActions) heroActions.classList.add('hidden');
    heroTitle.textContent = 'Welcome to SK Hub';
    heroCopy.textContent = 'Choose an app below to view its releases and details.';
    if (heroLogo) { heroLogo.src = 'Image/hub_logo.png'; heroLogo.alt = 'SK Hub logo'; }
    if (heroEyebrow) heroEyebrow.classList.remove('hidden');
    if (heroInfo) { heroInfo.classList.add('hidden'); heroInfo.innerHTML = ''; }
    const slider = document.getElementById('screenshot-slider');
    if (slider) { slider.classList.add('hidden'); }
    if (shotImg) shotImg.src = '';
    if (releasesTitle) releasesTitle.textContent = 'Applications';
    document.querySelectorAll('.app-card').forEach(c => c.classList.remove('selected'));

    replayAppearance([
      heroLogo ? heroLogo.closest('.hero-badge') : null,
      heroEyebrow,
      heroTitle,
      heroCopy,
      releasesTitle,
      ...document.querySelectorAll('.app-card')
    ]);
  }

  function selectApp(key) {
    const data = appData[key];
    if (!data) return;
    heroTitle.textContent = data.name;
    heroCopy.textContent = data.desc;
    if (releasesTitle) releasesTitle.textContent = '';
    const pageShell = document.querySelector('.page-shell');
    if (appList) appList.classList.add('hidden');
    if (releaseGrid) { releaseGrid.classList.add('hidden'); releaseGrid.innerHTML = ''; }

    const slider = document.getElementById('screenshot-slider');
    if (heroInfo) {
      if (key === 'sk') {
        heroInfo.innerHTML = `
          <h4>Additional information</h4>
          <div class="info-row">
            <div class="info-item"><strong>Approximate size</strong><div class="info-value">44.9 MB</div></div>
            <div class="info-item"><strong>Release date</strong><div class="info-value">6/1/2026</div></div>
            <div class="info-item"><strong>Last updated</strong><div class="info-value">10/1/2026</div></div>
            <div class="info-item"><strong>Latest version</strong><div class="info-value">26.10.1.0</div></div>
            <div class="info-item"><strong>Price</strong><div class="info-value">Free</div></div>
            <div class="info-item"><strong>Supported languages</strong><div class="info-value">English, Russian, Ukrainian</div></div>
          </div>
        `;
        heroInfo.classList.remove('hidden');
        heroCard.classList.add('hero-info-open');
        if (slider && data.screenshots && data.screenshots.length) {
          currentScreenshotIndex = 0;
          if (shotImg) shotImg.src = data.screenshots[currentScreenshotIndex];
          slider.classList.remove('hidden');
          updateScreenshotButtons(data);
        }
      } else {
        heroInfo.classList.add('hidden');
        heroInfo.innerHTML = '';
        heroCard.classList.remove('hero-info-open');
      }
    }

    if (heroCard) {
      heroCard.classList.remove('hero-expanded-light');
      heroCard.classList.add('hero-expanded');
    }
    if (heroEyebrow) heroEyebrow.classList.add('hidden');
    if (pageShell) pageShell.classList.add('cover');
    document.body.classList.add('no-scroll');
    if (downloadBtn) downloadBtn.href = data.store1 || '#';
    if (heroActions) heroActions.classList.remove('hidden');

    if (heroLogo) {
      if (key === 'pro') { heroLogo.src = 'Image/app_logo_pro.ico'; heroLogo.alt = 'SK Auto Clicker PRO'; }
      else { heroLogo.src = 'Image/app_logo.ico'; heroLogo.alt = 'SK Auto Clicker'; }
    }

    document.querySelectorAll('.app-card').forEach(c => c.classList.toggle('selected', c.dataset.app === key));

    replayAppearance([
      heroLogo ? heroLogo.closest('.hero-badge') : null,
      heroTitle,
      heroCopy,
      heroInfo && !heroInfo.classList.contains('hidden') ? heroInfo : null,
      slider && !slider.classList.contains('hidden') ? slider : null,
      heroActions && !heroActions.classList.contains('hidden') ? heroActions : null
    ]);
  }

  let currentScreenshotIndex = 0;
  function getSelectedAppData() {
    const selected = document.querySelector('.app-card.selected');
    const key = selected ? selected.dataset.app : null;
    return key ? appData[key] : null;
  }

  function updateScreenshotImage(data) {
    if (!data || !data.screenshots) return;
    if (shotImg) shotImg.src = data.screenshots[currentScreenshotIndex];
  }

  function showNextScreenshot(data) {
    if (!data || !data.screenshots) return;
    if (currentScreenshotIndex < data.screenshots.length - 1) {
      currentScreenshotIndex = currentScreenshotIndex + 1;
      updateScreenshotImage(data);
    }
    updateScreenshotButtons(data);
  }
  function showPrevScreenshot(data) {
    if (!data || !data.screenshots) return;
    if (currentScreenshotIndex > 0) {
      currentScreenshotIndex = currentScreenshotIndex - 1;
      updateScreenshotImage(data);
    }
    updateScreenshotButtons(data);
  }

  function updateScreenshotButtons(data) {
    if (!data || !data.screenshots) return;
    if (shotPrev) {
      shotPrev.disabled = currentScreenshotIndex === 0;
      shotPrev.setAttribute('aria-disabled', shotPrev.disabled);
    }
    if (shotNext) {
      shotNext.disabled = currentScreenshotIndex === data.screenshots.length - 1;
      shotNext.setAttribute('aria-disabled', shotNext.disabled);
    }
  }

  if (shotNext) {
    shotNext.addEventListener('click', () => {
      const data = getSelectedAppData();
      if (data) showNextScreenshot(data);
    });
  }
  if (shotPrev) {
    shotPrev.addEventListener('click', () => {
      const data = getSelectedAppData();
      if (data) showPrevScreenshot(data);
    });
  }
  document.querySelectorAll('.app-card').forEach(btn => {
    btn.addEventListener('click', () => selectApp(btn.dataset.app));
  });
  if (backBtn) backBtn.addEventListener('click', resetHub);
});
