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

# Implementation
### All campaigns
<img width="1440" alt="Screen Shot 2022-01-19 at 8 12 52 PM" src="https://user-images.githubusercontent.com/47532084/150155017-809677ed-5c5d-422a-8028-c42c24177ad4.png">

### Specific Campaign
<img width="1440" alt="Screen Shot 2022-01-19 at 8 14 30 PM" src="https://user-images.githubusercontent.com/47532084/150155203-d04c07d9-a169-4f05-99a7-1ae56a78023d.png">

### Creating a request 
<img width="1440" alt="Screen Shot 2022-01-19 at 8 15 43 PM" src="https://user-images.githubusercontent.com/47532084/150155256-fd738314-15d2-4c6a-9bbb-bf6e3caceef6.png">

### Request Created
<img width="1440" alt="Screen Shot 2022-01-19 at 8 15 58 PM" src="https://user-images.githubusercontent.com/47532084/150155313-ff4beac0-eca9-4683-b251-dfd71f05e806.png">

<img width="1440" alt="Screen Shot 2022-01-19 at 8 16 56 PM" src="https://user-images.githubusercontent.com/47532084/150155374-d456eb40-b8c3-4900-a0b9-e0893e8c8cb1.png">


>Used ReactJS for frontend, solidity for smart contracts and mocha to test the contracts.