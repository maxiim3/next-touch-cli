import path from "path"

export function sanitizeMessage(message) {
	const systemSeparator = path.sep
	const oppositeSeparator = systemSeparator === "/" ? "\\" : "/"
	const invalidChars = /[\u0300-\u036f]|[0-9!<>@#$%^&*{}'";:,_\-\s+=]+/g

	const initialMessage = message

	// clean up message
	message = message.trim().normalize("NFD")
	message.startsWith(systemSeparator) && (message = message.slice(1))
	message.endsWith(systemSeparator) && (message = message.slice(0, -1))

	// check if message is a parameter
	const isParam =
		message.startsWith("[") &&
		message.endsWith("]") &&
		message.length > 5 &&
		message[1] === ":" &&
		!message.includes(" ") &&
		!message.includes(systemSeparator) && // 👈 change this
		!message.includes(oppositeSeparator) && // 👈 and this
		!invalidChars.test(message)

	console.log(message, "starts with [", message.startsWith("["))
	console.log(message, "ends with ]", message.endsWith("]"))
	console.log(message, "lenght > 5", message.length > 5)
	console.log(message, "has :", message[1] === ":")
	console.log(message, "has no white space", !message.includes(" "))
	console.log(message, "has no /", !message.includes(systemSeparator))
	console.log(message, "has no \\", !message.includes(oppositeSeparator))
	console.log(message, "do not matches invalid chars", !invalidChars.test(message))
	// check if message is a group
	const isGroup =
		message.startsWith("(") &&
		message.endsWith(")") &&
		message.length > 4 &&
		!message.includes(" ") &&
		!message.includes(systemSeparator) && // 👈 change this
		!message.includes(oppositeSeparator) && // 👈 and this
		!invalidChars.test(message)

	// check if message is a redirection
	const isRedirection =
		message.startsWith("(") &&
		message.endsWith(")") &&
		message.length > 4 &&
		!message.includes(" ") &&
		!invalidChars.test(message)

	// check if message is a path
	const isPath =
		message.match(/^[a-zA-Z]/) &&
		message.match(/[a-zA-Z]$/) &&
		message.length > 3 &&
		!message.includes(oppositeSeparator) &&
		!invalidChars.test(message)

	console.table({initialMessage, message, isParam, isGroup, isRedirection, isPath})

	if (isGroup || isRedirection || isPath || isParam) {
		return message
	} else throw new Error("Invalid message")
}
