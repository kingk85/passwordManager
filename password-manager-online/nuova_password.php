<?php
//http://127.0.0.1/new_pwl/nuova_password.php?username=kingk&password=diploma&nusername=a&npassword=a&altro=a&categoria=a&descrizione=a&usr_id=2
include 'config.php';
include 'crypter_v2.php';

$username = $_GET['username'];
$password = $_GET['password'];

$nusername = $_GET['nusername'];
$npassword = $_GET['npassword'];
$altro = $_GET['altro'];
$descrizione = $_GET['descrizione'];
$categoria = $_GET['categoria'];
$usr_id = $_GET['usr_id'];




$query = "select password from users  where id='$usr_id'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$pass = $row['password'];


if ( $pass ==$password )
{
//$nusername = X_Crypt_String($nusername, $password, TRUE);
//$npassword = X_Crypt_String($npassword, $password, TRUE);
//$altro = X_Crypt_String($altro, $password, TRUE);


$query = "insert into pwl2_manager (username, password, descrizione, categoria, altro, usr) VALUES ('$nusername', '$npassword', '$descrizione', '$categoria', '$altro', '$usr_id')";
mysql_query($query, $db);
echo "Dati inseriti con successo ..";
}
else
{
echo "Login fallito";
}
?>