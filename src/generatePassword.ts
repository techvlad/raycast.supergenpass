import { generate } from 'supergenpass-lib'

type Options = {
  hashRounds?: number
  length?: number
  method?: 'md5' | 'sha512'
  passthrough?: boolean
  removeSubdomains?: boolean
  secret?: string
}

export function generatePassword(
  masterPassword: string,
  uri: string,
  options: Options = {}
) {
  return new Promise(resolve =>
    generate(masterPassword, uri, options, resolve)
  ) as Promise<string>
}
