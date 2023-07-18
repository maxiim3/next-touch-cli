import fs from "fs-extra"
// Function to read a file
const readFile = async (filePath: string, utf8: string = "utf8") => {
	try {
		const data = await fs.readFile(filePath, utf8)

		return data
	} catch (err) {
		console.error(`Error reading file from disk: ${err}`)
	}
}
// function to create a file

const createFile = async (filePath: string) => {
	try {
		const result = await fs.createFile(filePath)
		console.log(`File has been created at ${filePath}`)
		return result
	} catch (err) {
		console.error(`Error creating file: ${err}`)
	}
}
// Function to write data to a file
const writeFile = async (filePath: string, data: any) => {
	try {
		const result = await fs.writeFile(filePath, data)
		console.log(`Data has been written to ${filePath}`)
		return result
	} catch (err) {
		console.error(`Error writing file: ${err}`)
	}
}
// Function to check if a file or directory exists
const pathExists = async (path: string) => {
	try {
		const exists = await fs.pathExists(path)
		return exists
	} catch (err) {
		console.error(`Error checking if path exists: ${err}`)
	}
}
// Function to copy a file

const copyFile = async (source: string, destination: string) => {
	try {
		await fs.copy(source, destination)
		console.log(`File has been copied from ${source} to ${destination}`)
	} catch (err) {
		console.error(`Error copying file: ${err}`)
	}
}

const readDirectory = async (dirPath: string) => {
	try {
		const data = await fs.readdir(dirPath)
		return data
	} catch (err) {
		console.error(`Error while reading a directory at ${dirPath}`)
	}
}
// Function to create a directory
const createDirectory = async (dirPath: string) => {
	try {
		const result = await fs.ensureDir(dirPath)
		console.log(`Directory has been created at ${dirPath}`)
		return result
	} catch (err) {
		console.error(`Error creating directory: ${err}`)
	}
}

export {readFile, writeFile, pathExists, copyFile, createFile, createDirectory, readDirectory}
