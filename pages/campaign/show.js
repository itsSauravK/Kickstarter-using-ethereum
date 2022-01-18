import Layout from "../../components/Layout";
import factory from '../../ethereum/factory'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from "semantic-ui-react";
import {Link} from '../../route';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
function showCampaign(
        {   
            address,    
            minimumContribution,
            balance,
            requestCount,
            approversCount,
            manager
        }
){

    const items = [
        {
            header: manager,
            meta: 'Address of manager',
            description: 'The manager created this campaign and is authorized to create requests',
            style: { overflowWrap: 'break-word'}
        },
        {
            header: minimumContribution,
            meta: 'Minimum Contribution',
            description: 'You must contribute more than the specified amount of wei'
        },
        {
            header: requestCount,
            meta:'Deploy money from the contract',
            description: 'A request withdraws ether from the account. Must be approved by contributors'
        },
        {
            header: approversCount,
            meta: 'Number of approvers',
            description: ' Number of people who have contributed'
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign balance in ether',
            description: 'Amount of ether in campaign '
        }
    ];
    

    return(
        <Layout>
            <h3>
            Campaign details
            </h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card.Group items = {items} />
                        
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address= {address}/>
                    </Grid.Column>
                </Grid.Row>
    
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaign/${address}/requests`}>
                            <a>
                                <Button primary>
                                    View Requests
                                </Button>
                            </a>
                        </Link>
                    </Grid.Column> 
                    
                </Grid.Row>
                
             </Grid>   
            
            
        </Layout>
        
    );
}
showCampaign.getInitialProps = async (props) => {

    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
  }; 
export default showCampaign;