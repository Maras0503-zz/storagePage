<?php
//SELECT TYPES FROM TYPE TAB
    $query = "select * from contractor_tab";


    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['producer_id'] = $row['contractor_id'];
            $rowArray['producer_name'] = $row['contractor_name'];
            $rowArray['producer_nip'] = $row['contractor_nip'];
            $rowArray['producer_postal_code'] = $row['contractor_postal_code'];
            $rowArray['producer_city'] = $row['contractor_city'];
            $rowArray['producer_street'] = $row['contractor_street'];
            $rowArray['producer_country'] = $row['contractor_country'];
            $rowArray['producer_provider'] = $row['contractor_provider'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));