// DOM Elements
const elements = {
    menuToggle: document.getElementById('menu-toggle'),
    menu: document.getElementById('menu')
};

// Menu Controls
function toggleMenu() {
    const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true';
    elements.menuToggle.setAttribute('aria-expanded', !isExpanded);
    elements.menu.classList.toggle('hidden');

    const bars = elements.menuToggle.querySelectorAll('div');
    bars.forEach((bar, index) => {
        if (isExpanded) {
            bar.classList.remove(...getBarClasses(index));
        } else {
            bar.classList.add(...getBarClasses(index));
        }
    });
}

function getBarClasses(index) {
    const classes = [
        ['rotate-45', 'translate-y-2'],
        ['opacity-0'],
        ['-rotate-45', '-translate-y-2']
    ];
    return classes[index] || [];
}

function handleClickOutside(event) {
    if (!elements.menuToggle.contains(event.target) && !elements.menu.contains(event.target)) {
        elements.menu.classList.add('hidden');
        elements.menuToggle.setAttribute('aria-expanded', 'false');
        const bars = elements.menuToggle.querySelectorAll('span');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    elements.menuToggle.addEventListener('click', () => {
        const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true';
        toggleMenu(isExpanded);
    });

    document.addEventListener('click', handleClickOutside);
});