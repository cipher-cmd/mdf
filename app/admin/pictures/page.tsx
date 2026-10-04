'use client'

import { useRef, useState } from 'react'
import { UploadSimple } from '@phosphor-icons/react'
import { Button, Card, PageHeader, useFeedback } from '@/components/admin/ui'
import { PictureGrid, uploadImage } from '@/components/admin/ImageField'

export default function PicturesPage() {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const { notify, confirm } = useFeedback()

  const upload = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    let done = 0
    for (const file of Array.from(files)) {
      try {
        await uploadImage(file)
        done++
      } catch (e) {
        notify(`${file.name}: ${(e as Error).message}`, 'error')
      }
    }
    setBusy(false)
    if (input.current) input.current.value = ''
    if (done) notify(done === 1 ? 'Picture uploaded.' : `${done} pictures uploaded.`)
    setRefresh(r => r + 1)
  }

  return (
    <>
      <PageHeader
        eyebrow="Your photo library"
        title="Pictures"
        intro="Every picture you have uploaded. Photos are shrunk automatically before they are saved, so the website stays fast."
        actions={<Button variant="gold" busy={busy} onClick={() => input.current?.click()}><UploadSimple size={16} weight="bold" /> Upload pictures</Button>}
      />
      <input ref={input} type="file" accept="image/*" multiple hidden onChange={e => upload(e.target.files)} />
      <Card className="p-4 sm:p-6">
        <PictureGrid
          refreshKey={refresh}
          onDelete={async item => {
            if (!(await confirm({ title: 'Delete this picture?', text: 'Only pictures that are not used anywhere can be deleted.', yes: 'Delete', danger: true }))) return
            try {
              const res = await fetch(`/api/admin/media?id=${item.id}`, { method: 'DELETE' })
              const json = await res.json()
              if (!json.ok) throw new Error(json.error)
              notify('Picture deleted.')
              setRefresh(r => r + 1)
            } catch (e) {
              notify((e as Error).message, 'error')
            }
          }}
        />
      </Card>
    </>
  )
}
