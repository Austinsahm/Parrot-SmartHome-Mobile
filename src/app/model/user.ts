import { CompanyType } from './company';

export interface LoginData {
  userId: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  firstName: string;
  userCompanyId: string;
  companyName: string;
  companyTypeName: CompanyType;
  roleId: string;
  roleName: string;
  countryId: string;
  numActiveDevice: number;
  numInactiveDevice: number;
  numPartner: number;
  numCorporate: number;
  numIndividual: number;
  creditBalance: string;
  overdraftLimit: number;
  logo:string
}
