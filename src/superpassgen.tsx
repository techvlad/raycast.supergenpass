import { useState } from 'react'
import { Form, ActionPanel, Action, Clipboard } from '@raycast/api'

import { generatePassword } from './generatePassword'

export default function Command() {
  const [masterPassword, setMasterPassword] = useState('')
  const [domain, setDomain] = useState('')

  async function copyPassword() {
    await Clipboard.copy(await generatePassword(masterPassword, domain))
  }

  async function pastePassword() {
    await Clipboard.paste(await generatePassword(masterPassword, domain))
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action title="Paste password" onAction={pastePassword}></Action>
          <Action title="Copy password" onAction={copyPassword}></Action>
        </ActionPanel>
      }
    >
      <Form.PasswordField
        id="password"
        title="Master password"
        onChange={setMasterPassword}
        storeValue={true}
      />
      <Form.TextField id="domain" title="Domain / URL" onChange={setDomain} />
    </Form>
  )
}
