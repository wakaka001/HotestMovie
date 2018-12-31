pragma solidity ^0.5.0;
contract Movie {

  uint[16] public likeNum ;  
  uint[16] public likeTotal ;
  string public temp;
  uint tempNum;
    //点赞 
  function like(uint movieId,uint score) public returns (uint) {
    require(movieId >= 0 && movieId <= 15);  // 确保id在数组长度内
    require(score >= 0 && score <= 10);
    likeTotal[movieId] += score;        // +1 
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
