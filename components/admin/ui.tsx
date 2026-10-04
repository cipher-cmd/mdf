'use client'

/**
 * Building blocks for the store-manager panel. Same visual language as the public
 * site (parchment, gold eyebrows, serif headings) so the owner feels at home, and
 * plain-word feedback for every action.
 */
import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes,
} from 'react'
import { CheckCircle, WarningCircle, X, CircleNotch } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// ── Talking to the server ───────────────────────────────────────────────────

export async function api<T = any>(url: string, method = 'GET', body?: unknown): Promise<{ ok: true; data: T } & Record<string, any>> {
  const res = await fetch(url, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  })
  if (res.status === 401) {
    window.location.href = `/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`
    throw new Error('You have been signed out. Please sign in again.')
  }
  const json = await res.json().catch(() => ({ ok: false, error: 'The server did not answer. Please check your internet and try again.' }))
  if (!json.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
  return json
}

// ── Toasts and confirmations ────────────────────────────────────────────────

type Toast = { id: number; kind: 'ok' | 'error'; text: string }
type ConfirmOpts = { title: string; text?: string; yes?: string; danger?: boolean }

const FeedbackContext = createContext<{
  notify: (text: string, kind?: Toast['kind']) => void
  confirm: (opts: ConfirmOpts) => Promise<boolean>
}>({ notify: () => {}, confirm: async () => false })

export const useFeedback = () => useContext(FeedbackContext)

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [ask, setAsk] = useState<(ConfirmOpts & { resolve: (v: boolean) => void }) | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const notify = useCallback((text: string, kind: Toast['kind'] = 'ok') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t.slice(-2), { id, kind, text }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), kind === 'error' ? 7000 : 3500)
  }, [])

  const confirm = useCallback((opts: ConfirmOpts) => new Promise<boolean>(resolve => setAsk({ ...opts, resolve })), [])

  useEffect(() => {
    if (ask) dialogRef.current?.showModal()
  }, [ask])

  const answer = (v: boolean) => {
    ask?.resolve(v)
    dialogRef.current?.close()
    setAsk(null)
  }

  return (
    <FeedbackContext.Provider value={{ notify, confirm }}>
      {children}
      <div aria-live="polite" className="fixed z-[200] bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-[min(92vw,440px)] pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            role={t.kind === 'error' ? 'alert' : 'status'}
            className={cn(
              'adm-rise pointer-events-auto w-full flex items-start gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-medium shadow-[0_18px_40px_-16px_rgba(40,28,10,0.45)]',
              t.kind === 'ok' ? 'bg-ink text-white' : 'bg-rust text-white'
            )}
          >
            {t.kind === 'ok'
              ? <CheckCircle size={19} weight="fill" className="text-gold flex-shrink-0 mt-px" />
              : <WarningCircle size={19} weight="fill" className="flex-shrink-0 mt-px" />}
            <span className="flex-1 leading-snug">{t.text}</span>
          </div>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        onCancel={e => { e.preventDefault(); answer(false) }}
        className="adm-dialog m-auto w-[min(92vw,420px)] rounded-[24px] bg-parchment p-0 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] backdrop:bg-[#1A140A]/50 backdrop:backdrop-blur-sm"
      >
        {ask && (
          <div className="p-6">
            <h2 className="font-serif-heading text-[26px] font-bold leading-tight text-ink text-balance">{ask.title}</h2>
            {ask.text && <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{ask.text}</p>}
            <div className="mt-6 flex justify-end gap-2.5">
              <Button variant="ghost" onClick={() => answer(false)}>Cancel</Button>
              <Button variant={ask.danger ? 'danger' : 'dark'} onClick={() => answer(true)} autoFocus>{ask.yes ?? 'Yes'}</Button>
            </div>
          </div>
        )}
      </dialog>
    </FeedbackContext.Provider>
  )
}

// ── Layout pieces ───────────────────────────────────────────────────────────

export function PageHeader({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-7 sm:mb-9">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">— {eyebrow}</p>
        <h1 className="mt-1.5 font-serif-heading text-[36px] sm:text-[44px] font-bold leading-[1] tracking-[-0.01em] text-ink text-balance">
          {title}<span className="text-gold">.</span>
        </h1>
        {intro && <p className="mt-2.5 max-w-[620px] text-[14.5px] leading-relaxed text-ink-soft text-pretty">{intro}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2.5 sm:flex-shrink-0">{actions}</div>}
    </header>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[22px] bg-ledger shadow-[0_0_0_1px_rgba(60,45,20,0.07),0_10px_30px_-18px_rgba(60,45,20,0.22)]', className)}>
      {children}
    </div>
  )
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="mb-3">
      <h2 className="font-serif-heading text-[24px] font-bold leading-tight text-ink">{children}</h2>
      {hint && <p className="mt-0.5 text-[13px] text-ink-muted">{hint}</p>}
    </div>
  )
}

// ── Controls ────────────────────────────────────────────────────────────────

const BUTTON = {
  gold: 'bg-gold hover:bg-[#BF9744] text-[#1E170A] shadow-[0_8px_20px_-10px_rgba(204,165,82,0.9)]',
  dark: 'bg-ink hover:bg-[#2A241B] text-white',
  ghost: 'bg-ledger hover:bg-gold-wash text-ink shadow-[0_0_0_1px_rgba(60,45,20,0.14)]',
  danger: 'bg-rust hover:bg-[#9C3726] text-white',
  quiet: 'bg-transparent hover:bg-vellum text-ink-soft hover:text-ink',
}

