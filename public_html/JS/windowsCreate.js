additionalFunctions.windowsCreate = (function(){

var addUserWindowCounter = 0;
var addProductWindowCounter = 0;
var editProductWindowCounter = 0;
var elementHold = "none";
var editedProduct = new Object();
editedProduct.id = 0;
editedProduct.price = 0;

var mouseDown = function(){
    $(document).on('mousedown', function(e){
        if($(e.target).attr('class') == 'titleBar')
        elementHold = $(e.target).parent('div').attr('id');
        if($('#'+elementHold).attr('class')=='added'){
            $('.added').css("z-index", '50');
            $('#'+elementHold).css("z-index", '55');
        }
    });
    $(document).on('mouseup', function(){
        elementHold = "none";       
    });
};

var getMouseX = function(){
    var x;
    x = event.clientX;
    return x;
};
var getMouseY = function(){
    var y;
    y = event.clientY;
    return y; 
};
var changeWinPos = function(id,x,y){
    var ele = document.getElementById(id);
    ele.style.left = ""+(x-250)+"px";
    ele.style.top = ""+(y-15)+"px";
};
    
var move = function(){      
var x = 0;
var y = 0;
$(document).on('mousemove', function(){
        if(elementHold !== "none"){
            x = getMouseX();
            y = getMouseY();
            changeWinPos(elementHold, x, y);
        }
    });
        
};

var createAddUserWindow = function(buttonID, targetID){
    $('#'+buttonID).on('click', function(){
        var container = document.getElementById(targetID);
        getTypes();
        if (addUserWindowCounter === 0){
            container.innerHTML += "<div id='addUserWindow' class='added'>\n\
                                        <div class='titleBar'>Dodawanie użytkownika</div>\n\
                                            <div class='closeButton'>X</div>\n\
                                            <div  autocomplete='off' class='windowContent'>\n\
                                                IMIĘ     : <input id='fname' class='formEle' type='text'/><br>\n\
                                                NAZWISKO : <input id='lname' class='formEle' type='text'/><br>\n\
                                                LOGIN    : <input id='login' class='formEle' type='text'/><br>\n\
                                                HASŁO    : <input id='pass' class='formEle' type='password'/><br>\n\
                                                TYP KONTA: "+getTypes()+"<br><br>\n\
                                                <button id='confirmAddUser' class='button'>DODAJ</button><div id='dane'>\n\
                                                <div id='addUserAlert'></div>\n\
                                            </div>\n\
                                    </div>"; 
            addUserWindowCounter = 1;
            functionAfterCreateWindow();
        }
    });
};

var createAddProductWindow = function(buttonID, targetID){
    $('#'+buttonID).on('click', function(){
        var container = document.getElementById(targetID);
        if (addProductWindowCounter === 0){
            container.innerHTML += "<div id='addProductWindow' class='added'>\n\
                                        <div class='titleBar'>Dodawanie produktu</div>\n\
                                            <div class='closeButton'>X</div>\n\
                                            <div  autocomplete='off' class='windowContent'>\n\
                                                NAZWA PRODUKTU  : <input id='name' class='formEle' type='text'><br>\n\
                                                PRODUCENT       : "+getProducers('producers')+"<br>\n\
                                                ILOŚĆ NA MC     : <input id='number' class='formEle' type='number' step=0.01><br>\n\
                                                CENA            : <input id='price' class='formEle' type='number' step=0.01><br>\n\
                                                STAWKA VAT      : "+getVAT('vat')+"<br>\n\
                                                KOD EAN         : <input id='ean' class='formEle' type='number' step=1><br>\n\
                                                GRUPA PRODUKTOWA: "+getGroups('groups')+"<br>\n\
                                                STATUS PRODUKTU : "+getStatues('statues')+"<br>\n\
                                                JEDNOSTKA MIARY : "+getUnits('units')+"<br><br>\n\
                                                <button id='confirmAddProduct' class='button'>DODAJ</button><div id='dane'>\n\
                                                <div id='addProductAlert'></div>\n\
                                            </div>\n\
                                    </div>"; 
            addProductWindowCounter = 1;
            functionAfterCreateWindow();
        }  
    });
};

var createEditProductWindow = function(buttonID, targetID){
    $('#'+buttonID).on('click', function(){
        var container = document.getElementById(targetID);
        if (addProductWindowCounter === 0){
            container.innerHTML += "<div id='editProductWindow' class='added'>\n\
                                        <div class='titleBar'>Edycja produktu</div>\n\
                                            <div class='closeButton'>X</div>\n\
                                            <div  autocomplete='off' class='windowContent'>\n\
                                                ID PRODUKTU     : <input id='editProductId' class='formEle' type='text'><br> \n\
                                                <button id='findProduct' class='button'>SZUKAJ</button><br><br>\n\
                                                NAZWA PRODUKTU  : <input id='editProductName' class='formEle' type='text'><br>\n\
                                                PRODUCENT       : "+getProducers('editProductProducer')+"<br>\n\
                                                ILOŚĆ NA MC     : <input id='editProductNumber' class='formEle' type='number' step=0.01><br>\n\
                                                CENA            : <input id='editProductPrice' class='formEle' type='number' step=0.01><br>\n\
                                                STAWKA VAT      : "+getVAT('editProductVat')+"<br>\n\
                                                KOD EAN         : <input id='editProductEan' class='formEle' type='number' step=1><br>\n\
                                                GRUPA PRODUKTOWA: "+getGroups('editProductGroup')+"<br>\n\
                                                STATUS PRODUKTU : "+getStatues('editProductStatus')+"<br>\n\
                                                JEDNOSTKA MIARY : "+getUnits('editProductUnit')+"<br><br>\n\
                                                <button id='confirmEditProduct' class='button'>ZAPISZ</button><div id='dane'>\n\
                                                <div id='editProductAlert'></div>\n\
                                            </div>\n\
                                    </div>"; 
            editProductWindowCounter = 1;
            functionAfterCreateWindow();
        }  
    });
};

var closeWindow = function(){
    $('.closeButton').on('click', function(e){
        //$('#'+$(e.target).parent('div').attr('id')).detach();
        $("#"+$(e.target).parent('div').attr('id')).fadeOut("slow", function() {
            $(this).detach();
        });
            switch($(e.target).parent('div').attr('id')) {
                case 'addUserWindow':
                    addUserWindowCounter = 0;
                    break;
                case 'addProductWindow':
                    addProductWindowCounter = 0;
                    break;
                case 'editProductWindow':
                    editProductWindowCounter = 0;
                    break;
            }
        
    });
};
//GET TYPES ==================================================================OK
var getTypes = function (){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getTypes.php',            
      success: function(data){
          ans = getTypesAns(data);
      }
    });
    return ans;
};

