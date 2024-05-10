import { Account } from "./account";
import { Address } from "./address";

export class Customer {
    customerId: number = 0;
    name: string = '';
    customerType: string = '';
    address: Address = {
        customerId: 0,
        addressId: 0,
        streetNumber:"",
        city: "",
        province: '',
        postalCode: '',
    };
    accounts: Account[] = [];
}