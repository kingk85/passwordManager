<?php


include 'config.php';
include 'crypter_v2.php';
$uid = $_GET['uid'];

echo '<a href="#" onclick="make_form_npp();"> <span class="standard_blue"><b> <img src="media/mini_key.gif" alt="key" /> Nuovo Campo</b></span></a> <br /> <br />
<form name="categoria"><table><tr><td>  <span class="standard_blue"> Categoria: </span></td></tr> <tr><td><center> <select name="cat"  onchange="visualizza_categoria();">
&nbsp; &nbsp; &nbsp; <option value="">Seleziona una categoria..</option> ';

$query = "select distinct categoria from pwl2_manager where usr='$uid'";

$result = mysql_query($query, $db);
while ($row = mysql_fetch_array($result))
{

$categ = utf8_encode($row['categoria']);
echo "<option value=\"$categ\">$categ</option> ";

}


echo '</select></center></td></tr><tr><td> <center><input type="button" onclick="visualizza_categoria();" value="Aggiorna"></center></form></td></tr></table>';
?>