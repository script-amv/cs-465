import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-fields',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trip-fields.component.html',
  styleUrl: './trip-fields.component.css'
})
export class TripFieldsComponent {
  @Input({ required: true }) form!: FormGroup;
}
