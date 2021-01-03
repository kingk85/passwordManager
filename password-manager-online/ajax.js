// Create the XML HTTP request object. We try to be
// more cross-browser as possible.
function CreateXmlHttpReq(handler) {
  var xmlhttp = null;
  try {
    xmlhttp = new XMLHttpRequest();
  } catch(e) {
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  xmlhttp.onreadystatechange = handler;
  return xmlhttp;
}


function trim(txt)
{
return txt.replace(/\s+$|^\s+/g,"");
}


// An handler that does nothing, used for AJAX requests that
// don't require a reply and are non-critical about error conditions.
function DummyHandler() {
    return true;
}

// Shortcut for creating a GET request and get the reply
// This few lines of code can make Ajax stuff much more trivial
// to write, and... to avoid patterns in programs is sane!
function ajaxGet(url,handler) {
    var a = new Array("placeholder");
    for (var j=2; j<arguments.length; j++) {
        a[a.length] = arguments[j];
    }
    var ajax_req = CreateXmlHttpReq(DummyHandler);
    var myhandler = function() {
        var content = ajaxOk(ajax_req);
        if (content !== false) {
            a[0] = content;
            try {
                return handler.apply(this, a);
            } catch(e) {
                return myDummyApply(handler, a);
            }
        }
    }
    ajax_req.onreadystatechange = myhandler;
    ajax_req.open("GET",url);
    ajax_req.send(null);
}

// IE 5.0 does not support the apply() method of the function object,
// we resort to this eval-based solution that sucks because it is not
// capable of preserving 'this' and is ugly as hell, but it works for us.
function myDummyApply(funcname,args) {
    var e = "funcname(";
    for (var i = 0; i < args.length; i++) {
        e += "args["+i+"]";
        if (i+1 != args.length) {
            e += ",";
        }
    }
    e += ");"
    return eval(e);
}

// Add a random parameter to the get request to avoid
// IE caching madness.
function ajaxGetRand(url,handler) {
    url += (url.indexOf("?") == -1) ? "?" : "&";
    url += "rand="+escape(Math.random());
    arguments[0] = url;
    try {
        return ajaxGet.apply(this,arguments);
    } catch(e) {
        return myDummyApply(ajaxGet,arguments);
    }
}

function ajaxOk(req) {
    if (req.readyState == 4 && req.status == 200) {
        return req.responseText;
    } else {
        return false;
    }
}


function hide(target) {
    var e = document.getElementById(target);
    if (e.style.visibility == 'hidden') {
        e.style.visibility = 'visible';
        e.style.display = 'block';
    } else {
        e.style.visibility = 'hidden';
        e.style.display = 'none';
    }
}

function $(id) {
    return document.getElementById(id);
}

function $html(id) {
    return document.getElementById(id).innerHTML;
}

function $sethtml(id,html) {
    document.getElementById(id).innerHTML = html;
}

function $apphtml(id,html) {
    document.getElementById(id).innerHTML += html;
}

//Funzione per modificare il contenuto di un elemento nella pagina, accetta i parametri target e text
function set_text(target, text) {
    var e = document.getElementById(target);
    e.innerHTML = text;
}

//Funzione per modificare il contenuto di un elemento nella pagina, accetta i parametri target e text
function timed_set_text(target, text, delay) {
var tim = setTimeout('set_text("'+target+'","'+text+'")', 1000);

}

//Funzione per prelevare il contenuto di un elemento
function get_text(target, text) {
    var e = document.getElementById(target);
   return e.innerHTML;
}

function $upd_div(content,elementid) {
    var e = document.getElementById(elementid);
    e.innerHTML = content;
}//function myHandler(content) {$sethtml('d1',content);}




function make_upd ()
{
var upd_div = function $upd_div(content,elementid) {var e = document.getElementById(elementid); e.innerHTML = content;};
return upd_div;
}

var htmlt = '<input type="submit" value="Ciao!">';


function make_form_npp()
{
$sethtml('descrizione_divid','<form name="nuova_password"><table><tr><td colspan="2"> <b> Nuovo campo.. </b></td></tr><tr><td> Descrizione: </td><td><input type="text" name="descrizione" size="60"> </td></tr><tr><td> Categoria:   </td><td><input type="text" name="inputString" size="60" id="inputString" onkeyup="lookup(this.value);" onblur="fill();"> <br> <div class="suggestionsBox" id="suggestions" style="display: none;"><img src="upArrow.png" style="position: relative; top: -12px; left: 30px;" alt="upArrow" /><div class="suggestionList" id="autoSuggestionsList">&nbsp;</div></div>  </td></tr><tr><td> Altro: </td><td><input type="text" name="altro" size="60"> </td></tr><tr><td> Username: </td><td><input type="text" name="username" size="60"></td></tr><tr><td> Password: </td><td><input type="text" name="password" size="60"></td></tr><tr><td colspan="2"><center><input type="button" value="Invia" onclick="aggiungi_nuova_password();"></center></form></td></tr></table>');
}

function set_storage(usr, pass, id)
{
document.stor.username.value = usr;
document.stor.password.value = pass;
document.stor.usr_id.value = id;

}

// FUNZIONI PER CREARE I FORM NELL'AREA GESTIONE CLIENTI . . .
function make_form_registrati()
{
$sethtml('prog_hw_text_id_u','<br /> <br /> <b> Nuovo utente: </b><br /><br /> <form name="nuovo_utente"><table border="0"><tr><td> Username: </td><td><input type="text" id="username"> </td></tr><tr><td> Password: </td><td><input type="password" id="password"> </td></tr><tr><td colspan="2"> <br /> <center><input type="button" value="Registrati" onclick="registrati();"></center></form> </td></tr></table> <br /><br />');
$sethtml('slides_img_id','');
document.nuovo_utente.username.focus();
}

function visualizza_password(pid) {
    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_okk);
    myRequest.open("GET","decode_password.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&pid="+escape(pid)+"&r="+escape(r));
    myRequest.send(null);
}



