// Initialize Firebase
var config = {
    apiKey: "AIzaSyBr4Juy0FrfMCjGtiqcL0OI9x54AFHfXTc",
    authDomain: "train-scheduler-29dc1.firebaseapp.com",
    databaseURL: "https://train-scheduler-29dc1.firebaseio.com",
    projectId: "train-scheduler-29dc1",
    storageBucket: "",
    messagingSenderId: "847664452285"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var frequency = "";
var firstArrival = "";

// Click event for submitting form and capturing inputs
$("#submitButton").on("click", function () {
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstArrival = $("#firstArrivalInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    //Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstArrival: firstArrival,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

        // Handle the errors
    }, function (errObject) {
        if (errObject) {
            alert(errObject)
        }
    });
});

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    makeRowInTable(snapshot.val());
});

// Calculate train time data and append train data to rows in the train schedule table
function makeRowInTable(obj) {

    var firstArrivalConverted = moment(obj.firstArrival, "hh:mm").subtract(1, "years");
    console.log("First arrival time: " + firstArrivalConverted);
    
    var currentTime = moment().format("hh:mm");
    console.log("Current time: " + currentTime);

    var timeDifference = moment().diff(moment(firstArrivalConverted), "minutes");
    console.log("Difference in Time: " + timeDifference);
    
    var remainder = timeDifference % obj.frequency;
    
    var minutesAway = obj.frequency - remainder;
    console.log("The next train is " + minutesAway + " minutes away");
    
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Next arrival time: " + moment(nextTrain).format("hh:mm"));

    var tr = $("<tr>");

    var trainName = $("<td class='trainName'>");
    trainName.text(obj.name);

    var trainDestination = $("<td class='trainDestination'>");
    trainDestination.text(obj.destination);

    var trainFrequency = $("<td class='trainFrequency'>");
    trainFrequency.text(obj.frequency);

    var trainMinutesAway = $("<td class='trainMinutesAway'>");
    trainMinutesAway.text(minutesAway);

    var trainNextArrival = $("<td class='trainNextArrival'>");
    trainNextArrival.text(moment(nextTrain).format("hh:mm a"));

    tr.append(trainName);
    tr.append(trainDestination);
    tr.append(trainFrequency);
    tr.append(trainNextArrival);
    tr.append(trainMinutesAway);

    $("#scheduleTable").append(tr);
}