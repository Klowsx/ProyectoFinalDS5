function toggleFaq(id) {
    const answer = document.getElementById(`faq-${id}`);
    const arrow = answer.previousElementSibling.querySelector('.arrow');
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        arrow.classList.remove('up');
    } else {
        answer.style.display = 'block';
        arrow.classList.add('up');
    }
}
