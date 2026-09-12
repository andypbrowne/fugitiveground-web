import { getTimes } from "/js/suncalc.js";

const HOUR = 60 * 60 * 1000;
const NO_SUNSET = "No sunset at this location on this date";
const UNAVAILABLE = "Location wasn’t available.";
const FORMULAS = {
	start: "sunset − 1h",
	sunset: "sunset",
	end: "sunset + 1h",
};

const dateEl = document.querySelector("[data-window-date]");
const status = document.querySelector("[data-window-status]");
const live = document.querySelector("[data-window-live]");
const startEl = document.querySelector("[data-window-start]");
const sunsetEl = document.querySelector("[data-window-sunset]");
const endEl = document.querySelector("[data-window-end]");
const button = document.querySelector("[data-window-locate]");

let dayWindow = null;
let tickId = 0;
let lastPhase = "";

if (button && dateEl && status && live && startEl && sunsetEl && endEl) {
	button.addEventListener("click", locate);
	document.addEventListener("visibilitychange", () => {
		if (!dayWindow) return;
		if (document.hidden) stopTicking();
		else startTicking();
	});
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
		clearWindow();
		status.textContent = NO_SUNSET;
		announce(NO_SUNSET);
		startEl.textContent = FORMULAS.start;
		sunsetEl.textContent = FORMULAS.sunset;
		endEl.textContent = FORMULAS.end;
		return;
	}

	const start = new Date(sunset.getTime() - HOUR);
	const end = new Date(sunset.getTime() + HOUR);
	dayWindow = { start, sunset, end, times };

	startEl.textContent = formatTime(start);
	sunsetEl.textContent = formatTime(sunset);
	endEl.textContent = formatTime(end);
	dateEl.hidden = false;
	dateEl.textContent = formatDate(sunset);
	startTicking();
}

function fail() {
	button.disabled = false;
	button.textContent = "Try again";
	clearWindow();
	status.textContent = UNAVAILABLE;
	announce(UNAVAILABLE);
}

function clearWindow() {
	stopTicking();
	dayWindow = null;
	lastPhase = "";
	dateEl.hidden = true;
	dateEl.textContent = "";
}

function startTicking() {
	stopTicking();
	renderState();
	tickId = window.setInterval(renderState, 1000);
}

function stopTicking() {
	if (tickId) {
		window.clearInterval(tickId);
		tickId = 0;
	}
}

function renderState() {
	if (!dayWindow) return;

	const now = new Date();
	const { start, end, times } = dayWindow;
	const kind = windowKind(now, start, end);
	const remaining = kind === "before"
		? formatCountdown(start.getTime() - now.getTime())
		: formatCountdown(end.getTime() - now.getTime());

	if (kind === "after") {
		status.textContent = "Ended today";
	} else if (kind === "before") {
		const prefix = sameDay(start, now) ? "Starts today" : "Starts tomorrow";
		status.textContent = `${prefix} • ${remaining}`;
	} else {
		const light = eveningLightLabel(now, times);
		status.textContent = light
			? `${light} • ${remaining} remains in today’s FG`
			: `${remaining} remains in today’s FG`;
	}

	const phase = phaseAnnouncement(kind, now, start, times);
	if (phase !== lastPhase) {
		announce(status.textContent);
		lastPhase = phase;
	}
}

function windowKind(now, start, end) {
	if (now < start) return "before";
	if (now <= end) return "during";
	return "after";
}

function phaseAnnouncement(kind, now, start, times) {
	if (kind === "after") return "after";
	if (kind === "before") return sameDay(start, now) ? "before-today" : "before-tomorrow";
	return eveningLightLabel(now, times) ?? "during";
}

function eveningLightLabel(now, times) {
	const sunset = times.sunset;
	if (!(sunset instanceof Date)) return null;
	if (Math.abs(now.getTime() - sunset.getTime()) <= 90000) return "At sunset";
	if (times.goldenHour instanceof Date && now < times.goldenHour) return "Late sun";
	if (now < sunset) return "Golden hour";
	if (times.dusk instanceof Date && now < times.dusk) return "Civil twilight";
	if (times.nauticalDusk instanceof Date && now < times.nauticalDusk) return "Nautical twilight";
	if (times.night instanceof Date && now < times.night) return "Astronomical twilight";
	if (!times.dusk && !times.nauticalDusk && !times.night) {
		return now < sunset ? "Golden hour" : "Civil twilight";
	}
	return "Into night";
}

function announce(text) {
	live.textContent = text;
}

function formatTime(date) {
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	});
}

function formatDate(date) {
	const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
	const month = date.toLocaleDateString("en-US", { month: "long" });
	const year = date.getFullYear();
	return `${weekday}, ${month} ${ordinalDay(date.getDate())}, ${year}`;
}

function ordinalDay(day) {
	if (day >= 11 && day <= 13) return `${day}th`;
	switch (day % 10) {
		case 1: return `${day}st`;
		case 2: return `${day}nd`;
		case 3: return `${day}rd`;
		default: return `${day}th`;
	}
}

function formatCountdown(ms) {
	const total = Math.max(0, Math.floor(ms / 1000));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const seconds = total % 60;
	const parts = [];
	if (hours) parts.push(`${hours}h`);
	if (hours || minutes) parts.push(`${minutes}m`);
	parts.push(`${seconds}s`);
	return parts.join(" ");
}

function sameDay(a, b) {
	return a.getFullYear() === b.getFullYear()
		&& a.getMonth() === b.getMonth()
		&& a.getDate() === b.getDate();
}
