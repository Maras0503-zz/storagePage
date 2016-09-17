<?php
    $newPass = $_POST['newPass'];
    $userId = $_POST['userId'];
    $exp = time() + (30*24*60*60);



//CHANGE PASSWORD
    $query = "update user_tab set user_pass_expiration='".$exp."' , user_pass='".$newPass."' where user_id='".$userId."'";

include_once('connect.php');

function insert($query){
    mysql_query($query); 
}   

echo json_encode(insert($query));