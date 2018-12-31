App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../movies.json', function(data) {
      var petsRow = $('#petsRow');
      var movieTemplate = $('#movieTemplate');

      for (i = 0; i < data.length; i ++) {
        movieTemplate.find('.panel-title').text(data[i].name);
        movieTemplate.find('img').attr('src', data[i].picture);
        movieTemplate.find('.score').text(data[i].score);
        movieTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(movieTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
  } else {
    // If no injected web3 instance is detected, fall back to Ganache
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  }
  web3 = new Web3(App.web3Provider);

  return App.initContract();



    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
    // 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
    var AdoptionArtifact = data;
    App.contracts.Adoption = TruffleContract(AdoptionArtifact);

    // Set the provider for our contract
    App.contracts.Adoption.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the adopted pets
    return App.markScore()
  });
  return App.bindEvents();



    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markScore: function(likeNum, account) {
    var movieInstance;

  App.contracts.Adoption.deployed().then(function(instance) {
    movieInstance = instance;

    // 调用合约的getAdopters(), 用call读取信息不用消耗gas
    return movieInstance.getLikeNum.call();
  }).then(function(likeNum) {
    for (i = 0; i < likeNum.length; i++) {
      $('.score').eq(i).text(likeNum[i]);
      
    }
	
  }).catch(function(err) {
    console.log(err.message);
  });

  },

  
  
  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'))-1;

    event.preventDefault();

  var petId = parseInt($(event.target).data('id'))-1;

  var movieInstance;

  // 获取用户账号
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    // 用第一个账号去点赞
    var account = accounts[0];
  
    App.contracts.Adoption.deployed().then(function(instance) {
      movieInstance = instance;
  
      // 发送交易点赞
      return movieInstance.like(petId, {from: account});
    }).then(function(result) {
      return App.markScore();
    }).catch(function(err) {
      console.log(err.message);
    });
  });


  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
