'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Circle } from '@phosphor-icons/react'
import { api, Button, Card, Field, Loading, PageHeader, SectionTitle, TextInput, useFeedback } from '@/components/admin/ui'

interface Check { label: string; done: boolean; fix: string }

export default function SettingsPage() {
  const [checks, setChecks] = useState<Check[] | null>(null)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [again, setAgain] = useState('')
  const [saving, setSaving] = useState(false)
  const { notify } = useFeedback()

  useEffect(() => {
    api('/api/admin/settings').then(r => setChecks(r.checks)).catch(e => notify(e.message, 'error'))
  }, [notify])

  const change = async (e: React.FormEvent) => {
    e.preventDefault()
    if (next !== again) return notify('The two new passwords are not the same.', 'error')
    setSaving(true)
    try {
      await api('/api/admin/settings', 'POST', { current, next })
      notify('Password changed. Use the new one next time you sign in.')
      setCurrent(''); setNext(''); setAgain('')
    } catch (err) {
      notify((err as Error).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Behind the scenes" title="Settings" intro="Your password, and a check that everything the website needs is switched on." />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
        <section>
          <SectionTitle hint="Use at least 8 characters. Something easy to remember but hard to guess.">Change your password</SectionTitle>
          <Card className="p-5 sm:p-6">
            <form onSubmit={change} className="space-y-4">
              <Field label="Current password"><TextInput type="password" autoComplete="current-password" value={current} onChange={e => setCurrent(e.target.value)} required /></Field>
              <Field label="New password"><TextInput type="password" autoComplete="new-password" value={next} onChange={e => setNext(e.target.value)} minLength={8} required /></Field>
              <Field label="New password again"><TextInput type="password" autoComplete="new-password" value={again} onChange={e => setAgain(e.target.value)} minLength={8} required /></Field>
              <div className="flex justify-end"><Button type="submit" variant="gold" busy={saving}>Change password</Button></div>
            </form>
            <p className="mt-4 text-[12px] leading-snug text-ink-muted">
              Forgot it? The website owner&apos;s spare password (set in Vercel as ADMIN_PASSWORD) always works too.
            </p>
          </Card>
        </section>

        <section>
          <SectionTitle hint="These are set once in Vercel by whoever looks after the website.">Website health</SectionTitle>
          <Card className="p-5 sm:p-6">
            {!checks ? <Loading /> : (
              <ul className="space-y-4">
                {checks.map(c => (
                  <li key={c.label} className="flex items-start gap-3">
                    {c.done ? <CheckCircle size={22} weight="fill" className="text-leaf flex-shrink-0" /> : <Circle size={22} className="text-rust flex-shrink-0" />}
                    <div>
                      <p className="text-[14px] font-semibold text-ink">{c.label}</p>
                      <p className="text-[12.5px] text-ink-muted leading-snug">{c.done ? 'All good.' : c.fix}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </div>
    </>
  )
}
