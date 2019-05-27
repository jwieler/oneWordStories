// Initialize Firebase
if (!firebase.apps.length) {
    var firebaseConfig = {
        apiKey: "AIzaSyCi2-UgM6uP4dJiWB347eJAFzhMpo6OprE",
        authDomain: "one-word-stories.firebaseapp.com",
        databaseURL: "https://one-word-stories.firebaseio.com",
        projectId: "one-word-stories",
        storageBucket: "one-word-stories.appspot.com",
        messagingSenderId: "128365997191",
        appId: "1:128365997191:web:84409b5ff4260fec"
    };

    firebase.initializeApp(firebaseConfig);
}

var firestore = firebase.firestore();
const collectionRef = firestore.collection("stories");

var query = collectionRef.orderBy("lastUpdatedAt", "desc");

query.get().then(stories => {
    stories.forEach(story => {
        console.log(story.data());
    });
});