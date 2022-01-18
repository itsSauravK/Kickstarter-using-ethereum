import { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import {Router} from  '../route';
import web3 from '../ethereum/web3';

function ContributeForm({address}){
    const [contribution, setContribution] = useState('');
    const [errMsg, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const onSubmit = async(event) => {

        event.preventDefault();
        setLoading(true);
        setMessage('');
        const campaign = Campaign(address);
        console.log(contribution);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.Contribute().send({
                from:accounts[0],
                value: web3.utils.toWei(contribution, 'ether')
            })
            Router.replaceRoute(`/campaign/${address}`);
        }catch(err){
            setMessage(err.message);
            console.log(err);
        }
        setLoading(false);

    }
    return(
        <Form onSubmit = {onSubmit} error={!!errMsg}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    value={contribution}
                    onChange={evt => {setContribution(evt.target.value)}}
                    label="ether"
                    labelPosition="right"
                />
                <Message error header="Something went wrong" content={errMsg} />
                <Button primary style={{marginTop:'10px'}}>
                    Contribute
                </Button>
                
            </Form.Field>
        </Form>
    )
}
export default ContributeForm;