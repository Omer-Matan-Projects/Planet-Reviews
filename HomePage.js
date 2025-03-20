const APIkey = "AIzaSyA5PhfNIAWmAHOKMjPh8X0vjTj8ZubklhU"; //Google API
const ZERO_STARS = 0;
const ONE_STARS = 1;
const TWO_STARS = 2;
const THREE_STARS = 3;
const FOUR_STARS = 4;
const FIVE_STARS = 5;

//Check if the currentLanguage exists in localStorage
var currentLanguage = localStorage.getItem('currentLanguage');

//If it doesn't exist, initialize it to 'english'
if (!currentLanguage) //False = doesn't exist
{
    currentLanguage = 'english';
    localStorage.setItem('currentLanguage', currentLanguage);
}

//This event listener waits for the DOM (programming interface for web documents) to be fully loaded before executing the provided function
document.addEventListener("DOMContentLoaded", function () {
    //functions that will start when the page is opened
    showStars();
    updateButton();

    var textarea = document.getElementById('review');
    var counter = document.getElementById('charsCounter');

    //'input' specifies the type of event to listen for. The input event fires whenever the value of an <input>, <select>, or <textarea> element changes. This includes typing into a textarea, pasting text, or any other action that changes the value.
    textarea.addEventListener('input', function() {
        var count = textarea.value.length;
        counter.textContent = count + '/1000 Characters';
    });
});

function showStars() //The function calculates the average score according to the information from the database and displays the stars accordingly
{
    var reviewsDB = getReviewsDB(); //Array of reviews from the database
    var starsAVG = 0; //Initialization

    for (var i = 1; i < reviewsDB.length; i++) //Starting from the 1st place. Place 0 reserved for the language variable
    {
        starsAVG += Number(reviewsDB[i].Stars); //Converts the score from a string to a number and sums up
    }
    starsAVG /= (reviewsDB.length-1)
    console.log("starsAVG: "+starsAVG); //Shows in console (F12 -> console)
    
    switch (true)
    {
        //must to be one or more
        case starsAVG > ZERO_STARS && starsAVG <= ONE_STARS:
            document.getElementById("img1star").style.display = 'inline'; //Show
            break;

        case starsAVG >= ONE_STARS && starsAVG <= TWO_STARS:
            document.getElementById("img1star").style.display = 'inline';
            document.getElementById("img2star").style.display = 'inline';
            break;

        case starsAVG >= TWO_STARS && starsAVG <= THREE_STARS:
            document.getElementById("img1star").style.display = 'inline';
            document.getElementById("img2star").style.display = 'inline';
            document.getElementById("img3star").style.display = 'inline';
            break;

        case starsAVG >= THREE_STARS && starsAVG <= FOUR_STARS:
            document.getElementById("img1star").style.display = 'inline';
            document.getElementById("img2star").style.display = 'inline';
            document.getElementById("img3star").style.display = 'inline';
            document.getElementById("img4star").style.display = 'inline';
            break;

        case starsAVG >= FOUR_STARS && starsAVG <= FIVE_STARS:
            document.getElementById("img1star").style.display = 'inline';
            document.getElementById("img2star").style.display = 'inline';
            document.getElementById("img3star").style.display = 'inline';
            document.getElementById("img4star").style.display = 'inline';
            document.getElementById("img5star").style.display = 'inline';
            break;

        default:
            console.log("Invalid starsAVG value");
            break;
    }
}

function toggleForm() //The function displays the form and changes the buttons accordingly
{
    var form = document.getElementById("formtable");
    var reviewbutton = document.getElementById("reviewbutton");
    if (form.style.display === 'none' || form.style.display === '')
    {
        form.style.display = 'table'; //Show the form
        reviewbutton.textContent = "Close Form";
    }
    else
    {
        form.style.display = 'none'; //Hide the form
        reviewbutton.textContent = "Write a Review";
    }
}

function verifyInput() //The function performs an input integrity check and saves the data in local storage by saveReviewInformation()
{    
    var serial = localStorage.length; //Unique key
    var name = document.getElementById('name').value;
    var star1 = document.getElementById('1star').checked; //True or False
	var star2 = document.getElementById('2star').checked;
	var star3 = document.getElementById('3star').checked;
    var star4 = document.getElementById('4star').checked;
	var star5 = document.getElementById('5star').checked;
    var stars = star1 ? "1" : (star2 ? "2" : (star3 ? "3" : (star4 ? "4" : (star5 ? "5" : undefined)))); //Place if True
    var plot = document.getElementById('plot').value;
    var acting = document.getElementById('acting').value;
    var sound = document.getElementById('sound').value;
    var review = document.getElementById('review').value;
    var alertMsg = "";

    if(trim(name) == '')
    {
        alertMsg = alertMsg + "Please enter your name"; //String concatenation
    }
    if(trim(review) == '')
    {
        alertMsg = alertMsg + "\nPlease enter your review";
    }
    if(alertMsg != '') //If the check is not OK, an alert will be displayed
    {
		alert (alertMsg);
	}
    else
    {
        saveReviewInformation(serial, name, stars, plot, acting, sound, review) //Convert the provided information into a string (using JSON.stringify) and store the stringified information in the localStorage
        location.reload(); //Refreshes the page and thus updates the stars calculation and clears the form
    }
}

