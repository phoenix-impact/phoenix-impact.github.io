var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

function closeMenu() {
    menuContainer.classList.remove('open');
    menuTrigger.classList.remove('is-active');
    body.classList.remove('lock-scroll');
}

function openMenu() {
    menuContainer.classList.add('open');
    menuTrigger.classList.add('is-active');
    body.classList.add('lock-scroll');
}

menuTrigger.onclick = function(event) {
    event.stopPropagation();
    if (menuContainer.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menuContainer.classList.contains('open')) {
        closeMenu();
    }
});

document.addEventListener('click', function() {
    if (menuContainer.classList.contains('open')) {
        closeMenu();
    }
});

