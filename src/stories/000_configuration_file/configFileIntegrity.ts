import {readFile} from "../../utils"
import {CONFIG_FILE_NAME} from "../../constants"

/**
 * Check the integrity of the configuration file. It should have six properties and match the keys defined
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the configuration file has correct structure
 */
export async function configFileIntegrity() {
	const data = await readFile(`./${CONFIG_FILE_NAME}`, "utf-8")

	if (data === "") return false
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
	const configExtracted = {}
	extractKeyValues.forEach((item: string[]) => {
		const [key, value] = item
		if (!key || !value) return

		configExtracted[key] = value
	})

	if (Object.keys(configExtracted).length === 0) return false
	if (Object.keys(configExtracted).length !== 6) return false

	return Object.keys(configExtracted).every(
		key =>
			key === "languagePreference" ||
			key === "stylingPreference" ||
			key === "pagePath" ||
			key === "componentPath" ||
			key === "atomicDesign" ||
			key === "apiPath"
	)
}
