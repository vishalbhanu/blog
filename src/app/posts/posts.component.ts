import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title :any = 'Posts';
  otherError : boolean;
  errorMessage : string;
  successFlag : boolean;
  successMessage : string;
  tagDAta : string;
  login_status : any;

  constructor(public apiService:ApiserviceService,public router:Router) { }

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

 getPosts(){
   let obj={};
   let response = this.apiService.getPost(obj).subscribe(
        response  => {
          console.log(response);
          if(response.status == 1){
            this.successFlag =true;
            this.successMessage = response.data;
            this.tagDAta = response.data;
            console.log(this.successMessage);
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

 changeTag(data){
   console.log(data);
   let obj={};
   obj['tag'] = data;
   let response = this.apiService.getPostByTag(obj).subscribe(
        response  => {
          console.log(response);
          if(response.status == 1){
            this.successFlag =true;
            this.successMessage = response.data;
            console.log(this.successMessage);
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
