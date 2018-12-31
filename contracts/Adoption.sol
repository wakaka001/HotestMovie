pragma solidity ^0.5.0;

contract Adoption {

  address[16] public adopters;  // 保存领养者的地址
  uint[16] public likeNum ;  
  uint[16] public likeTotal ;
  string public temp;
  uint tempNum;

    // 领养宠物
  function adopt(uint petId) public returns (uint) {
    require(petId >= 0 && petId <= 15);  // 确保id在数组长度内

    adopters[petId] = msg.sender;        // 保存调用这地址 
    return petId;
  }

  // 返回领养者
  function getAdopters() public view returns (address[16] memory) {
    return adopters;
  }
  
  function like(uint movieId) public returns (uint) {
    require(movieId >= 0 && movieId <= 15);  // 确保id在数组长度内
    likeNum[movieId]++;
    return movieId;
  }

  // 返回点赞shu 
  function getLikeNum() public view returns ( uint[16] memory) {
    return likeNum;
  }
  function getLikeTotal() public view returns (uint[16] memory){
      return likeTotal;
  }
  function getName (uint movieId) public view returns (string memory)
  {
      require(movieId >= 0 && movieId <= 15);
      return "movie";
      
  }
  function getScore (uint movieId) public returns (uint){
      require(movieId >= 0 && movieId <= 15);
      tempNum = likeTotal[movieId];
      
      return likeTotal[movieId]/likeNum[movieId];
  }
}

