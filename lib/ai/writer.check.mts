// Self-check for the text clean-up rules: node lib/ai/writer.check.mts
import assert from 'node:assert/strict'
import { polish, findAiTells, closestTitle } from './writer.ts'

assert.equal(polish('<p>A year–round turf for Under–19 players.</p>'), '<p>A year-round turf for Under-19 players.</p>')
assert.equal(polish('<p>The trials — held in Srinagar — went well.</p>'), '<p>The trials, held in Srinagar, went well.</p>')
assert.equal(polish('<p>It was great—really.</p>'), '<p>It was great, really.</p>')
assert.equal(polish('<p>In conclusion, buy a bat!</p>'), '<p>Buy a bat.</p>')
assert.ok(findAiTells('<p>We delve into a vibrant scene — truly.</p>').length >= 2)
assert.deepEqual(findAiTells('<p>Pick a bat that suits your height.</p><p>Oil it before the season.</p>'), [])
const posts = ['How to Choose a Cricket Bat in Kashmir', 'Setting Up a School Gym in Srinagar']
assert.equal(closestTitle('Choosing the Right Cricket Bat for Kashmir Players', posts), posts[0])
assert.equal(closestTitle('Choosing Cricket Bats', posts), posts[0])
assert.equal(closestTitle('Music Labs Under NEP 2020 for J&K Schools', posts), null)
console.log('writer clean-up checks passed')

// Thin or machine-sounding articles are held back for a person
const { qualityProblems } = await import('./writer.ts')
const body = (n: number) => `<h2>Kit</h2><p>${'bat '.repeat(n)}</p><h2>Care</h2><p>Oil it.</p>`
assert.deepEqual(qualityProblems(body(450)), [])
assert.ok(qualityProblems(body(50)).some(p => p.includes('words')))
assert.ok(qualityProblems(`<p>${'bat '.repeat(500)}</p>`).includes('fewer than two sections'))

// AI articles reach search engines only after a person has saved them
const { isIndexable } = await import('../data/blog.ts')
assert.equal(isIndexable({ ai_generated: true, reviewed_at: null }), false)
assert.equal(isIndexable({ ai_generated: true, reviewed_at: '2026-10-21' }), true)
assert.equal(isIndexable({ ai_generated: false, reviewed_at: null }), true)
console.log('quality and index gate checks passed')
