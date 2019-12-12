const subject = require('../planet-db')
const db = require('../sqlite-wrapper')

describe('planet-db', () => {
  beforeAll(async () => {
    await db.connect(':memory:')
    return subject.createTable()
  })
  afterAll(() => {
    return db.close()
  })

  describe('#get', () => {
    it('gets the planet from the repo', async () => {
      const planet = { id: 'rick', name: 'morty' }
      await subject.upsert(planet)

      const result = await subject.get(planet.id)

      expect(result).toEqual(planet)
    })
  })

  describe('#upsert', () => {
    it('updates existing planet data', async () => {
      const planet = { id: 'homer', name: 'simpson' }
      await subject.upsert(planet)
      planet.name = 'guy incognito'

      await subject.upsert(planet)
      const result = await subject.get(planet.id)

      expect(result).toEqual(planet)
    })
  })
})
