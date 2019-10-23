export const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
  ""
)
export const ARROW = " < "
export const REGEX_COMMENT = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
export const REGEX_FN = /^(\(|function\s*\w*\()?\s*(lid_?)[\),\s]/
export const REGEX_ID = /(\*{1,2})|([^\.]+)\.(.+)/i
