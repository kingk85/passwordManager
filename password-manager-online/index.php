<?php 
include '../class/login.php';
$login = new Login();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" 
   "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
include 'config.php';


$logged = $login->logged;

if ($login->logged == true)
{
$logged = true;
$username = $login->username;
$password = $login->password;
$uid = $login->uid;
}

/*
if ( isset($_POST['username']) && isset($_POST['password']) )
{
$username = $_POST['username'];
//$hashcode = md5($_POST['password']);
$hashcode = $_POST['password'];
$password = $_POST['password'];
$query = "select password, id from users where username='$username'";
$result = mysql_query($query, $db);
$row = mysql_fetch_array($result);
$hc = $row['password'];
$uid = $row['id'];
if ( $hc == $hashcode )
$logged = true;
}
*/


?>
<meta http-equiv="Content-type" content="application/xhtml+xml; charset=iso-8859-1" />
<meta http-equiv="Content-Language" content="it" />
<meta name="Robots" content="All" />
<meta name="description" content="Il password Manager Online, archivia con tutta sicurezza le tue password, ricordare password, gestore online password, gestire le password" />
<meta name="owner" content="it" /> 
<meta name="author" content="oldwildweb" />  
<meta name="copyright" content="OldWildWeb" />
<meta name="keywords" content="password manager online ricordare password protezione " />
<meta name="robots" content="index,follow" />
<link rel="shortcut icon" type="images/x-icon" href="media/favicon.ico" />
<title>Password Manager Online Gratuito | Gestore password </title>
<link type="text/css" rel="stylesheet" href="css2.css" />

<script type="text/javascript" src="ajax.js"><!--
//--></script>
<script type="text/javascript" src="../js/crypter.js"><!--
//--></script>


<script type="text/javascript" src="jquery-1.2.1.pack.js"></script>
<script type="text/javascript">
	function lookup(inputString) {
		if(inputString.length == 0) {
			// Hide the suggestion box.
			$('#suggestions').hide();
		} else {
			$.post("rpc.php", {queryString: ""+inputString+""}, function(data){
				if(data.length >0) {
					$('#suggestions').show();
					$('#autoSuggestionsList').html(data);
				}
			});
		}
	} // lookup
	
	function fill(thisValue) {
		$('#inputString').val(thisValue);
		setTimeout("$('#suggestions').hide();", 200);
	}
</script>

<style type="text/css">
	body {
		font-family: Helvetica;
		font-size: 11px;
		color: #000;
	}
	
	h3 {
		margin: 0px;
		padding: 0px;	
	}

	.suggestionsBox {
		position: relative;
		left: 30px;
		margin: 10px 0px 0px 0px;
		width: 200px;
		background-color: #afb1de;
		-moz-border-radius: 7px;
		-webkit-border-radius: 7px;
		border: 2px solid #4f56ca;	
		color: #fff;
	}
	
	.suggestionList {
		margin: 0px;
		padding: 0px;
	}
	
	.suggestionList li {
		
		margin: 0px 0px 3px 0px;
		padding: 3px;
		cursor: pointer;
	}
	
	.suggestionList li:hover {
		background-color: #659CD8;
	}
</style>


</head>
<body>

<div class="main_div" id="main">
	<div class="logo_div" id="menu_top">

			  	  	  	  <div class="menu"><a href="http://www.oldwildweb.com/" title="">Back</a></div>
								<div class="menuSELECTED"><?php if ($login->logged == false ) echo "<a href=\"../login.php\" title=\"\">Log In</a>"; else echo "<a href=\"../logout.php\" title=\"\">Log Out</a>"; ?></div>
	<div class="logo_container" id="logo_cont"><a href="#"><img src="img/logo.jpg" alt="Password manager online" /></a> </div>
	<div class="in_logo_div" id="logo"> <span class="big"> Password Manager Online </span> <br /> <span class="standard"> Gestione delle password </span></div>

</div>
	
	
<div id="storage">
<?php
if ( $login->logged )
{
echo "
	<form name=\"stor\">
	<input type=\"hidden\" name=\"username\" value=\"$username\">
	<input type=\"hidden\" name=\"password\" value=\"$password\">
	<input type=\"hidden\" name=\"usr_id\" value=\"$uid\">
	</form>";

}

?>

	</div>

