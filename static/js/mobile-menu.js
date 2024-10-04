document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    console.log('Mobile menu script loaded');

    mobileMenuButton.addEventListener('click', () => {
        console.log('Mobile menu button clicked');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            console.log('Mobile menu class "active" removed');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                console.log('Mobile menu hidden');
            }, 300); // Matches the transition duration in CSS
        } else {
            mobileMenu.style.display = 'block';
            console.log('Mobile menu display set to block');
            setTimeout(() => {
                mobileMenu.classList.add('active');
                console.log('Mobile menu class "active" added');
            }, 10); // Small delay to ensure display: block is applied before the transition
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        const isClickOnDarkModeToggle = darkModeToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !isClickOnDarkModeToggle && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            console.log('Mobile menu class "active" removed (clicked outside)');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                console.log('Mobile menu hidden (clicked outside)');
            }, 300); // Matches the transition duration in CSS
        }
    });
});
