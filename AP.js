//---Menyside---
//Funksjon kalles når mus går over menyelement
function onMouse(element) {
  if (element.id === "tavalgomatcont") { //vis bilde
    document.getElementById("valgimg").style.opacity = 1;
  } else {
    document.getElementById("omimg").style.opacity = 1;
  }
  //Gjør tekst hvit og endre musepeker 
  element.style.color = "white";
  element.style.transition = "0.5s";
  element.style.cursor = "pointer";
}

//Funksjon kalles når mus fjernes fra menyelement
function removeMouse(element) {
  if (element.id === "tavalgomatcont") { //skjul bilde
    document.getElementById("valgimg").style.opacity = 0;
  } else {
    document.getElementById("omimg").style.opacity = 0;
  }
  //Gjør tekst svart
  element.style.color = "black";
  element.style.transition = "0.5s";
}


//---Valgomat---
let userinput = [];
const apmening = [4, 4, 1, 1, 5, 5, 5, 2, 2, 5, 4, 4, 1, 1, 2, 1];
let prevButton = [];
// Funksjon som kjøres hver gang brukeren trykker en knapp
function valgomatInput(input) {
  //Sjekker om en knapp i samme spørsmål har blitt trykket før, isåfall gjør den gamle knappen svart
  for (let index = 0; index < prevButton.length; index++) {
    if (prevButton[index].parentNode.parentNode.id == input.parentNode.parentNode.id) {
      prevButton[index].parentNode.style.color = "black";
      prevButton[index].parentNode.style.fontWeight = 400;
    }
  }
  //Gjør den nye valgte knappen grønn, og setter checked-attributten til false slik at onchange() funker riktig
  input.parentNode.style.color = "green";
  input.parentNode.style.fontWeight = 700;
  input.checked = false;

  //Setter knappen som har blitt trykket i listen over knapper som har blitt trykket før
  prevButton.push(input);

  //Plasserer riktig poengsum basert på svar i riktig index på array basert på id-en til spørsmålet
  if (input.parentNode.parentNode.id.length > 2) {
    userinput[Number(input.parentNode.parentNode.id.split("")[1] + input.parentNode.parentNode.id.split("")[2]) - 1] = Number(input.id);
  } else {
    userinput[Number(input.parentNode.parentNode.id.split("")[1]) - 1] = Number(input.id);
  }
}

//Funksjon kalles når bruker trykker knapp for å sjekke svar
function checkAnswer() {
  let diff = 0;
  for (let index = 0; index < userinput.length; index++) {
    switch (-Math.abs(userinput[index] - apmening[index])) { //gi positiv poengsum basert på hvor langt unna AP man var
      case -0:
        diff += 5;
        break;
      case -1:
        diff += 4;
        break;
      case -2:
        diff += 2;
        break;
      case -3:
        diff += 1;
        break;
      case -4:
        diff += 0;
    }
  }
  let prosentEnighet = diff / (apmening.length * 5) * 100; //Regner ut hvor enig man er i prosent
  document.getElementById("enighet").innerHTML = "Du er " + Math.round(prosentEnighet*10)/10 + "% enig med Arbeiderpartiet" //Skriver enighet til skjermen
}