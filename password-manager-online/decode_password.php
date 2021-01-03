<?php

include 'config.php';
include 'crypter_v2.php';

$username = $_GET['username'];
$password = $_GET['password'];
$pid = $_GET['pid'];
$usr_id = $_GET['usr_id'];


$query = "select password from users where id='$usr_id'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$pass = $row['password'];


if ( $pass == $password )
{

$query = "select * from pwl2_manager where usr='$usr_id' and id='$pid'";

$result = mysql_query($query, $db);

// $String = X_DeCrypt_String($String, $Password, TRUE); // DeCrypt a String     
$row = mysql_fetch_array($result);

$descrizione = utf8_encode($row['descrizione']);

$categoria = utf8_encode($row['categoria']);

//$npassword = utf8_encode(X_DeCrypt_String( $row['password'],$password, TRUE));

//$nusername = utf8_encode(X_DeCrypt_String( $row['username'],$password, TRUE));

//$altro =  utf8_encode(X_DeCrypt_String($row['altro'],$password, TRUE));

$npassword = utf8_encode($row['password']);
$nusername = utf8_encode($row['username']);
$altro =  utf8_encode($row['altro']);
$id= $row['id'];
echo "<br /><br /><table border=\"0\"> <tr><form name=\"datip\" id=\"datip\"><td colspan=\"2\"><b>Dati del record selezionato</b></td></tr> ";
echo "<tr><td> Descrizione: </td><td> <input type=\"text\" value=\"$descrizione\" size=\"40\" name=\"descrizione\" id=\"descrizione\"></td></tr>";
echo "<tr><td> Categoria: </td><td>   <input type=\"text\" value=\"$categoria\" size=\"40\" name=\"categoria\" id=\"categoria\"></td></tr> ";
echo "<tr><td> Altro: </td><td>       <input type=\"text\" value=\"$altro\" size=\"40\" name=\"altro\" id=\"altro\"></td></tr>   ";
echo "<tr><td> Username: </td><td>    <input type=\"text\" value=\"$nusername\" size=\"40\" name=\"nusername\" id=\"nusername\">  </td></tr> ";
echo "<tr><td> Password: </td><td>    <input type=\"text\" value=\"$npassword\" size=\"40\" name=\"npassword\" id=\"npassword\"> </td></tr>  ";

echo "<tr><td colspan=\"2\"><center> <input type=\"button\" onclick=\"elimina_dati_confermato($id);\" value=\"Elimina record\"> &nbsp;&nbsp; - &nbsp;&nbsp; <input type=\"button\" value=\"Salva modifiche\" onclick=\"modifica_password($id);\">  </center> </td></tr> </form></table> <br /><br />  ";

//echo "<tr><td colspan=\"2\"><center> <a href=\"#\" onclick=\"elimina_dati_confermato($id);\"> <b>Elimina record </b> </a> &nbsp;&nbsp; - &nbsp;&nbsp; <a href=\"#\" onclick=\"modifica_password($id);\"> <b>Salva modifiche </b> </a> </center> </td></tr> </form></table> <br /><br />  ";
}
else
{
echo "Login fallito";
}


?>
