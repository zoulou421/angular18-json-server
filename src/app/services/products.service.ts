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
   // let host=environment.host;
    //let host=environment.hostUnreached;
    let host=(Math.random()>0.1)?environment.host:environment.hostUnreached;
    return this.myHttp.get<Product[]>(host+"/products");
  }

  //Selected products
  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    //return this.myHttp.get<Product[]>(host+"/products?selected=true");
    return this.myHttp.get<Product[]>(`${host}/products?selected=true`);
  }
 //Available products
 getAvailableProducts():Observable<Product[]>{
  let host=environment.host;
 // return this.myHttp.get<Product[]>(host+"/products?available=true");
   return this.myHttp.get<Product[]>(`${host}/products?available=true`);
 }

  //Search products
  getBySearchProducts(keyword:String):Observable<Product[]>{
    let host=environment.host;
   // return this.myHttp.get<Product[]>(host+"/products?available=true");
     return this.myHttp.get<Product[]>(`${host}/products?name=${keyword}`);
   }

    //Select products
  getOneSelectProduct(product:Product):Observable<Product>{
    let host=environment.host;
    product.selected=!product.selected;
   // return this.myHttp.get<Product[]>(host+"/products?available=true");
   return this.myHttp.put<Product>(host+"/products/"+product.id,product);
   }

     //Select products
  deleteSelectedProduct(product:Product):Observable<void>{
    let host=environment.host;
    product.selected=!product.selected;
   return this.myHttp.delete<void>(host+"/products/"+product.id);
   }

}
