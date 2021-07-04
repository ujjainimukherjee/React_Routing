const request = require('supertest')

const createApp = require('../app')
const planetDb = require('../planet-db')
const db = require('../sqlite-wrapper')
const planetApi = require('../planet-api')

jest.mock('../planet-api')

describe('app', () => {
  let app

  beforeAll(async () => {
    await db.connect(':memory:')
    await planetDb.createTable()
    app = createApp()
  })
  afterAll(() => {
    return db.close()
  })

  describe('GET /planets/:id', () => {
    it('gets a planet by ID', async () => {
      const planet = { id: '42', name: 'ultimate question of life', terrain:'lakes, hills' }
      await planetDb.upsert(planet)

      const res = await request(app)
        .get(`/planets/${planet.id}`)
        .send()

      expect(res.status).toEqual(200)
      expect(res.body).toEqual(planet)
    })

    describe('when the planet does not exist', () => {
      it('returns 404', async () => {
        planetApi.get.mockResolvedValue(null)

        const res = await request(app)
          .get('/planets/derp')
          .send()

        expect(res.status).toEqual(404)
      })
    })
  })
})
