<?php
$paramCounter = 0;
$parameters = '';
if(isset($_POST['nameOrId']) || isset($_POST['numberMin']) || isset($_POST['numberMax']) || isset($_POST['priceMin']) || isset($_POST['priceMax'])){
    $parameters .= ' where';
}
if(isset($_POST['numberMin'])){
    $parameters .= ' product_number>='.$_POST['numberMin'];
    $paramCounter++;
}
if(isset($_POST['numberMax'])){
    if($paramCounter != 0){$parameters .= ' and';}
    $parameters .= ' product_number<='.$_POST['numberMax'];
    $paramCounter++;
}
if(isset($_POST['priceMin'])){
    if($paramCounter != 0){$parameters .= ' and';}
    $parameters .= ' product_price>='.$_POST['priceMin'];
    $paramCounter++;    
}
if(isset($_POST['priceMax'])){
    if($paramCounter != 0){$parameters .= ' and';}
    $parameters .= ' product_price<='.$_POST['priceMax'];
    $paramCounter++;
}
if(isset($_POST['nameOrId'])){
    if($paramCounter != 0){$parameters .= ' and';}
    if(is_numeric($_POST['nameOrId'])){
        $parameters .= ' product_id='.$_POST['nameOrId'];
        $paramCounter++;    
    }else{
        $temp = $_POST['nameOrId'];
        $parameters .= " product_name LIKE '%$temp%'";
        $paramCounter++;   
    }
}


if(isset($_POST['order'])){
    $parameters .= ' order by '.$_POST['order'];
    if($_POST['desc']==2){
        $parameters .= ' desc';
    }
}

//SELECT INFORMATION ABOUT PRODUCTS
    $query = "select product_id, product_name, contractor_name, product_number, product_price, vat_value, product_group_name, product_status_name, product_unit_short
            from product_tab
                inner join contractor_tab on product_tab.product_producer =  contractor_tab.contractor_id
                inner join vat_tab on product_tab.product_vat =  vat_tab.vat_id
                inner join product_group_tab on product_tab.product_group =  product_group_tab.product_group_id
                inner join product_status_tab on product_tab.product_status = product_status_tab.product_status_id
                inner join product_unit_tab on product_tab.product_unit = product_unit_tab.product_unit_id".$parameters;     
    include_once('connect.php');
    
    function select($query){
    $returnArray = array();
    $fetch = mysql_query($query); 
        while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
            $rowArray['product_id'] = $row['product_id'];
            $rowArray['product_name'] = $row['product_name'];
            $rowArray['contractor_name'] = $row['contractor_name'];
            $rowArray['product_number'] = $row['product_number'];
            $rowArray['product_price'] = $row['product_price'];
            $rowArray['vat_value'] = $row['vat_value'];
            $rowArray['product_group_name'] = $row['product_group_name'];
            $rowArray['product_status_name'] = $row['product_status_name'];
            $rowArray['product_unit_short'] = $row['product_unit_short'];
            array_push($returnArray,$rowArray);
        }
        return $returnArray;
    }   

    echo json_encode(select($query));