var getTypesAns = function(data){
    var ans = "";
    ans += "<select id='type' class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['user_type_id']+"'>"+value['user_type_name']+"</option>";              
    });
    ans += "</select>";
    return ans;
};

//GET VAT=====================================================================OK
var getVAT = function (newId){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getVAT.php',            
      success: function(data){
          ans = getVATAns(data, newId);
      }
    });
    return ans;
};

var getVATAns = function(data, newId){
    var ans = "";
    ans += "<select id="+newId+" class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['vat_id']+"'>"+value['vat_value']+"%"+"</option>";              
    });
    ans += "</select>";
    return ans;
};

//GET UNITS===================================================================OK
var getUnits = function (newId){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getUnits.php',            
      success: function(data){
          ans = getUnitsAns(data, newId);
      }
    });
    return ans;
};

var getUnitsAns = function(data, newId){
    var ans = "";
    ans += "<select id="+newId+" class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['product_unit_id']+"'>"+value['product_unit_name']+"</option>";              
    });
    ans += "</select>";
    return ans;
};

//GET STATUS==================================================================OK
var getStatues = function (newId){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getStatues.php',            
      success: function(data){
          ans = getStatuesAns(data, newId);
      }
    });
    return ans;
};

var getStatuesAns = function(data, newId){
    var ans = "";
    ans += "<select id="+newId+" class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['product_status_id']+"'>"+value['product_status_name']+"</option>";              
    });
    ans += "</select>";
    return ans;
};

//GET PRODUCT GROUP===========================================================OK
var getGroups = function (newId){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getGroups.php',            
      success: function(data){
          ans = getGroupsAns(data, newId);
      }
    });
    return ans;
};

var getGroupsAns = function(data, newId){
    var ans = "";
    ans += "<select id="+newId+" class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['product_group_id']+"'>"+value['product_group_name']+"</option>";              
    });
    ans += "</select>";
    return ans;
};

