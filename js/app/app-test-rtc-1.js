const err = require('https://raw.githubusercontent.com/Konkery/ModuleAppError/main/js/module/ModuleAppError.min.js');
const NumIs = require('https://raw.githubusercontent.com/Konkery/ModuleAppMath/main/js/module/ModuleAppMath.min.js');
     NumIs.is(); //добавить функцию проверки целочисленных чисел в Number

const clock_class = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/ModuleDS1307.min.js');

try {
//    clock = new clock_class.ClassRealTimeClockSet(d,dd,32,fw23,9,9);
    clock = new clock_class.ClassRealTimeClock(new clock_class.ClassRealTimeClockSet(9, 3, 2023, 12, 0, 15));
//    let timerId = setInterval(() => print(clock.GetTime()), 1000);
} catch(e){
    console.log(`Error>> ${e.Message}, Code>> ${e.Code}`);
}