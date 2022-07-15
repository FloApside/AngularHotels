import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private hotelService: HotelListService
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      price: ['', Validators.required],
      rating: [''],
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
      console.log('getSelectedHotel(): ', this.hotel);
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;
    console.log('displayHotel(): ', hotel);

    // if(this.hotel.hotelId == 0) {
    //   this.pageTitle = 'Créer un hotel';
    // } else {
    //   this.pageTitle = `Modifier l\'hotel ${hotel.hotelName}`;
    // }
    //  OU
    this.pageTitle =
      this.hotel.id == 0
        ? 'Créer un hotel'
        : `Modifier hotel ${hotel.hotelName}`;

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
  }

  public saveHotel(): void {
    console.log('hotel Name: ', this.hotelForm.value.hotelName);

    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value,
        };

        if (hotel.id == 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
          });
        }
        console.log('saveHotel(): ', this.hotelForm.value);
      }
    }
  }

  public deleteHotel(): void {
    if (!!this.hotel) {
      if (confirm(`Voulez vous vraiment supprimer ${this.hotel.hotelName} ?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe({
          next: () => this.saveCompleted(),
        });
      }
    }
  }

  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels/list']);
  }
}
