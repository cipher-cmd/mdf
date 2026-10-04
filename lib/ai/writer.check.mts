// Self-check for the text clean-up rules: node lib/ai/writer.check.mts
import assert from 'node:assert/strict'
import { polish, findAiTells } from './writer.ts'

assert.equal(polish('<p>A year–round turf for Under–19 players.</p>'), '<p>A year-round turf for Under-19 players.</p>')
assert.equal(polish('<p>The trials — held in Srinagar — went well.</p>'), '<p>The trials, held in Srinagar, went well.</p>')
assert.equal(polish('<p>It was great—really.</p>'), '<p>It was great, really.</p>')
assert.equal(polish('<p>In conclusion, buy a bat!</p>'), '<p>Buy a bat.</p>')
assert.ok(findAiTells('<p>We delve into a vibrant scene — truly.</p>').length >= 2)
assert.deepEqual(findAiTells('<p>Pick a bat that suits your height.</p><p>Oil it before the season.</p>'), [])
console.log('writer clean-up checks passed')
