/**
 * @file SSPG - The Simplest Strong Password Generator
 * @description Helper for generating strong passwords
 * @author Enita Nureya <enitanureya@outlook.com>
 * @author RLt <ltfjx2333@gmail.com>
 * @copyright 2025 University of Fool
 */

/**
 * Configuration options for the generation.
 */
export type SspgGenerationConfig = {
  /**
   * Whether to use a cryptographically secure random number generator.
   * @defaultValue `false`
   */
  safe?: boolean;
  /**
   * The set of characters to use for generating the random string.
   */
  characters: string;
};

/**
 * The Simplest Strong Password Generator
 * A utility class for generating random strings based on provided configuration.
 */
class Sspg {
  /**
   * Whether to use a cryptographically secure random number generator.
   */
  safe: boolean;
  /**
   * Generates a random string based on the provided configuration and length.
   * @param config - The configuration for generating the random string. Can be a string or a {@link SspgGenerationConfig}.
   * @param length - The length of the random string to generate.
   * @returns The generated random string.
   * @alias gen
   */
  generate: (config: SspgGenerationConfig | string, length: number) => string;
  /**
   * An alias for the `generate` method.
   * @param config - The configuration for generating the random string. Can be a string or a {@link SspgGenerationConfig}.
   * @param length - The length of the random string to generate.
   * @returns The generated random string.
   * @alias generate
   */
  gen: (config: SspgGenerationConfig | string, length: number) => string;

  /**
   * Creates an instance of the {@link Sspg} class.
   * @param safe - Whether to use a cryptographically secure random number generator. Defaults to `false`.
   */
  constructor(safe?: boolean) {
    function generate(
      this: Sspg,
      config: SspgGenerationConfig | string,
      length: number,
    ): string {
      // parameter checks
      if (config === undefined) {
        throw new TypeError("missing parameter: config");
      }
      if (typeof config !== "string" && typeof config !== "object") {
        throw new TypeError(
          `expected config to be a string or an object, but get a(n) ${typeof config}`,
        );
      }
      if (length === undefined) {
        throw new TypeError("missing parameter: length");
      }
      if (typeof length !== "number") {
        throw new TypeError(
          `expected length to be a number, but get a(n) ${typeof length}`,
        );
      }
      // converting a string parameter to a SspgGenerationConfig
      const makeConfig = (config_str: string): SspgGenerationConfig => {
        let safe = this.safe;
        let characters = "";
        let $break = false;
        for (const i of Array.from(config_str)) {
          if ($break) break;
          switch (i) {
            case "a":
              characters += "abcdefghijklmnopqrstuvwxyz";
              break;
            case "A":
              characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              break;
            case "0":
              characters += "1234567890";
              break;
            case ".":
              characters += "!@#$%^&*,.;:/?+=";
              break;
            case "-":
              characters += "-";
              break;
            case "_":
              characters += "_";
              break;
            case "[":
            case "]":
              characters += "()[]{}<>|'\"`~`";
              break;
            case "u":
              safe = false;
              break;
            case "s":
              safe = true;
              break;
            case "c":
              $break = true;
              break;
            default:
              console.warn(`sspg: unrecognized character ${i}`);
              break;
          }
        }
        if ($break) {
          const index_of_c = config_str.indexOf("c");
          if (index_of_c !== -1) {
            characters += config_str.slice(index_of_c + 1);
          }
        }
        return { safe, characters };
      };
      if (typeof config === "object") {
        if (config.safe && typeof config.safe !== "boolean") {
          throw new TypeError(
            `expected config.safe to be a boolean, but got ${typeof config.safe}`,
          );
        }
        if (typeof config.characters !== "string") {
          throw new TypeError(
            `expected config.characters to be a string, but got ${typeof config.characters}`,
          );
        }
        if (config.characters === "") {
          console.warn("sspg: got empty config string, ignoring generation...");
          return "";
        }
        const safe =
          typeof config.safe === "undefined" ? this.safe : config.safe;
        if (!safe) {
          const random = (): number => {
            return Math.floor(config.characters.length * Math.random());
          };
          let $return = "";
          for (let i = 0; i < length; i++) {
            $return += Array.from(config.characters)[random()];
          }
          return $return;
        }
        const typedArray = new Uint8Array(length);
        crypto.getRandomValues(typedArray);
        let $return = "";
        const len = config.characters.length;
        for (const i of typedArray) {
          $return += Array.from(config.characters)[+i % len];
        }
        return $return;
      }
      return this.generate(makeConfig(config), length);
    }
    this.safe = typeof safe !== "boolean" ? false : safe;
    this.generate = generate;
    this.gen = generate;
  }
}

/**
 * Creates a new instance of the {@link Sspg} class.
 * @param safe - Whether to use a cryptographically secure random number generator. Defaults to `false`.
 * @returns A new instance of {@link Sspg}.
 */
export function create(safe?: boolean) {
  return new Sspg(safe);
}

const sspg_u: Sspg = new Sspg(false);
const sspg_s: Sspg = new Sspg(true);

/**
 * [Unsafe] Generates a random string using the default unsafe random number generator.
 * @param config - The configuration for generating the random string. Can be a string or a {@link SspgGenerationConfig}.
 * @param length - The length of the random string to generate.
 * @returns The generated random string.
 */
export const gen: (
  config: SspgGenerationConfig | string,
  length: number,
) => string = sspg_u.generate.bind(sspg_u);

/**
 * [Safe] Generates a random string using a cryptographically secure random number generator.
 * @param config - The configuration for generating the random string. Can be a string or a {@link SspgGenerationConfig}.
 * @param length - The length of the random string to generate.
 * @returns The generated random string.
 */
export const gens: (
  config: SspgGenerationConfig | string,
  length: number,
) => string = sspg_s.generate.bind(sspg_s);
