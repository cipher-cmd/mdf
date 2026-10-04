'use client'

import { useEffect, useRef } from 'react'
import { TextB, TextItalic, ListBullets, ListNumbers, Quotes, LinkSimple, TextHOne, TextHTwo, Paragraph } from '@phosphor-icons/react'

/**
 * Word-processor style article editor. Uses the browser's built-in editing (no extra
 * library); the server cleans the HTML on save, so pasting from Word or WhatsApp is safe.
 */
const TOOLS = [
  { icon: TextHOne, label: 'Heading', command: 'formatBlock', arg: '<h2>' },
  { icon: TextHTwo, label: 'Small heading', command: 'formatBlock', arg: '<h3>' },
  { icon: Paragraph, label: 'Normal text', command: 'formatBlock', arg: '<p>' },
  { icon: TextB, label: 'Bold', command: 'bold' },
  { icon: TextItalic, label: 'Italic', command: 'italic' },
  { icon: ListBullets, label: 'Bullet list', command: 'insertUnorderedList' },
  { icon: ListNumbers, label: 'Numbered list', command: 'insertOrderedList' },
  { icon: Quotes, label: 'Quote', command: 'formatBlock', arg: '<blockquote>' },
  { icon: LinkSimple, label: 'Link', command: 'createLink' },
] as { icon: typeof TextB; label: string; command: string; arg?: string }[]

const escape = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function RichEditor({ value, onChange, placeholder = 'Start writing your article…' }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)

  // Load the starting text once; after that the editor owns its content
  useEffect(() => {
    if (ref.current && !loaded.current) {
      ref.current.innerHTML = value
      loaded.current = true
    }
  }, [value])

  const run = (command: string, arg?: string) => {
    ref.current?.focus()
    document.execCommand(command, false, arg)
    onChange(ref.current?.innerHTML ?? '')
  }

  const act = (command: string, arg?: string) => {
    if (command !== 'createLink') return run(command, arg)
    const url = window.prompt('Paste the web address for this link (starting with https://)')
    if (url && /^(https?:\/\/|\/)/.test(url.trim())) run('createLink', url.trim())
  }

  return (
    <div className="rounded-[18px] bg-ledger shadow-[inset_0_0_0_1px_rgba(60,45,20,0.12)] focus-within:shadow-[inset_0_0_0_1.5px_var(--color-gold),0_0_0_4px_rgba(204,165,82,0.15)] transition-shadow">
      <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-hairline bg-ledger/95 backdrop-blur rounded-t-[18px] p-1.5">
        {TOOLS.map(({ icon: Icon, label, command, arg }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onMouseDown={e => e.preventDefault()}
            onClick={() => act(command, arg)}
            className="h-10 min-w-10 px-2 rounded-xl flex items-center justify-center gap-1.5 text-ink-soft hover:bg-gold-wash hover:text-gold-deep transition-colors"
          >
            <Icon size={18} weight="bold" />
            <span className="hidden lg:inline text-[12px] font-medium">{label}</span>
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={() => onChange(ref.current?.innerHTML ?? '')}
        onPaste={e => {
          // Paste as clean paragraphs instead of the source app's formatting
          e.preventDefault()
          const text = e.clipboardData.getData('text/plain')
          const html = text.split(/\n{2,}/).map(p => `<p>${escape(p).replace(/\n/g, '<br>')}</p>`).join('')
          document.execCommand('insertHTML', false, html)
          onChange(ref.current?.innerHTML ?? '')
        }}
        className="adm-editor article-body min-h-[360px] px-5 sm:px-7 py-6 !text-[16px]"
      />
    </div>
  )
}
