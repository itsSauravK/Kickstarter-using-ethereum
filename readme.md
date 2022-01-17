# Ethereum project with NextJS frontend

## Instructions to run the project

`npm i` at the root folder

Run `node ethereum/compile.js` to get the build folder

Make .env and .env.local file at the root folder
## .env variables  

//Put your own account menmoic   
ACCOUNT_MNEMONIC=   
//Put your rinkeby endpoint. Can get from infura   
RINKEBY_ENDPOINT=  

## .env.local variables
//You get factory address after running `node ethereum/deploy.js` from root folder   
FACTORY_ADDRESS =      

Do `npm run test` to test the contract.

### Use `npm run dev` to run the frontend.
### Frontend Ongoing

>Used ReactJS for frontend, solidity for smart contracts and mocha to test the contracts.