function trim (str) //Removes spaces before and after string
{
    return str.replace (/^\s+|\s+$/g, '');
}

function cleanForm() //Form reset
{
	document.getElementById('name').value = '';
    document.getElementById('1star').checked = false;
    document.getElementById('2star').checked = false;
    document.getElementById('3star').checked = false;
    document.getElementById('4star').checked = false;
    document.getElementById('5star').checked = true; //Default
    document.getElementById('plot').value = 'Extremely Good'; //Default
    document.getElementById('acting').value = 'Extremely Good'; //Default
    document.getElementById('sound').value = 'Extremely Good'; //Default
    document.getElementById('review').value = '';
}

function getReviews() //The function displays the reviews
{
    var reviewsDB = getReviewsDB(); //Array of reviews from the database
    console.log(reviewsDB); ////Shows in console (F12 -> application -> local storage -> file)
    var reviewstable = document.getElementById("reviewstable");
    var showbutton = document.getElementById("showbutton");
    var TTRtext = document.getElementById("TTR");
    var languageButtonEN = document.getElementById("languageButtonEN");
    var languageButtonFR = document.getElementById("languageButtonFR");
    var languageButtonDE = document.getElementById("languageButtonDE");
    var languageButtonIT = document.getElementById("languageButtonIT");
    if (reviewstable.style.display === 'none' || reviewstable.style.display === '')
    {
        TTRtext.style.display = 'inline';
        languageButtonEN.style.display = 'inline';
        languageButtonFR.style.display = 'inline';
        languageButtonDE.style.display = 'inline';
        languageButtonIT.style.display = 'inline';
        reviewstable.style.display = 'table'; //Show the reviews
        showbutton.textContent = "Hide Reviews";
        DisplayReviews(reviewsDB); //Design the reviews table
    }
    else
    {
        TTRtext.style.display = 'none';
        languageButtonEN.style.display = 'none';
        languageButtonFR.style.display = 'none';
        languageButtonDE.style.display = 'none';
        languageButtonIT.style.display = 'none';
        reviewstable.style.display = 'none'; //Hide the reviews
        showbutton.textContent = "Show Reviews";
    }
}

function DisplayReviews(reviewsDB)
{
    var reviewTable = document.getElementById("reviewstable");
    var tableHTML = ''; //Initialize HTML string

    for (var i = 1; i < reviewsDB.length; i++) //Iterate over each review in the reviewsDB array
    {
        var review = reviewsDB[i]; //Get the current review

        tableHTML += '<tr>'; //Concatenate
        tableHTML += '<td><b id="reviewHeader">' + review.Name + '</b>' + ' gave a score of <b id="reviewStars">' + review.Stars;

        if (review.Stars == 1) //Determine whether to use "Star" or "Stars" based on the number of stars
        {
            tableHTML += ' Star!';
        } else {
            tableHTML += ' Stars!';
        }

        tableHTML += '</b></td>';
        tableHTML += '</tr>';
        tableHTML += '<tr>';
        tableHTML += '<td>Plot: ' + review.Plot + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Acting: ' + review.Acting + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Soundtrack: ' + review.Sound + '</td>';
        tableHTML += '</tr>';
        tableHTML += '<tr>';
        tableHTML += '<td><p id="reviewFreeText">' + review.Review + '</p></td>';
        tableHTML += '</tr>';
        tableHTML += '<tr><td><hr></td></tr>'; //Add a horizontal line as a separator
    }

    //Set the innerHTML of the table to the constructed HTML string
    reviewTable.innerHTML = tableHTML;
}

