import { bindings } from "./records"

export function reset() {
  for (var key in bindings) delete bindings[key]
  bindings["*"] = []
}
