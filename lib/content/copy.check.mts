// Self-check for automatic years of experience: node lib/content/copy.check.mts
import assert from 'node:assert/strict'
import { applyTokens, mergeCopy, yearsOfExperience } from './copy.ts'

const copy = mergeCopy({})
assert.equal(yearsOfExperience(copy.contact, new Date('2026-10-05T12:00:00Z')), 28)
assert.equal(yearsOfExperience(copy.contact, new Date('2026-12-31T18:00:00Z')), 28) // 11:30 pm 31 Dec in Srinagar
assert.equal(yearsOfExperience(copy.contact, new Date('2026-12-31T19:00:00Z')), 29) // 12:30 am 1 Jan in Srinagar
assert.equal(yearsOfExperience(copy.contact, new Date('2027-06-01T00:00:00Z')), 29)
assert.equal(yearsOfExperience(copy.contact, new Date('2030-01-15T00:00:00Z')), 32)

const in2027 = applyTokens(copy, new Date('2027-03-01T00:00:00Z'))
assert.equal(in2027.home_stats.items[0].value, 29)
assert.equal(in2027.home_stats.items[1].value, 1000) // other numbers untouched
assert.ok(in2027.home_about.text.includes('29+ years'))
assert.equal(in2027.journey.heading, '29 Years.\nOne Valley.')
assert.ok(copy.home_about.text.includes('{years}')) // the admin still sees the placeholder
console.log('years-of-experience checks passed')

// Blog posts link to the department they are about
const { departmentFor } = await import('./departments.ts')
assert.equal(departmentFor('Best Cricket Equipment Brands in India 2026'), 'sports')
assert.equal(departmentFor('Setting Up a School Gymnasium: What You Need'), 'fitness')
assert.equal(departmentFor('Tabla or harmonium: starting a school music room'), 'music')
assert.equal(departmentFor('Ordering medals and trophies for annual day'), 'awards')
assert.equal(departmentFor('How to register on the GeM portal'), null)
