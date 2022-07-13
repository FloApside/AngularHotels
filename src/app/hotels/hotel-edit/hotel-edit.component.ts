import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  public hotelForm: FormGroup | any;

  public hotel: IHotel | undefined;

  public pageTitle: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelListService
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      hotelPrice: ['', Validators.required],
      starRating: [''],
      description: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const id: number | any = params.get('id');
      console.log(id);

      this.getSelectedHotel(id);
    });
  }
  
  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe((hotel: IHotel) => {
      console.log('hotel ', hotel);
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;

    // if(this.hotel.hotelId == 0) {
    //   this.pageTitle = 'Créer un hotel';
    // } else {
    //   this.pageTitle = `Modifier l\'hotel ${hotel.hotelName}`;
    // } 
    //  OU
    this.pageTitle = this.hotel.hotelId == 0 ? "Créer un hotel" : `Modifier hotel ${hotel.hotelName}`;

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      hotelPrice: this.hotel.price,
      starRating: this.hotel.rating,
      description: this.hotel.description
    });
  }

  public saveHotel(): void {
    // console.log("hotel Name: ", this.hotelForm.value.hotelName);
    // console.log("hotel Price: ", this.hotelForm.value.hotelPrice);
    // console.log("hotel Rating: ", this.hotelForm.value.starRating);
    // console.log("hotel Description: ", this.hotelForm.value.description);
    console.log(this.hotelForm.value);
  }
}