function visualizza_categoria() {

    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	
	var categoria = document.categoria.cat.value;
    var r = Math.random();


	//alert(username);
	//alert(password);
	//alert(usr_id);
	//alert(nusername);

	//alert(npassword);
	//alert(descrizione);
	//alert(categoria);
	//alert(altro);

	
	myRequest = CreateXmlHttpReq(myHandler_cat);
    myRequest.open("GET","list_password.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&categoria="+escape(categoria)+"&r="+escape(r));
    myRequest.send(null);
}




function refresh_catlist(uid) {

    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_catlist);
    myRequest.open("GET","refresh_cat_list.php?uid="+escape(uid)+"&r="+escape(r));
    myRequest.send(null);
}



function modifica_password(id) {

    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	
	
	var npassword = document.getElementById('npassword').value;
	//var npassword = document.datip.npassword.value;	
	
	var nusername = document.getElementById('nusername').value;
	//var nusername = document.datip.nusername.value;
	
	var descrizione = document.getElementById('descrizione').value;
	//var descrizione = document.datip.descrizione.value;
	
	var categoria =document.getElementById('categoria').value;
	//var categoria = document.datip.categoria.value;
	
	var altro = document.getElementById('altro').value;
	//var altro = document.datip.altro.value;
	
	altro = X_Crypt_String(altro, password, true);
	nusername = X_Crypt_String(nusername, password, true);
	npassword = X_Crypt_String(npassword, password, true);
	
	//alert(escape(npassword));
	
    var r = Math.random();


	//alert(username);
	//alert(password);
	//alert(usr_id);
	//alert(nusername);
	//alert(npassword);
	//alert(descrizione);
	//alert(categoria);
	//alert(altro);

	
myRequest = CreateXmlHttpReq(myHandler_ok);
myRequest.open("GET","modifica_dati.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&descrizione="+escape(descrizione)+"&categoria="+escape(categoria)+"&altro="+encodeURIComponent(altro)+"&nusername="+encodeURIComponent(nusername)+"&npassword="+encodeURIComponent(npassword)+"&r="+escape(r)+"&id="+escape(id));
 myRequest.send(null);
//alert("modifica_dati.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&descrizione="+escape(descrizione)+"&categoria="+escape(categoria)+"&altro="+encodeURIComponent(altro)+"&nusername="+encodeURIComponent(nusername)+"&npassword="+encodeURIComponent(npassword)+"&r="+escape(r)+"&id="+escape(id));
}

