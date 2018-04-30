<?php
include_once '../../class/global.php';
include_once "../../class/database.php";
include_once "../../class/login.php";

$login = new Login();
$post = json_decode(file_get_contents('php://input'), true);

if ($login->logged == true && !isset($_GET['logout']))
{
    echo "
    {
        \"id\":$login->uid,
        \"username\":\"$login->username\",
        \"password\":\"$login->password\",
        \"userIsLogged\": true
    }";
    die("");
}

if (isset($post['username']))
{
    if ($login->Log($post['username'], $post['password']) )
    {
        if(!isset($_SESSION))
            session_start();
        
        $_SESSION['username']=$post['username'];
        $_SESSION['password']=$post['password'];
        $_SESSION['uid']=$login->uid;
        $_SESSION['lv']=$login->lv;
        {
echo "{
    \"id\":$login->uid,
    \"username\":\"$login->username\",
    \"password\":\"$login->password\",
    \"userIsLogged\": true
}";
        }
        die("");
    }
}
else if (isset($_GET['logout']))
{
    if ($login->logged)
    {
        $login->LogOff();
        die("Log out completed");
    }
    else
    {
        die("Not logged, nothing to do.");
    }
}

if ($login->logged == false)
{
    echo "{
        \"id\":0,
        \"username\":\"\",
        \"password\":\"\",
        \"userIsLogged\": false
    }";
    die("");
}
?>