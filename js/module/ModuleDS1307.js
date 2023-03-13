
/**
 * @class
 * Класс ClassRealTimeClockSet реализует проверку вводимых данных времени.
 * Для работы класса требуется подключить модуль ModuleAppMath, где 
 * добавляется функция проверки на целочисленность
 */
class ClassRealTimeClockSet {
    /**
     * @constructor
     * @param {number} _hour		- часы, принимают значение он 0 до 23
     * @param {number} _minute		- минуты, принимают значение от 0 до 59
     * @param {number} _second		- секунды, принимают значение от 0 до 59
     * @param {number} _year		- год, принимает значение от 1970 до 2100
	 * @param {number} _month		- месяц, принимает значение от 1 до 12
	 * @param {number} _day			- день, принимает значение от 1 до 31
     */
    constructor(_day, _month, _year, _hour, _minute, _second) {
        this.name = 'ClassRealTimeClockSet'; //переопределяем имя типа
		this._date = undefined;
        
        this.Init(_day, _month, _year, _hour, _minute, _second); //инициализировать поля
    }
    /*******************************************CONST********************************************/
    /**
     * @const
     * @type {number}
     * Константа ERROR_CODE_ARG_VALUE определяет код ошибки, которая может произойти
     * в случае передачи в конструктор не валидных данных
     */
    static get ERROR_CODE_ARG_VALUE() { return 10; }
    /**
     * @const
     * @type {string}
     * Константа ERROR_MSG_ARG_VALUE определяет сообщение ошибки, которая может произойти
     * в случае передачи в конструктор не валидных данных
     */
    static get ERROR_MSG_ARG_VALUE() { return `ERROR>> invalid data. ClassID: ${this.name}`; }
    /*******************************************END CONST****************************************/
    /**
     * Метод инициализирует поля объекта
	 * Если все поля пустые - берем время с датчика
     */
    Init(_day, _month, _year, _hour, _minute, _second) {
		/**
		 * Если параметры все пустые - дата останется пустой
		 * и время будет получено с датчика
		*/
		if (_day != undefined		&&
			_month != undefined		&&
			_year != undefined		&&
			_hour != undefined 		&&
			_minute != undefined	&&
			_second != undefined) {
				let day = _day || 1;
				let month = _month || 1;
				let year = _year || 1970;
				let hour = _hour || 12;
				let minute = _minute || 0;
				let second = _second || 0;
				
				/*проверить переданные аргументы  на валидность*/
				if (!(typeof (day) === 'number')   		||
					!(typeof (month) === 'number') 	    ||
					!(typeof (year) === 'number')       ||
					!(typeof (hour) === 'number')       ||
					!(typeof (minute) === 'number')     ||
					!(typeof (second) === 'number')     ||
					!(Number.isInteger(day))       		||
					!(Number.isInteger(month))         	||
					!(Number.isInteger(year))			||
					!(Number.isInteger(hour))       	||
					!(Number.isInteger(minute))       	||
					!(Number.isInteger(second))) {
						
						throw new err(ClassRealTimeClockSet.ERROR_MSG_ARG_VALUE,
									ClassRealTimeClockSet.ERROR_CODE_ARG_VALUE);
				}
				/*нормализовать аргументы*/
				if (year<1970) 	{year = 1970;}
				if (year>2100) 	{year = 2100;}
				if (month<1) 	{month = 1;}
				if (month>12) 	{month = 12;}
				if (day<1) 		{day = 1;}
				if (day>31 && ((month&1)^((month>>3)&1))) {
					day = 31;
				}
				else if (day>30 && !((month&1)^((month>>3)&1))) {
					day = 30;
				}
				else if (day>28 && month==2) {
					if (year%4) {day = 28;}
					else {day = 29;}
				}
				else {day = 1;}
				if (hour<0) 	{hour = 0;}
				if (hour>23) 	{hour = 23;}
				if (minute<0) 	{minute = 0;}
				if (minute>59) 	{minute = 59;}
				if (second<0) 	{second = 0;}
				if (second>59) 	{second = 59;}

				/*инициализировать поля*/
				this._date = new Date(
					year,
					month - 1,
					day,
					hour,
					minute,
					second);
		}
    }
}

/**
 * @class
 * Класс ClassRealTimeClock реализует логику работы часов реального времени. Микросхема DS1307.
 * Для работы класса требуется подключить модуль ModuleAppMath, где 
 * добавляется функция проверки на целочисленностьб а так-же модуль rtc,
 * который обеспечивает базовые функции часов
 */
