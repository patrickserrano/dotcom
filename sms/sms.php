<?php
    /* Send an SMS using Twilio. You can run this file 3 different ways:
     *
     * - Save it as sendnotifications.php and at the command line, run 
     *        php sendnotifications.php
     *
     * - Upload it to a web host and load mywebhost.com/sendnotifications.php 
     *   in a web browser.
     * - Download a local server like WAMP, MAMP or XAMPP. Point the web root 
     *   directory to the folder containing this file, and load 
     *   localhost:8888/sendnotifications.php in a web browser.
     */

    // Step 1: Download the Twilio-PHP library from twilio.com/docs/libraries, 
    // and move it into the folder containing this file.
    require "Services/Twilio.php";

    // Step 2: set our AccountSid and AuthToken from www.twilio.com/user/account
    $AccountSid = "AC68922b26aef44692369f233d23ecb1c9";
    $AuthToken = "edf1c65ddc2832f8e7a04f629488b3fa";

    // Step 3: instantiate a new Twilio Rest Client
    $client = new Services_Twilio($AccountSid, $AuthToken);

    // Step 4: make an array of people we know, to send them a message. 
    // Feel free to change/add your own phone number and name here.

    $staff = array(
        "+16318331621" => "Sara Campbell",
        "+16318305666" => "Michael Comanda",
        "+16312976758" => "Jason Cooper",
        "+16318063803" => "Maria Gizzo",
        "+16316037595" => "Deanna Locasio",
        "+16319426116" => "Holly Plymale",
        "+16312551029" => "Nicole Pollina",
	      "+16316173606" => "Patrick Serrano",        
	      "+16313796791" => "Peggy Straub",
	      "+15169244919" => "Maria Troise",	
    );

    $parents = array(
    		// 2013 School Year Parents List
	      "+13059159785" => "Joseph Barisic",
        "+16319876597" => "Jeanette Cooper",
        "+16312916784" => "Jason Cooper",
	      "+16319426108" => "Brooke Dailey",
        "+16312528715" => "Patrick Dailey",
				"+16319653579" => "Yvonne Duffy",
        "+16317453518" => "Matt Duffy",
        "+16313751580" => "Libby Fannon",
        "+16317451637" => "Bill Fannon",
        "+16314612610" => "Deanna Flythe",
        "+16314337578" => "Joeseph Flythe",
        "+16312358195" => "Prudence Heston",
        "+15163814489" => "Dan Heston",
        "+16314873860" => "Nancy Langmack",
        "+16313882989" => "Eric Langmack",
				// Placeholder for Jonathan McCarvill's Parents
        // "+1631" => "McCarvill",
        // "+1631" => "McCarvill",
        "+15169018224" => "Paul Smith",
        "+16313349205" => "Gary Steinfeld",
        "+16312754750" => "Mary Grace Steinfeld",
        "+16468422682" => "Lisa Szarka",
        "+19178215316" => "Charles (Bill) Szarka",
        "+16317670184" => "Nicole Szymczak",
        "+15163160871" => "John Szymczak",
        "+16319012916" => "Joann Vitiello",
 	      "+16319012915" => "Grandma Janet Mazzaraco (Vitiello)",      
    );

    $both = array_merge($staff, $parents);

    // Step 5: Loop over all our friends. $number is a phone number above, and 
    // $name is the name next to it
    if (isset($_POST['staff']) && isset($_POST['parents'])) {
        $people = $both;
    } elseif (isset($_POST['parents'])) {
        $people = $parents;
    } else {
        $people = $staff;
    }

    foreach ($people as $number => $name) {

        $sms = $client->account->sms_messages->create(

        // Step 6: Change the 'From' number below to be a valid Twilio number 
        // that you've purchased, or the (deprecated) Sandbox number
            "631-734-0089", 

            // the number we are sending to - Any phone number
            $number,
 
           // the sms body
            $_GET[smsText]
        );

        // Display a confirmation message on the screen
        echo "Your message has been sent";
    } ?>