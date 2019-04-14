import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isLoggedIn: boolean = false
  user: any

  constructor(public navCtrl: NavController, private fb: Facebook) {

  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        console.log(res)
        if(res.status === "connected") {
          this.getUserDetails(res.authResponse.userID)
        } else {
          
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetails(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
      .then(res => {
        this.isLoggedIn = true
        this.user = res
        console.log(this.user)
      })
      .catch(e => {
        console.log(e);
      });
  }

}
