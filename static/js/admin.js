document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const categorySelect = document.getElementById('category');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const category = categorySelect.value;

        if (!title || !content || !category) {
            alert('Please fill in all fields');
            return;
        }

        // Submit the form
        this.submit();
    });
});
