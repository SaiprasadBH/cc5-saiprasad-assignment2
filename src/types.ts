export interface Address {
  doorNumber: string;
  street1: string;
  street2?: string;
  pinCode: string;
  state: string;
  country: string;
}
export interface OfficeAddress extends Address {
  website: string;
}
