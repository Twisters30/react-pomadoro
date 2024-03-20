export const formatSeconds = (seconds: number): string => {
	const secondsFormat = Math.round(seconds);
	if (!secondsFormat) {
		return "00"
	}
	if (secondsFormat > 60) {
		return "60";
	}
	if (secondsFormat.toString().length === 1) {
		console.log("0" + secondsFormat.toString())
		return "0" + secondsFormat.toString();
	}
	return secondsFormat.toString();
}