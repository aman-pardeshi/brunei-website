import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HeaderComponent } from '../../Shared/header/header.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ApplicationService } from 'src/app/application.service';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { getDateInFormat } from '../../Shared/utils';

interface City {
  name: string;
  code: string;
  countryCode: string;
}

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    CheckboxModule,
    InputTextModule,
    StepperModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    FileUploadModule,
    TableModule,
    DividerModule
  ],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
  providers: [MessageService],
})
export class PersonalDetailsComponent implements OnInit {
  applicationForm: FormGroup;
  countries: City[] | undefined;
  genderList: any[] = [];
  maxDate: Date;
  minDate: Date;
  passportExpDate: Date;
  formSubmitted: boolean = false;
  active: number = 0;
  serviceFee: any[]


  constructor(
    public layoutService: LayoutService,
    private formsBuilder: FormBuilder,
    private applicationService: ApplicationService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.fetchFormsOptions();
    console.log(this.active);
  }

  nextPage() {}

  initForm() {
    this.applicationForm = this.formsBuilder.group({
      firstAndMiddleName: [''],
      lastName: [''],
      passportNumber: [''],
      passportExpiryDate: [''],
      passportDateOfIssue: [''],
      passportPlaceOfIssue: [''],
      gender: [''],
      dateOfBirth: [''],
      countryCode: [''],
      contactNo: [undefined],
      useNumberForSendingUpdates: [true],
    });
  }

  fetchFormsOptions() {
    this.genderList.push(
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' }
    );

    this.serviceFee = [
      {
        name: 'Visa Fee',
        amount: '$50',
      },
      {
        name: 'Service Fee',
        amount: '$10',
      },
    ];

    this.applicationService.getCountryList().subscribe((response) => {
      this.countries = response;
      this.applicationForm.get('countryCode').patchValue(this.countries[0]);
      // console.log(this.countries);
    });

    console.log(this.countries);
  }

  formatDate(date: string) {
    if (date === '') {
      return "-"
    }
    return getDateInFormat(new Date(date));
  }
}
