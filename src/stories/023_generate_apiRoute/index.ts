import inquirer from "inquirer"
import {configFileOptionsProps} from "../../types"
import path from "path"
import {sanitizeMessage} from "../../helper/stringUtils"

export default async function initApiStory(configOptions: configFileOptionsProps) {
	console.log("You chose to create an api route")

	//1. ask for the api route's name -> ex: users
	const {apiRouteName} = await inquirer.prompt([
		{
			type: "input",
			name: "apiRouteName",
			message: "What is the name of the api route?",
			default: "users",
		},
	])

	//2. parse the configuration file to get the api route's path
	const defaultPath = configOptions.apiPath

	let apiPath = path.join(defaultPath, apiRouteName, "/route.ts")

	//3. Does the user want to update the api route's path ?
	const updatePath = await inquirer.prompt([
		{
			type: "confirm",
			name: "answer",
			message: `Do you want to update the api route's path ${apiPath}?`,
			default: false,
		},
	])

	if (updatePath.answer) {
		const newPath = await inquirer.prompt([
			{
				type: "input",
				name: "answer",
				message: `Which path do you wanna use ${path.join(
					defaultPath,
					"{{INSERTION}}/",
					apiRouteName,
					"route.ts"
				)}`,
			},
		])

		apiPath = path.join(
			defaultPath,
			sanitizeMessage(newPath.answer),
			"/",
			apiRouteName,
			"/route.ts"
		)
	}

	// 	- no : continue
	console.log(apiPath)

	//4. check if the path to file exists
	// 			? ( Ask it the user wants to overwrite it ? continue : exit  )
	// 			: continue
	//5. implement HTTP methods ?
	// 	- yes : ask for the HTTP methods to implement -> ex: GET, POST, PUT, DELETE, HEAD, PATCH
	// 	- no : continue
	//6. initiate the api route template
}
