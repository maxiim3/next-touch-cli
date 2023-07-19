import {checkForConfigFile} from "./checkForConfigFile"
import {initConfigFile} from "./initConfigFile"
import {configFileIntegrity} from "./configFileIntegrity"

export default async function configurationFileStory() {
	// check if config file exists
	const configFile = await checkForConfigFile()

	// if not, create it
	if (!configFile) return await initConfigFile({createFile: true})

	// check if the config file has the correct configuration, extract the data
	const {data, integrity} = await configFileIntegrity()

	if (!integrity) {
		// feedback to the user
		console.log("The configuration file is not correct. We will reinitialize it")
		// reinitialize the config file
		return await initConfigFile({createFile: false})
	}

	return data

	// move on to next step...
}
