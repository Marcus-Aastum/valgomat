var textElement = document.getElementById("myTitle")
textElement.style.color = "red";

prevButton = 0;

//Skift disse to til arrays
const userinput = {};
const apmening = {
    0: 0,
    1: 0
};
function test(input){

    console.log(input.parentNode.parentNode.id);
    if (prevButton && prevButton.parentNode.parentNode.id == input.parentNode.parentNode.id) {prevButton.parentNode.style.color = "black";}
    input.parentNode.style.color = "green";
    input.checked = false;
    prevButton = input;
    switch (input.parentNode.parentNode.id) {
        case "s1":
            userinput[0] = Number(input.id);
            break;
        case "s2":
            userinput[1] = Number(input.id);
        default:
            break;
    }
    console.log(userinput, Object.keys(userinput), Object.values(userinput)[0])
    checkAnswer()
}
function checkAnswer(){
    for (let index = 0; index < userinput.length; index++) {
        userinput[index] += 10
        console.log(userinput[index])
    }
}