# Development

Naming => files

Git Branching

Code:

- Eslint
- divider, imports, order of exported
- file length
- functional style
- nameing: functions, namespaces, classes, vars, interfaces and types
- no name spaces
- TSX => signature and default export

Tests:
- unit tests for what
- snapshot tests for what

---

The most important ones first:

**There should be unit tests for every function in the public API.**

**This project is written in a functional style.** That means, there are no global variables, no databases, no interactions with the file system, no screen output and no interactive processing of user input. There are just constants and pure functions. So, a function's output only depends on the passed input parameters. Same input means same output – always. Functions are not allowed to alter anything outside of their local scope. That includes the passed parameters! Make copies of the input parameters if necessary. In the lib there are helper functions for that.

Additional conventions:

- use descriptive names for everything (functions, variables, constants etc.)
- use the TypeScript naming conventions for camelCasing, line indentation etc.
- lines should be shorter than 80 characters and absolutely must not exceed 120 characters
- try to keep functions shorter than 20 lines – abide by the 'Single Responsibility Principle'
- if possible files should not exceed 200 lines
- end statements with `;`
- prefix user-specified types with a capital letter of their kind (`I` for interfaces, `E` for enums, `M` for maps, etc.)
- source filenames only use lowercase letters, words are separated by hyphens
- try to avoid exporting constants
- use traditional declaration of functions with `function` keyword on package level, within code blocks fat arrow functions are fine

Source file structure:

1. TypeDoc file description (optional)
2. A Divider (only if there is a file description)
3. All imports
4. A Divider
5. All exported types, constants and functions
6. A Divider
7. All local types, constants and functions (everything that is used locally in the file and not exported)

Sections of code should be ordered like this:

1. type declarations
2. constants
3. functions

Example:

```ts
/**
 * TypeDoc description for this file...
 * @packageDocumentation
 */

// -----------------------------------------------------------------------------

import * as fs from 'fs';

// -----------------------------------------------------------------------------

export interface IPerson {
    name: string;
    age: number;
}

export function sum(n: number[]): number {
    return n.reduce((a, b) => a + b, 0);
}

// -----------------------------------------------------------------------------

type MNamePerson = {[name: string]: IPerson};

const MAX_VALUE = 13;

function sub(a: number, b: number): number {
    return a - b;
}
```
