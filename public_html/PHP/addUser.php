<?php
    $login = $_POST['login'];
    $pass = $_POST['pass'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $type = $_POST['type'];
    $exp = 1;//time() + (30*24*60*60);



//INSERT USER
    $query = "INSERT INTO user_tab(user_fname, user_lname, user_login, user_pass, user_type, user_pass_expiration) VALUES('$fname','$lname','$login','$pass','$type','$exp')";


include_once('connect.php');

function insert($query){
    mysql_query($query); 
}   

echo json_encode(insert($query));