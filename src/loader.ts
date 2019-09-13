import { Listener } from "."

export class Loader {
  public listeners = ["load"]

  public load(
    // eslint-disable-next-line
    id: string[],
    // eslint-disable-next-line
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): void {}
}

export const loader = new Loader()
