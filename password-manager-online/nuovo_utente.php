<?php
include 'config.php';

$username = $_GET['username'];
$password = $_GET['password'];

$query = "select count(*) as count from pwl2_users  where username='$username'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$count = $row['count'];


if ( $count > 0 )
echo "Impossibile registrarsi, username $username già presente in database..";
else
{

$hashcode = md5($password);

$query = "insert into pwl2_users (username, password) VALUES ('$username', '$hashcode')";
mysql_query($query, $db);


echo "Registrazione completata con successo!!!";
}
?>