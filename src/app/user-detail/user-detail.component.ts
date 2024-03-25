import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { collection, doc, getDoc } from '@firebase/firestore';
import { User } from '../models/user.class';
import {MatMenuModule} from '@angular/material/menu';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: any = '';
  user: User = new User ();

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {

    this.route.paramMap.subscribe((params) => { // aboniere die route
      this.userId = params.get('id'); // lese die id aus, wie bei den Ruten vergeben wurde (:id). lese die mit get() aus und speicher die global
      console.log('get id:', this.userId); 
      this.getUser();
    });
  }


  getUser() {
    if (this.userId) {
      onSnapshot(this.getUserRef(), (userId) => { //greife auf die collection zu durch hilfsVariable
        console.log(userId.data()); // mit .data() alle subInfos
        this.user = new User(userId.data()); // deklariere den als ein neues object und vergib dem werde inform eine json mit .data()
        console.log('get current user', this.user);
        
      });
    } else {
      console.error('Firestore or userId is undefined.');
    }
  }


  getUserRef(){
     return doc(this.firestore, 'user', this.userId);
  }
  
  
  edetUser(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.userID = this.userId;  // übergebe die id in eine andere component
    dialog.componentInstance.user = new User(this.user.toJSON());  //gehe auf die instanz einer variable drauf ein - 
    // erstellte eine Kopie von dem Object -> new User(this.user.toJSON()); = neues Objekt(vorhandene Daten.umwandlung zum Json())
  }


  edetMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.userID = this.userId;  // übergebe die id in eine andere component
    dialog.componentInstance.user = new User(this.user.toJSON()); //gehe auf die instanz einer variable drauf ein- 
    // erstellte eine Kopie von dem Object -> new User(this.user.toJSON()); = neues Objekt(vorhandene Daten.umwandlung zum Json())
  }
}
