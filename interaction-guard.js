/* Gemensamt skydd mot oavsiktlig zoom, sidförflyttning och pull-to-refresh. */
(() => {
  const gameSurfaceSelector = [
    'canvas', '#board', '.board', '.board-wrap', '#gameWrap', '.game-wrap',
    '.game-area', '.playfield', '.stage', '.touch-controls', '.joystick-zone'
  ].join(',');

  document.addEventListener('dblclick', event => event.preventDefault(), { passive: false });
  document.addEventListener('gesturestart', event => event.preventDefault(), { passive: false });
  document.addEventListener('touchmove', event => {
    if (event.touches.length > 1 || event.target.closest?.(gameSurfaceSelector)) {
      event.preventDefault();
    }
  }, { passive: false });

  function setupOverlayFocus() {
    const overlays = [...document.querySelectorAll('.overlay')];
    if (!overlays.length) return;

    const gameSurface = document.querySelector([
      '#board', 'canvas', '.board', '#gameWrap', '.game-wrap',
      '.game-area', '.playfield', '.stage'
    ].join(','));
    if (gameSurface && !gameSurface.hasAttribute('tabindex')) {
      gameSurface.setAttribute('tabindex', '0');
      if (!gameSurface.hasAttribute('aria-label')) gameSurface.setAttribute('aria-label', 'Spelområde');
    }

    function isVisible(overlay) {
      return !overlay.classList.contains('hidden') && getComputedStyle(overlay).display !== 'none';
    }

    function focusWithoutScroll(element) {
      try { element?.focus({ preventScroll: true }); }
      catch (_) { element?.focus(); }
    }

    function syncOverlay(overlay, shouldMoveFocus) {
      const visible = isVisible(overlay);
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', visible ? 'true' : 'false');
      overlay.setAttribute('aria-hidden', visible ? 'false' : 'true');
      if (!shouldMoveFocus) return visible;

      if (visible) {
        const primaryAction = overlay.querySelector('button:not([disabled]), a[href], [role="button"]');
        window.requestAnimationFrame(() => focusWithoutScroll(primaryAction || overlay));
      } else if (!overlays.some(candidate => candidate !== overlay && isVisible(candidate))) {
        window.requestAnimationFrame(() => focusWithoutScroll(gameSurface));
      }
      return visible;
    }

    overlays.forEach(overlay => {
      let wasVisible = syncOverlay(overlay, false);
      const observer = new MutationObserver(() => {
        const visible = isVisible(overlay);
        syncOverlay(overlay, visible !== wasVisible);
        wasVisible = visible;
      });
      observer.observe(overlay, { attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    });

    const firstVisible = overlays.find(isVisible);
    if (firstVisible) syncOverlay(firstVisible, true);
  }

  function loadGameFeedback() {
    if (!document.body?.dataset.gameId || document.querySelector('script[data-game-feedback]')) return;
    const currentScript = [...document.scripts].find(script => /interaction-guard\.js(?:\?|$)/.test(script.src));
    if (!currentScript?.src) return;
    const root = new URL('.', currentScript.src);
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('game-feedback.css', root).href;
    stylesheet.dataset.gameFeedback = 'styles';
    document.head.appendChild(stylesheet);

    const config = document.createElement('script');
    config.src = new URL('feedback-config.js', root).href;
    config.dataset.gameFeedback = 'config';
    config.onload = () => {
      const feedback = document.createElement('script');
      feedback.src = new URL('game-feedback.js', root).href;
      feedback.dataset.gameFeedback = 'app';
      document.head.appendChild(feedback);
    };
    document.head.appendChild(config);
  }


  // Hemskärmsappen har ingen webbläsarknapp. Spelens egna tillbakaknappar kan ligga
  // under startrutor och "game over", så här läggs en alltid synlig hemknapp överst.
  function setupStandaloneHome() {
    const standalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    if (!standalone || !document.body?.dataset.gameId || document.querySelector('.standalone-home')) return;
    const currentScript = [...document.scripts].find(script => /interaction-guard\.js(?:\?|$)/.test(script.src));
    if (!currentScript?.src) return;
    const style = document.createElement('style');
    style.textContent = '.standalone-home{position:fixed;z-index:2147483000;top:max(10px,env(safe-area-inset-top));left:max(10px,env(safe-area-inset-left));width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(15,10,30,.82);color:#fff;font:700 1.3rem/1 sans-serif;text-decoration:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 2px 8px rgba(0,0,0,.4);touch-action:manipulation}';
    document.head.appendChild(style);
    const home = document.createElement('a');
    home.className = 'standalone-home';
    home.href = new URL('index.html', new URL('.', currentScript.src)).href;
    home.setAttribute('aria-label', 'Alla spel');
    home.textContent = '\u2190';
    document.body.appendChild(home);
  }
  function setupSharedGameUX() {
    setupOverlayFocus();
    loadGameFeedback();
    setupStandaloneHome();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupSharedGameUX, { once: true });
  else setupSharedGameUX();
})();
