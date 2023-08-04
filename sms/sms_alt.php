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
    $AccountSid = "AC0edab41c2145ba034ad04e66e0817213";
    $AuthToken = "d70cd054c8fc0254f17ddac0963805bc";

    // Step 3: instantiate a new Twilio Rest Client
    $client = new Services_Twilio($AccountSid, $AuthToken);

    // Step 4: make an array of people we know, to send them a message. 
    // Feel free to change/add your own phone number and name here.
    
    // Staff Array
    
    $test = array (
        "+6316173606" => "Patrick Serrano",
    );
    
    $staff = array(
/*
        // C
        "+16318331621" => "Sara Campbell",
        "+16318305666" => "Michael Comanda",
        "+16312976758" => "Jason Cooper",

        // L
        "+16316037595" => "Deanna Locasio",
        // Does the number end in 5 or 8?
        
        // P
        "+16319426116" => "Holly Plymale",
        "+16312551029" => "Nicole Pollina",
        
        // S
	      "+16316173606" => "Patrick Serrano",        
	      "+16313796791" => "Peggy Straub",
	      
	      // T
	      "+15169244919" => "Maria Troise",
	      
	              //G
        //"+16318063803" => "Maria Gizzo",
*/
    );
		
		// Holly's Class
		
		$holly = array(
/*
        // B
	      "+13059159785" => "Joseph Barisic",
	      
	      // C
        "+16319876597" => "Jeanette Cooper",
        "+16312916784" => "Jason Cooper",

		    // D
	      "+16319426108" => "Brooke Dailey",
        "+16312528715" => "Patrick Dailey",
				"+16319653579" => "Yvonne Duffy",
        "+16317453518" => "Matt Duffy",
        
        // F
        "+16313751580" => "Libby Fannon",
        "+16317451637" => "Bill Fannon",

        // L
        "+16314873860" => "Nancy Langmack",
        "+16313882989" => "Eric Langmack",
        
        // S
        "+15169018224" => "Paul Smith",
        "+16313349205" => "Gary Steinfeld",
        "+16312754750" => "Mary Grace Steinfeld",
        "+16317670184" => "Nicole Szymczak",
        "+15163160871" => "John Szymczak",
*/
    );
    
    // Nicole Array
    
    $nicole = array(
/*
        // B
	      "+13059159785" => "Joseph Barisic",        
	      
	      // C
        "+16319876597" => "Jeanette Cooper",
        "+16312916784" => "Jason Cooper",
        
        // V
        "+16319012916" => "Joann Vitiello",
 	      "+16319012915" => "Grandma Janet Mazzaraco (Vitiello)",
*/
     );

    // Sara Array
    $sara = array(
/*
	      // C
        "+16319876597" => "Jeanette Cooper",
        "+16312916784" => "Jason Cooper",
        
        // F
        "+16314612610" => "Deanna Flythe",
        "+16314337578" => "Joeseph Flythe",
        
        // H
        "+16312358195" => "Prudence Heston",
        "+15163814489" => "Dan Heston",
        
        // M
				// Placeholder for Jonathan McCarvill's Parents
        // "+1631" => "McCarvill",
        // "+1631" => "McCarvill",
*/
    );
		
/*
    // 2013 Parents Complete
    $parents = array(
        // B
	      "+13059159785" => "Joseph Barisic",
	      
	      // C
        "+16319876597" => "Jeanette Cooper",
        "+16312916784" => "Jason Cooper",
        
        // D
	      "+16319426108" => "Brooke Dailey",
        "+16312528715" => "Patrick Dailey",
				"+16319653579" => "Yvonne Duffy",
        "+16317453518" => "Matt Duffy",
        
        // F
        "+16313751580" => "Libby Fannon",
        "+16317451637" => "Bill Fannon",
        "+16314612610" => "Deanna Flythe",
        "+16314337578" => "Joeseph Flythe",
        
        // H
        "+16312358195" => "Prudence Heston",
        "+15163814489" => "Dan Heston",
        
        // L
        "+16314873860" => "Nancy Langmack",
        "+16313882989" => "Eric Langmack",
        
        // M
				// Placeholder for Jonathan McCarvill's Parents
        // "+1631" => "McCarvill",
        // "+1631" => "McCarvill",
        
	      // S
        "+15169018224" => "Paul Smith",
        "+16313349205" => "Gary Steinfeld",
        "+16312754750" => "Mary Grace Steinfeld",
        "+16468422682" => "Lisa Szarka",
        "+19178215316" => "Charles (Bill) Szarka",
        "+16317670184" => "Nicole Szymczak",
        "+15163160871" => "John Szymczak",
        
        // V
        "+16319012916" => "Joann Vitiello",
 	      "+16319012915" => "Grandma Janet Mazzaraco (Vitiello)",
    );
*/
    $parents = array_merge($holly, $nicole, $sara);
        
    $both = array_merge($parents, $staff);


    // Step 5: Loop over all our friends. $number is a phone number above, and 
    // $name is the name next to it
/*
    if (isset($_POST['recipients'] == 'parents')) {
        $people = $parents;
    } elseif (isset($_post['recipients'] == 'staff')) {
        $people = $staff;
    } elseif (isset($_POST['recipients'] == 'holly')) {
        $people = $holly;
    } elseif (isset($_POST['recipients'] == 'nicole')) {
        $people = $nicole;
    } elseif (isset($_POST['recipients'] == 'sara')) {
        $people = $sara;
    } elseif (isset($_POST['recipients'] == 'test')) {
        $people = $test;
    }
*/

/*
    if (isset($_POST['recipients'] == 'parents')) {
        $people = $parents;
    } elseif (isset($_post['recipients'] == 'staff')) {
        $people = $staff;
    } elseif (isset($_POST['recipients'] == 'holly')) {
        $people = $holly;
    } elseif (isset($_POST['recipients'] == 'nicole')) {
        $people = $nicole;
    } elseif (isset($_POST['recipients'] == 'sara')) {
        $people = $sara;
    } else
*/
$people = "";

/*
if (isset($_POST['test'])) {
        $people = $test;
    }
*/


    if(isset($_POST['submit']) ) {
    /*
      $optionStaff = $_POST['staff'];
      $optionParents = $_POST['parents'];
      $optionHolly = $_POST['holly'];
      $optionNicole = $_POST['nicole'];
      $optionSara = $_POST['sara'];
      $optionTest = $_POST['test'];
    */
      $option = $_POST['group'];
      $errorMessage = "";
      
      if(!isset($_POST['group'])) { 
        $errorMessage .= "<li>You forgot to select a recipient!</li>";
      }
    
        switch($_POST['group']) {
          case 'parents':
            $people = $parents;
            break;
          
          case 'staff':
            $people = $staff;
            break;
          
          case 'holly':
            $people = $holly;
            break;
          
          case 'nicole':
            $people = $nicole;
            break;
          
          case 'sara':
            $people = $sara;
            break;
          
          case 'test':
            $people = $test;
            break;
          
          default:
            echo "Something went wrong, please go back and try again. Thank You.";
        }
    }
/*
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
    } 
*/
?>
<h1>Select Value: <?php print($_POST['group']) ?></h1>
<h1>People Array: <?php print_r($people) ?></h1>
<h1>Test Array: <?php print_r($test) ?></h1>