//1. Change the firebase credentials:
var  firebaseConfig = {
    apiKey: "AIzaSyDq2-jmL_BN204IIvVpebmFkLZfhC0kV6Q",
    authDomain: "chirpperrz.firebaseapp.com",
    databaseURL: "https://chirpperrz-default-rtdb.firebaseio.com",
    projectId: "chirpperrz",
    storageBucket: "chirpperrz.appspot.com",
    messagingSenderId: "159287707725",
    appId: "1:159287707725:web:b07d24061e2263a3faf404"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
   //2. Update both variables to set the room and user name
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  
   //3. Set the name of the user on the welcome section: 
  document.getElementById("user_name").innerHTML = "Welcome " + user_name;
  
  
   //4. Create addRoom function:
  //1.Get the room name
   function addRoom(){
    room_name = document.getElementById("room_name").value;
// saving the room on fire base
        firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
        });


          //change the window
        localStorage.setItem("room_name",room_name);
         window.location.replace("kwitter_page.html")



   }
  
  
   function getData() {  
    firebase.database().ref("/").on('value', function(snapshot) { 
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log("Room Name - " + Room_names);
   row = "<div class='room_name' id= " + Room_names + " onclick = 'redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
   document.getElementById("output").innerHTML += row;
 });
});

}
  
  getData();
  
  //6. Create the RoomName() function:
  function redirectToRoomName(Rooom_names){
    localStorage.setItem("room_name",Room_names);
    window.location = "kwitter_page.html";
  }
  
  //7. Set the logout function:
  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }
  