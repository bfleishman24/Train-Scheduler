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
    var trainFrequency = moment(frequency).format(m);;
    console.log(trainFrequency);
  
    // Calculate the next train arrival time from now
    // To calculate the train arrival time worked
    var nextArrival = moment(frequency).toNow();
    console.log(nextArrival);
  
    // Calculate the next arrival from the current time
    var minsAway = moment(nextArrival).toNow();
    console.log(minsAway);
  
    // Add each train's data into the table
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" +
    frequency +  "</td><td>" + nextArrival + "</td><td>" + minsAway + "</tdg</tr>");
  });
});