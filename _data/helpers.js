function ordinalDay(day) {
	if (day >= 11 && day <= 13) return `${day}th`;
	switch (day % 10) {
		case 1: return `${day}st`;
		case 2: return `${day}nd`;
		case 3: return `${day}rd`;
		default: return `${day}th`;
	}
}

function weekdayDate(date = new Date()) {
	const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
	const month = date.toLocaleDateString("en-US", { month: "long" });
	return `${weekday}, ${month} ${ordinalDay(date.getDate())}, ${date.getFullYear()}`;
}

export default {
	currentYear() {
		return new Date().getFullYear();
	},
	weekdayDate,
};
