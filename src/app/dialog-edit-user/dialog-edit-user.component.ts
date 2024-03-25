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
import { provideNativeDateAdapter } from '@angular/material/core';
import { doc, updateDoc } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

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
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user! :User;
  loading = false;
  birthDate!: Date;
  userID!:string;

  constructor(private firestore: Firestore){
    console.log('Load available data:', this.user);
  }

  async saveEditUser(){
    this.loading = true;
    await updateDoc(this.getUserRef() , this.user.toJSON()) // aktuellesire die info. das objeckt welches überschrieben wird muss ein JSON sein, ansonste wirds nicht gelesen
    .then(() => {
      this.loading = false;
    })
  }


  getUserRef(){
    let x = doc(this.firestore, 'user', this.userID);
    console.log('--------------', x);
    return x;
    
 }  
}
