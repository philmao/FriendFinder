// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate JavaScript array
	// ---------------------------------------------------------------------------

	app.post("/api/friends", function(req, res) {

		var newEntry = req.body;

		var bestMatch = 0;
		var lowTotal = 50;

		// console.log(friends);
		// console.log(newEntry);

		for(var i = 0; i < friends.length; i++) {

			var total = 0;
			var delta = 0;

			for(var j = 0; j < 10; j++) {
				// console.log(friends[i].name);
				delta = Math.abs(friends[i].scores[j] - newEntry.scores[j]);
				// console.log(friends[i].scores[j], newEntry.scores[j], delta);
				total += delta;
				// console.log(total);

			};
			if(total < lowTotal) {
				lowTotal = total;
				bestMatch = i;
				// console.log("Best: ", lowTotal, bestMatch);
			}
		}

		friends.push(newEntry);

		res.json(friends[bestMatch]);

	});

}