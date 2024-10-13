document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('image-container');

    if (container) {
        container.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const centerX = width / 2;
            const centerY = height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
});