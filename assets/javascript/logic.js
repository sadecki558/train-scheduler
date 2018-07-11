var config = {
    apiKey: "AIzaSyBeLRHwtJgOTkYzB08bVwZPApVPTCPYWtU",
    authDomain: "uoftcodingbootcamp1.firebaseapp.com",
    databaseURL: "https://uoftcodingbootcamp1.firebaseio.com",
    projectId: "uoftcodingbootcamp1",
    storageBucket: "uoftcodingbootcamp1.appspot.com",
    messagingSenderId: "715221892478"
};

firebase.initializeApp(config);

var dataRef = firebase.database();
var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var timeDiff = "";
var remainder = "";
var minTilTrain = "";
var nextTrain = "";
var nextTrainConv = "";

$("#submit").on("click", function(event) {
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrainConv = moment(firstTrain, "HH:mm").subtract(1, "years");
    timeDiff = moment().diff(moment(firstTrainConv), "minutes");
    remainder = timeDiff % frequency;
    minTilTrain = frequency - remainder;
    nextTrain = moment().add(minTilTrain, "minutes");
    nextTrainConv = moment(nextTrain).format("HH:mm");

    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrainConv: nextTrainConv, 
        minTilTrain: minTilTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
    return false;
});
//Log all items coming out of the snapshot
dataRef.ref().on("child_added", function(snapshot) {
    //List items in the table
    $("#trainData").append("<tr><td id='name-display'> " + snapshot.val().name +
        " </td><td id='destination-display'> " + snapshot.val().destination +
        " </td><td id='frequency-display'> " + snapshot.val().frequency +
        "</td><td>" + snapshot.val().nextTrainConv + 
        "</td><td>" + snapshot.val().minTilTrain + "</td></tr>");
});