/*
 * Motion for the Gentlemen's Barbershop landing page.
 *
 * Transform-only (translate3d) so scrolling never triggers layout or paint —
 * the compositor moves the layers. Everything is opt-out under
 * prefers-reduced-motion, and the page is fully readable with this file absent
 * or blocked.
 *
 * Parallax contract, expressed in markup:
 *   [data-parallax-root]        the element whose travel through the viewport
 *                               drives its children
 *   [data-parallax="<speed>"]   a layer inside that root; speed is travel in px
 *                               per unit of progress. Larger reads as further away.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------- scroll reveal ---------------- */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(".gb-reveal")
  );

  function showAll() {
    revealTargets.forEach(function (el) {
      el.setAttribute("data-shown", "true");
    });
  }

  var revealObserver = null;

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = Number(el.getAttribute("data-reveal-delay") || "0");
          window.setTimeout(function () {
            el.setAttribute("data-shown", "true");
          }, delay);
          revealObserver.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------- parallax + sticky nav ---------------- */
  var nav = document.querySelector(".gb-nav");

  var layers = Array.prototype.slice
    .call(document.querySelectorAll("[data-parallax]"))
    .map(function (el) {
      return {
        el: el,
        root: el.closest("[data-parallax-root]") || el.parentElement,
        speed: Number(el.getAttribute("data-parallax") || "0")
      };
    });

  var frame = 0;
  var lastNavStuck = null;

  function paint() {
    frame = 0;
    var viewportH = window.innerHeight;

    if (nav) {
      var stuck = window.scrollY > 24;
      if (stuck !== lastNavStuck) {
        nav.setAttribute("data-stuck", String(stuck));
        lastNavStuck = stuck;
      }
    }

    if (reduceMotion.matches) return;

    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      if (!layer.root || !layer.speed) continue;

      var rect = layer.root.getBoundingClientRect();

      // Skip anything comfortably off-screen.
      if (rect.bottom < -viewportH * 0.5 || rect.top > viewportH * 1.5) continue;

      // -1 → root centre one screen below viewport centre
      //  0 → level with it
      // +1 → one screen above
      var span = viewportH / 2 + rect.height / 2;
      var progress = (rect.top + rect.height / 2 - viewportH / 2) / span;
      var y = -progress * layer.speed;

      layer.el.style.transform = "translate3d(0," + y.toFixed(2) + "px,0)";
    }
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(paint);
  }

  paint();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("orientationchange", schedule, { passive: true });

  // Honour a mid-visit change to the OS motion setting.
  function onMotionPreferenceChange() {
    if (reduceMotion.matches) {
      layers.forEach(function (layer) {
        layer.el.style.transform = "";
      });
      showAll();
    }
    schedule();
  }

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", onMotionPreferenceChange);
  } else if (typeof reduceMotion.addListener === "function") {
    reduceMotion.addListener(onMotionPreferenceChange);
  }

  /* ---------------- hero video ---------------- */
  // Safari and some mobile browsers ignore the autoplay attribute until a script
  // asks. Muted + playsinline keeps the request inside autoplay policy; if it is
  // still refused the poster frame simply stays up, which is a fine resting state.
  var video = document.querySelector(".gb-hero-media video");

  if (video) {
    if (reduceMotion.matches) {
      video.pause();
    } else {
      var attempt = function () {
        var played = video.play();
        if (played && typeof played.catch === "function") {
          played.catch(function () {
            /* autoplay refused — poster frame remains visible */
          });
        }
      };

      attempt();

      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible" && video.paused) attempt();
      });
    }
  }
})();
