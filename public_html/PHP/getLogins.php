<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select user_login from user_tab";


    include_once 'connect.php';
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['user_login'] = $row['user_login'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));