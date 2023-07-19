export default function initPageStory() {
	console.log("You chose to create a page")

	//0. ask if file is a page, error, loading, layout or template
	//1. ask for path -> ex: about
	//2. ask for file path : do the user want to update it ?
	// 	- yes : user prompts the new path ex: app/(pages)/about
	// 	- no : continue
	//3. check if the path to file exists : if not, create it. continue
	//4. check if the file page/template/loading/layout/error exists : if exists, ask if the user wants to overwrite it ?
	// 	- yes : continue
	// 	- no : exit
	//5. if file is a page : if not go to step 6.
	//  5.1 Does the page fetches data ?
	// 		- yes : does the user wants to cache the data ?
	// 			- yes : will add a fetch and cache template
	// 			- no : will add a fetch template without caching
	// 		- no : continue
	// 	5.2 Does the user wants to update the page metadata ?
	// 		- yes : will add a metadata template
	// 		- no : continue
	//6. Success ex: add the file  with the options and proper template at app/(pages)/about/file-type.tsx/template.tsx/error.tsx ...
}
