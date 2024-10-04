document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300); // Matches the transition duration in CSS
        } else {
            mobileMenu.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10); // Small delay to ensure display: block is applied before the transition
        }
        console.log('Mobile menu toggled');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        const isClickOnDarkModeToggle = darkModeToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !isClickOnDarkModeToggle && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300); // Matches the transition duration in CSS
            console.log('Mobile menu closed');
        }
    });
});