function modifica_password_param(id, npassword, nusername, descrizione, categoria, altro) {

    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	

	//var npassword = document.datip.npassword.value;	
	//var nusername = document.datip.nusername.value;
	//var descrizione = document.datip.descrizione.value;
	//var categoria = document.datip.categoria.value;
	//var altro = document.datip.altro.value;
    var r = Math.random();


	//alert(username);
	//alert(password);
	//alert(usr_id);
	//alert(nusername);
	//alert(npassword);
	//alert(descrizione);
	//alert(categoria);
	//alert(altro);

	
	myRequest = CreateXmlHttpReq(myHandler_ok);
    myRequest.open("GET","modifica_dati.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&descrizione="+escape(descrizione)+"&categoria="+escape(categoria)+"&altro="+escape(altro)+"&nusername="+escape(nusername)+"&npassword="+escape(npassword)+"&r="+escape(r)+"&id="+escape(id));
    myRequest.send(null);
}


function aggiungi_nuova_password() {

    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	
	var nusername = document.nuova_password.username.value;
	var npassword = document.nuova_password.password.value;
	var descrizione = document.nuova_password.descrizione.value;
	var categoria = document.nuova_password.inputString.value;
	var altro = document.nuova_password.altro.value;
    var r = Math.random();

	altro = X_Crypt_String(altro, password, true);
	nusername = X_Crypt_String(nusername, password, true);
	npassword = X_Crypt_String(npassword, password, true);
	
	myRequest = CreateXmlHttpReq(myHandler_ok);
    myRequest.open("GET","nuova_password.php?username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id)+"&descrizione="+escape(descrizione)+"&categoria="+escape(categoria)+"&altro="+encodeURIComponent(altro)+"&nusername="+encodeURIComponent(nusername)+"&npassword="+encodeURIComponent(npassword)+"&r="+escape(r));
    myRequest.send(null);
	//var tim = setTimeout('refresh_catlist(document.stor.usr_id.value)', 1000); //l'oggetto window può essere sottointeso

}



function registrati() {
    var username = document.nuovo_utente.username.value;
	var password = document.nuovo_utente.password.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","nuovo_utente.php?username="+escape(username)+"&password="+escape(password)+"&r="+escape(r));
    myRequest.send(null);
}

function rimuovi_categoria() {
    var nome = document.elimina_categoria.nome.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/elimina_categoria.php?nome="+escape(nome)+"&r="+escape(r));
    myRequest.send(null);
}


function modifica_componente_ok() {
    var id = document.modifica_componente.id.value;
    var nome = document.modifica_componente.nome.value;
	var ubicazione = document.modifica_componente.ubicazione.value;
	var descrizione = document.modifica_componente.descrizione.value;
	var quantita = document.modifica_componente.quantita.value;
	var categoria = document.modifica_componente.categoria.value;
	var component = document.modifica_componente.component.value;
	var footprint = document.modifica_componente.footprint.value;   
	var price = document.modifica_componente.price.value;   
	var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_componente_ok.php?nome="+escape(nome)+"&id="+escape(id)+"&ubicazione="+escape(ubicazione)+"&quantita="+escape(quantita)+"&descrizione="+escape(descrizione)+"&footprint="+escape(footprint)+"&categoria="+escape(categoria)+"&component="+escape(component)+"&price="+escape(price)+"&r="+escape(r));
    myRequest.send(null);
}


function elimina_dati_confermato(id)
{
var x=window.confirm("Sei sicuro di voler eliminare definitivamente i dati?")
if (x)
elimina_dati_confirm_rq(id);
}




function elimina_scheda_fornitore_confermato(id)
{
var x=window.confirm("Sei sicuro di voler eliminare definitivamente la scheda?")
if (x)
elimina_scheda_fornitore_confirm_rq(id);

}



function crea_nuova_scheda_fornitore() {
    var nome = document.nuovo_fornitore.nome.value;
	var indirizzo = document.nuovo_fornitore.indirizzo.value;
	var citta = document.nuovo_fornitore.citta.value;
	var note = document.nuovo_fornitore.note.value;
	var numero_telefono = document.nuovo_fornitore.numero_telefono.value;
	var piva = document.nuovo_fornitore.piva.value;
    var r = Math.random();
	var programming_url = document.nuovo_fornitore.programming_url.value;
	
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/crea_nuova_scheda_fornitore.php?nome="+escape(nome)+"&indirizzo="+escape(indirizzo)+"&citta="+escape(citta)+"&note="+escape(note)+"&numero_telefono="+escape(numero_telefono)+"&piva="+escape(piva)+"&programming_url="+escape(programming_url)+"&r="+escape(r));
    myRequest.send(null);
}


function crea_nuova_scheda_cliente() {
    var nome = document.nuovo_cliente.nome.value;
	var indirizzo = document.nuovo_cliente.indirizzo.value;
	var citta = document.nuovo_cliente.citta.value;
	var numero_telefono = document.nuovo_cliente.numero_telefono.value;
	var piva = document.nuovo_cliente.piva.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/crea_nuova_scheda_clienti.php?nome="+escape(nome)+"&indirizzo="+escape(indirizzo)+"&citta="+escape(citta)+"&numero_telefono="+escape(numero_telefono)+"&piva="+escape(piva)+"&r="+escape(r));
    myRequest.send(null);
}


function myHandler_cat() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('pdesc', myRequest.responseText);
    }
}



