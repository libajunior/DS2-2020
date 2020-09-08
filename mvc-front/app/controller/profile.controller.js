(function(app) {

    app.controller('ProfileController', function( $scope, $sessionStorage ) {
        //Pega o usuário logado
        $scope.logado = $sessionStorage.logado;
    });

})( appDS2 );