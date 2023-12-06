import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Item } from '../../app.state';
import { loadItems, addItem, updateItem, deleteItem } from '../../app.actions';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  formData: any;
  public registrationForm: FormGroup;
  states: string[] = [];
  cities: string[] = [];
  items$: Observable<any>;
  editingItemId: number | null = null;
  editModalRef!: NgbModalRef;

  constructor(private modalService: NgbModal, private cdr: ChangeDetectorRef, private store: Store<AppState>, private fb: FormBuilder, private service: RegistrationService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: [''],
      state: ['']
    });
    this.items$ = this.store.pipe(select((state: AppState) => state.items));
    this.loadStates();
  }

  ngOnInit() {
    this.store.dispatch(loadItems());
  }

  private loadStates() {
    this.service.getStates().subscribe(response => {
      this.states = response;
    })
  }

  onStateChange() {
    const selectedState = this.registrationForm.get('state')?.value;
    this.service.getCities(selectedState).subscribe(cities => {
      this.cities = cities;
    })
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const newItem: Item = {
        id: Date.now(),
        ...this.registrationForm.value,
      };

      if (this.editingItemId !== null) {
        this.store.dispatch(updateItem({ item: newItem }));
        this.editingItemId = null;
      } else {
        this.store.dispatch(addItem({ item: newItem }));
      }

      this.registrationForm.reset();
    }
  }

  onEdit(item: Item, editModalContent: any) {
    this.editingItemId = item.id;
    this.registrationForm.patchValue(item);
    this.editModalRef = this.modalService.open(editModalContent, { centered: true });
  }

  onCancelEdit() {
    this.editingItemId = null;
    this.registrationForm.reset();
    this.editModalRef.close();
  }

  onSaveEdit() {
    if (this.registrationForm.valid) {
      const newItem: Item = {
        id: this.editingItemId!,
        ...this.registrationForm.value,
      };

      this.store.dispatch(updateItem({ item: newItem }));
      this.editingItemId = null;
      this.registrationForm.reset();
      this.editModalRef.close();
  }
}

  onDelete(itemId: number) {
    this.store.dispatch(deleteItem({ itemId }));
  }

}
