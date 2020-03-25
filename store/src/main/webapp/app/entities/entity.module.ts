import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./crm/product/product.module').then(m => m.CrmProductModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./crm/customer/customer.module').then(m => m.CrmCustomerModule)
      },
      {
        path: 'product-order',
        loadChildren: () => import('./crm/product-order/product-order.module').then(m => m.CrmProductOrderModule)
      },
      {
        path: 'order-item',
        loadChildren: () => import('./crm/order-item/order-item.module').then(m => m.CrmOrderItemModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./accountancy/invoice/invoice.module').then(m => m.AccountancyInvoiceModule)
      },
      {
        path: 'shipment',
        loadChildren: () => import('./accountancy/shipment/shipment.module').then(m => m.AccountancyShipmentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class StoreEntityModule {}
