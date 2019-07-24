export type ListenersAnyType = Record<string, any[]>

export function buildList(
  lists: ListenersAnyType,
  initialList: any[],
  key: string,
  id: string[]
): any[] {
  let list = initialList
  let idKey = key

  if (lists[idKey]) {
    list = list.concat(lists[idKey])
  }

  for (const i of id) {
    idKey = idKey + "." + i
    if (lists[idKey]) {
      list = list.concat(lists[idKey])
    }
  }

  return list
}
