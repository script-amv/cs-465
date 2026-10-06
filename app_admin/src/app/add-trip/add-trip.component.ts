import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { createTripForm } from '../models/trip-form';
import { TripFieldsComponent } from '../trip-fields/trip-fields.component';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TripFieldsComponent],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  form;
  saving = false;
  error = '';

  constructor(
    builder: FormBuilder,
    private readonly router: Router,
    private readonly tripData: TripDataService,
  ) {
    this.form = createTripForm(builder);
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.saving) return;
    this.saving = true;
    this.error = '';
    const trip = this.form.getRawValue();
    trip.code = trip.code.toUpperCase();
    this.tripData.addTrip(trip).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.error = error.error?.message || 'The trip could not be saved.';
      },
    });
  }
}
