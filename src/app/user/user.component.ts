import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  doc,
  docData,
  onSnapshot,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = new User();
  allUsers: any[] = [];
  testdata: any[] = [];
  unsubUsers;
  

  constructor(public dialog: MatDialog, private firestore: Firestore) {

    this.unsubUsers = this.subUsersList();

  }


  subUsersList(){
    onSnapshot(this.getUsersInfo(), (list) => {//lade die datein ausm backend
      this.allUsers = []; //leere das array
      list.forEach((element) => { //lese jedes elemant ausm backend aus
        const userData = element.data(); // daten des elements erhalten
        const userWithId = { id: element.id, ...userData }; // Ein objekt mit ID-iigenschaft erstellen
        this.allUsers.push(userWithId); // Das Objekt zur allUsers-Liste hinzufügen
      });
    });
  }


  getUsersInfo() {
    return collection(this.firestore, 'user'); // 'users' = Referenz/id
  }

  
  openDialog() {
    this.dialog.open(DialogAddUserComponent, {});
  }

}
