const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-length-number]");
const passwordDisply = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");


const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateButton = document.querySelector(".generateButton");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

let symbols = '~`!@#$%^&*()_-+=][{}":;/?.>,<\|';



let password = "";

let passwordLength = 10;

let checkCount = 0;

// function call

handleSlider();

// Set strength circle color to grey

setIndication("#ccc");



function handleSlider(){

    inputSlider.value = passwordLength;
    lengthDisplay.innerText= passwordLength;

    // for css
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
    // **

}


function setIndication(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 20px ${color}`;
}


function getRanInteger(min , max){

    return Math.floor(Math.random() * (max-min)) + min;

}


function generateRandomNumber(){

    return getRanInteger(0,9);
};


function generateLowerCase(){

    return String.fromCharCode( getRanInteger(97,123) );
}


function generateUpperCase(){

    return String.fromCharCode( getRanInteger(65,91) );
}


function generateSymbol(){

    const randomNumber = getRanInteger(0,symbols.length);
    return symbols.charAt(randomNumber);

}



function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}




function calcStrength(){

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(numberCheck.checked){
        hasNumber = true;
    }
    if(symbolCheck.checked){
        hasSymbol = true;
    }



    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndication("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndication("#ff0");
    } else {
        setIndication("#f00");
    }

};


async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisply.value);
        copyMsg.innerText = 'Copied';

    }
    catch(e){
        copyMsg.innerText = 'Failed';
    }

    // to make copy span visible

    copyMsg.classList.add('active');

    setTimeout( () =>{

        copyMsg.classList.remove('active');

    },3000);

}



// event listener on slider

inputSlider.addEventListener('input', (e) => {

    passwordLength = e.target.value;

    handleSlider();
});



copybtn.addEventListener('click' , () => {

    if(passwordDisply.value){
        copyContent();
    }

});


function handleCheckBoxChange(){

     checkCount = 0;

    allCheckBoxes.forEach( (checkbox) => {

        if(checkbox.checked){
            checkCount++;
        }

    });

    // Special Condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

};


allCheckBoxes.forEach( (checkbox) => {
    
    checkbox.addEventListener('change' , handleCheckBoxChange);

} );






generateButton.addEventListener('click' , () => {


    // if all checkboxes are unchecked

    if(checkCount == 0)
        return;
   

    // speacial condition

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    };

    
    // removing old password

    password = "";

    let funcArray = [];

    if(uppercaseCheck.checked){
        funcArray.push(generateUpperCase);
    };

    if(lowercaseCheck.checked){
        funcArray.push(generateLowerCase);
    };

    if(numberCheck.checked){
        funcArray.push(generateRandomNumber);
    };

    if(symbolCheck.checked){
        funcArray.push(generateSymbol);
    };

    // compulsory addition

    for(let i=0; i<funcArray.length; i++){
        password = password + funcArray[i]();
    };

    // remaining addition

    for(let i=0; i<passwordLength-funcArray.length; i++){

        let randomNumber = getRanInteger(0 , funcArray.length);

        password = password + funcArray[randomNumber]();

    };


    
    // shuffle password

    password = shufflePassword(Array.from(password));

    // show in UI

    passwordDisply.value = password;

    // password strength
    calcStrength();

});