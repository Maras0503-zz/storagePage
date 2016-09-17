<?php
        $productId = $_POST['editProductId'];
        $productName = $_POST['editProductName'];
        $productProducer = $_POST['editProductProducer'];
        $productNumber = $_POST['editProductNumber'];
        $productPrice = $_POST['editProductPrice'];
        $productVat = $_POST['editProductVat'];
        $productEan = $_POST['editProductEan'];
        $productGroup = $_POST['editProductGroup'];
        $productStatus = $_POST['editProductStatus'];
        $productUnit = $_POST['editProductUnit'];
//EDIT PRODUCT
    $query =   "update product_tab set product_name='".$productName."' ,"
                            . " product_producer='".$productProducer."' ,"
                            . " product_number='".$productNumber."' ,"
                            . " product_price='".$productPrice."' ,"
                            . " product_vat='".$productVat."' ,"
                            . " product_ean='".$productEan."' ,"
                            . " product_group='".$productGroup."' ,"
                            . " product_status='".$productStatus."' ,";



        if(isset($_POST['lastPrice'])){
            $lastPrice = $_POST['lastPrice'];
            $query .=" product_last_price='".$lastPrice."' ,"; 
            
        }



        $query .= " product_unit='".$productUnit."'"
               . " where product_id='".$productId."'";

include_once('connect.php');

function insert($query){
    mysql_query($query); 
}   

echo json_encode(insert($query));