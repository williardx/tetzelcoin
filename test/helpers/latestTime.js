/* With thanks to zeppelin-solidity */
// Returns the time of the last mined block in seconds
export default function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}
