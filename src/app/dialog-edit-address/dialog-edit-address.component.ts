import { Component } from '@angular/core';
import { User } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogClose, 
    MatDialogActions,
    MatButtonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;
  user!: User;
  userID!:string;
  
  constructor(private firestore: Firestore){}

  async saveUserAdress(){
    if (this.user && this.userID) {
        this.loading = true;
      await updateDoc(this.getUserRef(), this.user.toJSON()) // aktuellesire die info. das objeckt welches überschrieben wird muss ein JSON sein, ansonste wirds nicht gelesen
      .then(() => {
        this.loading = false;
      })
    }
    // this.loading = true;
    // await updateDoc(this.getUserRef(), this.user.toJSON()) // aktuellesire die info. das objeckt welches überschrieben wird muss ein JSON sein, ansonste wirds nicht gelesen
    // .then(() => {
    //   this.loading = false;
    // })
  }


  getUserRef(){
    return doc(this.firestore, 'user', this.userID);
 }
}
