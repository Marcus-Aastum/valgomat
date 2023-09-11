prevButton = [];

const userinput = [];
const apmening = [4, 4, 1, 1, 5, 5, 5, 2, 2, 5, 4, 4, 1, 1, 2, 1];
function test(input){

    //Sjekker om en knapp i samme spørsmål har blitt trykket før, isåfall gjør den gamle knappen svart
    for (let index = 0; index < prevButton.length; index++) {
        if(prevButton[index].parentNode.parentNode.id == input.parentNode.parentNode.id){
            prevButton[index].parentNode.style.color = "black";
        }
        
    }
    //Gjør den nye valgte knappen grønn, og setter checked-attributten til false slik at onchange() funker riktig
    input.parentNode.style.color = "green";
    input.checked = false;

    //Setter knappen som har blitt trykket i listen over knapper som har blitt trykket før
    prevButton.push(input);

    //Plasserer riktig poengsum basert på svar i riktig index på array basert på id-en til spørsmålet
    if(input.parentNode.parentNode.id.length >2){
        userinput[Number(input.parentNode.parentNode.id.split("")[1] + input.parentNode.parentNode.id.split("")[2]) - 1] = Number(input.id)
    }
    else{
        userinput[Number(input.parentNode.parentNode.id.split("")[1]) - 1] = Number(input.id)
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
                diff +=2;
                break;
            case -3:
                diff +=1;
                break;
            case -4:
                diff+= 0;
        }
        console.log(-Math.abs(diff[index]))
    }
    console.log(diff, diff/(apmening.length*5))
}