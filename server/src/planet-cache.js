const planetDb = require('./planet-db')
const planetApi = require('./planet-api')

async function get(planetId) {
  
  // by commenting the following lines 
  // we can bypass data fetch from db and
  // get data from backend API call
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
