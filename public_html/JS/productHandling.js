additionalFunctions.productHandling = (function(){
    var firstShow = 0;
    var tableVisable = 0;
    var byId = 0;
    var byName = 0;
    var byNumber = 0;
    var byPrice = 0;
    var byStatus = 0;
    var ans = {};
    var show = function(){
            $('#productsTab').addClass('productsTabShown');
            $('#productsTab').removeClass('productsTabHidden');
            if(firstShow == 0){
                $('#productsContent').html(getProducts(''));
                firstShow = 1;
            }
            sortingParameters();
            tableVisable = 1;
    };
    var hide = function(){
            $('#productsTab').addClass('productsTabHidden');
            $('#productsTab').removeClass('productsTabShown');
            tableVisable = 0;
    };
    
    var listeners = function(){
        $('#products').on('click', function(){
            show();
        });
        $('#prodTrigg').on('click', function(){
            if(tableVisable == 1){
                hide();
            }else{
                show();
            }
        });
        $('#search').on('click', function(){
            searchParameters();
            $('#productsContent').html(getProducts(ans));
            sortingParameters();
            
        });
        $('#reset').on('click', function(){
            reset();
            ans = {};
            $('#productsContent').html(getProducts(ans));
            sortingParameters();
        });
    };
    
var getProducts = function (add){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      data: add,
      dataType: 'json',
      url: 'PHP/getProducts.php',            
      success: function(data){
          ans = getProductsAns(data);
      }
    });
    return ans;
};

var getProductsAns = function(data){
    var ans = "";
    var counter = 1;
    ans += "<table class='productTab'>\n\
                <thead class='titleRow'>\n\
                    <th>ID <button id='sortById' class='sortButt'>↓↑</button></th>\n\
                    <th>NAZWA <button id='sortByName' class='sortButt'>↓↑</button></th>\n\
                    <th>PRODUCENT</th>\n\
                    <th>ILOŚĆ <button id='sortByNumber' class='sortButt'>↓↑</button></th>\n\
                    <th>CENA [zł] <button id='sortByPrice' class='sortButt'>↓↑</button></th>\n\
                    <th>VAT [%]</th>\n\
                    <th>GRUPA</th>\n\
                    <th>STATUS <button id='sortByStatus' class='sortButt'>↓↑</button></th>\n\
                    <th>JEDN.</th>\n\
                </thead>\n\
                <tbody>";
    $.each(data,function(index, value){
        if(counter % 2 == 0){
            ans +="<tr class='highlighted'><td>"+value['product_id']+"</td><td>"+value['product_name']+"</td><td>"+value['contractor_name']+"</td><td>"+value['product_number']+"</td><td>"+value['product_price']+"</td><td>"+value['vat_value']+"</td><td>"+value['product_group_name']+"</td><td>"+value['product_status_name']+"</td><td>"+value['product_unit_short']+"</td></tr>";              
        }else{
            ans +="<tr class='normal'><td>"+value['product_id']+"</td><td>"+value['product_name']+"</td><td>"+value['contractor_name']+"</td><td>"+value['product_number']+"</td><td>"+value['product_price']+"</td><td>"+value['vat_value']+"</td><td>"+value['product_group_name']+"</td><td>"+value['product_status_name']+"</td><td>"+value['product_unit_short']+"</td></tr>";
        }     
        counter++;
    });
    ans += "</tbody></table>";
    
    return ans;
};
var searchParameters = function(){
    ans['nameOrId'] = undefined;
    ans['numberMin'] = undefined; 
    ans['numberMax'] = undefined;
    ans['priceMin'] = undefined;
    ans['priceMax'] = undefined;
    if($('#nameOrId').val()!=''){
        var temp = ''+$('#nameOrId').val();
        temp = temp.toUpperCase();
        ans['nameOrId'] = temp;
    }
    if($('#numberMin').val()!=''){
       ans['numberMin'] = $('#numberMin').val(); 
    }
    if($('#numberMax').val()!=''){
        ans['numberMax'] = $('#numberMax').val();
    }
    if($('#priceMin').val()!=''){
        ans['priceMin'] = $('#priceMin').val();
    }   
    if($('#priceMax').val()!=''){
        ans['priceMax'] = $('#priceMax').val();
    }
};
var reset = function(){
    byId = 0;
    byName = 0;
    byNumber = 0;
    byPrice = 0;
    byStatus = 0;    
    $('#nameOrId').val('');
    $('#numberMin').val('');
    $('#numberMax').val('');
    $('#priceMin').val('');
    $('#priceMax').val('');
};
var sortingParameters = function(){

    $('#sortById').on('click', function(){
        if(byId == 1){
            byId = 2;
            ans['order'] = 'product_id';
            ans['desc'] = 2;
            //ans = {order: "product_id", desc: "2"};
        }else{
            byId = 1;   
            ans['order'] = 'product_id';
            ans['desc'] = 1;
            //ans = {order: "product_id", desc: "1"};
        }
        byName = 0;
        byNumber = 0;
        byPrice = 0;
        byStatus = 0;
        searchParameters();
        $('#productsContent').html(getProducts(ans));
        sortingParameters();
        console.log(ans);
    });
    $('#sortByName').on('click', function(){
        byId = 0;
        if(byName == 1){
            byName = 2;
            ans['order'] = 'product_name';
            ans['desc'] = 2;
            //ans = {order: "product_name", desc: "2"};
        }else{
            byName = 1;
            ans['order'] = 'product_name';
            ans['desc'] = 1;
            ans = {order: "product_name", desc: "1"};
        }
        byNumber = 0;
        byPrice = 0;
        byStatus = 0;
        searchParameters();
        $('#productsContent').html(getProducts(ans));
        sortingParameters();
        console.log(ans);
    });
    $('#sortByNumber').on('click', function(){
        byId = 0;
        byName = 0;
        if(byNumber == 1){
            byNumber = 2;
            ans['order'] = 'product_number';
            ans['desc'] = 2;
            //ans = {order: "product_number", desc: "2"};
        }else{
            byNumber = 1;
            ans['order'] = 'product_number';
            ans['desc'] = 1;
            //ans = {order: "product_number", desc: "1"};
        }
        byPrice = 0;
        byStatus = 0;  
        searchParameters();
        $('#productsContent').html(getProducts(ans));
        sortingParameters();
        console.log(ans);
    });
    $('#sortByPrice').on('click', function(){
        byId = 0;
        byName = 0;
        byNumber = 0;
        if(byPrice == 1){
            byPrice = 2;
            ans['order'] = 'product_price';
            ans['desc'] = 2;
            //ans = {order: "product_price", desc: "2"};
        }else{
            byPrice = 1;
            ans['order'] = 'product_price';
            ans['desc'] = 1;
            //ans = {order: "product_price", desc: "1"};
        }
        byStatus = 0;    
        searchParameters();
        $('#productsContent').html(getProducts(ans));
        sortingParameters();
        console.log(ans);
    });
    $('#sortByStatus').on('click', function(){
        byId = 0;
        byName = 0;
        byNumber = 0;
        byPrice = 0;
        if(byStatus == 1){
            byStatus = 2;
            ans['order'] = 'product_status_name';
            ans['desc'] = 2;
            //ans = {order: "product_status_name", desc: "2"};
        }else{
            byStatus = 1;
            ans['order'] = 'product_status_name';
            ans['desc'] = 1;
            //ans = {order: "product_status_name", desc: "1"};
        }    
        searchParameters();
        $('#productsContent').html(getProducts(ans));
        sortingParameters();
        console.log(ans);
    });
};
    var init = function(){
        listeners();
    };
    $(document).ready(function(){
        init(); 
    });
}());