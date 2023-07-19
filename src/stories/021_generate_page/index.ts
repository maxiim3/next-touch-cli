export default function initPageStory() {
	console.log("You chose to create a page")

	//0. Ask the user if they want to create a page, error, loading, layout or template.
	//1. Ask for the file path. For example: about.
	//2. Does the user want to update the file path?
	// 	- Yes: User prompts the new path, for example: app/(pages)/about.
	// 	- No: Continue.
	//3. Check if the path to the file already exists, if not, create it.
	//4. Check if the file (page/template/loading/layout/error) at the path already exists. If yes, ask if the user wants to overwrite it.
	// 	- Yes: Continue.
	// 	- No: Exit.
	//5. If the file is a page:
	//  5.1 Does the page fetch data?
	// 		- Yes: Does the user wants to cache the data?
	// 			- Yes: Will add a fetch and cache template.
	// 			- No: Will add a fetch template without caching.
	// 		- No: Continue.
	// 	5.2 Does the user wants to update the page metadata?
	// 		- Yes: Will add a metadata template.
	// 		- No: Continue.
	//6. Success: Add the file with the options and proper template at the path, for example: app/(pages)/about/file-type.tsx/template.tsx/error.tsx ...
}
