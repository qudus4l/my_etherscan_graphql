// Importing RESTDataSource from apollo-datasource-rest
const { RESTDataSource } = require("apollo-datasource-rest");

// Ethereum address of Vitalik Buterin
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Class EtherDataSource extends RESTDataSource to interact with Etherscan API
class EtherDataSource extends RESTDataSource {
  constructor() {
    super();
    // Setting the base URL for the Etherscan API
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Method to get the balance of the Ethereum address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the total supply of Ether
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the latest Ethereum price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Exporting the EtherDataSource class
module.exports = EtherDataSource;
