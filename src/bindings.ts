import { ARROW } from "./constants"

export interface ListenerInternalBindingOptions {
  append?: boolean | number
  index?: number
  intercept?: boolean
  listener?: boolean
  once?: boolean
  peek?: boolean
  prepend?: boolean | number
  return?: boolean
}

export type ListenerInternalBindings =
  | string
  | (string | ListenerInternalBindingOptions)[]

export interface ListenerInternalBinding {
  targetId: string
  customIds?: string[]
  matchId?: string
  options?: ListenerInternalBindingOptions
}

export class Bindings {
  public bindings: ListenerInternalBinding[] = []
  public matchId: string
  public targetIds: Set<string> = new Set()

  constructor(matchId?: string) {
    this.matchId = matchId
  }

  public add(
    ...bindings: ListenerInternalBindings[]
  ): Bindings {
    for (let binding of bindings) {
      let customIds: string[]
      let options: ListenerInternalBindingOptions
      let targetId: string

      if (typeof binding === "string") {
        targetId = binding
      } else {
        const last = binding[binding.length - 1]
        const hasOption = typeof last !== "string"
        if (hasOption) {
          options = last as ListenerInternalBindingOptions
          binding = binding.slice(0, -1)
        }
        ;[targetId, ...customIds] = binding as string[]
      }

      this.addBinding({ customIds, options, targetId })
    }

    return this
  }

  public addBinding({
    customIds,
    options,
    targetId,
  }: ListenerInternalBinding): void {
    if (targetId) {
      this.bindings = this.bindings.concat({
        customIds:
          customIds && customIds.length
            ? customIds
            : undefined,
        matchId: this.matchId,
        options,
        targetId,
      })

      this.targetIds.add(targetId)
    }
  }

  public remove(binding: ListenerInternalBinding): void {
    const index = this.bindings.indexOf(binding)

    if (index > -1) {
      this.bindings.splice(index, 1)
    }

    this.targetIds.delete(binding.targetId)
  }

  public static list(
    _lid: string[],
    bindings: Record<string, Bindings>,
    fnId: string,
    id: string[],
    index: number
  ): [ListenerInternalBinding[], number[]] {
    const indices = []
    const keys = ["**"]

    let key: string
    let key2: string
    let list: ListenerInternalBinding[] = []

    if (index === 0) {
      list.push({ options: { index: 0 }, targetId: fnId })
      indices.push(0)
    }

    for (const i of id.slice(0).reverse()) {
      key = key ? i + ARROW + key : i
      keys.push("**" + ARROW + key)
    }

    if (key) {
      keys.push(key)
    }

    for (const i of id) {
      key2 = key2 ? key2 + ARROW + i : i
      keys.push(key2 + ARROW + "**")
    }

    if (id.length <= 1) {
      keys.push("*")
    } else {
      keys.push("*" + ARROW + id.slice(1).join(ARROW))
      keys.push(id.slice(0, -1).join(ARROW) + ARROW + "*")
    }

    const bindingFilter = ({
      options,
    }: ListenerInternalBinding): boolean => {
      const i = this.optsToIndex(options)
      const inRange =
        index < 0 ? i < 0 : index < 1 ? i === 0 : i > 0

      if (inRange) {
        indices.push(i)
      }

      return inRange
    }

    for (const key of keys) {
      if (bindings[key]) {
        list = list.concat(
          bindings[key].bindings.filter(bindingFilter)
        )
      }
    }

    list = list.sort(this.listSort.bind(this))

    return [list, indices]
  }

  private static listSort(
    { options: a }: ListenerInternalBinding,
    { options: b }: ListenerInternalBinding
  ): number {
    const aIndex = this.optsToIndex(a)
    const bIndex = this.optsToIndex(b)

    return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
  }

  private static optsToIndex(
    opts: ListenerInternalBindingOptions
  ): number {
    if (!opts) {
      return 1
    }

    if (typeof opts.index === "number") {
      return opts.index
    }

    if (opts.prepend) {
      if (typeof opts.prepend === "number") {
        return opts.prepend * -1
      } else {
        return -1
      }
    }

    if (opts.append) {
      if (typeof opts.append === "number") {
        return opts.append
      } else {
        return 1
      }
    }

    return 1
  }

  private separateOptions(
    binding: ListenerInternalBindings
  ): [
    (string | string[])[],
    ListenerInternalBindingOptions
  ] {
    if (Array.isArray(binding)) {
      const values = []

      let options: ListenerInternalBindingOptions

      for (const value of binding) {
        if (
          typeof value !== "string" &&
          !Array.isArray(value)
        ) {
          options = value
        } else {
          values.push(value)
        }
      }

      return [values, options]
    }
  }
}
