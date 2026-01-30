'use client'

import { useState, useMemo } from 'react'

type Student = {
  id: number
  name: string
  cert: boolean
  port: boolean
  portfolioUrl?: string
}

const studentsData: Student[] = [
  { id: 1, name: 'Шинээбаяр', cert: true, port: true, portfolioUrl: 'https://bananarama-portfolio-party.lovable.app/' },
  { id: 2, name: 'Тэргүүлэл', cert: true, port: false },
  { id: 3, name: 'Галдан', cert: true, port: true, portfolioUrl: 'https://github.com/Dan-galdan/portflolio-for-me' },
  { id: 4, name: 'Билгүүн', cert: true, port: true, portfolioUrl: 'https://digi-fossil-unearth.lovable.app/' },
  { id: 5, name: 'Сандагдорж', cert: true, port: true, portfolioUrl: '#https://sandag-craft.lovable.app/' },
  { id: 6, name: 'Азбаяр', cert: true, port: true, portfolioUrl: 'https://zuulun-red-folio.lovable.app/' },
  { id: 7, name: 'Амин-Эрдэнэ', cert: true, port: false },
]

export default function ClassProgressTracker() {
  const [filter, setFilter] = useState<'all' | 'cert' | 'port'>('all')

  const filtered = useMemo(() => {
    if (filter === 'cert') return studentsData.filter((s) => !s.cert)
    if (filter === 'port') return studentsData.filter((s) => !s.port)
    return studentsData
  }, [filter])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">Гүйцэтгэл</h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-foreground text-background'
                : 'bg-border text-foreground hover:bg-border/80'
            }`}
          >
            Бүгд
          </button>
          <button
            onClick={() => setFilter('cert')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'cert'
                ? 'bg-foreground text-background'
                : 'bg-border text-foreground hover:bg-border/80'
            }`}
          >
            Сертификат үгүй
          </button>
          <button
            onClick={() => setFilter('port')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'port'
                ? 'bg-foreground text-background'
                : 'bg-border text-foreground hover:bg-border/80'
            }`}
          >
            Portfolio үгүй
          </button>
        </div>

        {/* Column headers */}
        <div className="flex items-center justify-between px-4 py-3 mb-1 rounded-t-lg bg-muted/40 border border-b-0 border-border">
          <span className="font-medium text-muted-foreground text-sm">Нэр</span>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground text-xs font-medium tracking-wide">Сертификат</span>
            <span className="text-muted-foreground text-xs font-medium tracking-wide">Portfolio</span>
          </div>
        </div>

        <div className="space-y-2 border border-border rounded-b-lg overflow-hidden">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-4 py-3.5 bg-card border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <span className="font-medium text-foreground">{student.name}</span>
              <div className="flex items-center gap-6">
                {/* Cert status */}
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    student.cert
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  title={student.cert ? 'Сертификаттай' : 'Сертификатгүй'}
                >
                  {student.cert ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-base leading-none">−</span>
                  )}
                </span>

                {/* Portfolio link or placeholder */}
                <span className="w-20 flex justify-center min-h-[32px] items-center">
                  {student.port ? (
                    <a
                      href={student.portfolioUrl ?? '#'}
                      target={student.portfolioUrl && student.portfolioUrl !== '#' ? '_blank' : undefined}
                      rel={student.portfolioUrl && student.portfolioUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <span>Портфель</span>
                      {(student.portfolioUrl ?? '') !== '#' && (
                        <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </a>
                  ) : (
                    <span className="text-muted-foreground/50 text-sm">—</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          {filtered.length} / {studentsData.length}
        </p>
      </div>
    </div>
  )
}
