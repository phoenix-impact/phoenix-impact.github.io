var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

// Function to close the menu
function closeMenu() {
    menuContainer.classList.remove('open');
    menuTrigger.classList.remove('is-active');
    body.classList.remove('lock-scroll');
}

// Function to open the menu
function openMenu() {
    menuContainer.classList.add('open');
    menuTrigger.classList.add('is-active');
    body.classList.add('lock-scroll');
}

// Original hamburger click functionality
menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active');
    body.classList.toggle('lock-scroll');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menuContainer.classList.contains('open')) {
        closeMenu();
    }
});
