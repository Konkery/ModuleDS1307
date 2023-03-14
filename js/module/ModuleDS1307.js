
/**
 * @class
 * Класс ClassRealTimeClockSet реализует проверку вводимых данных времени.
 * Для работы класса требуется подключить модуль ModuleAppMath, где 
 * добавляется функция проверки на целочисленность
 */
class ClassRTCSet {
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
        this.name = 'ClassRTCSet'; //переопределяем имя типа
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
						
						throw new err(ClassRTCSet.ERROR_MSG_ARG_VALUE,
									ClassRTCSet.ERROR_CODE_ARG_VALUE);
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
					month,
					day,
					hour,
					minute,
					second);
		}
    }
}

/**
 * @class
 * Класс ClassRTC реализует логику работы часов реального времени. Микросхема DS1307.
 * Для работы класса требуется подключить модуль ModuleAppMath, где 
 * добавляется функция проверки на целочисленность, а так-же модуль rtc,
 * который обеспечивает базовые функции часов
 */
class ClassRTC {
    /**
     * @constructor
     * @param {Object} _Pin   - - объект класса Pin
     */
    constructor(_Pin) {
        this.name = 'ClassRealTimeClock'; //переопределяем имя типа
		PrimaryI2C.setup({ sda: SDA, scl: SCL, bitrate: 100000 });
		this._rtc = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/rtc.min.js').connect(PrimaryI2C);	
    }
	/*******************************************CONST********************************************/
    /**
     * @const
     * @type {number}
     * Константа ERROR_CODE_ARG_VALUE определяет код ошибки, которая может произойти
     * в случае передачи не валидных данных
     */
    get ERROR_CODE_ARG_VALUE() { return 10; }
    /**
     * @const
     * @type {string}
     * Константа ERROR_MSG_ARG_VALUE определяет сообщение ошибки, которая может произойти
     * в случае передачи не валидных данных
     */
	get ERROR_MSG_ARG_VALUE() { return `ERROR>> invalid data. ClassID: ${this.name}`; }
    /*******************************************END CONST****************************************/
    /**
     * @method
     * 
     * @param {Object} _opt   - Время в любом формате
     */
    SetTime(_opt) {
        /*проверить переданные аргументы на валидность*/
		this._rtc.setTime(_opt);

    }
	/**
     * @method
     * 
     * @param {number} _val   - Значение, на которое переводим
	 * @param {string} _key	  - Что переводим (yy, dd, MM, hh, mm, ss)
     */
		SetTimeOf(_val, _key) {
			/*проверить переданные аргументы на валидность*/
			if (!(Number.isInteger(_val))	||
				!(typeof _key === 'string')) {
				throw new err('fff'+ ClassRTC.ERROR_MSG_ARG_VALUE,
								ClassRTC.ERROR_CODE_ARG_VALUE);
			}

			let date = this._rtc.getTime();
			switch (_key) {
				case 'yy':
				case 'year':
					if (_val<1970) 	{_val = 1970;}
					if (_val>2100) 	{_val = 2100;}
					date.year = _val;
					break;
				case 'MM':
				case 'month':
					if (_val<1) 	{_val = 1;}
					if (_val>12) 	{_val = 12;}
					date.month = _val - 1;
					break;
				case 'dd':
				case 'day':
					date.month++;
					if (_val<1) 		{_val = 1;}
					if (_val>31 && ((date.month&1)^((date.month>>3)&1))) {
						day = 31;
					}
					else if (_val>30 && !((date.month&1)^((date.month>>3)&1))) {
						day = 30;
					}
					else if (_val>28 && date.month==2) {
						if (date.year%4) {_val = 28;}
						else {_val = 29;}
					}
					else {_val = 1;}
					date.month--;
					date.day = _val;
					break;
				case 'hh':
				case 'hours':
					if (_val<0) 	{_val = 0;}
					if (_val>23) 	{_val = 23;}
					date.hour = _val;
					break;
				case 'mm':
				case 'minute':
					if (_val<0) 	{_val = 0;}
					if (_val>59) 	{_val = 59;}
					date.minute = _val;
					break;
				case 'ss':
				case 'second':
					if (_val<0) 	{_val = 0;}
					if (_val>59) 	{_val = 59;}
					date.second = _val;
					break;
				default:
					throw new err('Invalid key',
						ClassRTC.ERROR_CODE_ARG_VALUE);
			}

			this._rtc.setTime(date);
		}
	 /**
     * @method
	 * 
     * @param {string} _format   - формат возвращаемого времени
	 * Поддерживаемые форматы: iso - djp
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
}

exports = { ClassRTCSet:    ClassRTCSet,
			ClassRTC:       ClassRTC};