# @k0michi/hash

A library to generate hash code values like Java.

## Example

```js
import hash from "@k0michi/hash";

let hashCode = hash("Hello world");
hashCode = hash(true);
hashCode = hash(1234567890);
hashCode = hash(0xFFFFFFFFFFFFFFFFn);
hashCode = hash(["a", "b", "c"]);
hashCode = hash({
  name: "value"
});
```

## Installation

```
yarn add @k0michi/hash
```

## License

MIT License