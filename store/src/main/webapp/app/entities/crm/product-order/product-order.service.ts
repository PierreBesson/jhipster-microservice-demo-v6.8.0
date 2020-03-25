import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductOrder } from 'app/shared/model/crm/product-order.model';

type EntityResponseType = HttpResponse<IProductOrder>;
type EntityArrayResponseType = HttpResponse<IProductOrder[]>;

@Injectable({ providedIn: 'root' })
export class ProductOrderService {
  public resourceUrl = SERVER_API_URL + 'services/crm/api/product-orders';

  constructor(protected http: HttpClient) {}

  create(productOrder: IProductOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productOrder);
    return this.http
      .post<IProductOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productOrder: IProductOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productOrder);
    return this.http
      .put<IProductOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productOrder: IProductOrder): IProductOrder {
    const copy: IProductOrder = Object.assign({}, productOrder, {
      placedDate: productOrder.placedDate && productOrder.placedDate.isValid() ? productOrder.placedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.placedDate = res.body.placedDate ? moment(res.body.placedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productOrder: IProductOrder) => {
        productOrder.placedDate = productOrder.placedDate ? moment(productOrder.placedDate) : undefined;
      });
    }
    return res;
  }
}
