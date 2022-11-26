 // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
   import { getDatabase,
  ref, set, push } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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

  var question = document.getElementById("quest");
  var option = document.getElementById("opt");
  var correctAns = document.getElementById("corAns");
  var dQuestion = document.getElementById("dQuestion");
  var optionsParent = document.getElementById("optionsParent");   
  var dcorrectAns = document.getElementById("dcorrectAns");
  var optionArr = [];
    var arr = [];
    var obj;
    var x = 0;
    var y = 0;
    window.quizData = function (e){
       
         obj = {
            question: question.value,
            options: [optionArr[0], optionArr[1], optionArr[2], optionArr[3]],
            correctAns: correctAns.value,
        }
        // obj.options.push(optionArr);
        console.log(obj.options);
        // dQuestion.innerHTML = `<p id="dQuestion">${question.value}</p>`;
    
        // dcorrectAns.innerHTML = `<p id="dcorrectAns">${correctAns.value}</p>`;
    
        console.log(obj);

        const keyRef = ref(database, "quizinpdata/");
        obj.id = push(keyRef).key;
        console.log(obj.id)
        const taskReference = ref(database, `quizinpdata/${obj.id}`);
        set(taskReference, obj);
        arr.push(obj);
        console.log(arr);
        // dQuestion.innerHTML = `<p id="dQuestion">${arr[x].question}</p>`;
        // dcorrectAns.innerHTML = `<p id="dcorrectAns">${arr[x].correct}</p>`;
        option.value = "";
        question.value = "";
        correctAns.value = "";
        renderQuestion();
      }

      function renderQuestion(){
          dQuestion.innerHTML = `<p id="dQuestion">${obj.question}</p>`;
          
        dcorrectAns.innerHTML = `<p id="dcorrectAns">${obj.correctAns}</p>`;
      }
    
        window.renderOption = function () {    
            
            optionsParent.innerHTML += `<li>${option.value}</li>`;
                optionArr[x] = option.value;
                if(x < 4) {
                    x++;
                } else {
                    x = 0;
                }
                
            console.log(optionArr);
             option.value = "";
        }

        window.nextQestion = function(){
        optionsParent.innerHTML = "";
        dQuestion.innerHTML = "";
        dcorrectAns.innerHTML = "";
        x = 0;

       }

       window.goToQuiz = function () {
        window.location.replace('index.html');
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

//  window.quizData = function (e) {
//     e.preventDefault();
//     var questions = 
//         {
//         question: question.value,
//         options: [
//             option1 = option1.value, 
//             option2 = option2.value, 
//             option3 = option3.value, 
//             option4 = option4.value,
//         ],
//         correctAns: correctAns.value,
//     };


// arr.push(questions);
// console.log(arr);
//  const keyRef = ref(database, "quizinpdata/");
//  questions.id = push(keyRef).key;
//  console.log(questions.id)

//  const taskReference = ref(database, `quizinpdata/${questions.id}`);
//  set(taskReference, questions);
//  console.log(questions);
//     //  console.log(options)
//     dquestion.innerHTML = `<p id="dquestion" >${obj.question}</p>`;
//     // options.push()
//     // console.log(obj.options.length)
//     for(var i=0; i<=questions.options.length - 1; i++) { 
//     doption.innerHTML += `<li class="listyle">${questions.options[i]}</li> <br>`;
//     }
//     dcorrectAns.innerHTML = `<p id="dcorrectAns" >${questions.correctAns}</p>`;
//     console.log(questions);
//     // questions.push(obj)
   
//     quest.value = "" ;
//     opt1.value = "" ;
//     opt2.value = "" ;
//     opt3.value = "" ;
//     opt4.value = "" ;
//     corAns.value = "" ;
   
// }

