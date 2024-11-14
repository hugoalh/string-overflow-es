import {
	StringDissector,
	type StringDissectorOptions,
	type StringSegmentDescriptor
} from "https://raw.githubusercontent.com/hugoalh/string-dissect-es/v4.0.0/mod.ts";
/**
 * Enum of the string truncate ellipsis position.
 */
export enum StringTruncateEllipsisPosition {
	end = "end",
	End = "end",
	middle = "middle",
	Middle = "middle",
	start = "start",
	Start = "start"
}
export interface StringTruncatorOptions extends StringDissectorOptions {
	/**
	 * Ellipsis mark of the target string.
	 * @default {"..."}
	 */
	ellipsisMark?: string;
	/**
	 * Ellipsis position at the target string.
	 * @default {"end"}
	 */
	ellipsisPosition?: StringTruncateEllipsisPosition | keyof typeof StringTruncateEllipsisPosition;
	/**
	 * Whether to remove string segments of ANSI escape codes.
	 * @default {false}
	 * @deprecated Migrate to {@linkcode StringDissectorOptions.outputANSI}.
	 */
	removeANSI?: boolean;
}
function checkLength(maximumLength: number, ellipsisMarkLength: number): void {
	if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
		throw new RangeError(`\`${maximumLength}\` (parameter \`maximumLength\`) is not a number which is integer, positive, and safe!`);
	}
	if (ellipsisMarkLength > maximumLength) {
		throw new Error(`Ellipsis string is too long!`);
	}
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export class StringTruncator {
	#dissector: StringDissector;
	#ellipsisMark: string;
	#ellipsisPosition: `${StringTruncateEllipsisPosition}`;
	#maximumLength: number;
	#resultLengthMaximum: number;
	/**
	 * Initialize string truncator.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringTruncatorOptions} [options={}] Options.
	 */
	constructor(maximumLength: number, options: StringTruncatorOptions = {}) {
		const {
			ellipsisMark = "...",
			ellipsisPosition = "end",
			removeANSI,
			...optionsDissector
		} = options;
		this.#dissector = new StringDissector({
			...optionsDissector,
			outputANSI: optionsDissector.outputANSI ?? ((typeof removeANSI === "boolean") ? !removeANSI : undefined)
		});
		this.#ellipsisMark = ellipsisMark;
		const ellipsisPositionFmt: `${StringTruncateEllipsisPosition}` | undefined = StringTruncateEllipsisPosition[ellipsisPosition];
		if (typeof ellipsisPositionFmt === "undefined") {
			throw new RangeError(`\`${ellipsisPosition}\` is not a valid ellipsis position! Only accept these values: ${Array.from(new Set<string>(Object.keys(StringTruncateEllipsisPosition)).values()).sort().join(", ")}`);
		}
		this.#ellipsisPosition = ellipsisPositionFmt;
		checkLength(maximumLength, this.#ellipsisMark.length);
		this.#maximumLength = maximumLength;
		this.#resultLengthMaximum = this.#maximumLength - this.#ellipsisMark.length;
	}
	/**
	 * Truncate the string.
	 * @param {string} item String that need to truncate.
	 * @param {number} [maximumLengthOverride] Override the defined maximum length of the target string.
	 * @returns {string} A truncated string.
	 */
	truncate(item: string, maximumLengthOverride?: number): string {
		let maximumLength: number = this.#maximumLength;
		let resultLengthMaximum: number = this.#resultLengthMaximum;
		if (typeof maximumLengthOverride !== "undefined") {
			checkLength(maximumLengthOverride, this.#ellipsisMark.length);
			maximumLength = maximumLengthOverride;
			resultLengthMaximum = maximumLengthOverride - this.#ellipsisMark.length;
		}
		if (item.length <= maximumLength) {
			return item;
		}
		let resultLengthEnd: number = 0;
		let resultLengthStart: number = 0;
		switch (this.#ellipsisPosition) {
			case "end":
				resultLengthStart = resultLengthMaximum;
				break;
			case "middle": {
				const resultLengthHalf: number = Math.floor(resultLengthMaximum / 2);
				resultLengthStart = resultLengthHalf;
				resultLengthEnd = resultLengthHalf;
			}
				break;
			case "start":
				resultLengthEnd = resultLengthMaximum;
				break;
		}
		const stringSegments: string[] = Array.from(this.#dissector.dissect(item), ({ value }: StringSegmentDescriptor): string => {
			return value;
		});
		let resultStringStart: string = "";
		for (let index: number = 0; index < stringSegments.length; index += 1) {
			const segment: string = stringSegments[index];
			if (resultStringStart.length + segment.length > resultLengthStart) {
				break;
			}
			resultStringStart = `${resultStringStart}${segment}`;
		}
		let resultStringEnd: string = "";
		for (let index: number = stringSegments.length - 1; index >= 0; index -= 1) {
			const segment: string = stringSegments[index];
			if (resultStringEnd.length + segment.length > resultLengthEnd) {
				break;
			}
			resultStringEnd = `${segment}${resultStringEnd}`;
		}
		return `${resultStringStart.trimEnd()}${this.#ellipsisMark}${resultStringEnd.trimStart()}`;
	}
}
export default StringTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export function truncateString(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string {
	return new StringTruncator(maximumLength, options).truncate(item);
}
