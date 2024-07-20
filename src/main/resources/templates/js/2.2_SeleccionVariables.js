document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll(".option");
    const correctAnswers = {
        question1: "c) String nombre = \"Ana\";",
        question2: "b) boolean esEstudiante = true"
    };

    options.forEach(option => {
        option.addEventListener("click", () => {
            const questionElement = option.closest('.question');
            const questionId = questionElement.id;
            const correctAnswer = correctAnswers[questionId];
            const isAlreadyAnswered = questionElement.classList.contains('answered');

            if (isAlreadyAnswered) return;

            if (option.textContent.trim() === correctAnswer.trim()) {
                option.style.backgroundColor = "green";
                questionElement.classList.add('answered');
                checkAllAnswered();
            } else {
                option.style.backgroundColor = "red";
                setTimeout(() => {
                    option.style.backgroundColor = "#003366";
                }, 1000);
            }
        });
    });
});

function checkAllAnswered() {
    const allQuestions = document.querySelectorAll('.question');
    const allAnswered = Array.from(allQuestions).every(question => 
        question.classList.contains('answered')
    );

    if (allAnswered) {
        document.getElementById('correct-image').style.visibility = 'visible';
    }
}

function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';
    
    setTimeout(() => {
        window.location.href = 'src/main/resources/templates/practicaTipoDato.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}
