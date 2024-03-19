import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore/firebase';
import { collection } from '@firebase/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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
    FormsModule
    // ,AngularFirestoreModule,
    // AngularFireModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  // firestore: Firestore = inject(Firestore);

  constructor(private firestore: Firestore){}
  
  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user', this.user);

    // const usersCollection = collection(this.firestore, 'users');
    // const userDetails = doc(usersCollection, 'users')
    // await updateDoc(userDetails, this.user.toJSON())
    //   .then((result: any) => {
    //     console.log('adding user finished',result);
        
    //   });
    
  }
}
