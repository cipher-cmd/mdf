'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageSquare, UploadSimple, Images, Check } from '@phosphor-icons/react'
import { api, Button, Drawer, Loading, Empty, useFeedback } from './ui'

const TARGET_BYTES = 350_000

/**
 * Shrink a photo in the browser before upload: longest side ≤ maxSide, WebP, and
 * quality stepped down until it is light enough. A 6 MB phone photo ends up ~150 KB,
 * which keeps the shared database small and the website fast.
 */
async function compress(file: File, maxSide: number) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  let blob: Blob | null = null
  for (const quality of [0.84, 0.74, 0.62, 0.5]) {
    blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/webp', quality))
    // Browsers that cannot make WebP hand back PNG; fall back to JPEG for photos
    if (blob && blob.type !== 'image/webp') blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/jpeg', quality))
    if (blob && blob.size <= TARGET_BYTES) break
  }
  if (!blob) throw new Error('This picture could not be read. Please try a JPG or PNG.')
  return { blob, width, height }
}

export async function uploadImage(file: File, maxSide = 1600): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Please choose a picture file.')
  const { blob, width, height } = await compress(file, maxSide)
  const name = file.name.replace(/\.[^.]+$/, '').slice(0, 120)
  const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}&w=${width}&h=${height}`, {
    method: 'POST',
    headers: { 'Content-Type': blob.type },
    body: blob,
  })
  const json = await res.json().catch(() => ({ ok: false, error: 'Upload failed. Please try again.' }))
  if (!json.ok) throw new Error(json.error)
  return json.data.url as string
}

export const formatBytes = (n: number) => (n === 0 ? "0 KB" : n > 1_000_000 ? `${(n / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1000))} KB`)

interface MediaItem { id: string; url: string; name: string; bytes: number; width: number | null; height: number | null; created_at: string }

/** Grid of every uploaded picture. Used by the picker and the Pictures page. */
export function PictureGrid({ onPick, selected, onDelete, refreshKey = 0 }: {
  onPick?: (url: string) => void
  selected?: string
  onDelete?: (item: MediaItem) => void
  refreshKey?: number
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    api<MediaItem[]>('/api/admin/media').then(r => setItems(r.data)).catch(e => setError(e.message))
  }, [refreshKey])

  if (error) return <Empty title="Could not load pictures" text={error} />
  if (!items) return <Loading label="Loading pictures…" />
  if (items.length === 0) return <Empty title="No pictures yet" text="Pictures you upload for products, articles or the website appear here." />

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map(item => (
        <li key={item.id} className="group">
          <button
            type="button"
            onClick={() => onPick?.(item.url)}
            disabled={!onPick}
            className={`relative block w-full aspect-square overflow-hidden rounded-[16px] bg-vellum outline outline-1 -outline-offset-1 outline-black/10 ${
              selected === item.url ? 'ring-4 ring-gold' : onPick ? 'hover:ring-4 hover:ring-gold/40' : ''
            } transition-shadow`}
          >
            <Image src={item.url} alt={item.name} fill className="object-cover" sizes="200px" unoptimized />
            {selected === item.url && (
              <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-gold text-[#1E170A] flex items-center justify-center"><Check size={14} weight="bold" /></span>
            )}
          </button>
          <div className="mt-1.5 flex items-center justify-between gap-2 px-0.5">
            <span className="truncate text-[12px] text-ink-soft">{item.name || 'Picture'}</span>
            <span className="flex-shrink-0 text-[11px] text-ink-faint tabular-nums">{formatBytes(item.bytes)}</span>
          </div>
          {onDelete && (
            <button type="button" onClick={() => onDelete(item)} className="mt-0.5 px-0.5 text-[12px] font-semibold text-rust hover:underline">
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

/** A picture box: shows the current picture, uploads a new one, or picks one already uploaded. */
export function ImageField({ value, onChange, maxSide = 1600, shape = 'landscape', allowEmpty = false }: {
  value: string
  onChange: (url: string) => void
  maxSide?: number
  shape?: 'landscape' | 'portrait' | 'square' | 'logo'
  allowEmpty?: boolean
}) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [library, setLibrary] = useState(false)
  const { notify } = useFeedback()
  const box = { landscape: 'aspect-[16/10]', portrait: 'aspect-[4/5] max-w-[240px]', square: 'aspect-square max-w-[200px]', logo: 'aspect-[2/1] max-w-[240px]' }[shape]

  const pick = async (file?: File) => {
    if (!file) return
    setBusy(true)
    try {
      onChange(await uploadImage(file, shape === 'logo' ? 600 : maxSide))
      notify('Picture uploaded.')
    } catch (e) {
      notify((e as Error).message, 'error')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div>
      <div
        className={`relative w-full ${box} overflow-hidden rounded-[18px] bg-vellum outline outline-1 -outline-offset-1 outline-black/10`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); pick(e.dataTransfer.files[0]) }}
      >
        {value ? (
          <Image src={value} alt="" fill className={shape === 'logo' ? 'object-contain p-4' : 'object-cover'} sizes="400px" unoptimized={value.startsWith('/media/')} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-ink-faint">
            <ImageSquare size={30} weight="duotone" />
            <span className="text-[12px]">No picture yet</span>
          </div>
        )}
        {busy && <div className="absolute inset-0 bg-parchment/80 backdrop-blur-sm"><Loading label="Uploading…" /></div>}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="ghost" onClick={() => input.current?.click()} disabled={busy}>
          <UploadSimple size={14} weight="bold" /> {value ? 'Upload a different picture' : 'Upload a picture'}
        </Button>
        <Button type="button" size="sm" variant="quiet" onClick={() => setLibrary(true)} disabled={busy}>
          <Images size={14} weight="bold" /> Choose from uploaded
        </Button>
        {allowEmpty && value && (
          <Button type="button" size="sm" variant="quiet" onClick={() => onChange('')}>Remove</Button>
        )}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={e => pick(e.target.files?.[0])} />
      <Drawer open={library} onClose={() => setLibrary(false)} title="Choose a picture">
        <PictureGrid selected={value} onPick={url => { onChange(url); setLibrary(false) }} />
      </Drawer>
    </div>
  )
}
