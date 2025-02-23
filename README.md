# spg.js
JavaScript library of the Simplest Strong Password Generator

## Usage

```typescript
import {gen} from "spg";

gen("0aA", 10);
```

Available functions:
* `gen(config, length)`: Generate a password with the length of `length`
* `gens(config, length)`: same as `gen`, but using a cryptographically safe random generator
* `create(safe:boolean)`: create an instance of `Spg`

## Configuration

The `gen` and `gens` functions' first parameter can be an `SpgGenerationConfig` or a string.

Whether to use the safe or unsafe random generator can be specified within the configuration can override the `Spg.safe` property. (and `gen` or `gens`)

### `SpgGenerationConfig`

```typescript
type SpgGenerationConfig={
  characters: string; // The characters from which the password will be generated
  safe?: boolean;     // Whether to use a cryprographically safe random generator
}
```

## The Spg format

The `Spg` adopts a straightforward approach for the generation, which was come up with by [@RLt](https://github.com/Ltfjx).

Configuration strings are made up of characters, which is parsed separately. The results are eventually added up to form a
collection of characters from which the password will be generated.

for example, `0aA` becomes `[0-9a-zA-Z]`.

Available characters:

```
0      -> [0-9]
a      -> [a-z]
A      -> [A-Z]
- or _ -> -_
.      -> !@#$%^&*,.;:/?+=
[ or ] -> ()[]{}<>|'"`~
```

Specially, there are several special characters.

```
c -- escape, characters after this are directly put into the output collection
s -- use the safe random generator
u -- use the unsafe random generator
```
