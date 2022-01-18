import React from 'react';
import {useState, useEffect} from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../route'

function CampaignIndex({campaigns}){
   
        //function in map run 1 time for every element
    const items = campaigns.map(address => {
        return{
            header: address,
            description: <Link route={`/campaign/${address}`}><a>View Campaigns</a></Link>,
            fluid: true
        }
    });


    return(
        <Layout>
            
            <h1>Open Campaigns </h1>
            
            <Link route = "/campaign/new">
                <a>
                    <Button
                    floated = "right"
                    content = "Create Campaign"
                    icon = "add circle"
                    primary
                    />  
                </a>   
            
            </Link>
            <Card.Group items={items} />
        </Layout>
    )
};

//uses server side rendering to call the campaign contracts (so good for slow devices)
CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  };

  export default CampaignIndex;