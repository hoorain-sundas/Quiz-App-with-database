  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  import { getDatabase, ref,
     onChildAdded } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
    apiKey: "AIzaSyDifbmhZEwXTwbtcb-9hTGe7fKHaxo-bu0",
    authDomain: "quiz-app-with-database-1438a.firebaseapp.com",
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
 const database = getDatabase();
    
  var currentQuestionNo = document.getElementById("currentQuestionNo");
  var totalQuestionNo = document.getElementById("totalQuestionNo");
  var displayQuestion = document.getElementById("displayQuestion");
  var displayOption = document.getElementById("displayOption");
  var totalMarks = document.getElementById("totalMarks").innerHTML;
  var correctAnswer;
  var currentIndex = 0;
  var marks = 0;
  var dquestions;
  var arr = [];
  window.getData = function () {
    console.log("hey");
    document.getElementById("start").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
    const taskReference = ref(database, "quizinpdata/");
    onChildAdded(taskReference, function (data) {
        console.log(data.val());
        dquestions = data.val();
        arr.push(dquestions);
        console.log(arr);
        
        totalMarks = arr.length*3;
        console.log(arr.length,"here array length  ================");

        initRender();
    }); 
}

function initRender() {
   currentQuestionNo.innerHTML = currentIndex + 1;
   totalQuestionNo.innerHTML = arr.length;
  
   displayQuestion.innerHTML = arr[currentIndex].question;
   correctAnswer = arr[currentIndex].correctAns;
  //  console.log(arr[currentIndex].options.length);
   displayOption.innerHTML = "";
   for (var i=0; i<arr[currentIndex].options.length; i++){
    var selectedOption = arr[currentIndex].options[i];
   displayOption.innerHTML += `<div id="displayOption" class="row">
   <div class="col-md-6">
   <button class="btn btn-outline-warning rounded-pill m-2 p-2 w-100 fs-3 " onclick="checkAnswer('${selectedOption}','${dquestions.correctAns}')">${selectedOption}</button> 
   </div>
   </div>`
   }
   }
   

 window.checkAnswer = function (a,b){
    if (a == b){
        marks += 3; 
        console.log(marks);
        document.getElementById("btn").disabled = true;
    }  else {
        console.log(marks);
    }    
       nextQuestion();
 }
 console.log(marks) 


 var showResult =  document.getElementById("showResult");
//  var totalMarks = document.getElementById("totalMarks");
//  totalMarks = arr.length*3;
 var result;


 window.nextQuestion = function (){
    
    if (currentIndex + 1 == arr.length){
        var percentage = eval((marks*100)/totalMarks);
         console.log(percentage)
        if (percentage >= 50) {
            result = "Pass";
        } else {
            result = "Fail";
        }
        document.getElementById("showResult").style.display = "block";
        // document.getElementById("main-div").style.display = "none";
        document.getElementById("mainScreen").style.display = "none";
     showResult.innerHTML = `<p><b><center> Quiz Result </center></b></p>
     <p><b>Total Marks: <span id="totalMarks">${totalMarks}</b></span></p>
     <p><b>Obtained Marks: <span id="marks">${marks}</b></span></p>
     <p><b>Percentage: <span id="percentage">${percentage}%</b></span></p>
//      <p><b>Result: <span id="result">${result}</b></span></p>
//      `
    } else {
        currentIndex++;
        initRender();
    } 
}

 window.prevQuestion = function (){
  if (currentIndex != 0){
  
      currentIndex--;
      initRender();
  }
}
window.logout = function(){
  signOut(auth)
   .then(function() {
        // Sign-out successful.
       console.log("Sign-out successful");
       window.location.replace('login.html');
    }).catch(function(err) {
      // An error happened.
      console.log(err);
    });
}


function checkAuthentication() { 
  onAuthStateChanged(auth, function (user) {
   if (user) {
     // User is signed in, see docs for a list of available properties
     // https://firebase.google.com/docs/reference/js/firebase.User
     const uid = user.uid;
     console.log(uid)

     // ...
   } else {
     // User is signed out
     // ...
     window.location.href = "login.html";
   }
 });
 }
 checkAuthentication();

