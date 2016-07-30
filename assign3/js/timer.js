var Timer = function() {
}

Timer.prototype.timerIntervalId = 1000;

Timer.prototype.updateTimer = function(){
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    var totalSeconds = 0;

    var setTime = function()
    {
        ++totalSeconds;
        seconds.innerHTML = paddingWithZero(totalSeconds%60);
        minutes.innerHTML = paddingWithZero(parseInt(totalSeconds/60));
        hours.innerHTML = paddingWithZero(parseInt(totalSeconds/(60 * 60)));
    }

    var paddingWithZero = function(number)
    {
        var numberToString = number + "";
        if(numberToString.length < 2)
            return "0" + numberToString;
        else
            return numberToString;
    }

    this.timerIntervalId = setInterval(setTime, this.timerIntervalId);
}

Timer.prototype.clearTimer = function(){
    clearInterval(this.timerIntervalId);
}
