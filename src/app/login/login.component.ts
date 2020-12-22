import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ApiserviceService } from './../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  title :any = 'Login';
  otherError : boolean;
  errorMessage : string;
  successFlag : boolean;
  successMessage : string;
  constructor(private fb: FormBuilder,public apiService:ApiserviceService,public router:Router) {
    this.validateLoginForm();
   }

   validateLoginForm() {
    this.loginForm = this.fb.group({
       email: ['', Validators.required ],
       pass: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        let obj = {};
        obj['email'] = this.f.email.value;
        obj['password'] = this.f.pass.value;
        console.log(obj);
        let response = this.apiService.userLogin(obj).subscribe(
             response  => {
               console.log(response);
               if(response.status == 1){
                 localStorage.setItem('login_status','success');
                 this.successFlag =true;
                 this.successMessage = response.data;
                 setTimeout(function() {
                    this.successFlag = false;
                    this.router.navigate(['/posts']).then(() => {
                       window.location.reload();
                     });
                  }.bind(this), 1000);
               }else{
                 this.otherError =true;
                 this.errorMessage = response.data;
                 setTimeout(function() {
                    this.otherError = false;
                  }.bind(this), 3000);
               }
             }
         )
    }


}
