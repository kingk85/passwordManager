<?php

include 'config.php';
include 'crypter_v2.php';

$username = $_GET['username'];
$password = $_GET['password'];
$id = $_GET['id'];
$usr_id = $_GET['usr_id'];


$query = "select password from users where id='$usr_id'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$pass = $row['password'];


if ( $pass == $password )
{

$query = "delete from pwl2_manager where usr='$usr_id' and id='$id'";
$result = mysql_query($query, $db);

echo "Dati eliminati con successo!";
}
else
{
echo "Login fallito";
}


?>