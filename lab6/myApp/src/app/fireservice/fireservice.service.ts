import { Injectable } from '@angular/core';
import { Task } from "../task/task"
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(
    private firestore: Firestore,
    private afAuth: Auth
  ) { }

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
