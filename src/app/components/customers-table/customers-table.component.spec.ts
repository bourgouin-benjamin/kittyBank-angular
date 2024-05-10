import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTableComponent } from './customers-table.component';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CustomersTableComponent', () => {
  let component: CustomersTableComponent;
  let fixture: ComponentFixture<CustomersTableComponent>;
  let CustomerServiceStub: jasmine.SpyObj<CustomerService>;

  const CustomerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomers', 'getCustomerById']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersTableComponent],
      providers: [{provide: CustomerService, useValue: CustomerServiceSpy}],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersTableComponent);
    component = fixture.componentInstance;
    CustomerServiceStub = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;

    // fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should return array of 2 customers', () => {
    const customers = [{
      customerId:1,
      name: 'John',
      customerType: 'Person',
      address: {
          customerId: 1,
          addressId: 1,
          streetNumber:"street",
          city: "montreal",
          province: 'qc',
          postalCode: 'a1b2c3',
      },
      accounts: []
    },
      {
        customerId:2,
        name: 'Jane',
        customerType: 'Person',
        address: {
            customerId: 2,
            addressId: 2,
            streetNumber:"street",
            city: "montreal",
            province: 'qc',
            postalCode: 'a1b2c3',
        },
        accounts: []
    },
    ];
    CustomerServiceStub.getCustomers.and.returnValue(of(customers));
    component.getAllCustomers();
    expect(component.customers.length).toEqual(customers.length);
  });

  fit('shoul call #getCustomers() in CustomerService', () => {
    component.getAllCustomers();
    expect(CustomerServiceStub.getCustomers).toHaveBeenCalled();
  });
});
