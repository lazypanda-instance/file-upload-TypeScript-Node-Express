import dotenv from "dotenv";
import { BaseProvider } from "../../../provider/baseProvider";
import { DatabaseManager } from "../../../databaseManager/DataBaseManager";

dotenv.config();

export class UserProfileProvider extends BaseProvider {

    private dbConnect: DatabaseManager;
    private searchUserProfileSQL = "SELECT name, role, website from tutorial where tutorial.name=";

    constructor() {
        super();
        this.dbConnect = new DatabaseManager();
    }

    async fetchUserProfile(query: string) {
        const searchTerm = query.replace(/\'/gi,'');
        const searchUserSQL = `${this.searchUserProfileSQL}'${searchTerm}'`;

        let response;
        try {
            response = await this.runQuery(this.dbConnect, searchUserSQL);
        } catch(e) {
            response = 'Exception';
        }

        return {
            data: response
        }
    }
}