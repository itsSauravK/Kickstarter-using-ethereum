import React, { useState } from 'react';
import Layout from '../../components/Layout'
import {Form, Button, Input, Message} from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

function newCampaign() {

    const [minimumContribution, setContribution] = useState('');
    const [errMsg, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit= async (event) => {
          
        event.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(minimumContribution)
            .send({
                from: accounts[0]
            });
        }
        catch (err){
            setMessage(err.message);
        }
        setLoading(false);
    }

    return(
        <Layout>
            <h3> Create new campaign
            </h3>
            <Form onSubmit = {onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>Minimum contribution</label>
                    <Input 
                        label = 'wei' 
                        labelPosition ='right' 
                        value={minimumContribution} 
                        onChange ={event => {setContribution(event.target.value)}}/>
                </Form.Field>
                <Message error header="Something went wrong" content={errMsg} />
                <Button loading={loading} primary>Create campaign</Button>
            </Form>
        </Layout>
        
    )   
};

export default newCampaign;