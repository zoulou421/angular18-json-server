import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private myHttp:HttpClient) { }

  //all Product list
  getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.myHttp.get<Product[]>(host+"/products");
  }

  //Selected products
  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.myHttp.get<Product[]>(host+"/products?selected=true");
  }
 //Available products
 getAvailableProducts():Observable<Product[]>{
  let host=environment.host;
  return this.myHttp.get<Product[]>(host+"/products?available=true");
}

}
