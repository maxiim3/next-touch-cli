import {configFileOptionsProps} from "../../types"

export default function initComponentStory(configOptions: configFileOptionsProps) {
	console.log("You chose to create a component")

	//1. ask for the component's name -> ex: Button
	//2. parse the configuration file to get the component's path, and check if atomicDesign is enabled
	//3. Atomic Design Enabled? ask for the component's type -> ex: atom, molecule, organism, template, page && continue : continue
	//4. Does the user want to update the component's path ?
	// 	- yes : user prompts the new path ex: components/Button	-> continue
	// 	- no : continue
	//5. check if the path to file exists
	// 			? ( Ask it the user wants to overwrite it ? continue : exit  )
	// 			:
	//6. is the component a client or a server component ?
	//7. initiate Props template
	//8. parse the configuration file to get the styling option :
	// 	- if styling option is css-module : initiate css-module template and create the file like so :
	//   			components/
	//   				Button/
	//   					Button.tsx
	//   					Button.module.css
	// 	- otherwise : create @components/Button.tsx with the proper template
}
