//shows list
import Layout from '../../../components/Layout'
import {Button} from 'semantic-ui-react'
import {Link} from '../../../route'

function showList({address}) {
    return(
        <Layout>
            <h3>Requests</h3>
           
            <Link route= {`/campaign/${address}/requests/new`}>
                <a>
                    <Button primary>
                        Add Request
                    </Button>
                </a>
            </Link>
        </Layout>
        
    );
}   
showList.getInitialProps = (props) => {

    const address = props.query.address;
    //const summary = await campaign.methods.getSummary().call();
    
    return {
        address: props.query.address,
    };
  }; 
export default showList;