export function getErrorMessage (error: any) {
	const { msg } = error.response?.data;
	if (msg) return msg;
	if (error instanceof Error) return error.message;
	return String(error);
}
