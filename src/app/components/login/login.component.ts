import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CarouselModule,
    InputTextModule,
    DividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  sliderImages: any[] = [
    { url: 'assets/layout/images/slide1.jpg', alt: 'Slide 1' },
    { url: 'assets/layout/images/slide2.jpg', alt: 'Slide 2' },
    { url: 'assets/layout/images/slide3.jpg', alt: 'Slide 3' },
  ];
  loginForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private formsBuilder: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formsBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get filledInput(): boolean {
    return this.layoutService.config().inputStyle === 'filled';
  }

  handleLogin() {
    this.router.navigate(['/application/details']);
  }
}
