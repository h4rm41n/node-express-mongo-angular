// import angular from 'angular';

var app = angular.module('crud',[])
	.controller('appCtrl',function($scope,$http){
		var disabledBtn = function(statusBtnSave, statusBtnUpdate){
			$scope.btnSave = statusBtnSave;
			$scope.btnUpdate = statusBtnUpdate;
		}

		var reload = function(){
			$http.get('/contact').success(function(res){
				console.log('I got a requested');
				$scope.persons = res;
				$scope.person = "";
				disabledBtn(false,true);
			});
		};

		reload();

		
		$scope.addContact = function(){
			$http.post('/contact',$scope.person).success(function(res){
				console.log(res);
				reload();
			});
		};

		$scope.removeContact = function(id){
			console.log(id)
			$http.delete('/contact/'+id).success(function(res){
				console.log(res);
				reload();
			});
		}

		$scope.editContact = function(id){
			disabledBtn(true,false);
			console.log(id);
			$http.get('/contact/'+id).success(function(res){
				$scope.person = res;
			});


		}

		$scope.updateContact = function(){
			console.log($scope.person._id);
			$http.put('/contact/'+$scope.person._id,$scope.person).success(function(res){
				console.log(res);
				reload();
			})
		}
	});
