import {Menu} from 'semantic-ui-react'
import {Link} from '../route'
function Header () {
    return(
        <Menu style={{marginTop:'10px'}}>
            <Link route ='/ '>
                <a className="item">
                CrowdCoin
                </a>
            </Link>
            <Menu.Menu position = "right">
                <Link route ='/'>
                    <a className="item">
                    Campaigns
                    </a>
                </Link>
                <Link route = "/campaign/new">
                    <a className="item">
                        +
                    </a>
                    
                </Link>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;