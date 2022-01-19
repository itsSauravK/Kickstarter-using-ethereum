import { Router } from "next/router"
import {Button, Table } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from "../ethereum/campaign";

function RequestRow({
    key,
    id,
    request,
    address,
    approversCount
}){
    const {Row, Cell} = Table;
    const readyToFinalize = request.approvalCount > approversCount/2;
    const onApprove = async() =>{
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        try{
            await campaign.methods.approveRequest(id).send({
                from:accounts[0]
            })
        }catch(err){
            console.log(err)
        }
        
    }
    const onFinalize = async() =>{
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        try{
            await campaign.methods.finalizeRequest(id).send({
                from:accounts[0]
            })
        }catch(err){
            console.log(err)
        }
        
    }
    return(
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>
                {id}
            </Cell>
            <Cell>
                {request.description}
            </Cell>
            <Cell>
                {web3.utils.fromWei(request.value, 'ether')}
            </Cell>
            <Cell>
                {request.recipient}
            </Cell>
            <Cell>
                {request.approvalCount}/{approversCount}
            </Cell>
            <Cell>
                {request.complete ? null :(
                <Button color="green" basic onClick ={onApprove}>
                    Approve
                </Button>
                )}               
            </Cell>
            <Cell>
                {request.complete ?null :(
                <Button color="yellow" basic onClick ={onFinalize}>
                    Finalize
                </Button>
               ) }
            </Cell>
        </Row>

    )
}

export default RequestRow;