export function Button({
  variant = 'dark', busy, className = '', children, size = 'md', ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof BUTTON; busy?: boolean; size?: 'sm' | 'md' }) {
  return (
    <button
      {...props}
      disabled={props.disabled || busy}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none',
        'transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.97]',
        'disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/35',
        size === 'md' ? 'min-h-[44px] px-5 text-[13.5px]' : 'min-h-[36px] px-3.5 text-[12.5px]',
        BUTTON[variant],
        className
      )}
    >
      {busy && <CircleNotch size={15} weight="bold" className="animate-spin" />}
      {children}
    </button>
  )
}

export function Field({ label, help, children, className = '' }: { label: string; help?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-[13px] font-semibold text-ink mb-1.5">{label}</span>
      {children}
      {help && <span className="block mt-1.5 text-[12px] leading-snug text-ink-muted">{help}</span>}
    </label>
  )
}

const INPUT =
  'w-full rounded-[14px] bg-vellum/60 px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-faint outline-none ' +
  'shadow-[inset_0_0_0_1px_rgba(60,45,20,0.12)] hover:shadow-[inset_0_0_0_1px_rgba(60,45,20,0.22)] ' +
  'focus:bg-ledger focus:shadow-[inset_0_0_0_1.5px_var(--color-gold),0_0_0_4px_rgba(204,165,82,0.15)] transition-[background-color,box-shadow] duration-150'

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(INPUT, 'min-h-[44px]', props.className)} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={cn(INPUT, 'resize-y leading-relaxed', props.className)} />
}

export function Select({ value, onChange, options, className = '' }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={cn(INPUT, 'min-h-[44px] pr-9 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%238B6B23%27 stroke-width=%273%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center]', className)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

/** On/off switch with the meaning spelled out next to it. */
export function Toggle({ on, onChange, label, hint, disabled }: { on: boolean; onChange: (v: boolean) => void; label: ReactNode; hint?: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className="group flex w-full items-start gap-3 rounded-2xl p-1 text-left disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/35"
    >
      <span className={cn('relative mt-0.5 h-[26px] w-[46px] flex-shrink-0 rounded-full transition-colors duration-200', on ? 'bg-leaf' : 'bg-[#D9D1C2]')}>
        <span className={cn('absolute top-[3px] left-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]', on && 'translate-x-5')} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-ink">{label}</span>
        {hint && <span className="block text-[12.5px] leading-snug text-ink-muted mt-0.5">{hint}</span>}
      </span>
    </button>
  )
}

export function Badge({ tone = 'neutral', children }: { tone?: 'live' | 'draft' | 'warn' | 'neutral' | 'gold'; children: ReactNode }) {
  const tones = {
    live: 'bg-leaf-wash text-leaf',
    draft: 'bg-vellum text-ink-soft',
    warn: 'bg-rust-wash text-rust',
    neutral: 'bg-vellum text-ink-soft',
    gold: 'bg-gold-wash text-gold-deep',
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap', tones[tone])}>
      {tone === 'live' && <span className="h-1.5 w-1.5 rounded-full bg-leaf" />}
      {children}
    </span>
  )
}

export function Empty({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="py-14 px-6 text-center">
      <p className="font-serif-heading text-[26px] font-bold text-ink">{title}</p>
      {text && <p className="mx-auto mt-1.5 max-w-[380px] text-[14px] leading-relaxed text-ink-muted">{text}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  )
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-16 text-[13.5px] text-ink-muted">
      <CircleNotch size={18} weight="bold" className="animate-spin text-gold" /> {label}
    </div>
  )
}

/** Slide-over panel for editing one thing. Native <dialog> gives focus trapping and Escape for free. */
export function Drawer({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!open && d.open) d.close()
    return () => { document.documentElement.style.overflow = '' }
  }, [open])
  return (
    <dialog
      ref={ref}
      onCancel={e => { e.preventDefault(); onClose() }}
      onClick={e => { if (e.target === ref.current) onClose() }}
      className="adm-drawer fixed inset-y-0 right-0 left-auto m-0 h-[100dvh] max-h-none w-[min(100vw,620px)] max-w-none bg-parchment p-0 backdrop:bg-[#1A140A]/45 backdrop:backdrop-blur-[2px]"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-hairline">
            <h2 className="font-serif-heading text-[26px] font-bold leading-tight text-ink truncate">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="h-10 w-10 flex-shrink-0 rounded-full bg-ledger shadow-[0_0_0_1px_rgba(60,45,20,0.12)] flex items-center justify-center text-ink hover:bg-gold-wash">
              <X size={16} weight="bold" />
            </button>
          </div>
          <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 py-6">{children}</div>
          {footer && <div className="border-t border-hairline bg-ledger/80 px-5 sm:px-7 py-4 flex flex-wrap justify-end gap-2.5">{footer}</div>}
        </div>
      )}
    </dialog>
  )
}

export const timeAgo = (iso?: string | null) => {
  if (!iso) return ''
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.round(s / 60)} min ago`
  if (s < 86400) return `${Math.round(s / 3600)} hours ago`
  if (s < 86400 * 2) return 'yesterday'
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
