import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrderItem, OrderItem } from 'app/shared/model/crm/order-item.model';
import { OrderItemService } from './order-item.service';
import { IProduct } from 'app/shared/model/crm/product.model';
import { ProductService } from 'app/entities/crm/product/product.service';
import { IProductOrder } from 'app/shared/model/crm/product-order.model';
import { ProductOrderService } from 'app/entities/crm/product-order/product-order.service';

type SelectableEntity = IProduct | IProductOrder;

@Component({
  selector: 'jhi-order-item-update',
  templateUrl: './order-item-update.component.html'
})
export class OrderItemUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  productorders: IProductOrder[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    totalPrice: [null, [Validators.required, Validators.min(0)]],
    status: [null, [Validators.required]],
    product: [null, Validators.required],
    order: [null, Validators.required]
  });

  constructor(
    protected orderItemService: OrderItemService,
    protected productService: ProductService,
    protected productOrderService: ProductOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderItem }) => {
      this.updateForm(orderItem);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.productOrderService.query().subscribe((res: HttpResponse<IProductOrder[]>) => (this.productorders = res.body || []));
    });
  }

  updateForm(orderItem: IOrderItem): void {
    this.editForm.patchValue({
      id: orderItem.id,
      quantity: orderItem.quantity,
      totalPrice: orderItem.totalPrice,
      status: orderItem.status,
      product: orderItem.product,
      order: orderItem.order
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderItem = this.createFromForm();
    if (orderItem.id !== undefined) {
      this.subscribeToSaveResponse(this.orderItemService.update(orderItem));
    } else {
      this.subscribeToSaveResponse(this.orderItemService.create(orderItem));
    }
  }

  private createFromForm(): IOrderItem {
    return {
      ...new OrderItem(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      status: this.editForm.get(['status'])!.value,
      product: this.editForm.get(['product'])!.value,
      order: this.editForm.get(['order'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
