var textElement = document.getElementById("myTitle")
textElement.style.color = "red";

prevButton = 0;

//Skift disse to til arrays
const userinput = [];
const apmening = [2, 5];
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
    console.log(userinput)
}
function checkAnswer(){
    diff = 0
    for (let index = 0; index < userinput.length; index++) {
        switch(-Math.abs(userinput[index] - apmening[index])){
            case -0:
                diff +=5;
                break;
            case -1:
                diff +=4;
                break;
            case -2:
                diff +=3;

        }
        console.log(-Math.abs(diff[index]))
    }
    console.log(diff, diff/10)
}