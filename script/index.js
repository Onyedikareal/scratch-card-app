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

  function fillTable(cardObj){

    
    $('thead').append(`<tr>
    <th >No</th>
    <th >Card Pin</th>
    <th >Serial</th>
    <th >validity</th>
    </tr>`);
   

    $('tbody').append("<tr id='card'></tr>");
    
    var td1 = `<th rowspan='2' scope='rowgroup' id='id' > ${cardObj.id}  </td>`;
    var td2 =  `<td id="pin" >${cardObj.pin}</td>`;
    var td3 = `<td id="sn">${cardObj.sn}</td>`
    var td4 = `<td id = "validity">${cardObj.validity}</th>`
    $('tbody #card').append(td1, td2, td3,td4);
   
    let td5 = `<td scope = "row">&nbsp;</td>`;
    let td6 = `<td> <button class="btn bg-success" id="updatebutton">update</button></td>`;
    let td7 =`<td><button class="btn bg-danger " id="trash">trash</button></td>`;
    $('tbody').append("<tr id='update'></tr>")
    $('tbody #update').append(td5,td6,td7);
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



