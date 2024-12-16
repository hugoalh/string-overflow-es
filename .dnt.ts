import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.getExports(),
	generateDeclarationMap: true,
	mappings: {
		"https://raw.githubusercontent.com/hugoalh/string-dissect-es/v4.0.0/mod.ts": {
			name: "@hugoalh/string-dissect",
			version: "^4.0.0"
		}
	},
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A module to truncate the string with the specify length; Safe with the emojis, URLs, and words.",
		keywords: [
			"overflow",
			"string",
			"truncate"
		],
		homepage: "https://github.com/hugoalh/string-overflow-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/string-overflow-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/string-overflow-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=20.9.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});

