// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory{
    address[] public deployCampaigns;

    function createCampaign(uint minimum) public{

        address newCapaign = address(new Campaign(minimum, msg.sender)) ;
        deployCampaigns.push(newCapaign);
    }

       function getDeployedCampaigns() public view returns (address[] memory) {

        return deployCampaigns;
    }

}

contract Campaign {

    struct Request{
            string description;
            uint value;
            address payable recipient;
            bool complete;
            uint approvalCount;
            mapping(address => bool) approvals;
        }

    //Request[] public requests;
    mapping(uint => Request) public requests;
    uint numRequests;
    address public manager;
    uint minimumContribution;
    mapping(address => bool) public approvers;
    //keep track of. all approvvers
    uint public approvalsCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {

        manager = creator;
        minimumContribution = minimum;
    }


    function Contribute() public payable{
        require(msg.value > minimumContribution);

        approvalsCount++;
        approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address payable recipient) 
        public restricted {
        //     Request storage newRequest = Request({
        //         description: description,
        //         value: value,
        //         recipient: recipient,
        //         complete: false,
        //         approvalCount: 0
        //     });
        // requests.push(newRequest);

        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient; 
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint index) public {

        //storage here acts as reference variable
        Request storage request = requests[index];

        //checking if person has already voted
        require(approvers[msg.sender]);
        //checking if voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{

        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > approvalsCount/2);

        //sending money
        request.recipient.transfer(request.value);

        request.complete = true;
    }


}