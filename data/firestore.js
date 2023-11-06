// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs, doc, updateDoc, setDoc, Timestamp, getDoc, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//모든 할일 가져오기 
export async function fetchTodos() {

    const querySnapshot = await getDocs(collection(db, "centum-todos"));  //DB 이름

    if (querySnapshot.empty) {
        return [];
    }

    const fetchedTodos = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate(),
        }
        //.toLocaleTimeString('ko')
        fetchedTodos.push(aTodo);
    });
    return fetchedTodos;
}


//할일 추가
export async function addTodos({ title }) {


    // Add a new document with a generated id
    const newTodoRef = doc(collection(db, "centum-todos"));

    const createdAtTimestamp = Timestamp.fromDate(new Date());

    const newTodoData = {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp,
    }
    // later...
    await setDoc(newTodoRef, newTodoData);
    return newTodoData;
}


//단일 할일 조회
export async function fetchATodo(id) {

    if (id === null) {
        return null;
    }


    const todoDocRef = doc(db, "centum-todos", id);

    const todoDocSnap = await getDoc(todoDocRef);

    if (todoDocSnap.exists()) {
        console.log("Document data:", todoDocSnap.data());
        // 값이 있으면 todo json 전송

        const aTodo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            is_done: todoDocSnap.data()["is_done"],
            created_at: todoDocSnap.data()["created_at"].toDate(),
        }
        return aTodo;

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }

}


//단일 할일 삭제
export async function deleteATodo(id) {

    const checkDeleteATodo = await fetchATodo(id);

    if (checkDeleteATodo === null) {
        return null;
    }

    await deleteDoc(doc(db, "centum-todos", id));

    return checkDeleteATodo;

}

//단일 할일 수정
export async function editATodo(id, { title, is_done }) {

    const checkEditATodo = await fetchATodo(id);

    if (checkEditATodo === null) {
        return null;
    }

    const todoRef = doc(db, "centum-todos", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoRef, {
        title: title,
        is_done: is_done,
    });

    return { id: id, title: title, is_done: is_done };


}



module.exports = { fetchTodos, addTodos, fetchATodo, deleteATodo, editATodo }








