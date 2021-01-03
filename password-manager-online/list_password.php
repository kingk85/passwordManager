<?php

include 'config.php';
include 'crypter_v2.php';

$username = $_GET['username'];
$password = $_GET['password'];
$categoria = $_GET['categoria'];
$usr_id = $_GET['usr_id'];


$query = "select password from users where id='$usr_id'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$pass = $row['password'];


if ( $pass == $password )
{

$query = "select descrizione, id from pwl2_manager where usr='$usr_id' and categoria='$categoria'";

$result = mysql_query($query, $db);

while ($row = mysql_fetch_array($result))
{
$id = $row['id'];
$descrizione = $row['descrizione'];
echo "
 <a href=\"#\" onclick=\"visualizza_password($id)\"> <span class=\"standard_blue\"> <img src=\"media/mini_key.gif\" alt=\"key\" /> ". utf8_encode($descrizione) ." </span></a><br />";
}
echo "<br />";
}
else
{
echo "Login fallito";
}


?>