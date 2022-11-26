  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import { getAuth, 
    signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDifbmhZEwXTwbtcb-9hTGe7fKHaxo-bu0",
    authDomain: "quiz-app-with-database-1438a.firebaseapp.com",
    databaseURL: "https://quiz-app-with-database-1438a-default-rtdb.firebaseio.com",
    projectId: "quiz-app-with-database-1438a",
    storageBucket: "quiz-app-with-database-1438a.appspot.com",
    messagingSenderId: "1010731497929",
    appId: "1:1010731497929:web:9d13f1c39326499bf31018",
    measurementId: "G-FXPPP9VGX9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var model;

  window.login = function (e) {
  e.preventDefault();
  model = {
    email: email.value,
    password: password.value,
  };

  var adminEmail = "admin@gmail.com"

  signInWithEmailAndPassword(auth, model.email, model.password)
  .then(function(success) {
    console.log(success.user.email,"here");
    if(success.user.email == adminEmail){
        console.log("admin user");
        window.location.replace('admin.html');
    }else{
        console.log("else user");
      console.log(success.user.uid);
       window.location.replace('index.html');
    }
  })
  .catch(function(err) {
    console.log(err)
  });

    console.log(model);

}
window.createAccount = function () {
    window.location.replace('signup.html');
}
