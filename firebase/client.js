import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHwY_jVpht8Std2tkjHhC8PV9_ImXgtHU",
  authDomain: "devter-4a91c.firebaseapp.com",
  databaseURL: "https://devter-4a91c.firebaseio.com",
  projectId: "devter-4a91c",
  storageBucket: "devter-4a91c.appspot.com",
  messagingSenderId: "860368912483",
  appId: "1:860368912483:web:fbe735b8db1e2e6ac53856",
  measurementId: "G-0BNHNL5MWN",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); //aqui inicializamos el servicio de la base de datos de firebase

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

//Añadimos a la coleccion devits, los siguientes datos
export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;
        // console.log(createdAt);

        const date = new Date(createdAt.seconds * 1000);
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date
        );

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        };
      });
    });
};