function myHandler_catlist() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('menu_cat', myRequest.responseText);
		visualizza_categoria();
    }
}


function myHandler_okk() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('descrizione_divid', myRequest.responseText);
		//decifra

    var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	

	var npassword = document.getElementById('npassword').value;

	npassword = X_DeCrypt_String(npassword, password, true);

	//var npassword = document.datip.npassword.value;	
	document.getElementById('npassword').value = npassword;
	
	var nusername =X_DeCrypt_String(document.getElementById('nusername').value, password, true);
	//var nusername = document.datip.nusername.value;
	document.getElementById('nusername').value = nusername;
	
	var descrizione = document.getElementById('descrizione').value;
	//var descrizione = document.datip.descrizione.value;
	
	var categoria =document.getElementById('categoria').value;
	//var categoria = document.datip.categoria.value;
	
	var altro = X_DeCrypt_String(document.getElementById('altro').value, password, true);
	document.getElementById('altro').value = altro;

    }
	//refresh_catlist(document.stor.usr_id.value);
}

function myHandler_ok() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('descrizione_divid', myRequest.responseText);
		refresh_catlist(document.stor.usr_id.value);
    }
	//refresh_catlist(document.stor.usr_id.value);
}

function myHandler_nuova_scheda_cliente() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('prog_hw_text_id_u', myRequest.responseText);
    }
}

function myHandler_timed() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        timed_set_text('div_form', myRequest.responseText, 3000);
    }
}


function projectload() {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_timed);
    myRequest.open("GET","script/ultimi_progetti.php?r="+escape(r));
    myRequest.send(null);
}


