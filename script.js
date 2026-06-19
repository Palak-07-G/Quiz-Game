$( function(){

    const questions = [  // array of objects

        {
            ques: "Which is the largest country in the world by land area?",
            options: ["China", "Russia", "Canada", "Australia"],
            correctIndex: 1
        },

        {
            ques: "'Kathakali' is a folk dance prevalent in which state of India?",
            options: ["Karnataka", "Orissa", "Kerela", "Manipur"],
            correctIndex: 2
        },

        {
            ques: "Which gas is usually filled in the electric bulb?",
            options: ["Nitrogen", "Hydrogen", "Carbon Dioxide", "Oxygen"],
            correctIndex: 0
        },

        {
            ques: "Plants synthesis protein from?",
            options: ["Starch", "Sugar", "Amino Acids", "Fatty Acids"],
            correctIndex: 2
        },

        {
            ques: "'.MPG' extension refers usually to what kind of file?",
            options: ["WordPerfect Document File", "MS Office document", "Image file", "Animation/movie file"],
            correctIndex: 3
        }
    ];

    let currentIndex = 0;
    let score = 0;
    let answered = false;

    function questionWithOptions(){
        answered = false;
        const q = questions[currentIndex];

        $("#progressText").text(`Question ${currentIndex + 1} out of ${questions.length}`);
        $("#scoreText").text(`Score : ${score}`);
        $("#questionText").text(q.ques);
        $("#nextBtn").addClass("d-none");

        $("#optionsContainer").empty(); // emptying the previous options for new ones

        q.options.forEach((option, index) => {
            $("#optionsContainer").append(
                `<button class="btn btn-outline-primary option-btn" data-index="${index}">${option}</button>`
            );
        });
        
    }


    function handleAnswer(selectedIndex){
        if(answered){
            return;
        }
        answered = true;

        const q = questions[currentIndex];
        const buttons = $(".option-btn");

        buttons.eq(q.correctIndex).addClass("correct");

        if (selectedIndex !== q.correctIndex) {
            buttons.eq(selectedIndex).addClass("wrong");
        } else {
            score++;
            $("#scoreText").text(`Score : ${score}`);
        }

        // after correct and wrong has been detected, we disable rest of the buttons
        buttons.prop("disabled",true);
        $("#nextBtn").removeClass("d-none");

    }

    function finalResult(){
        $("#quizScreen").addClass("d-none");
        $("#resultScreen").removeClass("d-none");
        $("#finalScore").text(` ${score} / ${questions.length}`);

    }

    $("#startBtn").on("click", function () {
        $("#startScreen").addClass("d-none");
        $("#quizScreen").removeClass("d-none");
        questionWithOptions();
    });

    $("#optionsContainer").on("click", ".option-btn", function(){
        const selectedIndex = $(this).data("index");
        handleAnswer(selectedIndex);
    });

    $("#nextBtn").on("click", function(){
        currentIndex++;
        if ( currentIndex < questions.length ){
            questionWithOptions();
        }
        else{
            finalResult();
        }
    });

    $('#restartBtn').on('click', function () {
        currentIndex = 0;
        score = 0;
        $('#resultScreen').addClass('d-none');
        $('#startScreen').removeClass('d-none');
    });

});
