import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-datepicker',
  templateUrl: './product-datepicker.component.html',
  styleUrls: ['./product-datepicker.component.css']
})
export class ProductDatepickerComponent {
  pickedDateForm = new FormGroup({
    pickedDate: new FormControl('', [Validators.required])
  });

  constructor(private datePipe: DatePipe){
    this.pickedDateForm.valueChanges.subscribe(group => {
      if (group.pickedDate) {
        let date = group.pickedDate;
        let formattedDate = date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null;
        console.log(formattedDate)
      }
    });
  }
}