//GET PRODUCERS=================================================================
var getProducers = function (newId){
    var ans ="";
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getProducers.php',            
      success: function(data){
          ans = getProducersAns(data, newId);
      }
    });
    return ans;
};

var getProducersAns = function(data, newId){
    var ans = "";
    ans += "<select id="+newId+" class='formEle'>";
    $.each(data,function(index, value){
       ans +="<option value='"+value['producer_id']+"'>"+value['producer_name']+"</option>";              
    });
    ans += "</select>";
    return ans;
};






var addUser = function(fname, lname, login, pass, type){
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/addUser.php',
      data: "fname="+fname+"&lname="+lname+"&login="+login+"&pass="+pass+"&type="+type  
    });        
};

var listeners = function(){
    createAddUserWindow('addUser', 'floatingWindows');
    createAddProductWindow('addProduct', 'floatingWindows');
    createEditProductWindow('editProduct', 'floatingWindows');
};
var addUserListener = function(){
        $('#confirmAddUser').on('click', function(){
            getLogins();
            if($('#fname').val() == "" || $('#lname').val() == "" || $('#login').val() == "" || $('#pass').val() == "" ){
                $('#addUserAlert').html('wypełnij wszyskie pola');               
            }else{
                if(window.localStorage.getItem('loginExist')==1){
                    $('#addUserAlert').html('podany login istnieje już w bazie');
                }else{
                    addUser($('#fname').val(),$('#lname').val(),$('#login').val(),$('#pass').val(),$('#type').val());
                    $('#addUserWindow').detach();
                    addUserWindowCounter = 0;
                }
            }
        });    
};

var addProduct = function(name, producer, number, price, vat, ean, groups, statues, units){
    var nameUC = name.toUpperCase();
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/addProduct.php',
      data: "name="+nameUC+"&producers="+producer+"&number="+number+"&price="+price+"&vat="+vat+"&ean="+ean+"&groups="+groups+"&statues="+statues+"&units="+units
    });        
};

