# String Overflow (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/string-overflow-es](https://img.shields.io/github/v/release/hugoalh/string-overflow-es?label=hugoalh/string-overflow-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/string-overflow-es")](https://github.com/hugoalh/string-overflow-es)
[![JSR: @hugoalh/string-overflow](https://img.shields.io/jsr/v/@hugoalh/string-overflow?label=@hugoalh/string-overflow&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/string-overflow")](https://jsr.io/@hugoalh/string-overflow)
[![NPM: @hugoalh/string-overflow](https://img.shields.io/npm/v/@hugoalh/string-overflow?label=@hugoalh/string-overflow&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/string-overflow")](https://www.npmjs.com/package/@hugoalh/string-overflow)

An ES (JavaScript & TypeScript) module to truncate the string with the specify length; Safe with the emojis, URLs, and words.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/string-overflow-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/string-overflow[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/string-overflow[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/string-overflow)

## ✍️ Examples

- ```ts
  const text = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";

  new StringTruncator(100).truncate(text);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores..."

  new StringTruncator(100, { safeWords: false }).truncate(text);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si..."
  ```
