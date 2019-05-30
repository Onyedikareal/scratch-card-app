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

function postCardData(url, data, method, myFunct) {
    var xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function() {
      if ((this.readyState == 4 && this.status == 201) ||( this.readyState == 4 && this.status == 200)) {
        myFunct(this.responseText);
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader("Content-type", "application/json");
    if(data){
    xhttp.send(data);
    }else{
        xhttp.send();
    }
  }

  function fillTable(cardObj){

    
    $('thead').append(`<tr>
    <th >No</th>
    <th >Card Pin</th>
    <th >Serial</th>
    <th >validity</th>
    </tr>`);
   

    
    
    $('tbody').append(`<tr id='card'>
    <td rowspan='2' scope='rowgroup' id='id' > ${cardObj.id}  </td>
   <td id="pin" >${cardObj.pin}</td>
    <td id="sn">${cardObj.sn}</td>
   <td id= "validity${cardObj.id}">${cardObj.validity}</td></tr>
   <tr id='update'>
   <td scope = "row">&nbsp;</td>
   <td> <button class="btn bg-success" id="updatebutton">update</button></td>
   <td><button class="btn bg-danger " id="trash">trash</button></td> </tr>`);
}

 
function validityCheck(cardDateString, i){
    var currentDate = new Date();
    currentDate = currentDate.toUTCString();
    currentDate = Date.parse(currentDate);

    cardDate = Date.parse(cardDateString)
    value = +currentDate >= +cardDate
    if(value){
        $(`#validity${i}`).addClass('invalid');
    }else{
        $(`#validity${i}`).addClass('valid');
    }
}

  
$('#generate').click(function(){
    $('#table').removeClass('d-none');
    $('#validity').removeClass('invalid valid')
    $('thead').text('');
    var cardObj = cardObjGenerator();
    var data = JSON.stringify(cardObj);
    postCardData('http://localhost:3000/card', data,'POST', generateCard);
    var cardObject;
    function generateCard(cardString){
        cardObject = JSON.parse(cardString);

        fillTable(cardObject);
        var cardDate = cardObject.validity.toString();
        var id = cardObject.id
        validityCheck(cardDate, id);

    }

});









