export interface ResponseAcceso{
    isSuccess:boolean,
    token:string,
        user: {
          id: number;
          name: string;
          email: string;
        };
      }
      
