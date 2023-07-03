//1. Add firebase credentials:
var firebaseConfig = {
    apiKey: "AIzaSyDq2-jmL_BN204IIvVpebmFkLZfhC0kV6Q",
    authDomain: "chirpperrz.firebaseapp.com",
    databaseURL: "https://chirpperrz-default-rtdb.firebaseio.com",
    projectId: "chirpperrz",
    storageBucket: "chirpperrz.appspot.com",
    messagingSenderId: "159287707725",
    appId: "1:159287707725:web:b07d24061e2263a3faf404"
  };

   firebase.initializeApp(firebaseConfig);

//2. Store user_name and room_name on localStorage:
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


//3. Declare the send function:
     function send() {

      //4. Add the message the user sets on the input box for the msg variable:
      msg =   document.getElementById("msg").value;

      firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
      });
  
      //5. Update the text input so it can be empty again:  
      msg = document.getElementById("msg").value = "";
  }


  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { 
        childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

                row = name_with_tag + message_with_tag +like_button + span_with_tag;       
                document.getElementById("output").innerHTML += row;
                //End code
            } 
        });  
    }); 
}

getData();

function updateLike(message_id){
button_id = message_id;
likes = document.getElementById(button_id).value;

//6. Update the number of likes, increase the number by 1:
 updated_likes = Number(likes)+1;

console.log(updated_likes);
firebase.database().ref(room_name).child(message_id).update({
   like : updated_likes  
});

}
//7. Set the function logout:

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

