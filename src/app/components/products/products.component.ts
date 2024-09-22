import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  //products?:Product[]; //products: Product[] | undefined;
  //products:Product[]|null=null;
  //products!:Product[];
  products:Product[]|null=null;

  constructor(private productsService:ProductsService){}
  ngOnInit(): void {}
  onGetAllProducts() {
    this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }
 
}
