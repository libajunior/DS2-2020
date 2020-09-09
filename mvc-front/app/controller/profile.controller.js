(function(app) {

    app.controller('ProfileController', function( $scope, $sessionStorage, $routeParams, ProfileService ) {
        //Pega o usuário logado
        $scope.logado = $sessionStorage.logado;

        //Define perfil
        $scope.profile = {
            usuario: {},
            fotos: [],
            seguidores: [],
            seguindo: []
        }

        //Busca os dados do perfil do usuário
        ProfileService.perfil( $routeParams.profile )
            .then(result => {
                //Atualiza o usurio do profile
                $scope.profile.usuario = result.data;
            })
            .catch(error => {
                $scope.msgErro = error.message
            });

        ProfileService.fotos( $routeParams.profile )
            .then(result => {
                //Atualiza o usurio do profile
                $scope.profile.fotos = result.data;
            })
            .catch(error => {
                $scope.msgErro = error.message
            });
    });

})( appDS2 );