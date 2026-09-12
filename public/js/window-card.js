import { getTimes } from "/js/suncalc.js";

const HOUR = 60 * 60 * 1000;
const NO_SUNSET = "No sunset at this location on this date";
const UNAVAILABLE = "Location wasn’t available.";
const FORMULAS = {
	start: "sunset − 1h",
	sunset: "sunset",
	end: "sunset + 1h",
};

const status = document.querySelector("[data-window-status]");
const startEl = document.querySelector("[data-window-start]");
const sunsetEl = document.querySelector("[data-window-sunset]");
const endEl = document.querySelector("[data-window-end]");
const button = document.querySelector("[data-window-locate]");

if (button && status && startEl && sunsetEl && endEl) {
	button.addEventListener("click", locate);
}

function locate() {
	if (!navigator.geolocation) {
		fail();
		return;
	}

	button.disabled = true;
	navigator.geolocation.getCurrentPosition(onPosition, fail, {
		enableHighAccuracy: false,
		maximumAge: 300000,
		timeout: 10000,
	});
}

function onPosition(position) {
	button.disabled = false;
	button.textContent = "Use my location";

	const { latitude, longitude } = position.coords;
	const times = getTimes(new Date(), latitude, longitude);
	const sunset = times.sunset;

	if (!(sunset instanceof Date) || Number.isNaN(sunset.getTime())) {
		status.textContent = NO_SUNSET;
		startEl.textContent = FORMULAS.start;
		sunsetEl.textContent = FORMULAS.sunset;
		endEl.textContent = FORMULAS.end;
		return;
	}

	startEl.textContent = formatTime(new Date(sunset.getTime() - HOUR));
	sunsetEl.textContent = formatTime(sunset);
	endEl.textContent = formatTime(new Date(sunset.getTime() + HOUR));
	status.textContent = formatDate(sunset);
}

function fail() {
	button.disabled = false;
	button.textContent = "Try again";
	status.textContent = UNAVAILABLE;
}

function formatTime(date) {
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	});
}

function formatDate(date) {
	return date.toLocaleDateString(undefined, {
		weekday: "long",
		month: "long",
		day: "numeric",
	});
}
