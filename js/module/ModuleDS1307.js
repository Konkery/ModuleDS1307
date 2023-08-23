/**
 * @class
 * Класс ClassRTC реализует логику работы часов реального времени. Микросхема DS1307.
 * Для работы класса требуется подключить модуль ModuleAppMath, где 
 * добавляется функция проверки на целочисленность, а так-же модуль rtc,
 * который обеспечивает базовые функции часов
 */
class ClassDS1307 {
    /**
     * @constructor
     * @param {Object} _Pin   - - объект класса Pin
     */
    constructor() {
        this.name = 'ClassClassDS1307'; //переопределяем имя типа
		this._rtc = require('https://raw.githubusercontent.com/AlexGlgr/ModuleDS1307/fork-Alexander/js/module/BaseClassDS1307.min.js').connect((new ClassI2CBus).AddBus({sda: _opts._Pins[0], scl: _opts._Pins[1], bitrate: 100000}).IDbus);
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
     * Настривает время на модуле. Принимает объект класса Date
	 * или строку в формате ISO.
     * @param {(Date|string)} _date   - объект класса Date или строка в формате ISO
     */
    SetTime(_date) {
        /*проверить переданные аргументы на валидность*/
		let newDate;
		if (typeof _date === 'string' &&
			(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str))) {
			newDate = new Date(_date);
			if (!(newDate instanceof Date)) {
				throw new err(ClassDS1307.ERROR_MSG_ARG_VALUE,
					ClassDS1307.ERROR_CODE_ARG_VALUE);
				}
		}
		else if (_date instanceof Date) {
			newDate = _date;
		}
		else {
			throw new err(ClassDS1307.ERROR_MSG_ARG_VALUE,
				ClassDS1307.ERROR_CODE_ARG_VALUE);
		}
		/*проверить, что дата поддерживается модулем*/
		let year=newDate.getFullYear();
		/*нормализовать аргументы*/
		if (year<2000) 	{year = 2000;}
		if (year>2099) 	{year = 2099;}

		newDate.getFullYear(year);

		this._rtc.setTime(newDate);
    }
	/**
     * @method
	 * Единовременно изменяет одну из величин даты, от года до секунды, а также обеспечивает валидность
	 * вводимых данных (Если год выбран вне поддерживаемого схемой диапазона,
	 * то он будет автоматически подогнан к допустимому минимуму или максимуму)
     * @param {number} _val   - значение, на которое переводим
	 * @param {string} _key	  - что переводим (yy, dd, MM, hh, mm, ss)
     */
	AdjustTime(_val, _key) {
		/*проверить переданные аргументы на валидность*/
		if (!(Number.isInteger(_val))	||
			!(typeof _key === 'string')) {
				throw new err(ClassDS1307.ERROR_MSG_ARG_VALUE,
					ClassDS1307.ERROR_CODE_ARG_VALUE);
		}
		/*получить время с часов*/
		let temp=this._rtc.getTime('def');
		let _year=temp.getFullYear();
		let _month=temp.getMonth() + 1;
		let _day=temp.getDate();
		let _hour=temp.getHours();
		let _minute=temp.getMinutes();
		let _second=temp.getSeconds();
		/*по ключу выбрать проверку и настроить дату*/
		switch (_key) {
			case 'yy':
			case 'year':
				if (_val<2000) 	{_val = 2000;}
				if (_val>2099) 	{_val = 2099;}
				_year = _val;
				break;
			case 'MM':
			case 'month':
				if (_val<1) 	{_val = 1;}
				if (_val>12) 	{_val = 12;}
				_month = _val;
				break;
			case 'dd':
			case 'day':
				if (_val<1) 		{_val = 1;}
				if (_val>31 && ((_month&1)^((_month>>3)&1))) {
					_val = 31;
				}
				if (_val>30 && !((_month&1)^((_month>>3)&1))) {
					_val = 30;
				}
				if (_val>28 && _month==2) {
					if (date.year%4) {_val = 28;}
					else {_val = 29;}
				}
				_day = _val;
				break;
			case 'hh':
			case 'hours':
				if (_val<0) 	{_val = 0;}
				if (_val>23) 	{_val = 23;}
				_hour = _val;
				break;
			case 'mm':
			case 'minute':
				if (_val<0) 	{_val = 0;}
				if (_val>59) 	{_val = 59;}
				_minute = _val;
				break;
			case 'ss':
			case 'second':
				if (_val<0) 	{_val = 0;}
				if (_val>59) 	{_val = 59;}
				_second = _val;
				break;
			default:
				throw new err(ClassRTC.ERROR_MSG_ARG_VALUE,
					ClassRTC.ERROR_CODE_ARG_VALUE);
		}
		
		/*записать измененное время*/
		this._rtc.setTime(new Date(
			_year,
			_month-1,
			_day,
			_hour,
			_minute,
			_second
		));
	}
	/**
	 * @method
	 * Возвращает текущее время с модуля в формате iso
	 * @returns {string}	_res	- строка вида 2020-01-01T13:55:16
	 */
	GetTimeISO() {	
		let _res = this._rtc.getTime('iso');
		return _res;
	}
	/**
	 * @method
	 * Возвращает текущее время с модуля в формате unix - 
	 * время в секундах от 1970 года.
	 * @returns {string}	_res	- строка вида 144712561
	 */
	GetTimeUnix() {	
		let _res = this._rtc.getTime('unixtime');
		return _res;
	}
	/**
     * @method
	 * Возвращает текущее время с модуля в формате - час:минута:секунда 
	 * @returns {string}	_res	- строка вида 12:33:23
     */
	GetTimeHMS() {	
		let time = this._rtc.getTime('def');
		let _res = this._rtc._leadZero(time.getHours()) +
			':' +
			this._rtc._leadZero(time.getMinutes()) +
			':' +
			this._rtc._leadZero(time.getSeconds());
		
		return _res;
    }
}

exports = ClassDS1307;