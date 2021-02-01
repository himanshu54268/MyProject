import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ProductData } from '../product-data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prodData: ProductData[];
  cartData: ProductData[];
  showDialog: boolean = false;
  total:String = "00.00";

  constructor(private prodService: ProductServiceService) { }

  ngOnInit() {
    this.cartData = [];

    this.prodService.getProductsSmall().then((res) => {
      this.prodData = res;
      this.prodData.map(each => {
        each.qty_perItem = 1;
        each.total = each.price;
      })
    });

  }

  addConf(event) {
    let cart = new ProductData();
    let total = Number(this.total) + Number(event.price);
    this.total = String(total) + ".00";
    let isFromEdit = false;
    this.prodData.map(each => {
      if (each.id == event.id) {
        cart = Object.assign({}, each);
        each.quantity = each.quantity - event.qty_perItem;
      }
    })
    if (this.cartData.length != 0) {
      this.cartData.map(each => {
        if (each.id == cart.id) {
          isFromEdit = true;
        }
      })
      if (!isFromEdit)
        this.cartData = this.pushData(this.cartData, cart);
    }
    else{
      this.cartData = this.pushData(this.cartData, cart);
    }

  }

  deleteConf(event) {
    let total = 0;
    this.prodData.map(each => {
      if (each.id == event.id) {
        each.quantity = Number(each.quantity) + event.qty_perItem;
      }
    })
    this.cartData = this.cartData.filter(each => {
      return each.id != event.id;
    })
    this.cartData.map(each => {
      total = total + Number(each.total);
    })
    this.total = String(total) + ".00";
  }

  pushData(arr, newEntry) {
    return [...arr, newEntry]
  }

  changePrice(event) {
    if (event.quantity < event.qty_perItem) {
      return;
    }
    let total = 0;
    this.cartData.map(each => {
      if (each.id == event.id) {
        let price = Number(each.price) * each.qty_perItem;
        each.total = String(price) + ".00";
      }
      total = total + Number(each.total);
    })
    this.total = String(total) + ".00";
  }

}
