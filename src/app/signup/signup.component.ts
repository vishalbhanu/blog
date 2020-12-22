import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ApiserviceService } from './../apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  title :any = 'SignUp';
  otherError : boolean;
  errorMessage : string;
  successFlag : boolean;
  successMessage : string;
  constructor(private fb: FormBuilder,public apiService:ApiserviceService,public router:Router) {
    this.validateSignUpForm();
  }

  validateSignUpForm() {
   this.signupForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      pass: ['', Validators.required ]
   });
 }


  ngOnInit(): void {
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        let obj = {};
        obj['name'] = this.f.name.value;
        obj['email'] = this.f.email.value;
        obj['password'] = this.f.pass.value;
        console.log(obj);
        let response = this.apiService.userSignup(obj).subscribe(
             response  => {
               console.log(response);
               if(response.status == 1){
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
