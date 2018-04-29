$(function() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lettersArr = letters.split("");
    var chosenWord, chosenWordArr, guessedWordArr, numOfMisses, numOfCorrect;

    resetGame();

    function guessLetter() {
        var letter = $(this).attr("data-letter");
        $(this).prop("disabled", true);
        $(this).removeClass("btn-info");

        var found = false;
        for (var i = 0; i < chosenWordArr.length; i++) {
            if (chosenWordArr[i] === letter) {
                found = true;
                numOfCorrect++;
                guessedWordArr[i] = letter;
            }
        }

        if (found) {
            $(this).addClass("btn-success");
            correctLetter();
        } else {
            $(this).addClass("btn-danger");
            wrongLetter();
        }
    }

    function correctLetter() {
        $("#characters > .character").each(function(i) {
            $(this).text(guessedWordArr[i]);
        });

        if (numOfCorrect === chosenWord.length) finishGame(true);
    }

    function wrongLetter() {
        numOfMisses--;
        $("#misses").text(numOfMisses);

        if (numOfMisses === 0) finishGame(false);
    }

    function finishGame(win) {
        $(".letter-btn").prop("disabled", true);

        $(".alert-row").show();
        if (win) $("#win").show();
        else
        {   
             $("#lose").text("Sorry, you've run out of gueses. The word was: "+chosenWord);
            $("#lose").show();}
        
    }

    function setWord() {
        var words = ["GAME", "HANGMAN", "BITTITAN", "INTERVIEW", "JAVASCRIPT", "DOG", "CAT", "BALL"];
        chosenWord = words[Math.floor(Math.random() * words.length)];
        chosenWordArr = chosenWord.split("");

        var characters = $("#characters");
        guessedWordArr = [];
        for (var i = 0; i < chosenWordArr.length; i++) {
            characters.append('<div class="character">_</div>');
            guessedWordArr.push("_");
        }
    }

    function setupUI() {
        var keypad = $("#keypad");
        for (var i = 0; i < lettersArr.length; i++) {
            keypad.append('<button class="btn btn-info letter-btn" data-letter=' + lettersArr[i] + '>' + lettersArr[i] + '</button>');
        }

        $(".letter-btn").click(guessLetter);
        $(".reset-btn").click(resetGame);
    }

    function resetGame() {
        $("#keypad").empty();
        $("#characters").empty();

        numOfCorrect = 0;
        numOfMisses = 9;
        $("#misses").text(numOfMisses);

        $(".alert-row").hide();
        $("#win").hide();
        $("#lose").hide();

        setupUI();
        setWord();
    }
})();
