const err = require('https://raw.githubusercontent.com/Konkery/ModuleAppError/main/js/module/ModuleAppError.min.js');
const NumIs = require('https://raw.githubusercontent.com/Konkery/ModuleAppMath/main/js/module/ModuleAppMath.min.js');
     NumIs.is(); //добавить функцию проверки целочисленных чисел в Number

const clock_class = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/ModuleDS1307.min.js');

try {
//    clock = new clock_class.ClassRealTimeClockSet(d,dd,32,fw23,9,9);
    let clock = new clock_class.ClassRTC();

    //clock.SetTime(new Date(2023,4-1,20,10,0,0));

    clock.AdjustTime(30, 'mm');
    
    console.log(clock.GetTimeISO() + ' iso\n');

} catch(e){
    console.log('Error>> ' + e.Message + ' Code>> ' + e.Code);
}
    //setTime();
    //const hDate = new Date();
    

    //console.log(cDate.toISOString() + ' controller');
    //console.log(clock.GetTimeHours() + ' module\n');
    
    
    //let timerId = setInterval(() => OutTime(), 1000);
    //function OutTime() {
    //    const cDate = new Date();
        
    //}
//
//   console.log(clock.GetTimeHours() + ' hours\n');
//    console.log(clock.GetTimeUnix() + ' unix\n');