function modifica_scheda_commessa_id(id) {
   // var id = document.modifica_commessa.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_commessa.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_commessa() {
    var id = document.modifica_commessa.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_commessa.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_oem_id(id) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_oem.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_prodotto() {
    var id = document.modifica_prodotto.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_prodotto.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}
function modifica_scheda_prodotto_id(id) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_prodotto.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_componente() {
    var id = document.modifica_componente.id.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_componente.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_componente_id(id) {
   // var id = document.modifica_componente.id.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_componente.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_cliente_id(id) {
   // var id = document.modifica_cliente.id.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_clienti.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_cliente() {
    var id = document.modifica_cliente.id.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_clienti.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}


function modifica_scheda_fornitore() {
    var id = document.modifica_fornitore.id.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_fornitori.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_cliente_ok() {
    var id = document.modifica_dati_clienti.id.value;
    var nome = document.modifica_dati_clienti.nome.value;
	var indirizzo = document.modifica_dati_clienti.indirizzo.value;
	var citta = document.modifica_dati_clienti.citta.value;
	//var riferimenti = document.modifica_dati_clienti.riferimenti.value;
	var numero_telefono = document.modifica_dati_clienti.numero_telefono.value;
	var piva = document.modifica_dati_clienti.piva.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_clienti_ok.php?nome="+escape(nome)+"&id="+escape(id)+"&indirizzo="+escape(indirizzo)+"&citta="+escape(citta)+"&numero_telefono="+escape(numero_telefono)+"&piva="+escape(piva)+"&r="+escape(r));
    myRequest.send(null);
}

function modifica_scheda_fornitore_ok() {
    var id = document.modifica_dati_fornitori.id.value;
    var nome = document.modifica_dati_fornitori.nome.value;
	var indirizzo = document.modifica_dati_fornitori.indirizzo.value;
	var citta = document.modifica_dati_fornitori.citta.value;
	var riferimenti = document.modifica_dati_fornitori.riferimenti.value;
	var numero_telefono = document.modifica_dati_fornitori.numero_telefono.value;
	var piva = document.modifica_dati_fornitori.piva.value;
	var programming_url = document.modifica_dati_fornitori.programming_url.value;
    var r = Math.random();
    //alert(piva);
	myRequest = CreateXmlHttpReq(myHandler_nuova_scheda_cliente);
    myRequest.open("GET","script/modifica_scheda_fornitori_ok.php?nome="+escape(nome)+"&id="+escape(id)+"&indirizzo="+escape(indirizzo)+"&citta="+escape(citta)+"&riferimenti="+escape(riferimenti)+"&numero_telefono="+escape(numero_telefono)+"&piva="+escape(piva)+"&programming_url="+escape(programming_url)+"&r="+escape(r));
    myRequest.send(null);
}


function myHandler_modifica_scheda_cliente() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('div_form', myRequest.responseText);
    }
}

function ricerca_scheda_progetto()
{
    var chiave = document.ricerca_progetto.chiave.value;
	var tipologia = document.ricerca_progetto.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_progetto.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}

function ricerca_scheda_commessa() {
    var chiave = document.ricerca_commessa.chiave.value;
	var tipologia = document.ricerca_commessa.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_commessa.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}


function ricerca_scheda_ordine() {
    var chiave = document.ricerca_ordine.chiave.value;
	var tipologia = document.ricerca_ordine.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_ordine.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}


function ricerca_scheda_componente() {
    var chiave = document.ricerca_componente.chiave.value;
	var tipologia = document.ricerca_componente.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_componente.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}

function ricerca_scheda_oem() {
    var chiave = document.ricerca_oem.chiave.value;
	var tipologia = document.ricerca_oem.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_oem.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}
function ricerca_scheda_prodotto() {
    var chiave = document.ricerca_prodotto.chiave.value;
	var tipologia = document.ricerca_prodotto.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_prodotto.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}

function ricerca_scheda_cliente() {
    var chiave = document.ricerca_cliente.chiave.value;
	var tipologia = document.ricerca_cliente.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_cliente.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}

function ricerca_scheda_fornitore() {
    var chiave = document.ricerca_fornitore.chiave.value;
	var tipologia = document.ricerca_fornitore.tipologia.value;
	var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/ricerca_scheda_fornitore.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
    myRequest.send(null);
}

function myHandler_ricerca_scheda_cliente() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('div_form', myRequest.responseText);
    }
}
function elimina_scheda_progetto() {
    var id = document.elimina_progetto.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_progetto.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_commessa() {
    var id = document.elimina_commessa.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_commessa.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_componente() {
    var id = document.elimina_componente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_componente.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_oem() {
    var id = document.elimina_oem.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_oem.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_prodotto() {
    var id = document.elimina_prodotto.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_prodotto.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_cliente() {
    var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_cliente.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_fornitore() {
    var id = document.elimina_fornitore.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_fornitore.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function myHandler_elimina_scheda_cliente() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
        set_text('div_form', myRequest.responseText);
    }
}

function elimina_categoria_confermato_rq(id) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_categoria_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_dati_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	var username = document.stor.username.value;
	var password = document.stor.password.value;
    var usr_id = document.stor.usr_id.value;
	
	
	myRequest = CreateXmlHttpReq(myHandler_ok);
    myRequest.open("GET","elimina_dati.php?id="+escape(id)+"&r="+escape(r)+"&username="+escape(username)+"&password="+escape(password)+"&usr_id="+escape(usr_id));
    myRequest.send(null);
}

function elimina_scheda_progetto_confermato(id) {
var x=window.confirm("Sei sicuro di voler eliminare definitivamente la scheda?")
if (x)
elimina_scheda_progetto_confirm_rq(id);
}

function elimina_scheda_progetto_confirm_rq(id) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_progetto_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_cliente_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_cliente_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_componente_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_componente_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}


function elimina_scheda_oem_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_oem_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_prodotto_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_prodotto_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function elimina_scheda_fornitore_confirm_rq(id) {
  //  var id = document.elimina_cliente.id.value;
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/elimina_scheda_fornitore_cnf.php?id="+escape(id)+"&r="+escape(r));
    myRequest.send(null);
}

function myHandler_elimina_scheda_cliente_confirm_rq() {
  if (myRequest.readyState == 4 && myRequest.status == 200) {
  set_text('div_form', myRequest.responseText);
 }
}

function timertest()
{
setTimeout('alert("ciao!")', 3000); //l'oggetto window può essere sottointeso
}

function 
bgImage(id,image)
{
document.getElementById(id).style.backgroundImage = 'url('+image+')'; 
}
	
	
	
//GESTIONE DELL'EVENTO ENTER NEI CAMPI DELLE VARIE FORM........
function onEnter( evt, frm ) {
var keyCode = null;

if( evt.which ) {
keyCode = evt.which;
} else if( evt.keyCode ) {
keyCode = evt.keyCode;
}
if( 13 == keyCode ) {
frm.btnEnter.click();
return false;
}
return true;
}

function myHandler_gest_search(){
  if (myRequest.readyState == 4 && myRequest.status == 200) {
   set_text('risultati_search', myRequest.responseText);
   }
}

function componenti_gest_search() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_componente_gest.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}

function componenti_gest_search_sn() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_componente_gest_sn.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}

function progetti_gest_search_sn() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_progetto_gest.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}

