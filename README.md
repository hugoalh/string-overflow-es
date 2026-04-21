# String Overflow (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/string-overflow-es)
[JSR](https://jsr.io/@hugoalh/string-overflow)
[NPM](https://www.npmjs.com/package/@hugoalh/string-overflow)

An ECMAScript module to truncate the string with the specify length; Safe with the emojis, URLs, and words.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/string-overflow-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/string-overflow[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/string-overflow[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class StringTruncator {
    constructor(maximumLength: number, options?: StringTruncatorOptions);
    truncate(item: string, maximumLengthOverride?: number): string;
  }
  ```
- ```ts
  type StringTruncateEllipsisPosition = 
    | "end"
    | "middle"
    | "start";
  ```
- ```ts
  interface StringTruncatorOptions extends StringDissectorOptions {
    ellipsisMark?: string;
    ellipsisPosition?: StringTruncateEllipsisPosition;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/string-overflow)

## ✍️ Examples

- ```ts
  const text = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";

  new StringTruncator(100).truncate(text);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores..."

  new StringTruncator(100, { safeWords: false }).truncate(text);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si..."
  ```
