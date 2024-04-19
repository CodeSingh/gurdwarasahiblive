// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
	// Getting current time and date
	let now = new Date();
	let hour = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	am_pm = "AM";

	// Setting time for 12 Hrs format
	if (hour >= 12) {
		if (hour > 12) hour -= 12;
		am_pm = "PM";
	} else if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

    dayname = new Date(now).toDateString();

    let currentDate =
        dayname;

	let currentTime =
		hour +
		":" +
		min +
		":" +
		sec + 
        " " +
		am_pm;

	// Displaying the time
	document.getElementById(
		"footerclock"
	).innerHTML = currentTime;
    
    // Displaying the time
	document.getElementById(
		"footerdate"
	).innerHTML = currentDate;
}

showTime();
