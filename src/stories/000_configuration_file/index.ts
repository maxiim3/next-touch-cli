import {checkForConfigFile} from "./checkForConfigFile"
import {initConfigFile} from "./initConfigFile"
import {configFileIntegrity} from "./configFileIntegrity"
import inquirer from "inquirer"

export default async function configurationFileStory() {
	// check if config file exists
	const configFile = await checkForConfigFile()

	// if not, create it
	if (!configFile) await initConfigFile({createFile: true})

	// check if the config file has the correct configuration
	const hasCorrectConfiguration = await configFileIntegrity()

	if (!hasCorrectConfiguration) {
		// feedback to the user
		console.log("The configuration file is not correct. We will reinitialize it")
		// reinitialize the config file
		await initConfigFile({createFile: false})
	}

	// move on to next step...
}
