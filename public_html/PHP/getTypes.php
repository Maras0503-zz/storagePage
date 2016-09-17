<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from user_type_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['user_type_id'] = $row['user_type_id'];
            $rowArray['user_type_name'] = $row['user_type_name'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));