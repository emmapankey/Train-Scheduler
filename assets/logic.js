// $(document).ready(function () {

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

// var firstArrivalConverted = moment(firstArrival, "hh:mm").subtract(1, "years");
// console.log(firstArrivalConverted);

// var currentTime = moment();
// console.log("Current Time: " + moment(currentTime).format("hh:mm"));

// var timeDifference = moment().diff(moment(firstArrivalConverted), "minutes");
// console.log("Difference in Time: " + timeDifference);

// var remainder = timeDifference % frequency;
// console.log(remainder);

// var minutesAway = frequency - remainder;
// console.log("Minutes away: " + minutesAway);

// var nextTrain = moment().add(minutesAway, "minutes");
// console.log("Next arrival: " + moment(nextTrain).format("hh:mm"));

$("#submitButton").on("click", function () {
    name = $("#trainNameInput").val();
    destination = $("#destinationInput").val();
    firstArrival = $("#firstArrivalInput").val();
    frequency = $("#frequencyInput").val();

    // console.log(name);
    // console.log(destination);
    // console.log(firstArrival);
    // console.log(frequency);

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
    }); // end push
}); // end click

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    makeRowInTable(snapshot.val());
});

function makeRowInTable(obj){

    var firstArrivalConverted = moment(firstArrival, "hh:mm").subtract(1, "years");
    console.log(firstArrivalConverted);
    
    var currentTime = moment().format("hh:mm");
    console.log("Current time: " + currentTime);
    
    var timeDifference = moment().diff(moment(firstArrivalConverted), "minutes");
    console.log("Difference in Time: " + timeDifference);
    
    var remainder = timeDifference % frequency;
    console.log(remainder);
    
    var minutesAway = frequency - remainder;
    console.log("Minutes away: " + minutesAway);
    
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Next arrival: " + moment(nextTrain).format("hh:mm"));

    var tr = $("<tr>");

    var trainName = $("<td class='trainName'>");
    trainName.text(obj.name);

    var trainDestination = $("<td class='trainDestination'>");
    trainDestination.text(obj.destination);

    var trainFrequency = $("<td class='trainFrequency'>");
    trainFrequency.text(obj.frequency);

    var trainMinutesAway = $("<td class='trainMinutesAway'>");
    trainMinutesAway.text(obj.minutesAway);

    var trainNextArrival = $("<td class='trainNextArrival'>");
    trainNextArrival.text(obj.nextTrain);

    tr.append(trainName);
    tr.append(trainDestination);
    tr.append(trainFrequency);
    tr.append(trainNextArrival);
    tr.append(trainMinutesAway);

    $("#scheduleTable").append(tr);
}
