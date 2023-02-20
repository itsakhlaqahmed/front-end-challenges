
var xSign = "<img class=\"cross-sign\" src=\"images/cross-icon-lg.png\" alt=\"cross-sign\">";
var oSign = "<img class=\"o-sign\" src=\"images/o-icon-lg.png\">";
var xicon = "<img src=\"images/cross-icon-sm.png\">";
var oicon = "<img class=\"circle-icon\" src=\"images/o-icon-sm.png\">";
var oIconUrl = "images/o-icon-sm.png"; 
var xIconUrl = "images/cross-icon-sm.png";

var gameKeys = [
    new Array(3),
    new Array(3),
    new Array(3)
    // [1, 0, 1],
    // [0, 1, 0],
    // [1, 0, 1]
    
]

var player1, player2, gameType, currentTurn="x", gameFinished = false;




// __________________ sign selector options event listener __________________

$(".sign-option").click(function () {

    let clickedBtnID = $(this).attr("id");
    $(this).addClass("light-grey-bg");

    if (clickedBtnID === "cross-sign-option"){
        $("#o-sign-option").removeClass("light-grey-bg");
    } else {
        $("#cross-sign-option").removeClass("light-grey-bg");
    }

});


// __________________ start game button clicked __________________

$(".start-game-btn").click(function(){

    let chosenSign = $(".sign-option.light-grey-bg").attr("id");    // getting chosen sign's id
    var chosenGameType = $(this).attr("id");    // getting type of game selected

    if (chosenSign === "cross-sign-option"){
        player1 = "x";
        player2 = "o";
    } else {
        player1 = "o";
        player2 = "x";
    }

   if (chosenGameType === "start-computer-game"){
        gameType = "computer";
   } else {
        gameType = "2players"
   }

    updateTurn(currentTurn, player1);
    $("#start-game-window").addClass("invisible");
    $("#main-game-window").removeClass("invisible")
});

// _____________________ array to update gamekeys array (for win logic) _____________________ 

function updateArray(selector, sign){
    var boxId = $(selector).attr("id");
    var signKey = sign === "x"? 1 : 0;
    
    switch(boxId){
        case "1":
            gameKeys[0][0] = signKey;
            break

        case "2":
            gameKeys[0][1] = signKey;
            break

        case "3":
            gameKeys[0][2] = signKey;
            break

        case "4":
            gameKeys[1][0] = signKey;
            break
                   
        case "5":
            gameKeys[1][1] = signKey;
            break
                   
        case "6":
            gameKeys[1][2] = signKey;
            break
                   
        case "7":
            gameKeys[2][0] = signKey;
            break
                   
        case "8":
            gameKeys[2][1] = signKey;
            break
           
        case "9":
            gameKeys[2][2] = signKey;
            break

        default:
            break;

        
    }
}



// _____________________ tick box function _____________________

function ticBox(selector, turn){

    updateArray(selector, turn);  

    
    if (turn === "x"){
        $(selector).html(xSign);
    } else {
        $(selector).html(oSign);
    }

    
}


// __________________ changeTurn _______________

function changeTurn(selector){
   
    if (currentTurn === "x"){
        currentTurn = "o";
    } else {
        currentTurn = "x";
    }

}


// __________ update Turn Display __________

function updateTurn(sign, p1){

    var turnDisplay = $(".turn-display");

    if (p1 === sign){
        turnDisplay.html("Player 1's Turn");
    } else {
        turnDisplay.html("Player 2's Turn");
    }

    if (sign === "x"){
        turnDisplay.css("background-color", "darkorange");
        turnDisplay.css("box-shadow", "0 6px #c06a02");

    } else {
        turnDisplay.css("background-color", "#248984");
        turnDisplay.css("box-shadow", "0 6px #0f4a47");
    }


    
}


// ______________________ game win logic function ______________________

function matchCheck(turn, twoDArray){

    // 0   0   0    arr[0][0]
    // 0   0   0    arr[1][0]
    // 0   0   0    arr[2][0]

    var sign = turn === "x" ? 1 : 0;
    // check each row horizontally

    for (const row of twoDArray){
        if (row[0] === sign){
            if (row[0] === row[1] && row[0] === row[2]){
                console.log(1);
                return true;
            }
        }
    }


    // check each column vertically

    for (const index in twoDArray){
        if (twoDArray[0][index] === sign){
            if (twoDArray[0][index] === twoDArray[1][index] && twoDArray[0][index] === twoDArray[2][index]){
                console.log(2);
                return true;
            }
        }
    }

    // anticlock-wise and clock-wise diagonal check
    
    if (twoDArray[1][1] === sign) {     // here checking if center value is equal to current sign
        
        if(twoDArray[0][0] === twoDArray[2][2] && twoDArray[0][0] === twoDArray[1][1]){
            console.log(3);
            return true;
        }
        if(twoDArray[0][2] === twoDArray[2][0] && twoDArray[0][2] === twoDArray[1][1]){
            console.log(4);
            return true;
        }
    }

    return false;
}


// ___________________________ win pop things ___________________________ 

function winPopup(sign, currentPlayer){
    $(".win-popup").show();
    var winningPlayer = $(".win-popup h1 span");
    var winningTitle = $(".win-popup h1");
    var color;
    


    // displaying winning icon
    if (sign === "x"){
        $(".winning-sign img").attr("src", xIconUrl);
        color = "darkorange";
    } else {
        $(".winning-sign img").attr("src", oIconUrl);
        color = "#52afaa";

    }

    if (currentPlayer === sign){
        winningPlayer.html("1");
        winningTitle.css("color", color);
    } else {
        winningPlayer.html("2");
        winningTitle.css("color", color);
    }
    
}

// ___________________________ Update winning score ___________________________

function udpateScore(){
    $()
}




// ___________________________ box is click to check ___________________________

$(".tick-box").click(function() {

    var isEmpty = $(this).html() === '' ? true : false;

    if (!gameFinished && isEmpty) {
	    ticBox(this, currentTurn);
	    gameFinished = matchCheck(currentTurn, gameKeys);
	    console.log(gameFinished);

        if(!gameFinished){
            changeTurn(this);
            updateTurn(currentTurn, player1);
        }

        if (gameFinished){
           winPopup(currentTurn, player1)
        }

    } else {
        //ad
    }

});
	
