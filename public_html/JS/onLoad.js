additionalFunctions.onLoad = (function(){
    var setUser = function(){
        $('#userName').html(window.sessionStorage.getItem('userName')); 
    };
    var logout = function(){
        $('#logout').on('click', function(){
            window.sessionStorage.setItem('userName', "");
            window.sessionStorage.setItem('userPass', "");
            window.sessionStorage.setItem('userSession', 0);
            window.location.replace("PAGES/login.html");
        });
    };
    var ifNotAdmin = function(){
        if(window.sessionStorage.getItem('userType')!=1){
            $('#addUser').detach();
            $('#editProduct').detach();
        }        
    };
    var init = function(){
        logout();
        setUser();
        ifNotAdmin();
    };
    $(document).ready(function(){
        init(); 
    });
}());