(function(app) {

    app.controller('ProfileController', function( $scope, $sessionStorage, $routeParams, ProfileService,
                                                  CurtidaService   ) {
        //Pega o usuário logado
        $scope.logado = $sessionStorage.logado;

        //Define perfil
        $scope.profile = {
            usuario: {},
            fotos: [],
            seguidores: [],
            seguindo: []
        }

        $scope.curtidas = [];

        //Chama a service de curtidas
        $scope.showCurtidas = (foto) => {
            CurtidaService.curtidas($scope.profile.usuario.username, foto)
                .then(result => {
                    $scope.curtidas = result.data;
                })
                .catch(error => {
                    $scope.msgErro = error.message
                });
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