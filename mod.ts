import {
	StringDissector,
	type StringDissectorOptions,
	type StringSegmentDescriptor
} from "https://raw.githubusercontent.com/hugoalh/string-dissect-es/v4.0.2/mod.ts";
export type StringTruncateEllipsisPosition =
	| "end"
	| "middle"
	| "start";
const ellipsisPositions: Readonly<Record<string, StringTruncateEllipsisPosition>> = {
	end: "end",
	End: "end",
	middle: "middle",
	Middle: "middle",
	start: "start",
	Start: "start"
};
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
	ellipsisPosition?: StringTruncateEllipsisPosition;
}
function checkLength(maximumLength: number, ellipsisMarkLength: number): void {
	if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
		throw new RangeError(`\`${maximumLength}\` (parameter \`maximumLength\`) is not a number which is integer, positive, and safe!`);
	}
	if (ellipsisMarkLength > maximumLength) {
		throw new Error(`Ellipsis string is too long!`);
	}
}
interface StringTruncatorLengths {
	left: number;
	right: number;
	total: number;
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export class StringTruncator {
	#dissector: StringDissector;
	#ellipsisMark: string;
	#ellipsisPosition: StringTruncateEllipsisPosition;
	#maximumLength: number;
	/**
	 * Initialize.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringTruncatorOptions} [options={}] Options.
	 */
	constructor(maximumLength: number, options: StringTruncatorOptions = {}) {
		const {
			ellipsisMark = "...",
			ellipsisPosition = "end"
		}: StringTruncatorOptions = options;
		this.#dissector = new StringDissector(options);
		this.#ellipsisMark = ellipsisMark;
		const ellipsisPositionFmt: StringTruncateEllipsisPosition | undefined = ellipsisPositions[ellipsisPosition];
		if (!Object.values(ellipsisPositions).includes(ellipsisPositionFmt)) {
			throw new RangeError(`\`${ellipsisPosition}\` is not a valid ellipsis position! Only accept these values: ${Object.keys(ellipsisPositions).sort().join(", ")}`);
		}
		this.#ellipsisPosition = ellipsisPositionFmt;
		checkLength(maximumLength, this.#ellipsisMark.length);
		this.#maximumLength = maximumLength;
	}
	#resolveMaximumLength(maximumLengthOverride?: number): StringTruncatorLengths {
		if (typeof maximumLengthOverride !== "undefined") {
			checkLength(maximumLengthOverride, this.#ellipsisMark.length);
		}
		const total: number = maximumLengthOverride ?? this.#maximumLength;
		const result: number = total - this.#ellipsisMark.length;
		switch (this.#ellipsisPosition) {
			case "end":
				return {
					left: result,
					right: 0,
					total
				};
			case "middle": {
				const resultHalf: number = Math.floor(result / 2);
				return {
					left: resultHalf,
					right: resultHalf,
					total
				};
			}
			case "start":
				return {
					left: 0,
					right: result,
					total
				};
		}
	}
	/**
	 * Truncate the string.
	 * @param {string} item String that need to truncate.
	 * @param {number} [maximumLengthOverride] Override the defined maximum length of the target string.
	 * @returns {string} A truncated string.
	 */
	truncate(item: string, maximumLengthOverride?: number): string {
		const lengths: StringTruncatorLengths = this.#resolveMaximumLength(maximumLengthOverride);
		if (item.length <= lengths.total) {
			return item;
		}
		const segments: readonly string[] = Array.from(this.#dissector.dissect(item), ({ value }: StringSegmentDescriptor): string => {
			return value;
		});
		let resultLeft: string = "";
		for (let index: number = 0; index < segments.length; index += 1) {
			const segment: string = segments[index];
			if (resultLeft.length + segment.length > lengths.left) {
				break;
			}
			resultLeft = `${resultLeft}${segment}`;
		}
		let resultRight: string = "";
		for (let index: number = segments.length - 1; index >= 0; index -= 1) {
			const segment: string = segments[index];
			if (resultRight.length + segment.length > lengths.right) {
				break;
			}
			resultRight = `${segment}${resultRight}`;
		}
		return `${resultLeft.trimEnd()}${this.#ellipsisMark}${resultRight.trimStart()}`;
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
