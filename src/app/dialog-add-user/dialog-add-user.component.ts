import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, doc, setDoc, updateDoc} from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogModule, 
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;


  constructor(private firestore: Firestore){}
  
  async saveUser(){
    this.user.birthDate = this.birthDate.getTime(); 
    this.loading = true;

    await addDoc(this.getUsersRef(), this.user.toJSON()).catch( // addDoc((firesore, id unter ders abgespeichert wird)), objekt als json). - ins backend pushen
      (err) => { console.error(err)} // wenn fehler
    )
    // .then(
    //   (docRef) => {console.log('anlegen erfolgreich unter der id', docRef?.id)}); // wenn push erfolgreeich ist, dann zeige jeweilige id an
    this.loading = false;
  }

  getUsersRef(){
    return collection(this.firestore, 'user'); // 'users' = Referenz/id
  }
}
