import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule, 
    MatTooltipModule, 
    MatDialogModule, 
    MatCardModule,
    CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user = new User();
  allUsers: User[] = [];
  testdata : any [] = [];


  constructor(public dialog: MatDialog, private firestore:Firestore) {

    onSnapshot(this.getUsersInfo(), (list) => {
      this.allUsers = [];
      list.forEach( element => {
        console.log(element.data() as User);
        console.log(element.id);
        // this.testdata.push(element.id);
        // this.testdata.push(element.data() as User);
        // console.log('------',element.data().id);
        // let test = this.allUsers.element.data() as User;
        // if (this.allUsers.element.id === -1) {
        // if (test.id.seconds === -1) {
          this.allUsers.push(element.data() as User);
        // }
      });
    });
    //--------------------------------------------------------
    // this.test();
    // onSnapshot(this.getUsersInfo(), (list) => {
    //   list.forEach((element) => {
    //     const existingUser = this.allUsers.find(user => (user as User).id ===onSnapshot(this.getUsersInfo(), (list) => {
    // });
    //     if (!existingUser) {
    //       this.allUsers.push(element.data() as User);
    //     }
    //   });
    // });
    // console.log( this.testdata);
    //------------------------------------------------------------
    // onSnapshot(this.getUsersInfo(), (list) => {
    //   list.forEach( element => {
    //     console.log(element.data() as User);
    //     console.log(element.id);
    //     // this.testdata.push(element.id);
    //     // this.testdata.push(element.data() as User);
    //     // console.log('------',element.data().id);
    //     let test = element.data() as User;
    //     if (element.id.seconds === -1) {
    //       this.allUsers.push(element.data() as User);
    //     }
    //   });
    // });
  }

  // test(){
  //   this.allUsers.forEach(test => {
  //     if (test.id === -1) {
  //       this.testdata.push(test);
  //     }
  //   });
  // }

  getUsersInfo(){
    return collection(this.firestore, 'userID'); // 'users' = Referenz/id
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent, {

    });
  }
}
