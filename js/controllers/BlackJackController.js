app.controller('BlackJackController', ['$scope','$interval','$q', function($scope, $interval, $q){

	$scope.test 		= "Shanice is testing";
	$scope.my_score 	= 0;
	$scope.dealer_score = 0;
	$scope.myDeal 		= false;
	$scope.dealerDeal 	= false;
	$scope.dealDisable 	= false;
	$scope.hitDisable 	= false;
	$scope.message 		= false;

	$scope.deal = function() 
	{
		//Reset Scores
		$scope.my_score 	= 0;
		$scope.dealer_score = 0; 
		$scope.message 		= false; 

		//Get a random Card and calculate my score
     	$scope.myCard 	= $scope.getRandomCard();
     	$scope.my_score = $scope.my_score + $scope.myCard;
     	$scope.myDeal 	= true;
   
   		//Gets the dealers card and score
     	$scope.dealer($scope.dealer_score);
     	$scope.dealDisable 	= true;
     	$scope.hitDisable 	= false;
	}

	$scope.hit = function(my_score, dealer_score) 
	{
		//Get another card and recalculate score
     	$scope.myCard 	= $scope.getRandomCard();
     	$scope.my_score = my_score + $scope.myCard;
     	$scope.myDeal 	= true;

     	//Get another dealer card and recalcute dealer's score
     	$scope.dealer(dealer_score).then(function(new_dealer_score)
     	{
     		//Check to see if there is a winner
     		$scope.chooseWinner($scope.my_score, new_dealer_score);
     	});

     	
	}

	$scope.dealer = function(dealer_score) 
	{
		var defered = $q.defer();

		//gets a dealer card and calculate the dealer score, and show in one second 
		$interval(function(){

	     	$scope.dealerCard 	= $scope.getRandomCard();
	     	$scope.dealer_score = dealer_score + $scope.dealerCard;
	     	$scope.dealerDeal 	= true;

	     	defered.resolve($scope.dealer_score);

	    }, 1000, 1, true, dealer_score);

	  	//returns apromise with the calculated dealer score 
	    return defered.promise;
	}

	$scope.stand = function(my_score, dealer_score)
	{
		$scope.hitDisable = true;
		console.log('stand');

		//Get dealer card
		$scope.dealer(dealer_score).then(function(score)
 		{
 			dealer_score = score;
 			//Recursion baby!! cointue playing
 			if(score < 21 && score < my_score)
			{
				$scope.stand(my_score, dealer_score);
			}
			else if(score < 21 && score == my_score)
			{
				$scope.stand(my_score, dealer_score);
			}
			else //otherwise
			{
				//Check to see if there is a winner
     			$scope.chooseWinner($scope.my_score, dealer_score);
			}

		});
	}

	$scope.getRandomCard = function()
	{
		var min = 1;
		var max = 11;

	    return randomCard = Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$scope.chooseWinner = function(my_score, dealer_score)
	{
		console.log('dealer actual score: '+dealer_score);

     		if(my_score > 21 && dealer_score <= 21)
     		{
     			$scope.message = 'You Bust! Dealer Wins!!!!';
     			$scope.dealDisable = false;
     			$scope.hitDisable = true;
     		}

     		if(my_score <= 21 && dealer_score > 21)
     		{
     			$scope.message = 'Dealer Bust!!! You Win!!!!!';
     			$scope.dealDisable = false;
     			$scope.hitDisable = true;
     		}

     		if(my_score > 21  && dealer_score > 21)
     		{
     			$scope.message = 'You Loose!!';
	     		$scope.dealDisable = false;
	     		$scope.hitDisable = true;
     		}

     		if(my_score == 21)
	     	{
	     		$scope.message = 'You win!!';
	     		$scope.dealDisable = false;
	     		$scope.hitDisable = true;
	     	}

	     	if(dealer_score == 21)
	     	{
	     		$scope.message = 'Dealer wins!!';
	     		$scope.dealDisable = false;
	     		$scope.hitDisable = true;
	     	}
	}

}]);