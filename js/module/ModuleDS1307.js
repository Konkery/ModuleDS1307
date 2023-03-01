// Class initialization
var Clock = function() {
  PrimaryI2C.setup({ sda: SDA, scl: SCL, bitrate: 100000 });
  var clock = require('rtcn').connect(PrimaryI2C);
  clock.setTime();
  this._rtc = clock;
  this._checkpoint = undefined;
};

// Set time zone
Clock.prototype.SetTimeZone = function(hours) {
	//if (Number.isInteger(hours) {
	//	class Error = require('error');
	//	var err = new Error('Must be a number', 0);
	//	err.Message();
	//} else
	if (hours < -11) {
		hours = -11;
	} else if (hours > 12) {
		hours = 12;
	}// TODO: handle error if not a number
	E.setTimeZone(hours);
	this._rtc.setTime();
};

// Get time in determined format
Clock.prototype.GetCurrentTime = function(format) {
	var res = this._rtc;
	return res.getTime(format);
};


// Sets check point in time in unix time format
Clock.prototype.SetCheckPoint = function() {
	var pt = this._rtc.getTime('unixtime');
	this._checkpoint = pt;
};

// Get time in determined format
Clock.prototype.GetUnixTime = function() {
	var res = this._rtc;
	return res.getTime('unixtime');
};

// Get time in determined format
Clock.prototype.GetCheckPointTime = function() {
	var res = this._rtc.getTime('unixtime') - this._checkpoint;
	return res;
};

// Exporting the class
exports.connect = function() {
  return new Clock();
};