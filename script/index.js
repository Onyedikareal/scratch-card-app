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


