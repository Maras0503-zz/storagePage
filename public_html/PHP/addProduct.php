<?php
    $product_name = $_POST['name'];
    $product_producer = $_POST['producers'];
    $product_number = $_POST['number'];
    $product_price = $_POST['price'];
    $product_vat = $_POST['vat'];
    $product_ean = $_POST['ean'];
    $product_group = $_POST['groups'];
    $product_status = $_POST['statues'];
    $product_unit = $_POST['units'];
    $product_last_price = 0;

//INSERT PRODUCT
    $query = "INSERT INTO product_tab(product_name, product_producer, product_number, product_price, product_vat, product_last_price, product_ean, product_group, product_status, product_unit ) VALUES('$product_name','$product_producer','$product_number','$product_price','$product_vat','$product_last_price','$product_ean','$product_group','$product_status','$product_unit')";


include_once('connect.php');

function insert($query){
    mysql_query($query); 
}   

echo json_encode(insert($query));