import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../../test.module';
import { OrderItemDetailComponent } from 'app/entities/crm/order-item/order-item-detail.component';
import { OrderItem } from 'app/shared/model/crm/order-item.model';

describe('Component Tests', () => {
  describe('OrderItem Management Detail Component', () => {
    let comp: OrderItemDetailComponent;
    let fixture: ComponentFixture<OrderItemDetailComponent>;
    const route = ({ data: of({ orderItem: new OrderItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [OrderItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load orderItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
