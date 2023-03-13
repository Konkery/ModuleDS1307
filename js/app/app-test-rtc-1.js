const err = require('https://raw.githubusercontent.com/Konkery/ModuleAppError/main/js/module/ModuleAppError.min.js');
const NumIs = require('https://raw.githubusercontent.com/Konkery/ModuleAppMath/main/js/module/ModuleAppMath.min.js');
     NumIs.is(); //добавить функцию проверки целочисленных чисел в Number

const clock_class = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/ModuleDS1307.min.js');

try {
//    clock = new clock_class.ClassRealTimeClockSet(d,dd,32,fw23,9,9);
    clock = new clock_class.ClassRealTimeClock(new clock_class.ClassRealTimeClockSet());
    let cDate = new Date();
    cDate.setTime(128743);
    clock.SetTime(128743);
    
    let timerId = setInterval(() => OutTime(), 1000);
    function OutTime() {
        console.log(cDate.getTime());
        console.log(clock.GetTime());
    }
} catch(e){
    console.log(`Error>> ${e.Message}, Code>> ${e.Code}`);
}