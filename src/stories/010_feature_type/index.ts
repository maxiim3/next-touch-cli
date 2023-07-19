import {flagsProps} from "../../types"
import inquirer from "inquirer"
import initPageStory from "../021_generate_page"
import initComponentStory from "../022_generate_component"
import initApiStory from "../023_generate_apiRoute"

/**
 * This story is responsible for asking the user what they want to create
 * it will redirect the user to the appropriate story based on their choice
 * @param options
 */
export async function featureTypeStory(options: flagsProps) {
	// deconstruct options to extract the potential flags
	const {page: pageFlag, component: componentFlag, api: apiFlag} = options

	// check for flags and call the appropriate function
	if (pageFlag) return initPageStory()
	else if (componentFlag) return initComponentStory()
	else if (apiFlag) return initApiStory()

	// if no flag is provided, ask the user what they want to create
	const {featureType} = await inquirer.prompt([
		{
			type: "list",
			name: "featureType",
			message: "What do you want to create?",
			choices: ["Page", "Component", "Api Route"],
		},
	])

	// call the appropriate function based on the user's choice
	switch (featureType) {
		case "Page":
			return initPageStory()
		case "Component":
			return initComponentStory()
		case "Api Route":
			return initApiStory()
	}

	// process move on to next step inside each story function page, api or component
}
