export default function hash(...args) {
  if (args.length > 1) {
    return hash(args);
  } else {
    const value = args[0];

    if (value == null) {
      return 0;
    }

    if (typeof value == "boolean") {
      return toInt32(value ? 1231 : 1237);
    } else if (typeof value == "number") {
      const bits = doubleToInt64Bits(value);
      return toInt32(bits ^ (bits >> 32n));
    } else if (typeof value == "bigint") {
      let result = 0;
      const sign = getSign(value);
      const magnitude = getMagnitude(value);

      for (let i = 0; i < magnitude.length; i++) {
        result = toInt32(31 * result + magnitude[i]);
      }

      return result * sign;
    } else if (typeof value == "string") {
      let result = 0;

      for (let i = 0; i < value.length; i++) {
        result = toInt32(31 * result + value.charCodeAt(i));
      }

      return result;
    } else if (value instanceof Array || value instanceof Int8Array || value instanceof Uint8Array || value instanceof Int16Array || value instanceof Uint16Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof BigInt64Array || value instanceof BigUint64Array) {
      let result = 1;

      for (const element of value) {
        const hash0 = hash(element);

        if (hash0 == undefined) {
          return undefined;
        }

        result = toInt32(31 * result + hash0);
      }

      return result;
    } else if (value instanceof Map) {
      let result = 0;

      for (const entry of value.entries()) {
        const hash0 = hash(entry[0]);
        const hash1 = hash(entry[1]);

        if (hash0 == undefined || hash1 == undefined) {
          return undefined;
        }

        result = toInt32(result + (hash0 ^ hash1));
      }

      return result;
    } else if (value instanceof Set) {
      let result = 0;

      for (const entry of value.values()) {
        const hash0 = hash(entry);

        if (hash0 == undefined) {
          return undefined;
        }

        result = toInt32(result + hash0);
      }

      return result;
    } else if (typeof value == "object") {
      let result = 0;

      for (const entry of Object.entries(value)) {
        const hash0 = hash(entry[0]);
        const hash1 = hash(entry[1]);

        if (hash0 == undefined || hash1 == undefined) {
          return undefined;
        }

        result = toInt32(result + (hash0 ^ hash1));
      }

      return result;
    }
  }
}

function toInt32(value) {
  if (typeof value == "number") {
    return value & 0xFFFFFFFF;
  } else if (typeof value == "bigint") {
    return Number(value & 0xFFFFFFFFn);
  }
}

const arrayBuffer = new ArrayBuffer(8);
const bigInt64Array = new BigInt64Array(arrayBuffer);
const float64Array = new Float64Array(arrayBuffer);

function doubleToInt64Bits(value) {
  if (!isNaN(value)) {
    float64Array[0] = value;
    return bigInt64Array[0];
  }

  return 0x7ff8000000000000n;
}

function getSign(value) {
  if (value == 0n) {
    return 0;
  } else if (value > 0n) {
    return 1;
  } else {
    return -1;
  }
}

function getMagnitude(value) {
  const magnitude = [];

  do {
    magnitude.unshift(Number(value & 0xFFFFFFFFn));
    value = value >> 32n;
  } while (value > 0n);

  return magnitude;
}