class ClassRealTimeClock {
    /**
     * @constructor
     * @param {Object} _opt   - объект класса ClassRealTimeClockSet
     */
    constructor(_opt) {
        this.name = 'ClassRealTimeClock'; //переопределяем имя типа
		PrimaryI2C.setup({ sda: SDA, scl: SCL, bitrate: 100000 });
		this._rtc = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/rtc.min.js').connect(PrimaryI2C);		

        /*проверить переданные аргументы на валидность*/
        if ((typeof (_opt) === 'undefined')) {
            
            throw new err(ClassTypeRealTimeClock.ERROR_MSG_ARG_VALUE,
						ClassTypeRealTimeClock.ERROR_CODE_ARG_VALUE);
        }
		console.log('Break point 1');
        if(!(_opt instanceof ClassRealTimeClockSet)) {

            throw new err(ClassTypeRealTimeClock.ERROR_MSG_ARG_VALUE,
						ClassTypeRealTimeClock.ERROR_CODE_ARG_VALUE);
        }
		console.log('Break point 2');
		if (_opt._date instanceof Date) {
			this._rtc.setTime(_opt._date);
		}
		console.log('Break point 3');

		this._TimeZone = E.getTimeZone();
		console.log('Break point 3');
    }
	/*******************************************CONST********************************************/
    /**
     * @const
     * @type {number}
     * Константа ERROR_CODE_ARG_VALUE определяет код ошибки, которая может произойти
     * в случае передачи не валидных данных
     */
    static get ERROR_CODE_ARG_VALUE() { return 10; }
    /**
     * @const
     * @type {string}
     * Константа ERROR_MSG_ARG_VALUE определяет сообщение ошибки, которая может произойти
     * в случае передачи не валидных данных
     */
    static get ERROR_MSG_ARG_VALUE() { return `ERROR>> invalid data. ClassID: ${this.name}`; }
    /*******************************************END CONST****************************************/
    /**
     * @method
     * 
     * @param {Object} _opt   - объект класса ClassRealTimeClockSet
     */
    SetTime(_opt) {
        /*проверить переданные аргументы на валидность*/
        if(!(_opt instanceof ClassRealTimeClockSet)) {
            throw new ClassAppError(ClassRealTimeClock.ERROR_MSG_ARG_VALUE,
								ClassRealTimeClock.ERROR_CODE_ARG_VALUE);
        }  
		if (_opt._date instanceof Date) {
			this._rtc.setTime(_opt._date);
		}
		else {
			throw new err("You must fill in the values to set time",
						ClassTypeRealTimeClock.ERROR_CODE_ARG_VALUE);
		}     
    }
	 /**
     * @method
	 * 
     * @param {string} _format   - формат возвращаемого времени
     */
	 GetTime(_format) {
        /*выбираем формат*/
		let res;
		switch (_format) {
			case 'iso':
				res = this._rtc.getTime('iso');
				break;
			case 'hours':
				let time = this._rtc._date;
				res = this._rtc._leadZero(time.getHours()) +
				':' +
				this._rtc._leadZero(time.getMinutes()) +
				':' +
				this._rtc._leadZero(time.getSeconds());
        		break;
			default:
			res = this._rtc.getTime('unixtime');
		}
		return res;
    }
	 /**
     * @method
	 * 
     * @param {number} _TimeZone   - время в часах относительно GMT
     */
	 SetTimeZone(_TimeZone) {
        /*Проверяем валидность данных*/
		if (!(Number.isInteger(_TimeZone))) {
			throw new err(ClassTypeRealTimeClock.ERROR_MSG_ARG_VALUE,
						ClassTypeRealTimeClock.ERROR_CODE_ARG_VALUE);
		}
		
		if (_TimeZone<-11) {
			_TimeZone = -11;
		} else if (_TimeZone>12) {
			_TimeZone = 12;
		}
		this._TimeZone = _TimeZone;
	 }
	 /**
     * @method
     */
	 GetTimeZone() {
		return 'GMT ' + (this._TimeZone<0 ? '-' : '+') + this._TimeZone;
	 }
}

exports = { ClassRealTimeClockSet:    ClassRealTimeClockSet,
			ClassRealTimeClock:       ClassRealTimeClock};