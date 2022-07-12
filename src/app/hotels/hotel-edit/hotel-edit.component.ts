import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm: FormGroup | any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
     this.hotelForm = this.fb.group({
       hotelName: ['', Validators.required],
       hotelPrice: ['', Validators.required],
       starRating: [''],
       description: ['']
     });
  }

  public saveHotel(): void {
    console.log("hotel Name: ", this.hotelForm.value.hotelName);
    console.log("hotel Price: ", this.hotelForm.value.hotelPrice);
    console.log("hotel Rating: ", this.hotelForm.value.starRating);
    console.log("hotel Description: ", this.hotelForm.value.description);
    console.log(this.hotelForm);
    
  }

}
