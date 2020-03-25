import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model/crm/order-item.model';
import { ICustomer } from 'app/shared/model/crm/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  code?: string;
  invoiceId?: string;
  orderItems?: IOrderItem[];
  customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public status?: OrderStatus,
    public code?: string,
    public invoiceId?: string,
    public orderItems?: IOrderItem[],
    public customer?: ICustomer
  ) {}
}
