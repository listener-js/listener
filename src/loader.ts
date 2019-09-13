import { Listener } from "."

export class Loader {
  public listeners = ["load"]

  public async load(
    // eslint-disable-next-line
    id: string[],
    // eslint-disable-next-line
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): Promise<void> {}
}

export const loader = new Loader()
