const { Pool, Client } = require('pg');

export class BaseDB {
    pool: any;
    
    constructor() {
        this.pool = new Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: 5432
        });
    }

    async destroy() {
        await this.pool.end().then(() => console.log('DB Connection ended'));
    }
}