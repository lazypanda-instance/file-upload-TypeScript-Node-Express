import { BaseDB } from "./BaseDB";

export class DatabaseManager extends BaseDB {
    constructor() {
        super();
    }

    public async executeQuery(query: string): Promise<object> {
        return new Promise<object>(async (resolve, reject) => {
            try {
                (async () => {
                    const client = await this.pool.connect();
                    const dbResponse = await client.query(query).then((results: any) => {
                            return results.rows;
                        }, (error: Error) => {
                            throw error;
                        });

                    await client.release();
                    resolve(dbResponse);
                })();
                
            } catch (e) {
                reject(`Error to run the query: ${query}`);
                await this.destroy();
            }
        });
    }
    
}