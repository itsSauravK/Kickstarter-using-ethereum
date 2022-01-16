const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: compiledFactory.evm.bytecode.object})
        .send({from: accounts[0], gas: '3000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '3000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    //already exisiting contract address           
    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    )
    
});

describe('Campaigns', () => {
    it('Deploys a factory and a Campaign', () => {
        assert.ok(campaign.options.address);
        assert.ok(factory.options.address);
    });

    //checking manager is accounts[0]
    it('Marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    //can donate money
    it('Can donate money', async() => {
        await campaign.methods.Contribute().send({
            value: '200',
            from: accounts[1]
        })

        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    //require minimum contributio
    it('Requires minimum contribution', async()=>{
        try{
            await campaign.methods.Contribute().send({
                value: '1',
                from: accounts[0]
            })
            assert(false);
        }catch(err){
            assert(err);
        }
    })

    it('allows mamanger to make a payment request', async () =>{

        await campaign.methods
            .createRequest("Buy chip", '100', accounts[2])
            .send({
                from: accounts[0],
                gas:'1000000'
            })
        const request = await campaign.methods.requests(0).call();
        console.log(request);

        assert.equal("Buy chip", request.description);
    })

    it('processes requests', async () => {
        await campaign.methods.Contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        //creating request
        await campaign.methods
            .createRequest('a', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({from: accounts[0], gas: '1000000'})
        
        //approve request
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        //finalize request 
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        //retriving balace
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        assert(balance > 104);
    })
})


