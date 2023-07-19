export default function initApiStory() {
	console.log("You chose to create an api route")

	//1. ask for the api route's name -> ex: users
	//2. parse the configuration file to get the api route's path
	//3. Does the user want to update the api route's path ?
	// 	- yes : user prompts the new path ex: api/users	-> continue
	// 	- no : continue
	//4. check if the path to file exists
	// 			? ( Ask it the user wants to overwrite it ? continue : exit  )
	// 			: continue
	//5. implement HTTP methods ?
	// 	- yes : ask for the HTTP methods to implement -> ex: GET, POST, PUT, DELETE, HEAD, PATCH
	// 	- no : continue
	//6. initiate the api route template
}