function toggleLanguageFR() //This function calls the function "translateArray" with the language to tanslate to (french)
{
    if (currentLanguage === "english")
    {
        translateArray("fr");
        currentLanguage = "french";
        localStorage.setItem('currentLanguage', currentLanguage);
        updateButtonFR(); //Update languageButtonFR
    }
    else if (currentLanguage === "french")
    {
        translateArray("en");
        currentLanguage = "english";
        localStorage.setItem('currentLanguage', currentLanguage);
        updateButtonFR(); //Update languageButtonFR
    }
    else if (currentLanguage === "french")
    {
        translateArray("en");
        currentLanguage = "english";
        localStorage.setItem('currentLanguage', currentLanguage);
        updateButtonFR(); //Update languageButtonFR
    }
    alert("Translation of all the text may take a few seconds.\nThe page will automatically refresh in 3 seconds.\n\nPlease click OK and wait!");
    setTimeout(function() {location.reload();}, 3000); //Refreshes the page after 3000 milliseconds = 3 seconds (delay)
}

function toggleLanguageEN() //This function calls the function "translateArray" with the language to tanslate to (english)
{
    if (currentLanguage === "english")
    {
        alert("The text has already been translated into English.");
    }
    else
    {
        translateArray("en");
        currentLanguage = "english";
        localStorage.setItem('currentLanguage', currentLanguage);
        alert("Translation of all the text may take a few seconds.\nThe page will automatically refresh in 3 seconds.\n\nPlease click OK and wait!");
        setTimeout(function() {location.reload();}, 3000); //Refreshes the page after 3000 milliseconds = 3 seconds (delay)
    }
}

function toggleLanguageFR() //This function calls the function "translateArray" with the language to tanslate to (french)
{
    if (currentLanguage === "french")
    {
        alert("The text has already been translated into French.");
    }
    else
    {
        translateArray("fr");
        currentLanguage = "french";
        localStorage.setItem('currentLanguage', currentLanguage);
        alert("Translation of all the text may take a few seconds.\nThe page will automatically refresh in 3 seconds.\n\nPlease click OK and wait!");
        setTimeout(function() {location.reload();}, 3000); //Refreshes the page after 3000 milliseconds = 3 seconds (delay)
    }
}

function toggleLanguageDE() //This function calls the function "translateArray" with the language to tanslate to (german)
{
    if (currentLanguage === "german")
    {
        alert("The text has already been translated into German.");
    }
    else
    {
        translateArray("de");
        currentLanguage = "german";
        localStorage.setItem('currentLanguage', currentLanguage);
        alert("Translation of all the text may take a few seconds.\nThe page will automatically refresh in 3 seconds.\n\nPlease click OK and wait!");
        setTimeout(function() {location.reload();}, 3000); //Refreshes the page after 3000 milliseconds = 3 seconds (delay)
    }
}

function toggleLanguageIT() //This function calls the function "translateArray" with the language to tanslate to (italian)
{
    if (currentLanguage === "italian")
    {
        alert("The text has already been translated into Italian.");
    }
    else
    {
        translateArray("it");
        currentLanguage = "italian";
        localStorage.setItem('currentLanguage', currentLanguage);
        alert("Translation of all the text may take a few seconds.\nThe page will automatically refresh in 3 seconds.\n\nPlease click OK and wait!");
        setTimeout(function() {location.reload();}, 3000); //Refreshes the page after 3000 milliseconds = 3 seconds (delay)
    }
}

async function translateArray(language)
{
    //Fields that we want to translate
    var fieldsToTranslate = ['Plot', 'Acting', 'Sound', 'Review']; 

    for(i=1; i<localStorage.length; i++)
    {
        var jsonSerial = localStorage.key(i); //variable that holds the Serial number of the row i- KEY
        var jsonRow = localStorage.getItem(jsonSerial); //variable that holds the data from row i
        var jsonObject = JSON.parse(jsonRow); //variable that holds the data in json after it had been parsed from string to an object
        
        for(var key in jsonObject) //each key in the json
        {
            if(fieldsToTranslate.includes(key) && key!='Serial' && key!='Name' && key!='Stars') //This condition checks if the key is a key value we want to trnaslate
            { 
                var translatedText = await translate(jsonObject[key] , language); //Calling the asycronic function of trnaslation and wait for an return
                jsonObject[key] = translatedText; //Setting the jsonObject in place key with the translated text
            }
        }
        localStorage.setItem(jsonSerial, JSON.stringify(jsonObject)); //Save the updated array back to local storage
    }
}

const translate = async (text,lang)=> //const makes the async function an error function
{
    var res = await axios.post( 
    //res is the answer from google translate to the request to translate text, 
    //await tells the function to wait until rensponse
    //axios is the pacakage
    //post is the type of request 
    `https://translate.googleapis.com/language/translate/v2?key=${APIkey}`,
    { q: text, target: lang } //q is the text that being send to the anxios function 
    );
    var translation = res.data.data.translations[0].translatedText;
    //The response into type of object that google works with
    if (translation === null) {
        alert('Translation failed.');
        return null;
    }
    return translation;
}