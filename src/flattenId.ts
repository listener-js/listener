import { EventId } from "./"

export function flattenId(id: EventId): string[] {
  if (Array.isArray(id)) {
    let result = []
    for (const item of id) {
      result = result.concat(item)
    }
    return result
  } else if (id) {
    return [id]
  } else {
    return []
  }
}
