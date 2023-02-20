function doc(selector){
    // return document.querySelector(selector);
}

// var cardNumber = [0, 0, 0, 0, " ", 0, 0, 0, 0, " ", 0, 0, 0, 0, " ", 0, 0, 0, 0];
var cardNumber= "0000 0000 0000 0000";
var cardName = "Jane Appleseed";
var expiryMonth = "00", expiryYear = "00", cvc_Code = "000";



// this function adds space after every four char in card number

function spaceAdd(selector){

    let text = document.querySelector("#" + selector).value;
    let textLength = text.length;
    let whiteSpaces = (text.match(/\s/g) || []).length;

    if (textLength > 0 && textLength < 19){
        if ((textLength - whiteSpaces) % 4 === 0){
            document.querySelector("#" + selector).value += " "; 
        }
    }
}

// function to update the display card
function updateDisplayCard(cardNumber, cardName, expiryMonth, expiryYear, cvc){

    let expiryDate = expiryMonth + "/" + expiryYear;
    // document.querySelector("#card-display-number").innerHTML = cardNumber.join("");
    document.querySelector("#card-display-number").innerHTML = cardNumber;
    document.querySelector("#card-display-name").innerHTML = cardName;
    document.querySelector("#card-display-expiry-date").innerHTML = expiryDate;
    document.querySelector("#card-display-cvc").innerHTML = cvc;

}


function blankInputCheck(object){
    if (object.value === null || object.value === ""){
        object.classList.add("warning");
        document.querySelector("#" + object.id + "~ .blank-warning").classList.remove("invisible");
    } else {
        object.classList.remove("warning");
        document.querySelector("#" + object.id + "~ .blank-warning").classList.add("invisible");
    }
}

function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // console.log("1: " + v);
    var matches = v.match(/\d{4,16}/g);
    // console.log("2: " + matches);
    var match = matches && matches[0] || ''
    // console.log("3: " + match);
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    // console.log("4: " + parts);
    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}


function getValues(object, currentField, fieldText){


     // card name text field
     if (currentField === "card-name"){
        cardName = fieldText;
    }

    // if text is edit in card number input field
    if (currentField === "card-number"){
        cardNumber = cc_format(fieldText);
        object.value = cardNumber;

        // let index = 0;
        // for (const char of fieldText) {
        //     cardNumber[index] = char;
        //     index++;

        // }

    }

    // card expiry month
    if (currentField === "card-expiry-month"){
        expiryMonth = fieldText;
    }

    // card expiry year
    if (currentField === "card-expiry-year"){
        expiryYear = fieldText;

    }

    // cvc code
    if (currentField === "cvc"){
        cvc_Code = fieldText;
    }
} // end getValues function



var inputfields = document.querySelectorAll("input");

for (let i = 0; i < inputfields.length; i++) {
    inputfields[i].addEventListener("keyup", function(){

        blankInputCheck(this);        
        getValues(this, this.id, this.value);
        updateDisplayCard(cardNumber,cardName, expiryMonth, expiryYear, cvc_Code);
        
        // submitButtonClick();

       
    
    });
    
}


document.querySelector("form").onsubmit = function(){
    document.querySelector(".form").classList.add("invisible");
    document.querySelector(".completed-state").classList.remove("invisible");
    return false;
};
