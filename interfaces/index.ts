export interface IUser {
    _id: string;
    name:string,
    email: string,
    clerkYserId: string,
    isApproved: boolean,
    isSuperAdmin: boolean, 
    createdAt: string,
    updatedAt: string
}

export interface IStaff {
    _id: string,
    name: string,
    email: string, 
    phone: string,
    startTime: string,
    endTime: string,
    workDays: string[],
    bio: string;
    createdAt: string,
    updatedAt: string,
}

export interface  IClient {
    _id: string,
    name: string,
    email: string,
    phone: string

}

export interface IAppointment {
    _id: string;
    date: string;
    time: string;
    staff: IStaff;
    client: IClient;
    services: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }


  export interface ICustomer {
    _id: string;
    name: string;
    email: string;
    phone: string;

  }

