import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductData } from '../product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getProductsSmall() {
    return this.http.get<any>('https://www.mocky.io/v2/5eda4003330000740079ea60')
      .toPromise()
      .then(res => <ProductData[]>res.data)
      .then(data => { return data; });
  }
}
