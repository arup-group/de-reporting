export interface ApplicationConfig {
    LAMBDA_ENDPOINT: string;
    MS_TENANT: string;
    DB_ENDPOINT: string;
  }
  
export const CONFIG: ApplicationConfig = {
    LAMBDA_ENDPOINT: 'https://94j56dt4p1.execute-api.ap-southeast-1.amazonaws.com/default/',
    MS_TENANT: 'arup',
    DB_ENDPOINT: 'TnRDigital_39-200/DEReporting'
  }

  