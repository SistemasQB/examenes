document.addEventListener('DOMContentLoaded', function() {
    const examTitle = localStorage.getItem('examTitle');
    const questions = JSON.parse(localStorage.getItem('examQuestions'));
    const examContainer = document.getElementById('exam-container');
    const examTitleElement = document.getElementById('exam-title');
    examTitleElement.textContent = examTitle;

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${question.questionText}`;
        questionDiv.appendChild(questionText);

        question.answers.forEach((answer, idx) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer-option');

            if (question.answers.length === 1) {
                // Respuesta abierta
                const openInput = document.createElement('input');
                openInput.type = 'text';
                openInput.placeholder = 'Escribe tu respuesta aquí...';
                answerDiv.appendChild(openInput);
            } else {
                // Opción múltiple o verdadero/falso
                const answerInput = document.createElement('input');
                answerInput.type = question.answers.length > 2 ? 'checkbox' : 'radio';
                answerInput.name = `question-${index}`;
                answerInput.id = `answer-${index}-${idx}`;
                
                const label = document.createElement('label');
                label.setAttribute('for', answerInput.id);
                label.textContent = answer.answerText;
                answerDiv.appendChild(answerInput);
                answerDiv.appendChild(label);
            }

            questionDiv.appendChild(answerDiv);
        });

        examContainer.appendChild(questionDiv);
    });

    // Enviar respuestas
    document.getElementById('submit-exam-btn').addEventListener('click', function() {
        let score = 0;
        questions.forEach((question, index) => {
            const userAnswers = document.querySelectorAll(`input[name="question-${index}"]:checked`);
            userAnswers.forEach((input) => {
                const answerText = input.nextElementSibling.textContent;
                if (question.answers.find(ans => ans.answerText === answerText && ans.isCorrect)) {
                    score++;
                }
            });
        });
        alert(`Tu puntaje es: ${score} de ${questions.length}`);
    });
});