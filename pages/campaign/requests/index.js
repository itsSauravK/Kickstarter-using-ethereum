//shows list
import Layout from '../../../components/Layout'
import {Button, Table} from 'semantic-ui-react'
import {Link} from '../../../route'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'


function showList({address, requests, requestCount, approversCount}) {
    const  {Header, Row, HeaderCell, Body} = Table;
    function rowList(){
        return requests.map((request, index) => {
            
                return <RequestRow
                        key={index}
                        id={index}
                        request={request}
                        address={address}
                        approversCount={approversCount}
                    />    
            
            
        })
    }
    return(
        <Layout>
            <h3>Requests</h3>
           
            <Link route= {`/campaign/${address}/requests/new`}>
                <a>
                    <Button primary floated ="right" style={{marginBottom:10}}>
                        Add Request
                    </Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>
                            ID
                        </HeaderCell>
                        <HeaderCell>
                            Description
                        </HeaderCell>
                        <HeaderCell>
                            Amount
                        </HeaderCell>
                        <HeaderCell>
                            Recipient
                        </HeaderCell>
                        <HeaderCell>
                            Approval Count   
                        </HeaderCell>
                        <HeaderCell>
                            Approve
                        </HeaderCell>
                        <HeaderCell>
                            Finalize
                        </HeaderCell>
                    </Row>
                    
                </Header>
                <Body>
                        {rowList()}
                </Body>   
            </Table>
            <div>Found {requestCount} request</div>
        </Layout>
        
    );
}   
showList.getInitialProps = async(props) => {

    const address = props.query.address;
    //const summary = await campaign.methods.getSummary().call();
    const campaign = Campaign(address);
    const requestCount = +await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approvalsCount().call();

    const requests = await Promise.all(
        Array(requestCount).fill().map((element, index) =>{
            return campaign.methods.requests(index).call()
        })
    )
    return {
        address: props.query.address,
        requests: requests,
        requestCount: requestCount,
        approversCount
    };
  }; 
export default showList;