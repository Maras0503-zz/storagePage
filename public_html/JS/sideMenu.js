additionalFunctions.sideMenu = (function(){
    var show = function(){
            $('#sideMenu').addClass('sideMenuShown');
            $('#sideMenu').removeClass('sideMenuHidden');
            $('#trigg').addClass("triggHidden");
            $('#trigg').removeClass("triggShown");
    };
    var hide = function(){
            $('#sideMenu').addClass('sideMenuHidden');
            $('#sideMenu').removeClass('sideMenuShown');
            $('#trigg').addClass("triggShown");
            $('#trigg').removeClass("triggHidden");
    };
    
    var listeners = function(){
        $('#trigg').on('click', function(){
            show();
        });
        $(document).on('click', function(e){
            if(e.target.id !== 'sideMenu' && e.target.id !== 'trigg' && e.target.id !== 'logo'){
                hide();
            }
        });
    };
    
    var whatsClicked = function(){
        $(document.body).on('click', function(e){
            console.log(e.target);
            console.log($(e.target).parent('div').attr('id'));
        });
    };
    var init = function(){
        listeners();
        //whatsClicked();
    };
    $(document).ready(function(){
        init(); 
    });
}());