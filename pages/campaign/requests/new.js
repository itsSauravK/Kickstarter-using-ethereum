import { useState } from 'react';
import { Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3'
import {Link, Router} from '../../../route'
import Layout from '../../../components/Layout';

function newRequest({
    address
}){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errMsg, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const onSubmit = async(event) => {

        event.preventDefault();
        setLoading(true);
        setMessage('');
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description, 
                    web3.utils.toWei(value, 'ether'), 
                    recipient)
                .send({
                    from:accounts[0]
            })
            
            Router.replaceRoute(`/campaign/${address}/requests/new`);
        }catch(err){
            setMessage(err.message);
            console.log(err);
        }
        setLoading(false);
    }
    return(
        <Layout>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>
                        Value in ether
                    </label>
                    <Input 
                    value={value}
                    onChange={event=>setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>
                        Description
                    </label>
                    <Input
                    value={description}
                    onChange={event=>setDescription(event.target.value)} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>
                        Recipient address
                    </label>
                    <Input 
                    value={recipient}
                    onChange={event=>setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Something went wrong" content={errMsg} />
                <Button loading={loading} primary>
                    Create Request
                </Button>
            </Form>
        </Layout>
        
    );
}
newRequest.getInitialProps = async(props) => {

    const {address} = props.query;
    return{
        address: props.query.address
    };
}
export default newRequest;