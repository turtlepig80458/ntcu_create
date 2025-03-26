document.addEventListener('DOMContentLoaded', function() {
    const addQuestionBtn = document.getElementById('add-question-btn');
    const questionsTable = document.getElementById('questions-table'); // Get the table element
    let questionsTableBody = null;
    let editor;

    if (questionsTable) {
        questionsTableBody = questionsTable.getElementsByTagName('tbody')[0]; // Get the tbody element
    }

    // Initialize CKEditor
    if (document.getElementById('editor')) {
        ClassicEditor
            .create( document.querySelector( '#editor' ), {
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true
                        }
                    ]
                }
            } )
            .then(newEditor => {
                editor = newEditor;
            })
            .catch( error => {
                console.error( error );
            });
    }

    // Redirect to add-question.html when "Add Question" button is clicked
    addQuestionBtn.addEventListener('click', function() {
        // No need to redirect, modal is already in index.html
    });

    // Function to load questions from local storage and display them in the table
    function loadQuestions() {
        if (questionsTableBody) {
            questionsTableBody.innerHTML = ''; // Clear existing table rows
            const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
            storedQuestions.forEach(question => {
                const newRow = document.createElement('tr');

                const questionNumberCell = document.createElement('td');
                questionNumberCell.textContent = question.questionNumber;
                newRow.appendChild(questionNumberCell);

                const topicCell = document.createElement('td');
                topicCell.textContent = question.topic;
                newRow.appendChild(topicCell);

                const questionStemCell = document.createElement('td');
                questionStemCell.textContent = question.questionStem;
                newRow.appendChild(questionStemCell);

                const optionACell = document.createElement('td');
                optionACell.textContent = question.optionA;
                newRow.appendChild(optionACell);

                const optionBCell = document.createElement('td');
                optionBCell.textContent = question.optionB;
                newRow.appendChild(optionBCell);

                const optionCCell = document.createElement('td');
                optionCCell.textContent = question.optionC;
                newRow.appendChild(optionCCell);

                const optionDCell = document.createElement('td');
                optionDCell.textContent = question.optionD;
                newRow.appendChild(optionDCell);

                questionsTableBody.appendChild(newRow);
            });
        }
    }

    // Handle form submission
    const addQuestionForm = document.getElementById('add-question-form');
    if (addQuestionForm) {
        addQuestionForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const questionNumber = document.getElementById('question-number').value;
            const topic = document.getElementById('topic').value;
            const questionStem = editor.getData();
            const optionA = document.getElementById('option-a').value;
            const optionB = document.getElementById('option-b').value;
            const optionC = document.getElementById('option-c').value;
            const optionD = document.getElementById('option-d').value;

            // Store the question data in local storage
            const questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions.push({ questionNumber, topic, questionStem, optionA, optionB, optionC, optionD });
            localStorage.setItem('questions', JSON.stringify(questions));

            // Load questions to update the table
            loadQuestions();

            // Close the modal
            $('#addQuestionModal').modal('hide');
        });
    }

    // Load questions on page load
    window.addEventListener('load', loadQuestions);
});
