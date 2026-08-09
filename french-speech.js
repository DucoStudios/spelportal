/* Gemensam, enhetsanpassad fransk uppläsning för språkspelen. */
(() => {
  'use strict';

  const synthesis = window.speechSynthesis;
  const supported = !!(synthesis && window.SpeechSynthesisUtterance);
  let frenchVoice = null;
  let requestId = 0;
  let refreshTimer = null;

  function voiceScore(voice) {
    const lang = String(voice.lang || '').toLowerCase().replace('_', '-');
    if (!lang.startsWith('fr')) return -1000;

    const identity = `${voice.name || ''} ${voice.voiceURI || ''}`.toLowerCase();
    let score = lang === 'fr-fr' ? 200 : 120;
    if (/natural|neural|premium|enhanced|amélior/.test(identity)) score += 80;
    if (/google|microsoft|siri/.test(identity)) score += 60;
    if (/thomas|audrey|amélie|amelie|jacques/.test(identity)) score += 35;
    if (/eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/.test(identity)) score -= 60;
    if (/compact|eloquence|espeak/.test(identity)) score -= 70;
    if (voice.localService) score += 12;
    if (voice.default) score += 6;
    return score;
  }

  function refreshVoice() {
    if (!supported) return null;
    frenchVoice = synthesis.getVoices()
      .map((voice, index) => ({ voice, index, score: voiceScore(voice) }))
      .filter(item => item.score > -1000)
      .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.voice || null;
    return frenchVoice;
  }

  function scheduleVoiceRefresh() {
    if (!supported || frenchVoice || refreshTimer) return;
    let attempts = 0;
    refreshTimer = window.setInterval(() => {
      attempts += 1;
      if (refreshVoice() || attempts >= 8) {
        window.clearInterval(refreshTimer);
        refreshTimer = null;
      }
    }, 125);
  }

  function speak(text, options = {}) {
    if (!supported || !text) return false;

    requestId += 1;
    synthesis.cancel();
    refreshVoice();
    scheduleVoiceRefresh();

    const utterance = new SpeechSynthesisUtterance(String(text).trim());
    utterance.lang = 'fr-FR';
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.rate = Math.min(1.05, Math.max(0.72, Number(options.rate) || 0.88));
    utterance.pitch = Math.min(1.15, Math.max(0.85, Number(options.pitch) || 1));
    utterance.volume = 1;

    const thisRequest = requestId;
    utterance.onstart = () => {
      if (thisRequest === requestId && synthesis.paused) synthesis.resume();
    };
    utterance.onerror = event => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        console.warn('Fransk uppläsning kunde inte starta:', event.error);
      }
    };
    synthesis.speak(utterance);
    return true;
  }

  function stop() {
    requestId += 1;
    if (supported) synthesis.cancel();
  }

  function getVoiceInfo() {
    refreshVoice();
    return frenchVoice ? { name: frenchVoice.name, lang: frenchVoice.lang } : null;
  }

  if (supported) {
    refreshVoice();
    scheduleVoiceRefresh();
    synthesis.addEventListener?.('voiceschanged', refreshVoice);
  }

  window.FrenchSpeech = Object.freeze({ speak, stop, getVoiceInfo, supported });
})();
