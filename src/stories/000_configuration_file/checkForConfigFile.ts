import {pathExists} from "../../utils"
import {CONFIG_FILE_NAME} from "../../constants"

/**
 * Check if the configuration file exists in the project directory
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the configuration file exists
 */
export async function checkForConfigFile() {
	console.log("Parsing the project and looking for a configuration file")
	const configFileExists = await pathExists(`./${CONFIG_FILE_NAME}`)

	const isTrue = "Config file found"
	const isFalse = "Did not fount the config file"
	console.log(configFileExists ? isTrue : isFalse)

	return configFileExists
}
