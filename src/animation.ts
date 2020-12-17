export const animateElements = (): void => {
  const timeline = gsap.timeline();

  timeline
    .from('.animate', { opacity: 0, y: 20, stagger: 0.1, ease: 'power1' })
    .from('.list li', { x: -20, opacity: 0, stagger: 0.3 })
    .from('.search__container', { y: 10, opacity: 0 });
};

export const animateListItem = (li: HTMLLIElement): void => {
  gsap.from(li, { x: -10, opacity: 0, duration: 0.3 });
};

// listTimeline tracks the timeline of list
let listTimeline = gsap.timeline();

export const displayOffList = () => {
  const timeline = gsap.timeline();
  timeline
    .to('.list li', { x: -20, opacity: 0 })
    .to('.list', { display: 'none' })
    .fromTo(
      '.customer-detail',
      { display: 'none', opacity: 0, x: 20 },
      { display: 'block', opacity: 1, x: 0 }
    );

  listTimeline = timeline;
};

export const displayOnList = () => {
  listTimeline.reverse();
};
