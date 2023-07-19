import inquirer from "inquirer"
import {createFile, writeFile} from "../../utils"
import {CONFIG_FILE_NAME} from "../../constants"
import {configFileOptionsProps} from "../../types"

/**
 * Initialize the configuration file. If the file does not exist, it is created. If it exists but does not have the correct structure, it is overwritten
 * @param {Object} props Object with property createFile of boolean type indicating whether to create a new file
 * @returns {Promise<void>} A promise that resolves when the operation is completed
 */
export async function initConfigFile(props: {createFile: boolean}) {
	try {
		const configurationFileOptions: configFileOptionsProps = await inquirer.prompt([
			{
				name: "languagePreference",
				message: "1/6 - What is your preferred language ?",
				type: "list",
				choices: ["JavaScript", "TypeScript"],
				default: "TypeScript",
			},
			{
				name: "stylingPreference",
				message: "2/6 - What is your preferred styling ?",
				type: "list",
				choices: ["SASS Modules", "Tailwind CSS", "Styled Components", "None"],
			},
			{
				name: "pagePath",
				message: "3/6 - Where do you want to store your pages ?",
				type: "input",
				default: "./app/",
			},
			{
				name: "componentPath",
				message: "4/6 - Where do you want to store your components ?",
				type: "input",
				default: "./components/",
			},
			{
				name: "atomicDesign",
				message: "5/6 - Do you want to use Atomic Design ?",
				type: "confirm",
				default: false,
			},
			{
				name: "apiPath",
				message: "6/6 - Where do you want to store your api routes?",
				type: "input",
				default: "./app/api/",
			},
		])

		console.log(configurationFileOptions)
		props.createFile && (await createFile(`./${CONFIG_FILE_NAME}`))

		const template = `
		// next-touch configuration file
		const config = 
			${JSON.stringify(configurationFileOptions, null, 4)}
		
		module.exports = config
		`
		await writeFile(`./${CONFIG_FILE_NAME}`, template)
	} catch (err) {
		console.error(`Something went wrong while creating the configuration file : ${err}`)
	}
}
