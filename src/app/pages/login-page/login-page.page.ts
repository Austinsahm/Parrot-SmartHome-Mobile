import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  formData: FormGroup;
  isloading: boolean;
  inputType = 'password';
  showPassword = false;
  icon = 'eye-outline';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.formData = formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isloading = true;
    const { userId, password } = this.formData.value;

    const data = { userId, password };

    this.auth.login(data).subscribe((user) => {
      if (!user) {
        // console.log('error')
        this.isloading = false;
        this.alert('User not found', 'Invalid userid or password');
        this.formData.reset();
      } else {
        this.router.navigate(['/home']);
        this.isloading = false;
        this.formData.reset()
      }
    });
  }

  alert(header: string, message: string) {
    this.alertCtrl
      .create({
        header,
        message,
      })
      .then((el) => el.present());
  }

  onShowPassword() {
    if (!this.showPassword) {
      this.inputType = 'text';
      this.showPassword = true;
      this.icon = 'eye-off-outline';
    } else {
      this.inputType = 'password';
      this.showPassword = false;
      this.icon = 'eye-outline';
    }
  }
}
