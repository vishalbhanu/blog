import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './../apiservice.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createdelete',
  templateUrl: './createdelete.component.html',
  styleUrls: ['./createdelete.component.css']
})
export class CreatedeleteComponent implements OnInit {
  CreatePostForm : FormGroup;
  title :any = 'Create Update Post';
  otherError : boolean;
  errorMessage : string;
  successFlag : boolean;
  successMessage : string;
  successMessageData : string;
  tagDAta : string;
  login_status : any;


  constructor(private fb: FormBuilder,public apiService:ApiserviceService,public router:Router) {
    this.validateCreatePostForm();
  }

  validateCreatePostForm() {
   this.CreatePostForm = this.fb.group({
      title: ['', Validators.required ],
      subtitle: ['', Validators.required ],
      tagsData: ['', Validators.required ],
      content: ['', Validators.required ]
   });
 }

  ngOnInit(): void {
    if(localStorage.getItem('login_status') !== null){
      this.login_status = localStorage.getItem('login_status');
        if(this.login_status !== "success"){
          this.router.navigate(['/login']);
        }
    }else{
      this.router.navigate(['/login']);
    }

    this.getPosts();
  }

  get f() { return this.CreatePostForm.controls; }

  onSubmit() {
        // stop here if form is invalid
        if (this.CreatePostForm.invalid) {
            return;
        }

        let obj = {};
        obj['title'] = this.f.title.value;
        obj['sub_title'] = this.f.subtitle.value;
        obj['tags'] = this.f.tagsData.value;
        obj['content'] = this.f.content.value;
        console.log(obj);
        let response = this.apiService.createPost(obj).subscribe(
             response  => {
               console.log(response);
               if(response.status == 1){
                 this.successFlag =true;
                 this.successMessage = response.data;
                 this.getPosts();
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

  getPosts(){
    let obj={};
    let response = this.apiService.getPost(obj).subscribe(
         response  => {
           console.log(response);
           if(response.status == 1){
             this.successFlag =true;
             this.successMessageData = response.data;
             this.tagDAta = response.data;
             console.log(this.successMessageData);
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

  editData(data){
    let obj={};
    obj['id'] = data;
    console.log(data);
    let response = this.apiService.updatePost(obj).subscribe(
         response  => {
           console.log(response);
           if(response.status == 1){
             this.successFlag =true;
             this.successMessageData = response.data;
             this.tagDAta = response.data;
             console.log(this.successMessageData);
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
