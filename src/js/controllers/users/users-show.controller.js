angular
  .module('gaFeedback')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', 'Rating'];

function UsersShowCtrl(User, $stateParams, Rating) {
  const vm = this;
  vm.user = User.get($stateParams);
  console.log(vm.user);
  vm.rating = null;

  Rating
    .query()
    .$promise
    .then(data => {
      vm.ratings = data;

      const userData = [];
      data.filter(rating => {
        if (rating.createdBy.id === vm.user._id) {
          userData.push(rating);
        }
        console.log(userData);
      });

      const paceValues = [];
      userData.filter(rating => paceValues.push(rating.pace));
      vm.avgPace = Math.ceil((paceValues.reduce((a,b) => a + b)) / paceValues.length);

      const conceptsValues = [];
      userData.filter(rating => conceptsValues.push(rating.concepts));
      vm.avgConcepts = Math.ceil((conceptsValues.reduce((a,b) => a + b)) / conceptsValues.length);

      const syntaxValues = [];
      userData.filter(rating => syntaxValues.push(rating.syntax));
      vm.avgSyntax = Math.ceil((syntaxValues.reduce((a,b) => a + b)) / syntaxValues.length);

      const confidenceValues = [];
      userData.filter(rating => confidenceValues.push(rating.confidence));
      vm.avgConfidence = Math.ceil((confidenceValues.reduce((a,b) => a + b)) / confidenceValues.length);

    });

  vm.options1 = {
    readOnly: true,
    min: 0,
    max: 100,
    barColor: '#5BC01E',
    trackColor: '#212121',
    trackWidth: 15,
    barWidth: 30
  };

  vm.options2 = {
    readOnly: true,
    min: 0,
    max: 100,
    bgColor: '#2C3E50',
    trackWidth: 50,
    barWidth: 30,
    barColor: '#FFAE1A',
    textColor: '#eee'
  };

  vm.options3 = {
    min: 0,
    max: 100,
    unit: '%',
    readOnly: true,
    subText: {
      enabled: true,
      text: 'Pace',
      color: 'gray',
      font: 'arial'
    },
    trackWidth: 40,
    barWidth: 25,
    trackColor: '#656D7F',
    barColor: '#2CC185'
  };
}
