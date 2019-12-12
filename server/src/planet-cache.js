const planetDb = require('./planet-db')
const planetApi = require('./planet-api')

async function get(planetId) {
  const result = await planetDb.get(planetId)

  if (result)
    return result

  const planet = await planetApi.get(planetId)

  if (planet)
    await planetDb.upsert(planet)

  return planet
}

module.exports = {
  get
}
