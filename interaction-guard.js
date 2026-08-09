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

  function setupSharedGameUX() {
    setupOverlayFocus();
    loadGameFeedback();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupSharedGameUX, { once: true });
  else setupSharedGameUX();
})();
