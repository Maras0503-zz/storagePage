additionalFunctions.redirect = (function(){
    if (window.sessionStorage.getItem('userSession')==undefined){
        window.sessionStorage.setItem('userSession' , 0);
    }
    var checkLogin = function(){
        if(window.sessionStorage.getItem('userSession') == 0){
            window.location.replace("PAGES/login.html");
    }  
    };
    var init = function(){
        checkLogin();
    };
    
    $(document).ready(function(){
        init(); 
    });
}());