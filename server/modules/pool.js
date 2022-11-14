const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    conectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  pool = new pg.Pool({
    database: 'weekend-to-do-app', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
  });
}

/*
const config = {
  database: 'weekend-to-do-app', 
  host: 'localhost', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000 
};
*/

//pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to postgres");
});

pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

module.exports = pool;