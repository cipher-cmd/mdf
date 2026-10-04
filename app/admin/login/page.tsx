'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeSlash, ArrowLeft, ShieldCheck, LockKey } from '@phosphor-icons/react'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  // Only ever return to a page inside the admin panel
  const wanted = searchParams.get('redirect') || ''
  const redirectPath = wanted.startsWith('/admin') && !wanted.startsWith('/admin/login') ? wanted : '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.error || 'Incorrect password. Please try again.')
        setLoading(false)
        return
      }

      router.push(redirectPath)
      router.refresh()
    } catch {
      setError('Could not connect. Please check your internet connection.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans antialiased text-[#141414]">
      {/* Top Header Bar */}
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6B6359] hover:text-[#141414] transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to MDF Website</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DC] text-[#8B6B23] border border-[#E5DDD0] text-[11px] font-bold tracking-wider uppercase">
          <ShieldCheck size={14} weight="fill" />
          <span>Store Manager Portal</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-[#E8E1D3] p-7 sm:p-9 shadow-[0_12px_40px_rgba(30,20,5,0.06)] relative overflow-hidden"
        >
          {/* Subtle Top Gold Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#CCA552] via-[#8B6B23] to-[#CCA552]" />

          {/* Crest & Title */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="relative w-16 h-16 rounded-2xl bg-[#FAF5EB] border border-[#D8C7A0] flex items-center justify-center shadow-xs mb-3.5 p-2">
              <Image
                src="/images/mdfFavicon.png"
                alt="MDF Enterprises"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <h1
              className="text-[28px] sm:text-[32px] font-bold text-[#141414] leading-tight tracking-[-0.015em]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              MDF Enterprises
            </h1>
            <p className="text-[13px] font-semibold text-[#8B6B23] uppercase tracking-[0.14em] mt-0.5">
              Store Manager Portal
            </p>
            <p className="text-[12.5px] text-[#6B6359] mt-2 leading-relaxed">
              Sign in to manage your sports catalog, update website words, and control daily news posts.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12.5px] font-medium leading-snug"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-bold text-[#8B6B23] uppercase tracking-[0.14em] mb-1.5"
              >
                Store Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your store password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoFocus
                  className="w-full pl-4 pr-11 py-3 bg-[#FAF8F5] border border-[#E5DDD0] focus:border-[#CCA552] focus:bg-white rounded-xl text-[14px] text-[#141414] placeholder:text-[#9A9287] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8378] hover:text-[#141414] transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#CCA552] hover:bg-[#BF9744] disabled:opacity-50 disabled:cursor-not-allowed text-[#1E170A] font-bold text-[13.5px] tracking-wide shadow-xs transition-all cursor-pointer"
            >
              <span>{loading ? 'Signing in...' : 'Sign In to Store Manager'}</span>
              {!loading && <ArrowRight size={15} weight="bold" />}
            </button>
          </form>

          {/* Friendly note */}
          <p className="text-center text-[11px] text-[#9A9287] mt-6 flex items-center justify-center gap-1.5">
            <LockKey size={13} weight="fill" className="text-[#8B6B23]" />
            <span>Secure store access for authorized MDF personnel.</span>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-[1200px] w-full mx-auto text-center text-[12px] text-[#8B8378] py-2">
        &copy; {new Date().getFullYear()} MDF Enterprises · Srinagar, Jammu &amp; Kashmir
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#FAF8F5] flex items-center justify-center">
          <div className="text-xs text-[#8B6B23] font-medium animate-pulse">Loading Store Portal...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
