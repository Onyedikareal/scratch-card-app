//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function pinGenerator(){
    var rechargePin;
    rechargePin = (Math.random()+'').substring(2,10) + (Math.random()+'').substring(2,10);
    
    return rechargePin;
}

function serialGenerator(){
    var serial;
    serial = 'SN' + (Math.random()+'').substring(2,10)
    return serial;
}

function dayMonthGenerator(max,min){
var random = Math.floor(Math.random() * (max - min) + min); 
return random;
}

function dateGenerator(){
    var month = dayMonthGenerator(12, 0);
    var dayOfMonth = dayMonthGenerator(31,0);
    var d  = new Date(2019,month, dayOfMonth);
    return d.toUTCString();
}

function cardObjGenerator(){
    var pin = pinGenerator();
    var sn = serialGenerator();
    var date = dateGenerator(); 
    return {
        pin: pin,
        sn: sn,
        validity: date
    };
}

function postCardData(url, data, myFunct) {
    var xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        myFunct(this.responseText);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
  }

  
  
$('#generate').click(function(){
$('#table').removeClass('d-none');
$('tbody').text('');
$('thead').text('');
var cardObj = cardObjGenerator();
 var data = JSON.stringify(cardObj);
postCardData('http://localhost:3000/card', data, generateCard);
var cardObject
function generateCard(cardString){
    cardObject = JSON.parse(cardString);

    fillTable(cardObject);
    var cardDate = cardObject.validity.toString();
    validityCheck(cardDate);

}

});



