const db = require('./sqlite-wrapper')

async function createTable() {
  const createTableStatement = `
    create table if not exists planets (
      id text primary key,
      name text not null,
      terrain text
    );`

  return db.execute(createTableStatement)
}

async function get(planetId) {
  return db.get('select id, name, terrain from planets where id = $id;', { $id: planetId })
}

async function upsert(planet) {
  const statement = `
    insert into planets (id, name, terrain)
    values ($id, $name, $terrain)
    on conflict(id) do update set name = $name;`

  return db.execute(statement, { $id: planet.id, $name: planet.name, $terrain: planet.terrain })
}

module.exports = {
  createTable,
  get,
  upsert
}
