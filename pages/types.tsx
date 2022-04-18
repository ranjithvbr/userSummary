export type basicFieldParams = {
  firstName: string;
  lastName: string;
  DOB: Date | string;
  gender: string;
};

export interface fieldParams extends basicFieldParams {
  department: string;
  skills: [];
  id?: string;
}

export type AddUserParams = {
  navigation: any;
  route: {
    params: {
      userDetails: fieldParams;
    };
  };
};

export type requiredFieldParams = {
  firstName: string;
  DOB: string;
  gender: string;
  departmentValue: string;
};

export type HomeParams = {
  navigation: any;
  route: {
    params: {
      refresh: boolean;
    };
  };
};

export type userDetailsParams = {
  userSummary: {
    deleterUser: object;
    user: {
      data: Array<fieldParams>;
    };
  };
};
