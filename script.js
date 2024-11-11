// script.js

document.getElementById('add-question-btn').addEventListener('click', addQuestion);
document.getElementById('generate-exam-btn').addEventListener('click', generateExam);

let questionCount = 0;

function addQuestion() {
    questionCount++;

    // Crear el contenedor de la pregunta
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.setAttribute('data-question-id', questionCount);

    // Agregar el tipo de pregunta
    const typeLabel = document.createElement('label');
    typeLabel.textContent = 'Tipo de pregunta:';
    const typeSelector = document.createElement('select');
    typeSelector.classList.add('question-type-selector');
    typeSelector.innerHTML = `
        <option value="multiple-choice">Opción Múltiple</option>
        <option value="true-false">Verdadero/Falso</option>
        <option value="open-ended">Abierta</option>
        <option value="single-choice">Selección Única</option>
    `;
    questionDiv.appendChild(typeLabel);
    questionDiv.appendChild(typeSelector);

    // Agregar el título de la pregunta
    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Pregunta ${questionCount}:`;
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.placeholder = 'Escribe la pregunta aquí...';
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionInput);

    // Contenedor de las respuestas
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answer-options');

    // Renderizar las opciones dependiendo del tipo de pregunta
    typeSelector.addEventListener('change', () => renderAnswers(typeSelector.value, answerDiv));

    questionDiv.appendChild(answerDiv);

    // Agregar la pregunta al contenedor principal
    document.getElementById('questions-container').appendChild(questionDiv);

    // Renderizar las respuestas por defecto (opción múltiple)
    renderAnswers(typeSelector.value, answerDiv);
}

function renderAnswers(type, answerDiv) {
    // Limpiar el contenedor de respuestas antes de agregar nuevas opciones
    answerDiv.innerHTML = '';

    if (type === 'multiple-choice' || type === 'single-choice') {
        // Opciones con casillas de selección (checkbox para múltiples, radio para selección única)
        for (let i = 0; i < 4; i++) {
            const answerWrapper = document.createElement('div');
            const answerLabel = document.createElement('label');
            answerLabel.textContent = `Respuesta ${i + 1}:`;
            
            const answerInput = document.createElement('input');
            answerInput.type = 'text';
            answerWrapper.appendChild(answerLabel);
            answerWrapper.appendChild(answerInput);

            // Casilla de verificación (para marcar cuál es la correcta)
            const correctAnswerCheckbox = document.createElement('input');
            correctAnswerCheckbox.type = 'checkbox';
            correctAnswerCheckbox.classList.add('correct-answer');
            correctAnswerCheckbox.setAttribute('data-answer-index', i);
            answerWrapper.appendChild(correctAnswerCheckbox);

            answerDiv.appendChild(answerWrapper);
        }
    } else if (type === 'true-false') {
        // Opciones de verdadero/falso
        const trueWrapper = document.createElement('div');
        const trueLabel = document.createElement('label');
        trueLabel.textContent = 'Verdadero';
        const trueRadio = document.createElement('input');
        trueRadio.type = 'radio';
        trueRadio.name = 'true-false';
        trueWrapper.appendChild(trueLabel);
        trueWrapper.appendChild(trueRadio);

        // Casilla para marcar la respuesta correcta
        const correctTrueCheckbox = document.createElement('input');
        correctTrueCheckbox.type = 'checkbox';
        correctTrueCheckbox.classList.add('correct-answer');
        correctTrueCheckbox.setAttribute('data-answer', 'true');
        trueWrapper.appendChild(correctTrueCheckbox);

        answerDiv.appendChild(trueWrapper);

        const falseWrapper = document.createElement('div');
        const falseLabel = document.createElement('label');
        falseLabel.textContent = 'Falso';
        const falseRadio = document.createElement('input');
        falseRadio.type = 'radio';
        falseRadio.name = 'true-false';
        falseWrapper.appendChild(falseLabel);
        falseWrapper.appendChild(falseRadio);

        // Casilla para marcar la respuesta correcta
        const correctFalseCheckbox = document.createElement('input');
        correctFalseCheckbox.type = 'checkbox';
        correctFalseCheckbox.classList.add('correct-answer');
        correctFalseCheckbox.setAttribute('data-answer', 'false');
        falseWrapper.appendChild(correctFalseCheckbox);

        answerDiv.appendChild(falseWrapper);
    } else if (type === 'open-ended') {
        // Respuesta abierta
        const openInput = document.createElement('input');
        openInput.type = 'text';
        openInput.placeholder = 'Escribe tu respuesta aquí...';
        answerDiv.appendChild(openInput);
    }
}

function generateExam() {
    const title = document.getElementById('exam-title').value;
    const questions = [];

    const questionElements = document.querySelectorAll('.question');
    
    questionElements.forEach((questionDiv) => {
        const questionText = questionDiv.querySelector('input[type="text"]').value;
        const questionType = questionDiv.querySelector('.question-type-selector').value;
        const answers = [];
        let correctAnswer = null;

        const answerInputs = questionDiv.querySelectorAll('.answer-options input[type="text"]');
        const checkboxes = questionDiv.querySelectorAll('.answer-options input[type="checkbox"]');
        const radioButtons = questionDiv.querySelectorAll('.answer-options input[type="radio"]');

        if (questionType === 'multiple-choice' || questionType === 'single-choice') {
            answerInputs.forEach((input, index) => {
                const answerText = input.value;
                const isCorrect = checkboxes[index] ? checkboxes[index].checked : false;
                answers.push({ answerText, isCorrect });
                if (isCorrect) correctAnswer = answerText;
            });
        } else if (questionType === 'true-false') {
            answerInputs.forEach((input, index) => {
                const answerText = input.value;
                const isCorrect = checkboxes[index] ? checkboxes[index].checked : false;
                answers.push({ answerText, isCorrect });
                if (isCorrect) correctAnswer = answerText;
            });
        } else if (questionType === 'open-ended') {
            answers.push({ answerText: answerInputs[0].value });
        }

        questions.push({ questionText, answers, correctAnswer });
    });

    // Guardar examen en localStorage y redirigir a la página del examen
    localStorage.setItem('examTitle', title);
    localStorage.setItem('examQuestions', JSON.stringify(questions));

    // Redirigir a la página del examen
    window.location.href = 'exam.html';
}
