<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from product_unit_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['product_unit_id'] = $row['product_unit_id'];
            $rowArray['product_unit_name'] = $row['product_unit_name'];
            $rowArray['product_unit_short'] = $row['product_unit_short'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));