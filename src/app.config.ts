export interface ApplicationConfig {
    AUTH_ENDPOINT: string;
    ADS_ENDPOINT: string;
    ADS_SUBSCRIPTION_KEY: string;
    MS_TENANT: string;
    DB_ENDPOINT: string;
  }
  
export const CONFIG: ApplicationConfig = {
    AUTH_ENDPOINT: 'https://94j56dt4p1.execute-api.ap-southeast-1.amazonaws.com/default/ads-auth',
    ADS_ENDPOINT: 'https://adsprapiman.azure-api.net/cds/odata',
    ADS_SUBSCRIPTION_KEY: '6fbf9dc9a08c48e9aefb6ad9bfcb8c5e',
    MS_TENANT: 'arup',
    DB_ENDPOINT: 'TnRDigital_39-200/DEReporting'
  }