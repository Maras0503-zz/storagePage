<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from product_group_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['product_group_id'] = $row['product_group_id'];
            $rowArray['product_group_name'] = $row['product_group_name'];
            $rowArray['product_group_short'] = $row['product_group_short'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));