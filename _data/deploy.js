const context = process.env.CONTEXT;

export default {
	showStatusBadge: context !== "production",
};
