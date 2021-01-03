<?php
include_once '../../class/global.php';
include_once "../../class/database.php";
include_once "../../class/login.php";
$post = json_decode(file_get_contents('php://input'), true);
$httpMethod = $_SERVER['REQUEST_METHOD'];

if ($httpMethod == "POST" && isset($post['action']) && $post['action'] == "createUser" )
{
    //$query = "insert into pwl2_manager (descrizione, categoria, password, username, altro, usr) VALUES ('".$post['description']."', '".$post['category']."', '".$post['password']."', '".$post['username']."', '".$post['other']."', '".$login->uid."')";
    $db = new Database();
    $query = "from users where username='" . $post['username'] . "' OR email = '" . $post['email'] . "'";
    if ($db->Count("$query") > 0)
        die("Username or Email already in use.");
    
    $codice_attivazione = md5(time() . $post['username'] . $post['email']);
    
    $query = "insert into users (username, password, email, attivazione, codice_attivazione, notifiche, livello) values ('" . $post['username'] . "', '" . $post['passwords']['password'] . "', '" . $post['email'] . "', '0', '".$codice_attivazione."', '0', '1')";   
    $db->Execute($query);

    $Oggetto	= "Password Manager - Conferma registrazione";
    $Messaggio 	= '

    Riepilogo dei dati forniti 

    Username : ' . $post['username'] . '

    Password : ' . $post['passwords']['password'] . '

    Per procedere con la registrazione è necessario confermare la propria registrazione visitando il seguente link ( per visitarlo basta un click o in alternatica copiare il link nel browser ed eseguire la pagina )

    http://www.oldwildweb.com/pwl/activateAccount/'.$codice_attivazione.'

    se non siete piu interessati alla registazione nella community ignorate semplicemente questa e-mail';


    $errore = mail($post['email'], $Oggetto, $Messaggio, "From: info@oldwildweb.com");
    die("Data saved");
} 
else if ($httpMethod == "GET" && isset($_GET['action']) && $_GET['action'] == "activateUser" )
{
    $db = new Database();
    $query = "from users where codice_attivazione = '" . $_GET['activation'] . "'";
    if ($db->Count("$query") == 0)
        die("User already active or wrong activation code.");

    $query = "update users set codice_attivazione = 'ok', attivazione = 1 where codice_attivazione = '" . $_GET['activation'] . "'";
    $db->Execute($query);

    die("User activated");
}

$login = new Login();

if ($login->logged == false)
{
    die("Permissions denied.");
}

        
switch ($httpMethod)
{
    case "GET":
    {
        //READ DATA
        //echo "Method is get";
   
        if (isset($_GET['action']) && $_GET['action'] == "loadData")
        {
        $categoryData = [];

        $db = new Database();
        $db->use_cache = false;
        
        $query = "select distinct categoria from pwl2_manager where usr = '$login->uid' order by categoria ASC";
        //echo $query;
        $data = $db->get_all_values($query);
        //echo count($data);
        for ($i = 0; $i< count($data); $i++)
        {
            $element = [];
            $entries = [];
            $element['id'] = 0;
            $element['name'] = $data[$i]['categoria'];

            $db2 = new Database();
            $db2->use_cache = false;
            $categoryDataEntry = $db2->get_all_values("select id, descrizione as description, categoria as category, username, password, altro as other, usr as user_id from pwl2_manager where usr = '$login->uid' and categoria = '".$data[$i]['categoria']."' order by descrizione ASC");

            for ($x = 0; $x< count($categoryDataEntry); $x++)
            {
                if ($categoryDataEntry[$x]['description'] == "")
                {
                    $categoryDataEntry[$x]['description'] = "No description";
                }
                
                $entries[] = $categoryDataEntry[$x];
            }

            $element['entries'] = $entries;
            $categoryData[] = $element;
        }

        echo json_encode($categoryData);
        die("");
        }
    }
    break;

    case "POST":
    {
        //CREATE NEW DATA
        //echo "Method is post";
        if (isset($post['action']) && $post['action'] == "saveEntry" )
        {
            $query = "insert into pwl2_manager (descrizione, categoria, password, username, altro, usr) VALUES ('".$post['description']."', '".$post['category']."', '".$post['password']."', '".$post['username']."', '".$post['other']."', '".$login->uid."')";
            $db = new Database();
            $db->Execute($query);
            die("Data saved");
        }

        
    }
    break;

    case "PUT":
    {
        //REPLACE DATA
        //echo "Method is put";
        if (isset($post['action']) && $post['action'] == "saveEntry" )
        {
            $query = "update pwl2_manager  SET descrizione = '".$post['description']."', categoria = '".$post['category']."', password = '".$post['password']."', username = '".$post['username']."', altro = '".$post['other']."' WHERE usr = '".$login->uid."' and id = '".$post['id']."'";
            $db = new Database();
            $db->Execute($query);
            die("Data saved");
        }
        else if (isset($post['action']) && $post['action'] == "changePassword" )
        {
            if ($login->password == $post['oldPassword'])
            {
                $db = new Database();
                $db->use_cache = false;

                //print_r($post['updatedEntries']);
                $query = "update users SET password = '".$post['newPassword']."' WHERE id = '".$login->uid."' and password = '".$post['oldPassword']."'";
                $db->Execute($query);

                $query = "";
                for ($i = 0; $i < count($post['updatedEntries']); $i++)
                {
                    $query = "update pwl2_manager set username = '" . $post['updatedEntries'][$i]['username'] . "', password = '" . $post['updatedEntries'][$i]['password'] . "', altro = '" . $post['updatedEntries'][$i]['other'] . "' where id = '" . $post['updatedEntries'][$i]['id'] . "' and usr = $login->uid;";
                    $db->Execute($query);
                }
               
                echo "
                {
                    \"id\":$login->uid,
                    \"username\":\"$login->username\",
                    \"password\":\"$login->password\",
                    \"userIsLogged\": true
                }";
                die("");
                    
                die("Password updated");
            }
            else
            {
                echo "The old password is not correct!";
                die("");
            }
        }
        else if (isset($post['action']) && $post['action'] == "importBackup" )
        {
            $db = new Database();
            $db->use_cache = false;

            $query = "update users SET password = '".$post['password']."' WHERE id = '".$login->uid."' and password = '".$post['oldPassword']."'";
            $db->Execute($query);

            $query = "delete from pwl2_manager where usr = $login->uid;";
            $db->Execute($query);
            
            for ($i = 0; $i < count($post['backupEntries']); $i++)
            {
                $query = "insert into pwl2_manager (username, password, altro, usr, descrizione, categoria) VALUES ('" . $post['backupEntries'][$i]['username'] . "', '" . $post['backupEntries'][$i]['password'] . "', '" . $post['backupEntries'][$i]['other'] . "', '$login->uid', '" . $post['backupEntries'][$i]['description'] . "', '" . $post['backupEntries'][$i]['category'] . "');";
                $db->Execute($query);
                //echo $query;
            }

            echo "
            {
                \"id\":$login->uid,
                \"username\":\"$login->username\",
                \"password\":\"$login->password\",
                \"userIsLogged\": true
            }";

            die("");
        }
    }
    break;

    case "DELETE":
    {
        //DELETE ELEMENT
        //echo "Method is delete";
        if (isset($_GET['action']) && isset($_GET['idToRemove']) && $_GET['action'] == "removeEntry")
        {
            $query = "delete from pwl2_manager where usr = '$login->uid' and id = '" . $_GET['idToRemove']."'";
            $db = new Database();
            $db->Execute($query);
            die("Data deleted");
        }
    }
    break;
}

?>