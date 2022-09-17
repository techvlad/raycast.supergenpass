import { useState } from 'react'
import {
  Form,
  ActionPanel,
  Action,
  Clipboard,
  showToast,
  Toast,
} from '@raycast/api'

import { generatePassword } from './generatePassword'

export default function Command() {
  const [masterPassword, setMasterPassword] = useState('')
  const [domain, setDomain] = useState('')

  async function copyPassword() {
    try {
      await Clipboard.copy(await generatePassword(masterPassword, domain))
    } catch (error) {
      if (error instanceof Error) {
        await showToast({
          title: 'Unhandled exception has occurred',
          message: error.message ?? '',
          style: Toast.Style.Failure,
        })
      }
    }
  }

  async function pastePassword() {
    try {
      await Clipboard.paste(await generatePassword(masterPassword, domain))
    } catch (error) {
      if (error instanceof Error) {
        await showToast({
          title: 'Unhandled exception has occurred',
          message: error.message ?? '',
          style: Toast.Style.Failure,
        })
      }
    }
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
