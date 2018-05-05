import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
    public options = {
      position: ["bottom", "right"],
      timeOut: 25000,
      lastOnBottom: false,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose:false,
      clickIconToClose:true,    
      maxLength: 10
      
  }

 created(event){
   console.log("created");
 }
 
 destroyed(event){
  console.log("destroyed");
 }

}
