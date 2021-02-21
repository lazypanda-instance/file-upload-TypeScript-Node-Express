import { Request } from "express";
import { UserProfileProvider } from "./provider/userProfileProvider";
import { APIGatewayEvent } from "aws-lambda";

export class ProfileController {
    private request;
    private userProfileProvider: UserProfileProvider;

    constructor(req: Request | APIGatewayEvent) {
        this.request = req;
        this.userProfileProvider = new UserProfileProvider();
    }

    getUserProfile() {
        let queryParam;
        if (this.request && this.request.query) {
            queryParam = this.request.query.name as string;
        } else {
            queryParam = this.request.queryStringParameters.name as string;
        }

        return this.userProfileProvider.fetchUserProfile(queryParam);
    }
}