function oem_gest_search() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_oem_gest.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}

function oem_gest_search_sn() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_oem_gest_sn.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}


function prodotto_gest_search_sn() 
{
var chiave = document.searchform.chiave.value;
var tipologia = document.searchform.tipologia.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_gest_search);
myRequest.open("GET","ricerca_scheda_prodotto_gest_sn.php?chiave="+escape(chiave)+"&tipologia="+escape(tipologia)+"&r="+escape(r));
myRequest.send(null);
}

function associa_progetto(id, nome, price)
{
document.searchform.id_progetto.value = id;
document.searchform.nome.value = nome;
document.searchform.prezzo.value = price;
}

function associa_componente_oem(id, nome)
{
document.searchform.id_componente.value = id;
document.searchform.nome_componente.value = nome;
document.searchform.quantita.focus();
}

function associa_oem_prodotto(id, nome)
{
document.searchform.id_oem.value = id;
document.searchform.nome_oem.value = nome;
document.searchform.quantita.focus();
}
function associa_oem_prodotto_sn(id, nome)
{
document.searchform.id_oem.value = id;
document.searchform.nome_oem.value = nome;
document.searchform.sn.focus();
}
function associa_prodotto_commessa_sn(id, nome)
{
document.searchform.id_prodotto.value = id;
document.searchform.nome_prodotto.value = nome;
document.searchform.sn.focus();
}
function associa_componente_oem_sn(id, nome)
{
document.searchform.id_componente.value = id;
document.searchform.nome_componente.value = nome;
document.searchform.sn.focus();
}

