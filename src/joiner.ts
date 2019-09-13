import { Listener } from "."

export class Joiner {
  public listeners: string[] = ["join", "loaded"]
  public loadedIds: Set<string> = new Set()
  public loadedResolvers: Record<string, Function> = {}

  public async join(
    id: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): Promise<any> {
    if (!instance.instances) {
      return Promise.resolve()
    }

    let promises = []

    for (const id of instance.instances) {
      if (instance[id]) {
        continue
      }

      const [joinInstanceId, fnId] = listener.parseId(id)

      if (!joinInstanceId) {
        continue
      }

      if (!this.loadedIds.has(joinInstanceId)) {
        promises = promises.concat(
          new Promise(
            (resolve): void => {
              this.loadedResolvers[joinInstanceId] = resolve
            }
          )
        )
      }

      if (fnId) {
        instance[fnId] =
          (id: string[], ...args: any[]): any => {
            return listener.instances[joinInstanceId][fnId](
              [`${instanceId}.${fnId}`, ...id],
              ...args
            )
          }
      } else {
        instance[joinInstanceId] =
          listener.instances[joinInstanceId]
      }
    }

    return Promise.all(promises)
  }

  public loaded(id: string[], instanceId: string): void {
    this.loadedIds.add(instanceId)

    if (this.loadedResolvers[instanceId]) {
      this.loadedResolvers[instanceId]()
      this.loadedResolvers[instanceId] = undefined
    }
  }
}

export const joiner = new Joiner()
