import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { MealPlan } from '../models/meal-plan';
import { Recepy } from '../models/recepy';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

/**
 * Firestore Documents
 */
const MEAL_PLAN_DOC = 'meal-plan';
const RECEPY_BOOK_DOC = 'recepy-book';
const PLAN_DOC = 'plan';
const RECEPIES_DOC = 'recepies';

/**
 * Firebase Storage References
 */
const IMAGES_REF = 'images';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private afAuth: Auth,
    private util: UtilityService
  ) { }

  /**
   * FIRESTORE METHODS
  */
  async getUserMealPlan() {
    const uid: string = this.afAuth.currentUser?.uid ?? "";
    const docRef = doc(this.firestore, MEAL_PLAN_DOC, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data()[PLAN_DOC];
    const mealPlan = new MealPlan(data);

    return mealPlan;
  }

  async getUserRecepyBook() {
    const uid: string = this.afAuth.currentUser?.uid ?? "";
    const docRef = doc(this.firestore, RECEPY_BOOK_DOC, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const recepies = docSnap.data()[RECEPIES_DOC] as Recepy[];
    return recepies;
  }

  /**
   * FIREBASE STORAGE METHODS
   */
  uploadImage(blob: Blob) {
    const imageUid = this.util.generateUniqueId();
    const imagesRef = ref(this.storage, `${IMAGES_REF}/${imageUid}`);
    return uploadBytes(imagesRef, blob).then(res => imageUid);
  }

  getImageURL(imageUid: string) {
    const imagePath = `${IMAGES_REF}/${imageUid}`;
    const imagesRef = ref(this.storage, imagePath);
    return getDownloadURL(imagesRef);
  }

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

  /**
   * OUTROS
   */

  getTasks () {
    const currentUser = this.afAuth.currentUser;
    const usersDocRef = doc(this.firestore, 'people', currentUser?.uid ?? "");
    return collectionData(collection(usersDocRef, 'tasks'), {idField: "$key"}) as Observable<Task[]>;
  }

  async createTask(t: Task) {
    try {
      const currentUser = this.afAuth.currentUser;
      const usersDocRef = doc(this.firestore, 'people', currentUser?.uid ?? "");
      const newTaskDocRef = await addDoc(collection(usersDocRef, "tasks"), t);
      console.log("Document written with ID: ", newTaskDocRef.id);
    } 
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async updateTask(TaskID: any, t: Task) {
    try {
      const currentUser = this.afAuth.currentUser;
      const usersDocRef = doc(this.firestore, 'people', currentUser?.uid ?? "");
      let taskDocRef = doc(usersDocRef, 'tasks', TaskID);
      await updateDoc(taskDocRef, {...t});
      console.log("Updated document with ID: ", TaskID);
    }
    catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async deleteTask(TaskID: any) {
    try {
      const currentUser = this.afAuth.currentUser;
      const usersDocRef = doc(this.firestore, 'people', currentUser?.uid ?? "");
      const taskDocRef = doc(usersDocRef, 'tasks', TaskID);
      await deleteDoc(taskDocRef);
      console.log(`Document ${TaskID} successfully deleted !`);
    }
    catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
}
