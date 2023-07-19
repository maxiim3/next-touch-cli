import {sanitizeMessage} from "../stringUtils"
import path from "path"

describe("When sanitizeMessage is called", () => {
	const systemSeparator = path.sep

	it("with a valid parameter", () => {
		expect(sanitizeMessage(`[:hello]`)).toEqual(`[:hello]`)
	})
	it("with invalid characters", () => {
		expect(() => sanitizeMessage(`hel@$%#lo`)).toThrowError("Invalid message")
	})
	it("called with a valid path", () => {
		expect(sanitizeMessage(`${systemSeparator}hello`)).toEqual(`hello`)
	})
	it("is called with a valid path", () => {
		expect(sanitizeMessage(`hello${systemSeparator}`)).toEqual(`hello`)
	})
	it("is called with a valid group", () => {
		expect(sanitizeMessage("(group)/hello")).toEqual("(group)/hello")
	})
})
