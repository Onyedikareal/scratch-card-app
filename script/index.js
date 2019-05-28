function pinGenerator(){
    var rechargePin;
    rechargePin = (Math.random()+'').substring(2,10) + (Math.random()+'').substring(2,10);
    
    return parseInt(rechargePin);

}

