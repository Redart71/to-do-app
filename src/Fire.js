import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA0QbGb-CtmNebxpcmhYBTbEjchDK6vtgs",
    authDomain: "to-do-app-4d297.firebaseapp.com",
    projectId: "to-do-app-4d297",
    storageBucket: "to-do-app-4d297.appspot.com",
    messagingSenderId: "495815692821",
    appId: "1:495815692821:web:be8fe385f264ec1c45f41c",
};

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("lists");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        }, function(error) {
            callback(error);
        });
    }

    addList(list) {
        this.ref.add(list);
    }

    deleteList(list) {
        this.ref.doc(list.id).delete();
    }

    updateList(list) {
        this.ref.doc(list.id).update(list);
    }

    detach() {
        this.unsubscribe();
    }
}