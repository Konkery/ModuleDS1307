const err = require('https://raw.githubusercontent.com/Konkery/ModuleAppError/main/js/module/ModuleAppError.min.js');
const NumIs = require('https://raw.githubusercontent.com/Konkery/ModuleAppMath/main/js/module/ModuleAppMath.min.js');
     NumIs.is(); //добавить функцию проверки целочисленных чисел в Number

const clock_class = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/ModuleDS1307.min.js');

try {
//    clock = new clock_class.ClassRealTimeClockSet(d,dd,32,fw23,9,9);
    clock = new clock_class.ClassRTC();
    
    
    //setTime();
    //const hDate = new Date();
    //clock.SetTime(hDate);

    //console.log(cDate.toISOString() + ' controller');
    //console.log(clock.GetTimeHours() + ' module\n');
    clock.AdjustTime(10, 'mm');
    console.log(clock.GetTimeISO() + ' iso\n');
    console.log(clock.GetTimeHours() + ' hours\n');
    console.log(clock.GetTimeUnix() + ' unix\n');
    //let timerId = setInterval(() => OutTime(), 1000);
    //function OutTime() {
    //    const cDate = new Date();
        
    //}
} catch(e){
    console.log('Error>> ' + e._Message + ' Code>> ' + e._Code);
}