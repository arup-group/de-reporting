
import { CONFIG } from '../app.config'

export class ADS {

    endpoint: string;
    subscriptionKey: string;
    token: string;
    requestHeader: any;

    constructor() {
        
        this.endpoint = CONFIG.ADS_ENDPOINT
        this.subscriptionKey = CONFIG.ADS_SUBSCRIPTION_KEY
        this.token
        this.requestHeader 
        
        this.getAccessToken().then(token => {
            this.token = token.access_token
            this.requestHeader = {
                "Ocp-Apim-Subscription-Key": this.subscriptionKey,
                "Authorization": "Bearer " + token.access_token
            }
        })
    }

    async getAccessToken() {
        const req = await fetch(CONFIG.AUTH_ENDPOINT)
        return req.json()
    }

    async _rawRequest(entity, params) {

        try {
            const response = await fetch(`${this.endpoint}/${entity}?${params}`, 
                {
                method: 'GET',
                headers: this.requestHeader
                }
            )
            
            const json = await response.json()
            return json
        } catch (e) {
            console.log(e)
        }
    }

    async getTimesheets(user, from, to) {

        // const params = {
        //     filter: `WeekEndingDate gt ${from} & WeekEndingDate lt ${to}`a
        //     orderby: "WeekEndingDate"
        // }
        const data = await this._rawRequest('JobWeekTimesheets', {})
        console.log(data)
    } 
}

 