<div class="intro_style" id="intro_style">




<div class="help_title" id="help_titleT">
<?php 

if ( $login->logged == false )
echo 'Info';
else
echo 'Azioni';

?>
</div>


<div class="all_info" id="all_infoT">
<br /> 

<?php
if ( $login->logged == false )
echo '
- Versione software: v1.1
<br />  <br /> 
- Libreria utilizzata: X_Crypter
<br />  <br />  
-Vantaggi:
<br />  <br />  
Gestione organizzata delle password
<br />  <br />  
Password cifrate via software
<br />  <br />  
';
else
{


// =====>    Connessione con il database
$db2 = mysql_connect($db_host, $db_user, $db_password);
if ($db2 == FALSE)
die ("Errore nella connessione. Verificare i parametri nel file config.inc.php");
mysql_select_db($db_name, $db2)
or die ("Errore nella selezione del database. Verificare i parametri nel file config.inc.php");



echo '
<div id="menu_cat">
 <center> <input type="button" onclick="make_form_npp();" value="Nuovo Campo"> </center><br /> <br />
<form name="categoria"><table><tr><td>  <span class="standard_blue">&nbsp; Visualizza password per la categoria </span></td></tr> <tr><td><center> <select name="cat"  onchange="visualizza_categoria();">
&nbsp; &nbsp; &nbsp; <option value="">Seleziona una categoria..</option> ';

$query = "select distinct categoria from pwl2_manager where usr='$uid'";
$result = mysql_query($query, $db2);
while ($row = mysql_fetch_array($result))
{
$categ = $row['categoria'];
echo "<option value=\"$categ\">$categ</option> ";
}


echo '</select></center></td></tr><tr><td> <center><input type="button" onclick="visualizza_categoria();" value="Aggiorna"></center></form></td></tr></table></div>

<br />

<div id="pdesc">
</div>
';




/*
echo $query;

$result = mysql_query($query, $db2);
while ($row = mysql_fetch_array($result))
{
$categ = $row['categoria'];
echo "$categ";
}
*/
}
?>
</div>

<div class="cat_div_title" id="cat13">
<?php

if ( $login->logged == false )
echo 'Benvenuto';
else
echo "Benvenuto $username";

?>
</div>

<div class="all_cats" id="all_catst1">

<div class="descrizione_div" id="descrizione_divid">
<br />
Il <b>password manager online</b> consente di gestire tutte le tue password in totale sicurezza.<br /> Le informazioni <b>inviate/ricevute</b>, viaggiano nel web <b>cifrate dal vostro browser</b> tramite un nostro algorimo proprietario in javascript.<br />
<br />
Le password registrate all'interno di questo software <b>potranno essere consultate</b> da una qualsiasi postazione dotata di una connessione internet e un browser di ultima generazione.
<br /><?php

if ( $login->logged == false )
echo '
<br />Per utilizzare il password manager � necessario autenticarsi dalla <a href="../">home page</a>';

?>

<?php
if ( $login->logged  )
/*
echo '
<table>
<form name="nuova_password"> 
<tr><td colspan="2">
&nbsp; <b> Nuovo campo.. </b></td></tr>
<tr><td>&nbsp; Descrizione: </td><td><input type="text" name="descrizione"> </td></tr>
<tr><td>&nbsp; Categoria:   &nbsp;&nbsp;</td><td><input type="text" name="categoria"> </td></tr>
<tr><td>&nbsp; Altro:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td><td><input type="text" name="categoria"> </td></tr>
<tr><td>&nbsp; Username: &nbsp;&nbsp;</td><td><input type="text" name="username"></td></tr>
<tr><td>&nbsp; Password: &nbsp;&nbsp;</td><td><input type="text" name="password"></td></tr>
<tr><td colspan="2">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="submit" value="Aggiungi">
 </form></td></tr></table>';
 */
 
?>
<div id="slides_img_id" class="slides_img">


</div>  
<br /> 

 
 

<br />
<br />
</div>


</div>
</div>
</div>


<div class="sub" id="ssubb">
<div class="sub_w3c_logo_txt" id="sub_w3c_logo_txt_id"> 
<b>L'autore non assume nessun tipo di responsabilit� per eventuali danni derivanti dall'uso delle applicazioni online</b>
</div> 

	

</div>


</body>
</html>