const axios = require('axios')

const subject = require('../planet-api')

jest.mock('axios')

describe('planet-api', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  describe('#get', () => {
    it('maps the response', async () => {
      const res = { data: { name: 'planet-name', terrain: 'swamps' } }
      axios.get.mockResolvedValue(res)

      const planet = await subject.get('34')

      expect(planet).toEqual({ id: '34', name: res.data.name, terrain: res.data.terrain })
    })

    describe('on a non-200 response', () => {
      it('returns null', async () => {
        axios.get.mockRejectedValue({ status: '404' })

        const planet = await subject.get('34')

        expect(planet).toBeNull()
      })
    })
  })
})
