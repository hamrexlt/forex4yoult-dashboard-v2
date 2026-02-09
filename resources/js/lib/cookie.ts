export function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1, c.length); // Remove leading spaces
		}
		if (c.indexOf(nameEQ) === 0) {
			// Decode the cookie value before returning it
			return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
	}
	return null;
}
