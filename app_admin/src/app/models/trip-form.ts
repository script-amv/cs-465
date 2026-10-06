import { FormBuilder, Validators } from '@angular/forms';
import { Trip } from './trip';

export function createTripForm(builder: FormBuilder, trip?: Trip) {
  return builder.nonNullable.group({
    code: [trip?.code ?? '', [Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{3}$/)]],
    name: [trip?.name ?? '', Validators.required],
    length: [trip?.length ?? '', Validators.required],
    start: [trip?.start?.slice(0, 10) ?? '', Validators.required],
    resort: [trip?.resort ?? '', Validators.required],
    perPerson: [trip?.perPerson ?? 0, [Validators.required, Validators.min(0)]],
    image: [trip?.image ?? '', Validators.required],
    description: [trip?.description ?? '', Validators.required],
  });
}
