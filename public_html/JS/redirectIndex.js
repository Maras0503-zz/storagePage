additionalFunctions.redirect = (function(){
    var login = function(){
        $('#confirm').on('click', function(){
            getData($('#login').val());
            if(window.sessionStorage.getItem('userPass') == $('#pass').val()){
                var time = Math.floor(new Date().getTime() / 1000);
                if(window.localStorage.getItem('passTimeExp') > time){
                    window.sessionStorage.setItem('userPass', 'password correct');
                    window.location.replace("../index.html");                    
                }else{
                    var cont = "NOWE HASŁO   : <input id='newPass' class='formEle' type='password'><br>\n\
                                POWTÓRZ HASŁO: <input id='repPass' class='formEle' type='password'><br><br>\n\
                                <button id='changePass' class='button'>ZMIEŃ</button>\n\
                                <div id='alert'></div>";
                    $('#loginForm').html(cont);
                    changePassButtonAction();
                }
                

            }else{
                $('#alert').html('niepoprawny login bądź hasło');    
            }     
        });
    };
    var changePassButtonAction = function(){
        $('#changePass').on('click', function(){
            var newPass = $('#newPass').val();
            var userID = window.sessionStorage.getItem('userSession');
            console.log(newPass,userID);
            if(changePassConditions($('#newPass').val(), $('#repPass').val())){
                $.ajax({       
                    type: 'POST',
                    data: "newPass="+newPass+"&userId="+userID,
                    async: false,
                    dataType: 'json',
                    url: '../PHP/changePass.php'           
                });
                window.sessionStorage.setItem('userPass', 'password correct');
                window.location.replace("../index.html");    
            } else {
                $('#alert').html('hasła różnią się bądź są krótsze niż 8 znaków');
            }
        });
    };
    var changePassConditions = function(newPass, repPass){
        conditionalsCounter = 0;
        correct = false;
        if(newPass.length > 7){conditionalsCounter++;}
        if(newPass == repPass){conditionalsCounter++;}
        if(conditionalsCounter == 2){correct = true;}
        
        return correct;
        
    };
    
    var getData = function (login){
        $.ajax({       
          type: 'POST',
          data: "login="+login,
          async: false,
          dataType: 'json',
          url: '../PHP/getPass.php',           
          success: function(data){
            $.each(data,function(index, value){
                window.sessionStorage.setItem('userSession' , value['user_id']);
                window.sessionStorage.setItem('userPass' , value['user_pass']);
                window.sessionStorage.setItem('userType' , value['user_type']);
                window.localStorage.setItem('passTimeExp', value['user_pass_expiration']);
                window.sessionStorage.setItem('userName', "Zalogowany: "+value['user_fname']+" "+value['user_lname']);
            });
          }
        });
    }; 
    var init = function(){
        login();
    };
    
    $(document).ready(function(){
        init(); 
    });
}());