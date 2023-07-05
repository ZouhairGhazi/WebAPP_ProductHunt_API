import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ApiCallerService } from '../services/api-caller.service';
import { catchError, tap } from 'rxjs';

// Interface that will be used in the processing of the api response to store it in a suitable array
export interface ProductData {
  name: string;
  description: string;
  url: string;
  votes_count: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit{

  productArray: ProductData[] = [];

  displayedColumns: string[] = ['name', 'description', 'total-votes'];
  dataSource: MatTableDataSource<ProductData> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productList: ProductData[] = [];
  
  constructor(private route: ActivatedRoute, private apiCallerService: ApiCallerService) {
    
  }

  ngOnInit(){
    // Retrieving the date entered by the user, and sent by the datepicker component
    const selectedDate = this.route.snapshot.paramMap.get("date");
    if (selectedDate) {
      // Passing the date to the backend and managing the data sent back by the product hunt api creating an array of objects representing products by certain fields
      this.apiCallerService.getProductList(selectedDate)
        .pipe(
          tap((response: ProductData[]) => {
            response.forEach((value: any) => {
              this.productArray.push({
                name: value.node.name,
                description: value.node.tagline,
                url: value.node.url,
                votes_count: value.node.votesCount
              });
            });
            this.dataSource = new MatTableDataSource(this.productArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }),
          catchError((error) => {
            console.error(error);
            // Handle the error if needed
            throw error;
          })
        )
        .subscribe();
    } else {
      console.error('Date passed value is null.');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
