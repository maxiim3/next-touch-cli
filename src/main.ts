#!/usr/bin/env node
import {Command} from "commander"
import inquirer from "inquirer"
import configurationFileStory from "./stories/000_configuration_file"

/**
 * Entry point of the application. It sets up the Command object and processes the user input
 */
function main() {
	const program = new Command()

	program
		.name("next touch")
		.version("0.0.1")
		.description("A useful cli tool for simplifying next.js workflow")
	// program.option("--second").option("-f, --first")
	// The action that will be taken when the command is run
	program.action(async (str, options) => {
		await configurationFileStory()

		const userInputs = await inquirer.prompt([
			{
				name: "userName",
				message: "What is your name ?",
				type: "input",
			},
			{
				name: "techno",
				message: "Pick a Techno",
				type: "list",
				choices: ["React", "Next.js"],
			},
		])
		console.log(userInputs)
	})

	// Parse the command line arguments
	program.parse()

	// console.log(program.opts())
}

// Export the main function
module.exports = main
