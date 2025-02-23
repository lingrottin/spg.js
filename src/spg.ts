/**
 * @file SPG - The Simplest Strong Password Generator
 * @description Helper for generating strong passwords
 * @author Enita Nureya <enitanureya@outlook.com>
 * @author RLt <ltfjx2333@gmail.com>
 * @copyright 2025 University of Fool
 */

/**
 * Configuration options for the generation.
 */
export type SpgGenerationConfig = {
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
class Spg {
  /**
   * Whether to use a cryptographically secure random number generator.
   */
  safe: boolean;
  /**
   * Generates a random string based on the provided configuration and length.
   * @param config - The configuration for generating the random string. Can be a string or a {@link SpgGenerationConfig}.
   * @param length - The length of the random string to generate.
   * @returns The generated random string.
   * @alias gen
   */
  generate: (config: SpgGenerationConfig | string, length: number) => string;
  /**
   * An alias for the `generate` method.
   * @param config - The configuration for generating the random string. Can be a string or a {@link SpgGenerationConfig}.
   * @param length - The length of the random string to generate.
   * @returns The generated random string.
   * @alias generate
   */
  gen: (config: SpgGenerationConfig | string, length: number) => string;

  /**
   * Creates an instance of the {@link Spg} class.
   * @param safe - Whether to use a cryptographically secure random number generator. Defaults to `false`.
   */
  constructor(safe?: boolean) {
    function generate(
      this: Spg,
      config: SpgGenerationConfig | string,
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
      // converting a string parameter to a SpgGenerationConfig
      const makeConfig = (config_str: string): SpgGenerationConfig => {
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
              console.warn(`spg: unrecognized character ${i}`);
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
          console.warn("spg: got empty config string, ignoring generation...");
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
 * Creates a new instance of the {@link Spg} class.
 * @param safe - Whether to use a cryptographically secure random number generator. Defaults to `false`.
 * @returns A new instance of {@link Spg}.
 */
export function create(safe?: boolean) {
  return new Spg(safe);
}

const spg_u: Spg = new Spg(false);
const spg_s: Spg = new Spg(true);

/**
 * [Unsafe] Generates a random string using the default unsafe random number generator.
 * @param config - The configuration for generating the random string. Can be a string or a {@link SpgGenerationConfig}.
 * @param length - The length of the random string to generate.
 * @returns The generated random string.
 */
export const gen: (
  config: SpgGenerationConfig | string,
  length: number,
) => string = spg_u.generate.bind(spg_u);

/**
 * [Safe] Generates a random string using a cryptographically secure random number generator.
 * @param config - The configuration for generating the random string. Can be a string or a {@link SpgGenerationConfig}.
 * @param length - The length of the random string to generate.
 * @returns The generated random string.
 */
export const gens: (
  config: SpgGenerationConfig | string,
  length: number,
) => string = spg_s.generate.bind(spg_s);
