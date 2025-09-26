if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force scroll to top immediately and on multiple events
  window.scrollTo(0, 0);
  
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    // Force scroll to hero section specifically
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant' });
    }
  });
  
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    // Force scroll to hero section specifically
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant' });
    }
  });
  
  // Also force on page show (handles back/forward navigation)
  window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant' });
    }
  });
  
  const io = new IntersectionObserver((entries)=> {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  },{ threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  
  const snaps = [...document.querySelectorAll('.section')];
  function nextSnap(delta = 1){
    const y = window.scrollY, h = window.innerHeight;
    let idx = snaps.findIndex(s => Math.abs(s.offsetTop - y) < h*0.5 || (y < s.offsetTop && s.offsetTop - y < h*0.6));
    if (idx < 0) idx = 0;
    const target = snaps[Math.min(Math.max(idx + delta, 0), snaps.length - 1)];
    target?.scrollIntoView({ behavior: 'smooth' });
  }
  window.addEventListener('keydown', (e) => {
    if (['PageDown','ArrowDown','Space'].includes(e.code) && !e.shiftKey){
      e.preventDefault(); nextSnap(+1);
    }
    if (['PageUp','ArrowUp'].includes(e.code) || (e.code==='Space' && e.shiftKey)){
      e.preventDefault(); nextSnap(-1);
    }
  });