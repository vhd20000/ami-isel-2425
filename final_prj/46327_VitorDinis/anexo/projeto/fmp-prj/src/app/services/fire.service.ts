import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { MealPlan } from '../models/meal-plan';
import { Recepy } from '../models/recepy';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ExceptionCode } from '@capacitor/core';

/**
 * Firestore Documents
 */
const MEAL_PLAN_DOC = 'meal-plan';
const RECEPY_BOOK_DOC = 'recepy-book';
const PLAN_DOC_FIELD = 'plan';

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

    const data = docSnap.data()[PLAN_DOC_FIELD];
    const mealPlan = new MealPlan(data);

    return mealPlan;
  }

  async updateUserMealPlan(newMealPlan: MealPlan) {
    try {
      const uid: string = this.afAuth.currentUser?.uid ?? "";
      const docRef = doc(this.firestore, MEAL_PLAN_DOC, uid);
      
      const data: any = { plan: newMealPlan.plan };
      await setDoc(docRef, data);
  
      return true;
    }
    catch (e) {
      console.error("Error updating user plan: ", e);
      return false;
    }
  }

  async getUserRecepyBook() {
    const uid: string = this.afAuth.currentUser?.uid ?? "";
    const docRef = doc(this.firestore, RECEPY_BOOK_DOC, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    const data = docSnap.data();

    // Extract recepies from retrieved data
    let recepies: Recepy[] = [];
    Object.keys(data).forEach(key => {
      let obj = {id: key, ...data[key]} as Recepy;
      recepies.push(obj);
    });
    
    recepies.sort((a: Recepy, b: Recepy) => a.name.localeCompare(b.name));

    return recepies;
  }

  async createRecepy(recepy: Recepy) {
    try {
      const uid: string = this.afAuth.currentUser?.uid ?? "";
      if (uid === '') throw new Error("No user");

      const docRef = doc(this.firestore, RECEPY_BOOK_DOC, uid);
      const docSnap = await getDoc(docRef);

      // Prepare data to be registered
      const recepyId = this.util.generateUniqueId();
      let data: any = {};
      data[recepyId] = {...recepy};

      if (docSnap.exists()) {
        await setDoc(docRef, data, { merge: true });
      }
      else {
        await setDoc(docRef, data);
      }
      return true;
    }
    catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  }

  async deleteRecepyById(recepyId: string) {
    try {
      const uid: string = this.afAuth.currentUser?.uid ?? "";
      if (uid === '') throw new Error("No user");

      const docRef = doc(this.firestore, RECEPY_BOOK_DOC, uid);

      // Prepare data to delete entry/field
      let data: any = {};
      data[recepyId] = deleteField();
      
      await updateDoc(docRef, data);
      return true; 
    }
    catch (e) {
      console.error("Error deleting document: ", e);
      return false;
    }
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
