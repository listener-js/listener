import { ALPHABET } from "./constants"

export class Uid {
  public static counter = 0

  public static uid(): string {
    let id = this.counter
    let s: string

    this.counter += 1

    if (id === 0) {
      return ALPHABET[0]
    }

    s = ""

    while (id > 0) {
      s += ALPHABET[id % ALPHABET.length]
      id = parseInt((id / ALPHABET.length).toString(), 10)
    }

    return s
      .split("")
      .reverse()
      .join("")
  }
}
