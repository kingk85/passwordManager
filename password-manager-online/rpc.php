<?php

include "config.php";

//$db = null;
	// PHP5 Implementation - uses MySQLi.
	// mysqli('localhost', 'yourUsername', 'yourPassword', 'yourDatabase');
	//$db = new mysqli($db_host, $db_user ,$db_password, $db_name);
	
	if(!$db) {
		// Show error if we cannot connect.
		die ('ERROR: Could not connect to the database.');
	}
if(isset($_POST['queryString'])) {
        $queryString = $_POST['queryString'];
        // Is the string length greater than 0?
        if(strlen($queryString) >0) {
        // Run the query: We use LIKE ‘$queryString%’
        // The percentage sign is a wild-card, in my example of countries it works like this…
        // $queryString = ‘Uni’;
        // Returned data = ‘United States, United Kindom’;
		
        $query = "SELECT DISTINCT categoria FROM pwl2_manager WHERE categoria LIKE '$queryString%' LIMIT 10";
		$result = mysql_query($query, $db);
		


            // While there are results loop through them - fetching an Object (i like PHP5 btw!).
           while ($row = mysql_fetch_array($result)) {
                // Format the results, im using <li> for the list, you can change it.          
                // The onClick function fills the textbox with the result.
                echo utf8_encode('<li onclick="fill(\''. $row['categoria'] .'\');">'.$row['categoria'].'</li>');
            }
}


}
?>