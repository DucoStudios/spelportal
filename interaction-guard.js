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
})();
