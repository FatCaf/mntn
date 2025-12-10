import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './css/styles.css';
import './css/responsive.css';

gsap.registerPlugin(ScrollTrigger);

const headerMenu = document.querySelector(".header");
const burgerMenu = headerMenu.querySelector(".burger");
const headerBackdrop = headerMenu.querySelector(".header-backdrop");
const closeMenu = headerMenu.querySelector(".close-menu");

if (headerMenu && burgerMenu) {
  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("is-active");
    headerMenu.classList.toggle("menu-is-active");
    document.body.classList.toggle("overflow-hidden");
    document.body.setAttribute("data-lenis-prevent", "");
  });

  headerBackdrop.addEventListener("click", function () {
    burgerMenu.classList.remove("is-active");
    headerMenu.classList.remove("menu-is-active");
    document.body.classList.remove("overflow-hidden");
    document.body.removeAttribute("data-lenis-prevent");
  });

  closeMenu.addEventListener("click", function () {
    burgerMenu.classList.remove("is-active");
    headerMenu.classList.remove("menu-is-active");
    document.body.classList.remove("overflow-hidden");
    document.body.removeAttribute("data-lenis-prevent");
  });
}

ScrollTrigger.create({
  trigger: ".hero",
  start: "center top",
  onEnter: () => headerMenu.classList.add("on-scroll"),
  onLeaveBack: () => headerMenu.classList.remove("on-scroll"),
});

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const heroTitle = document.querySelectorAll(".hero__title span");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroAction = document.querySelector(".hero__action");
const sliderListItem = document.querySelectorAll(".slider__item");
const sliderProgress = document.querySelector(".slider__progress");

gsap.fromTo(
  [heroSubtitle, heroTitle, heroAction, sliderListItem],
  {
    autoAlpha: 0,
    y: 100,
    stagger: 0.2,
  },
  {
    autoAlpha: 1,
    y: 0,
    stagger: 0.2,
  }
);
gsap.fromTo(
  sliderProgress,
  {
    autoAlpha: 0,
    y: "100",
  },
  {
    autoAlpha: 1,
    y: "0",
    delay: 1
  }
);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.1,
      invalidateOnRefresh: true,
    },
  })
  .to(".sky", { y: 500, force3D: true }, 0)
  .to(".mountains", { y: -150, force3D: true }, 0)
  .to(".man-standing", { y: -50, force3D: true }, 0)
  .to(".hero__content", { y: 200, autoAlpha: 0, force3D: true }, 0);

gsap.fromTo(".slider__bar", 
  { 
    height: "100%", 
    scaleY: 0.2, 
    transformOrigin: "top" 
  },
  {
    scaleY: 1,
    ease: "none",
    scrollTrigger: { scrub: 0.3 },
  }
);