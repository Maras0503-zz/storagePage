<?php
//if(isset($_POST['login']))

    $login = $_POST['login'];



//SELECT ALL INFORMATION FROM USER_TAB
    $query = "select * from user_tab where user_login="."'".$login."'";


    include 'connect.php';
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
    
    while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
        $rowArray['user_pass'] = $row['user_pass'];
        $rowArray['user_id'] = $row['user_id'];
        $rowArray['user_fname'] = $row['user_fname'];
        $rowArray['user_lname'] = $row['user_lname'];
        $rowArray['user_type'] = $row['user_type'];
        $rowArray['user_pass_expiration'] = $row['user_pass_expiration'];
        array_push($returnArray,$rowArray);
    }

        return $returnArray;
    }   

    echo json_encode(select($query));