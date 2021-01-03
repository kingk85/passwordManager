<?php
//Back link home page...
$back_link = '../tools.php';

// --------------  Parametri del database  -------------- //
$db_user = "kingk_oww";
$db_password = "1Osonolegenda#";
$db_name = "kingk_oww";
$db_host = "127.0.0.1";

// =====>    Connessione con il database
$db = mysql_connect($db_host, $db_user, $db_password);
if ($db == FALSE)
die ("Errore nella connessione. Verificare i parametri nel file config.inc.php");
mysql_select_db($db_name, $db)
or die ("Errore nella selezione del database. Verificare i parametri nel file config.inc.php");
?>