document.addEventListener('DOMContentLoaded', () => {
    toggleBurger();
    hideNav();
  });

function hideNav(){
  const $navbar = document.getElementById("navbar");
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if(currentScroll <= 0){
      $navbar.classList.remove('scroll-up');
    }
    if(currentScroll > lastScroll && !$navbar.classList.contains('scroll-down')){
      //$navbar.classList.remove('scroll-up');
      //$navbar.classList.add('scroll-down');
      $navbar.classList.add('scroll-up');        
    }
    if(currentScroll < lastScroll && !$navbar.classList.contains('scroll-up')){
      $navbar.classList.remove('scroll-down');
      $navbar.classList.add('scroll-up');        
    }
    lastScroll = currentScroll;
  })
}
  


function toggleBurger(){
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}