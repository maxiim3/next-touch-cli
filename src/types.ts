// Type for configuration file options
export type configFileOptionsProps = {
	languagePreference: "JavaScript" | "TypeScript"
	stylingPreference: "SASS Modules" | "Tailwind CSS" | "Styled Components" | "None"
	pagePath: string
	componentPath: string
	atomicDesign: boolean
	apiPath: string
}
