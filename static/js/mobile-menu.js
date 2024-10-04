document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        console.log('Mobile menu toggled');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        const isClickOnDarkModeToggle = darkModeToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !isClickOnDarkModeToggle && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            console.log('Mobile menu closed');
        }
    });
});
