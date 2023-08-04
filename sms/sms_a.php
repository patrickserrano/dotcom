<?php
  require "Services/Twilio.php";

  $AccountSid = "AC0edab41c2145ba034ad04e66e0817213";
  $AuthToken = "d70cd054c8fc0254f17ddac0963805bc";
  $client = new Services_Twilio($AccountSid, $AuthToken);

	// Test Array
  $test = array (
    "+16316173606" => "Patrick Serrano",
  );
  
  // Staff Array
  $staff = array(
    // C
    "+16318331621" => "Sara Campbell",

    // F
    "+15169933468" => "James Finnican",
    
    //G
//    Need new number!    
//    "+16314955695" => "Chris Gallagher",
    "+16318063803" => "Maria Gizzo",

    // M
    "+16314339876" => "Lisa Mauro",
    // Suffolk Times Reporter
    "+16318278328" => "Carrie Miller",

    // P
    "+16312551029" => "Nicole Pollina",
    
    // R
    "+16316811344" => "Christina Ruschin", 
      
    // S       
    "+16314649403" => "Che Sabalja",
      
    // T
    "+16317745905" => "Tom Thompson, Fine Care Landscaping",
    
    // V
    "+16312352116" => "Scott Verity",

    // W
    "+15168101509" => "Joe Wiederman",
  );
		
	// Parents Array
	$parents = array(
      // B
      "+13059159785" => "Joseph Barisic",
      
      // C
      "+16319876597" => "Jeanette Cooper",
      "+16312916784" => "Jason Cooper",
      "+16318382946" => "Nicole Cooper",
  
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

      // P
      "+16315664190" => "Tracy Palumbo",
      
      // S
      "+16317670184" => "Nicole Szymczak",
      "+15163160871" => "John Szymczak",
    );
        
		// Combined Array
    $both = array_merge($parents, $staff);
    
    $smsBody = "Message from New Suffolk School: $_POST[smsText]";

    // Step 5: Loop over all our friends. $number is a phone number above, and 
    // $name is the name next to it
    if (isset($_POST['staff']) && isset($_POST['parents'])) {
        $people = $both;
    } elseif (isset($_POST['parents'])) {
        $people = $parents;
    } elseif (isset($_POST['test'])) {
        $people = $test;
    } else {
        $people = $staff;
    }
   
    foreach ($people as $number => $name) {

        $sms = $client->account->sms_messages->create(

        // Step 6: Change the 'From' number below to be a valid Twilio number 
        // that you've purchased, or the (deprecated) Sandbox number
            "631-734-0455", 

            // the number we are sending to - Any phone number
            $number,
 
           // the sms body
           // $_POST[smsText]
           $smsBody
        );

        // Display a confirmation message on the screen
        echo "Your message has been sent " . $name . "." . "\r\n";
    } ?>