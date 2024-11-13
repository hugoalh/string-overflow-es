import { assertEquals } from "STD/assert/equals";
import { StringTruncator } from "./mod.ts";
const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(new StringTruncator(100).truncate(sample1), "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores...");
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(new StringTruncator(100, { safeWords: false }).truncate(sample1), "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si...");
});
