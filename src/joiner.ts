import { Listener } from "."

export class Joiner {
  public listeners: string[] = ["join", "loaded", "preJoin"]
  public loadedIds: Set<string> = new Set()
  public loadedResolvers: Record<string, Function> = {}

  public join(
    id: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): Promise<any> {
    if (!instance.instances) {
      return
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

    return promises.length ?
      Promise.all(promises) :
      undefined
  }

  public preJoin(
    id: string[],
    instanceId: string,
    instance: any,
    listener: Listener
  ): boolean {
    if (!instance || instance.then) {
      return
    }
    
    let pass = false

    if (instance.instances) {
      for (const instanceId of instance.instances) {
        const [joinInstanceId] =
          listener.parseId(instanceId)
        
        pass = pass || this.preJoin(
          id,
          joinInstanceId,
          listener.instances[joinInstanceId],
          listener
        )
      }
    } else {
      pass = true
    }

    if (pass) {
      this.loadedIds.add(instanceId)
    }

    return pass
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
