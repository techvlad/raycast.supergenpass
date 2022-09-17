import { generate, GenerationOptions } from 'supergenpass-lib'

export function generatePassword(
  masterPassword: string,
  uri: string,
  options: GenerationOptions = {}
) {
  return new Promise<string>(resolve =>
    generate(masterPassword, uri, options, password => resolve(password))
  )
}
