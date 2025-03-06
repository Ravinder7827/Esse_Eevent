 // vendor.js
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, idx) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= idx) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    const addEventButton = document.querySelector('.add-event');
    addEventButton.addEventListener('click', () => {
        alert('Vendor has been added to the event!');
    });
});
