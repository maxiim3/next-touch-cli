import {CONFIG_FILE_NAME} from "../../constants"
import {configFileOptionsProps} from "../../types"
import {readFile} from "../../helper/fsUtils"

/**
 * Check the integrity of the configuration file. It should have six properties and match the keys defined
 * @returns {Promise<{data:any, integrity:Boolean}>} A promise that resolves to a boolean indicating whether the configuration file has correct structure, **and the related data to pass em on to the next steps**
 */
export async function configFileIntegrity() {
	const data = await readFile(`./${CONFIG_FILE_NAME}`, "utf-8")

	if (data === "") return {integrity: false, data: {}}
	// Regular expression to match content between curly braces
	const regex = /{([^}]+)}/g

	// Use the exec method of the RegExp object to find the first match in the string
	let getDataInBrackets = regex.exec(data)[1]
	const trimData = getDataInBrackets.trim()

	const cleanData = trimData.replace("\n", "")
	const splitData = cleanData.split(",")

	const extractKeyValues = splitData.map((item: string) => {
		return item.trim().replace(' "', "").replace('"', "").trim().split(":")
	})
	const configExtracted: Partial<configFileOptionsProps> = {}
	extractKeyValues.forEach((item: string[]) => {
		const [key, value] = item
		if (!key || !value) return

		configExtracted[key] = value
	})

	const validKeys = [
		"languagePreference",
		"stylingPreference",
		"pagePath",
		"componentPath",
		"atomicDesign",
		"apiPath",
	]

	if (Object.keys(configExtracted).length === 0) return {integrity: false, data: {}}
	if (Object.keys(configExtracted).length !== validKeys.length)
		return {integrity: false, data: {}}

	return {
		integrity: Object.keys(configExtracted).every(key => validKeys.includes(key)),
		data: configExtracted,
	}
}
