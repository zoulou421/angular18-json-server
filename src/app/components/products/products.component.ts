import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  //products?:Product[]; //products: Product[] | undefined;
  //products:Product[]|null=null;
  //products!:Product[];
  /* First solution
  products:Product[]|null=null;

  constructor(private productsService:ProductsService){}
  ngOnInit(): void {}
  onGetAllProducts() {
    this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }*/
    //products$:Observable<Product[]>|null=null;
    products$:Observable<AppDataState<Product[]>>|null=null;
    readonly UIDataStateEnum=DataStateEnum;

  constructor(private productsService:ProductsService){}
  ngOnInit(): void {}

  onGetAllProducts() {
   this.products$=this.productsService.getAllProducts().pipe(
    map(data=>{
       console.log(data);
      return ({dataState:DataStateEnum.LOADED,data:data})
    }),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
   );
  }

  onGetSelectedProducts() {
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>{
         console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
  }

  onGetAvailableProducts() {
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>{
         console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
  }

  onSearch(dataForm: any) {
    this.products$=this.productsService.getBySearchProducts(dataForm.keyword).pipe(
      map(data=>{
         console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
  }
 
}
