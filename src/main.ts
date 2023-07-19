#!/usr/bin/env node
import {Command} from "commander"
import configurationFileStory from "./stories/000_configuration_file"
import {featureTypeStory} from "./stories/010_feature_type"
import {configFileOptionsProps, flagsProps} from "./types"

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
	program
		.option("-p, --page", "Create a new page")
		.option("-c, --component", "Create a new component")
		.option("-a, --api", "Create a new api route")

	program.action(async (flagsProps: flagsProps) => {
		const numberOfFlags = Object.values(flagsProps).filter(value => value).length
		if (numberOfFlags > 1) {
			console.error("You can only use one flag at a time")
			process.exit(1)
		}
		const configurationOptions = (await configurationFileStory()) as configFileOptionsProps
		await featureTypeStory({flagsProps, configOptions: configurationOptions})
	})

	// Parse the command line arguments
	program.parse()

	// console.log(program.opts())
}

// Export the main function
module.exports = main
