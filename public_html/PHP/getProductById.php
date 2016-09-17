<?php
$parameters = '';

if(isset($_POST['id'])){
    $parameters .= ' where product_id='.$_POST['id'];
}

//SELECT INFORMATION ABOUT PRODUCTS
    $querry = "select * from product_tab ".$parameters;     
    
include_once('connect.php');

function select($query){
$returnArray = array();
$fetch = mysql_query($query); 
    while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {   
        $rowArray['product_id'] = $row['product_id'];
        $rowArray['product_name'] = $row['product_name'];
        $rowArray['product_producer'] = $row['product_producer'];
        $rowArray['product_number'] = $row['product_number'];
        $rowArray['product_price'] = $row['product_price'];
        $rowArray['product_vat'] = $row['product_vat'];
        $rowArray['product_group'] = $row['product_group'];
        $rowArray['product_ean'] = $row['product_ean'];
        $rowArray['product_status'] = $row['product_status'];
        $rowArray['product_unit'] = $row['product_unit'];
        array_push($returnArray,$rowArray);
    }
    return $returnArray;
}   

echo json_encode(select($querry));