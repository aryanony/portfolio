/**
 * Marquee
 * Clones .marquee-content for seamless infinite scroll.
 * Injects CSS keyframe animation and pauses on hover.
 */
(function () {
  'use strict';

  var ANIMATION_DURATION = 20; // seconds

  function init() {
    var marquees = document.querySelectorAll('.marquee');
    if (!marquees.length) return;

    // Inject keyframes once
    var style = document.createElement('style');
    style.textContent =
      '@keyframes marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}';
    document.head.appendChild(style);

    marquees.forEach(function (marquee) {
      var content = marquee.querySelector('.marquee-content');
      if (!content) return;

      // Clone content for seamless loop
      var clone = content.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');

      // Wrap both in a flex container
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;width:max-content;animation:marquee-scroll ' + ANIMATION_DURATION + 's linear infinite;will-change:transform;';

      // Move original content into wrapper, add clone
      content.parentNode.insertBefore(wrapper, content);
      wrapper.appendChild(content);
      wrapper.appendChild(clone);

      // Ensure marquee container clips overflow
      marquee.style.overflow = 'hidden';
      marquee.style.width = '100%';

      // Pause on hover
      marquee.addEventListener('mouseenter', function () {
        wrapper.style.animationPlayState = 'paused';
      });

      marquee.addEventListener('mouseleave', function () {
        wrapper.style.animationPlayState = 'running';
      });

      // Respect reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        wrapper.style.animationPlayState = 'paused';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
