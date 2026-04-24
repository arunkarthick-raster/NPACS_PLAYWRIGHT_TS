export type AuthData = {
  token: string;
  groups: string[];
};

export type LoginResult = AuthData & {
    actualRoles: string[];
};

export type DecodedToken = {
  groups?: string[];
  [key: string]: any;
};

