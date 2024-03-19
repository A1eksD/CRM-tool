import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-7023b","appId":"1:895097933730:web:30b4a0db004f05f5e72cfb","storageBucket":"simple-crm-7023b.appspot.com","apiKey":"AIzaSyBMuPgK1VgG_LSC_ydVuspiPB9g8Y49e-0","authDomain":"simple-crm-7023b.firebaseapp.com","messagingSenderId":"895097933730"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-7023b","appId":"1:895097933730:web:30b4a0db004f05f5e72cfb","storageBucket":"simple-crm-7023b.appspot.com","apiKey":"AIzaSyBMuPgK1VgG_LSC_ydVuspiPB9g8Y49e-0","authDomain":"simple-crm-7023b.firebaseapp.com","messagingSenderId":"895097933730"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-7023b","appId":"1:895097933730:web:30b4a0db004f05f5e72cfb","storageBucket":"simple-crm-7023b.appspot.com","apiKey":"AIzaSyBMuPgK1VgG_LSC_ydVuspiPB9g8Y49e-0","authDomain":"simple-crm-7023b.firebaseapp.com","messagingSenderId":"895097933730"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
