$('document').ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAkgMzOVcd4QlcgoaJvpavwmSC-LwxQWGQ",
        authDomain: "train-scheduler-6d567.firebaseapp.com",
        databaseURL: "https://train-scheduler-6d567.firebaseio.com",
        projectId: "train-scheduler-6d567",
        storageBucket: "train-scheduler-6d567.appspot.com",
        messagingSenderId: "266015698544"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // 2. Button for adding Train
    $("#submitTrain").on("click", function(event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#trainName-input").val().trim();
        var tDestination = $("#destination-input").val().trim();
        var tFTT = $("#ftt-input").val().trim();
        var tFrequency = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: tDestination,
            firstTime: tFTT,
            frequency: tFrequency,
        };

        // Uploads Trains data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.role);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        // Alert
        alert("Train Succesfully Added!");

        // Clears all of the text-boxes
        $("#trainName-input").val("");
        $("#destination-input").val("");
        $("#ftt-input").val("");
        $("#frequency-input").val("");

    });

  
  // 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFTT = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(tDestination);
    console.log(tFTT);
    console.log(frequency);
  
    // Prettify the Train Frequency
    var trainFrequency =  moment.unix(tFTT).format('hh:mm A');
    console.log(trainFrequency);




       // Current Time Right Now
       var currentTime = moment();
       console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm A'));

       // Minutes Away
       // Difference between the times or Minutes Away
       var diffTime = moment().diff(moment.unix(tFTT), 'minutes');
       console.log('DIFFERENCE IN TIME: ' + diffTime);

       // Time apart (remainder)
       var tRemainder = diffTime % frequency;
       //console.log('tRemainder is ' + tRemainder);

       // Minutes Until Next Train
       var nextTrain = frequency - tRemainder;
       //console.log('MINUTES TILL TRAIN: ' + nextTrain);

       // Next Train
       var nextArrival = moment().add(nextTrain, "minutes").format("hh:mm A");
       //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

  

  
  
    // Add each train's data into the table
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" +
    frequency +  "</td><td>" + nextArrival + "</td><td>" + diffTime + "</td></tr>");
  });
});