import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-datepicker',
  templateUrl: './product-datepicker.component.html',
  styleUrls: ['./product-datepicker.component.css']
})
export class ProductDatepickerComponent {

  formattedDate!: string | null;
  pickedDateForm = new FormGroup({
    pickedDate: new FormControl('', [Validators.required])
  });
  maxDate: Date;

  constructor(private router: Router, private datePipe: DatePipe){
    this.maxDate = new Date(); // Initialize with today's date
    this.maxDate.setDate(this.maxDate.getDate()); // Set the maximum date to yesterday so that the user can't pick dates that are in the future
    this.pickedDateForm.valueChanges.subscribe(group => {
      if (group.pickedDate) {
        const date = group.pickedDate;
        this.formattedDate = date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null; // Format the date into one comparable by the dates product hunt api provides
      }
    });
  }

  sendPickedDate(){
    this.router.navigate(['/product-list',this.formattedDate]); // Pass the picked date as parameter to the product list componenet
  }
}