var addProductListener = function(){
    $('#confirmAddProduct').on('click', function(){
        if($('#name').val() == "" || $('#number').val() == "" || $('#price').val() == "" || $('#ean').val() == "" ){
            $('#addProductAlert').html('wypełnij wszyskie pola');               
        }else{
            console.log($('#name').val(),$('#producers').val(),$('#number').val(),$('#price').val(),$('#vat').val(),$('#ean').val(),$('#groups').val(),$('#statues').val(),$('#units').val());
            addProduct($('#name').val(),$('#producers').val(),$('#number').val(),$('#price').val(),$('#vat').val(),$('#ean').val(),$('#groups').val(),$('#statues').val(),$('#units').val());
            $('#addProductWindow').detach();
            addProductWindowCounter = 0;
        }
    });    
};
var editProductListener = function(){
    $('#findProduct').on('click', function(){
        getProductById();
    });
    $('#confirmEditProduct').on('click', function(){
        if(editedProduct.id == 0){
            $('#editProductAlert').html('Najpierw wyszukaj produkt do edycji');
        }
        if(editedProduct.id != $('#editProductId').val() && editedProduct.id != 0){
            $('#editProductAlert').html('Zmieniono id w formularzu brak możliwości edycji, wyszukaj towar od nowa');   
        }
        if(editedProduct.id != 0 && editedProduct.id == $('#editProductId').val()){
            editProduct();
        }
    });
};
var editProduct = function(){
    var aboutProduct = {};
    var nameUC ='';
    if(
        editedProduct.id == $('#editProductId').val() &&
        editedProduct.name == $('#editProductName').val() &&
        editedProduct.producer == $('#editProductProducer').val() &&
        editedProduct.number == $('#editProductNumber').val() &&
        editedProduct.price == $('#editProductPrice').val() &&
        editedProduct.vat == $('#editProductVat').val() &&
        editedProduct.ean == $('#editProductEan').val() &&
        editedProduct.group == $('#editProductGroup').val() &&
        editedProduct.status == $('#editProductStatus').val() &&
        editedProduct.unit == $('#editProductUnit').val() 
    ){
        $('#editProductAlert').html('Nic nie zmieniono');
        setTimeout(function() {
           $('#editProductAlert').html('');
        }, 2000);
    }else{
        nameUC = $('#editProductName').val();
        nameUC = nameUC.toUpperCase();
        aboutProduct['editProductId'] = $('#editProductId').val();
        aboutProduct['editProductName'] = nameUC;
        aboutProduct['editProductProducer'] = $('#editProductProducer').val();
        aboutProduct['editProductNumber'] = $('#editProductNumber').val();
        aboutProduct['editProductPrice'] = $('#editProductPrice').val();
        aboutProduct['editProductVat'] = $('#editProductVat').val();
        aboutProduct['editProductEan'] = $('#editProductEan').val();
        aboutProduct['editProductGroup'] = $('#editProductGroup').val();
        aboutProduct['editProductStatus'] = $('#editProductStatus').val();
        aboutProduct['editProductUnit'] = $('#editProductUnit').val();
        if(editedProduct.price != $('#editProductPrice').val()){
            aboutProduct['lastPrice'] = editedProduct.price;
            editedProduct.price = $('#editProductPrice').val(); 
        }
        $.ajax({       
            type: 'POST',
            async: false,
            dataType: 'json',
            data: aboutProduct,
            url: 'PHP/editProduct.php'
        });
        $('#editProductAlert').html('Zmieniono parametry produktu!');
        setTimeout(function() {
          $('#editProductAlert').html('');
        }, 2000);
        editedProduct.id = $('#editProductId').val();
        editedProduct.name = $('#editProductName').val();
        editedProduct.producer = $('#editProductProducer').val();
        editedProduct.number = $('#editProductNumber').val();
        editedProduct.vat = $('#editProductVat').val();
        editedProduct.ean = $('#editProductEan').val();
        editedProduct.group = $('#editProductGroup').val();
        editedProduct.status = $('#editProductStatus').val();
        editedProduct.unit = $('#editProductUnit').val();

    }
};
var getProductById = function(){
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      data: { id: $('#editProductId').val() },
      url: 'PHP/getProductById.php',            
      success: function(data){
        if (!$.trim(data)){   
                $('#editProductName').val('');
                $('#editProductProducer').val('');
                $('#editProductNumber').val('');
                $('#editProductPrice').val('');
                $('#editProductVat').val('');
                $('#editProductEan').val('');
                $('#editProductGroup').val('');
                $('#editProductStatus').val('');
                $('#editProductUnit').val(''); 
                $('#editProductAlert').html('Nie odnaleziono produktu o podanym id');
                editedProduct.id = 0;
        }
        else{   
            $.each(data,function(index, value){
                $('#editProductName').val(value['product_name']);
                $('#editProductProducer').val(value['product_producer']);
                $('#editProductNumber').val(value['product_number']);
                $('#editProductPrice').val(value['product_price']);
                $('#editProductVat').val(value['product_vat']);
                $('#editProductEan').val(value['product_ean']);
                $('#editProductGroup').val(value['product_group']);
                $('#editProductStatus').val(value['product_status']);
                $('#editProductUnit').val(value['product_unit']);    
                $('#editProductAlert').html('');
                editedProduct.id = $('#editProductId').val();
                editedProduct.name = $('#editProductName').val();
                editedProduct.producer = $('#editProductProducer').val();
                editedProduct.number = $('#editProductNumber').val();
                editedProduct.price = $('#editProductPrice').val();
                editedProduct.vat = $('#editProductVat').val();
                editedProduct.ean = $('#editProductEan').val();
                editedProduct.group = $('#editProductGroup').val();
                editedProduct.status = $('#editProductStatus').val();
                editedProduct.unit = $('#editProductUnit').val();
            });
        }

        }
    });  
};
var getLogins = function (){
    $.ajax({       
      type: 'POST',
      async: false,
      dataType: 'json',
      url: 'PHP/getLogins.php',            
      success: function(data){
        var wyn = 0;
        $.each(data,function(index, value){
           if($('#login').val() == value['user_login']){
               wyn = 1;
           }              
        });
        window.localStorage.setItem('loginExist', wyn);
      }
    });
}; 

var functionAfterCreateWindow = function(){
    addUserListener();
    editProductListener();
    addProductListener();
    closeWindow();
    move();

};

var init = function(){
    mouseDown();
    listeners();
};

$(document).ready(function(){
    init(); 
});

}());