function myHandler_serial_search(){
  if (myRequest.readyState == 4 && myRequest.status == 200) {
   set_text('hidden_div', myRequest.responseText);
document.ss.id_entita.value = document.sh.id_entita.value;
document.ss.tipo_entita.value = document.sh.tipologia.value;
document.ss.nome_ogetto.value = document.sh.nome.value;
   
   
   }
   
}


function serial_search() 
{
var serial = document.ss.serial.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_serial_search);
myRequest.open("GET","ricerca_serial.php?serial="+escape(serial)+"&r="+escape(r));
myRequest.send(null);
}

function product_search() 
{
var nome = document.ss.nome.value;
var r = Math.random();
myRequest = CreateXmlHttpReq(myHandler_serial_search);
myRequest.open("GET","ricerca_prodotto.php?nome="+escape(nome)+"&r="+escape(r));
myRequest.send(null);
}


function myHandler_check_componente() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
    }
}

function check_componente(id,stato) {
    var r = Math.random();
	var statos;

	if ( stato == true )
	statos = '1';
	else
	statos = "0";
	
	myRequest = CreateXmlHttpReq(myHandler_check_componente);
    myRequest.open("GET","script/check_componente.php?id="+escape(id)+"&statos="+escape(statos)+"&r="+escape(r));
    myRequest.send(null);
}

function mqty_componente(id,qty) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_check_componente);
    myRequest.open("GET","script/mod_qty_componente.php?id="+escape(id)+"&qty="+escape(qty)+"&r="+escape(r));
    myRequest.send(null);
}

function mqty_arrivata_componente(id,qty) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_check_componente);
    myRequest.open("GET","script/mod_qty_arrivata_componente.php?id="+escape(id)+"&qty="+escape(qty)+"&r="+escape(r));
    myRequest.send(null);
}

function convalida_ordine(id,nome_ordine, price) {
    var r = Math.random();
	if ( nome_ordine != "" && price != "" )
	{
	myRequest = CreateXmlHttpReq(myHandler_ricerca_scheda_cliente);
    myRequest.open("GET","script/convalida_ordine.php?id="+escape(id)+"&nome_ordine="+escape(nome_ordine)+"&price="+escape(price)+"&r="+escape(r));
    myRequest.send(null);
	}
	else
	{
	alert('Inserire un nome ordine e la spesa totale per proseguire..');
	}
}

function modifica_stato_ordine(id,stato) {
    var r = Math.random();
	myRequest = CreateXmlHttpReq(myHandler_check_componente);
    myRequest.open("GET","script/mod_stato_ordine.php?id="+escape(id)+"&stato="+escape(stato)+"&r="+escape(r));
    myRequest.send(null);
}

function getCookie(NameOfCookie)
{ if (document.cookie.length > 0)
{ begin = document.cookie.indexOf(NameOfCookie+"=");
if (begin != -1)
begin += NameOfCookie.length+1;
end = document.cookie.indexOf(";", begin);
if (end == -1) end = document.cookie.length;
return unescape(document.cookie.substring(begin, end)); }
}


function setCookie(NameOfCookie, value, expiredays)
{ var ExpireDate = new Date ();
ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
document.cookie = NameOfCookie + "=" + escape(value) +
((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}



function delCookie (NameOfCookie)
{ if (getCookie(NameOfCookie)) {
document.cookie = NameOfCookie + "=" +
"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

}
