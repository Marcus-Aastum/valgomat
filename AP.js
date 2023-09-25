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
const sporsmal = ["Midtbyen må stenges for privatbiler flere steder", 
"Det bør være mulig å bygge flere høyhus i Trondheim", 
"Det skal legges til rette for flere private helsetilbud",
"Eiendomskatten må reduseres",
"Det skal bli flere gågater i midtbyen",
"Fjerne kontantstøtten for å skape flere barnehageplasser",
"Fjerne Abortnemndsystemet mellom uke 12 og 18",
"Øke fordelene til BSU Sparing",
"Jernbanen skal forbli privatisert",
"Bør vi sikte på å nå Nato's mål av å bruke 2% av BNP på forsvaret",
"Vinmonopolet bør ta over driften av alkoholsalg i Tax-Free butikker",
"Personer tatt med brukerdoser av rus bør få hjelp istedenfor straff",
"Staten bruker for mye penger på utstyrsstipend",
"Verneplikten er for streng og bør avvikles",
"Det skal være karakterbasert inntak på videregående skoler",
"Vi bør gi fra oss statlig eierskap i flere selskap, som Statkraft"];
const valg = ["Helt Uenig", "Litt Uenig", "Nøytral", "Litt Enig", "Helt Enig"]
// Funksjon som kjøres hver gang brukeren trykker en knapp
function valgomatInput(input) {
  //Sjekker om en knapp i samme spørsmål har blitt trykket før, isåfall gjør den gamle knappen svart
  let index = 0
  let spmIndex = NaN
  input.parentNode.style.color = "green";
  switch (input.parentNode.parentNode.id.length) {
    case 2:
      spmIndex = input.parentNode.parentNode.id.split("")[1]
      break;
    case 3:
      spmIndex = input.parentNode.parentNode.id.split("")[1] + input.parentNode.parentNode.id.split("")[2]
      break;
    default:
      break;
  }
  for (index = 0; index < prevButton.length; index++) {
    if (prevButton[index].parentNode.parentNode.id == input.parentNode.parentNode.id) {
      prevButton[index].parentNode.style.color = "black";
      prevButton[index].parentNode.style.fontWeight = 400;
    }
  }
  //Om AP og bruker har valgt det samme, gjør valgt knapp Oransje
  if (input.id == apmening[Number(spmIndex) - 1]){
    input.parentNode.style.color = "orange";
  }
  //Om AP og bruker velger forskjellig, gjør AP sitt valg rødt og bruker sitt valgt grønt
  else if(input.id != apmening[Number(spmIndex) - 1]){
    input.parentNode.style.color = "green";
    document.querySelector("#"+"s" + spmIndex +" "+ ".a" +apmening[Number(spmIndex)-1]).parentNode.style.color = "red";
  }
  //Gjør valgt element bold og gjør checked til false for at onChange() skal funke
  input.parentNode.style.fontWeight = 700;
  input.checked = false;

  //Setter knappen som har blitt trykket i listen over knapper som har blitt trykket før
  prevButton.push(input);

  //Plasserer riktig poengsum basert på svar i riktig index på array basert på id-en til spørsmålet
  userinput[Number(spmIndex) - 1] = Number(input.id);
}

//Funksjon kalles når bruker trykker knapp for å sjekke svar
function checkAnswer() {
  let diff = 0;
  for (let index = 0; index < userinput.length; index++) {
    //gi positiv poengsum basert på hvor langt unna AP man var
    switch (-Math.abs(userinput[index] - apmening[index])) { 
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
//Funksjon som plasserer spørsmålene i valgomaten
function makeSpm(){
  const valgomatdiv = document.getElementsByClassName("valgomat")[0]; //definerer div til valgomaten
  //For loop som iterer gjennom spørsmålene
  for (let index = 0; index < sporsmal.length; index++) {
    //lager undertittelen
    const tittel = document.createElement("h2");
    const node = document.createTextNode(sporsmal[index]);
    tittel.appendChild(node);
    valgomatdiv.appendChild(tittel);

    //Lager form hvor spørsmål plasseres i
    const form = document.createElement("form");
    form.id = "s"+ String(index + 1);
    //For loop som plasserer svaralternativene
    for (let n = 4; n >= 0; n--) {
      const label = document.createElement("label");

      //Lager input-element med tilhørende attributter
      const inputel = document.createElement("input");
      inputel.id = n + 1;
      inputel.className = "a"+String(n+1);
      inputel.type = "radio";
      inputel.value = "HTML";
      inputel.setAttribute("onclick", "valgomatInput(this)");
      const inputnode = document.createTextNode(valg[n]);

      //Plasserer elementene i formen
      label.appendChild(inputel);
      label.appendChild(inputnode);
      form.appendChild(label);
      form.appendChild(document.createElement("br"));
    }
    //Plaserer spørsmålet i dokumentet
    valgomatdiv.appendChild(form);
    
  }
}
if (window.location.pathname === "/Valgomat/"){
  makeSpm();
}