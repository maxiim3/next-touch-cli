#!/usr/bin/env node
import {Command} from "commander"
import inquirer from "inquirer"
import {createFile, pathExists, readFile, writeFile} from "./utils"

const CONFIG_FILE_NAME = "next-touch.config.js"

async function checkForConfigFile() {
	console.log("Parsing the project and looking for a configuration file")
	const configFileExists = await pathExists(`./${CONFIG_FILE_NAME}`)

	const isTrue = "Config file found"
	const isFalse = "Did not fount the config file"
	console.log(configFileExists ? isTrue : isFalse)

	return configFileExists
}

export type configFileOptionsProps = {
	languagePreference: "JavaScript" | "TypeScript"
	stylingPreference: "SASS Modules" | "Tailwind CSS" | "Styled Components" | "None"
	pagePath: string
	componentPath: string
	atomicDesign: boolean
	apiPath: string
}

async function configFileIntegrity() {
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

async function initConfigFile(props: {createFile: boolean}) {
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

function main() {
	const program = new Command()

	program
		.name("next touch")
		.version("0.0.1")
		.description("A useful cli tool for simplifying next.js workflow")

	// program.option("--second").option("-f, --first")
	program.action(async (str, options) => {
		const configFile = await checkForConfigFile()

		if (!configFile) await initConfigFile({createFile: true})
		const hasCorrectConfiguration = await configFileIntegrity()
		!hasCorrectConfiguration &&
			console.log("The configuration file is not correct. We will reinitialize it")

		if (!hasCorrectConfiguration) await initConfigFile({createFile: false})

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

	program.parse()

	// console.log(program.opts())
}

module.exports = main
