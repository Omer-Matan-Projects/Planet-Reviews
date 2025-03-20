function saveReviewInformation(serial, name, stars, plot, acting, sound, review) //The function saves the data in the local storage using JSON
{
    //JSON is an object with fields
    var jsonData =
    {
        'Serial':serial, //A field used as a key because it is unique
        'Name': name,
        'Stars': stars,
        'Plot': plot,
        'Acting': acting,
        'Sound': sound,
        'Review': review
    }
    var jsonstring = JSON.stringify(jsonData); //Converts the object to a JSON string
	localStorage.setItem(serial, jsonstring); //Saves the data in the local storage
}

function getReviewsDB() //The function exports the data from the local storage to an array and returns it
{
	var reviews = []; //Array definition
	for (i = 1; i < localStorage.length; i++)
    {
		var reviewSerial = localStorage.key(i); //Pulls the serial number (the key) in row i
		var reviewInfo = localStorage.getItem(reviewSerial); //Pulls all the data from row i (jsonData)
        reviews[i] = JSON.parse(reviewInfo); //Converts the string to a JSON object and stores it at the i position in the array
	}
	return reviews;
}