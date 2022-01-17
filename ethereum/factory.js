//require("dotenv").config();
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const address = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;
//console.log(CampaignFactory.abi)
 const instance = new web3.eth.Contract(
     CampaignFactory.abi,
     address
 );

 export default instance;