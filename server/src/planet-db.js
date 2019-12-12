const db = require('./sqlite-wrapper')

async function createTable() {
  const statement = `
    create table if not exists planets (
      id text primary key,
      name text not null
    );`

  return db.execute(statement)
}

async function get(planetId) {
  return db.get('select id, name from planets where id = $id;', { $id: planetId })
}

async function upsert(planet) {
  const statement = `
    insert into planets (id, name)
    values ($id, $name)
    on conflict(id) do update set name = $name;`

  return db.execute(statement, { $id: planet.id, $name: planet.name })
}

module.exports = {
  createTable,
  get,
  upsert
}
