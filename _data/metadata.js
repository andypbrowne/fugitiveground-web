const siteUrl = process.env.SITE_URL || "https://fugitiveground.andypbrowne.com";

export default {
	title: "Fugitive Ground",
	url: siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl,
	language: "en",
	description:
		"A time and place each day: one hour before sunset through one hour after sunset, wherever you are.",
	author: {
		name: "Andy Browne",
		url: "https://andypbrowne.com/",
	},
};
