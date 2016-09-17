<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from product_status_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['product_status_id'] = $row['product_status_id'];
            $rowArray['product_status_name'] = $row['product_status_name'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));