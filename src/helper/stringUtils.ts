import path from "path"

export function sanitizeMessage(message) {
	const firstCharRegex = /^[^a-zA-Z([{]/
	const lastCharRegex = /[^a-zA-Z0-9)\]}]$/
	const middleCharsRegex = /[^a-zA-Z0-9.\[\](){}]|(\.\.)+|(\/)+/g

	// Sanitize first character
	message = message.replace(firstCharRegex, "")
	// Sanitize last character
	message = message.replace(lastCharRegex, "")
	// Sanitize middle characters
	message = message.replace(middleCharsRegex, match => {
		if (match === ".." || match === path.sep) {
			return match
		}
		return ""
	})

	return message
}
