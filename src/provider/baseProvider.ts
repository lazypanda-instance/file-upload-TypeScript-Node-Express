import { DatabaseManager } from "../databaseManager/DataBaseManager";

export class BaseProvider {
    constructor() { }

    public async runQuery(dbObject: DatabaseManager, query: string) {
        return await dbObject.executeQuery(query)
                    .then(response => {
                        return response;
                    }, error => {
                        console.log('Error: ', error);
                        process.exit(0);
                    }); 
    }
}