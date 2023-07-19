import {checkForConfigFile} from "./checkForConfigFile"
import {initConfigFile} from "./initConfigFile"
import {configFileIntegrity} from "./configFileIntegrity"

export default async function configurationFileStory() {
	const configFile = await checkForConfigFile()

	if (!configFile) await initConfigFile({createFile: true})
	const hasCorrectConfiguration = await configFileIntegrity()
	!hasCorrectConfiguration &&
		console.log("The configuration file is not correct. We will reinitialize it")

	if (!hasCorrectConfiguration) await initConfigFile({createFile: false})
}
