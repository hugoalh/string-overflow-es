import { invokeDenoNodeJSTransformer } from "DNT";
import { parse as parseJSONC } from "STD_JSONC";
const jsrManifest = parseJSONC(await Deno.readTextFile("./jsr.jsonc"));
await invokeDenoNodeJSTransformer({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: jsrManifest.exports,
	generateDeclarationMap: true,
	mappings: {
		"https://raw.githubusercontent.com/hugoalh/string-dissect-es/v4.0.2/mod.ts": {
			name: "@hugoalh/string-dissect",
			version: "^4.0.2"
		}
	},
	metadata: {
		//@ts-ignore Lazy type.
		name: jsrManifest.name,
		//@ts-ignore Lazy type.
		version: jsrManifest.version,
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
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-npm",
	outputDirectoryPreEmpty: true
});

