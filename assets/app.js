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
        var frequency = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: tDestination,
            firstTime: tFTT,
            rate: frequency,
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
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Add each train's data into the table
    $("#trainTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
  });
});