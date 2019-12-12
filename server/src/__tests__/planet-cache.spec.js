const planetDb = require('../planet-db')
const planetApi = require('../planet-api')
const subject = require('../planet-cache')

jest.mock('../planet-db')
jest.mock('../planet-api')

describe('planet-cache', () => {
  beforeEach(() => {
    planetDb.get.mockReset()
    planetDb.upsert.mockReset()
    planetApi.get.mockReset()
  })

  describe('#get', () => {
    it('gets data from the db', async () => {
      const planet = { id: 'such', name: 'test' }
      planetDb.get.mockResolvedValue(planet)

      const result = await subject.get(planet.id)

      expect(result).toEqual(planet)
      expect(planetDb.get).toHaveBeenCalledWith(planet.id)

      expect(planetDb.upsert).not.toBeCalled()
      expect(planetApi.get).not.toBeCalled()
    })

    describe('when planet is not cached', () => {
      describe('when the source of truth returns a value', () => {
        it('gets and saves the planet', async () => {
          const planet = { id: 'very', name: 'mock' }
          planetDb.get.mockResolvedValue(null)
          planetApi.get.mockResolvedValue(planet)

          const result = await subject.get(planet.id)

          expect(result).toEqual(planet)
          expect(planetApi.get).toHaveBeenCalledWith(planet.id)
          expect(planetDb.upsert).toHaveBeenCalledWith(planet)
        })
      })

      describe('when the source of truth does not return a value', () => {
        it('does not attempt to save', async () => {
          const planetId = '5'

          planetDb.get.mockResolvedValue(null)
          planetApi.get.mockResolvedValue(null)

          const result = await subject.get(planetId)

          expect(result).toEqual(null)
          expect(planetDb.get).toHaveBeenCalledWith(planetId)
          expect(planetApi.get).toHaveBeenCalledWith(planetId)

          expect(planetDb.upsert).not.toBeCalled()
        })
      })
    })
  })
})
