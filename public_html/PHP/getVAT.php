<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from vat_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['vat_id'] = $row['vat_id'];
            $rowArray['vat_value'] = $row['vat_value'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));