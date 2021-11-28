pragma solidity ^0.8.0;

//import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol';
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract CompetencySystem is ERC1155{
    
    ////////////////////CompetencySystem////////////////////
    

    //Competency stroting structure
    //@atribute id: The id of the Competency in the external storing system
    //@atribute KEamount: The amount of Knowledge Elements that the Competency has in its definition
    struct Competency {
        uint24 id; 
        uint8 KEamount;
    }
    
    //Array of the store Competencys
    Competency[] private _competencys; 
    
    mapping(bytes32 =>  uint24) private _skillLevels;
    /////////////////////Permissions/////////////////////////
    
    //Mapping from Competencys ids to creator address
    mapping(uint256 => address) private _competencyCreator;
    
    //Mapping from Competencys ids to Competencys representatives
    mapping(uint24 => mapping(address => bool)) private _competencyRepresentative;
     
    //Mapping from a Competency id and a adress to the amount it can transfer
    mapping(bytes32 => uint256) private _canTransfer; 

    //Mapping from a Competency id and a adress to the creators permission to edit
    mapping(bytes32 => mapping(address => bool)) private _canEditByCreator;

    //Mapping from a Competency id and a adress to the owners permission to edit
    mapping(bytes32 => mapping(address => bool)) private _canEditByOwner;
    
    /////////////////////Modifiers/////////////////////////
    

    //Check if an account is the creator of a competency

    modifier isCompetencyCreator(address acount, uint24 competencyId) {
        require( acount == _competencyCreator[competencyId], 
        "CompetencySystem: Only competency creator");
        _;
    }
    
    //Check if an account is a representative for a competency

    modifier isCompetencyRepresentative(address acount, uint24 competencyId) {
        require( _competencyRepresentative[competencyId][acount] || acount == _competencyCreator[competencyId] , 
        "CompetencySystem: Only competency creator");
        _;
    }

    //Check if a competency exist


    modifier competencyExist(uint24 competencyId) {
        require( competencyId < _competencys.length, 
        "CompetencySystem: Competency does not exit");
        _;
    }

    //Check if an account has the owners permission to edit
    
    modifier canEditByOwner(address acount, address owner, uint256 competencyId) {
        require(_canEditByOwner[keccak256(abi.encodePacked(competencyId, owner))][acount],
        "CompetencySystem: Doesn't have owners permission to edit");
        _;
    }
    
    //Check if an account has a competency

    modifier hasCompetency(address acount, uint256 competencyId) {
        require(_skillLevels[keccak256(abi.encodePacked(competencyId, acount))] != 0, 
        "CompetencySystem: Doesn't have the competency");
        _;
    }
    
    modifier hasBalance(address acount, uint256 competencyId,uint256 amount) {
        require(
        balanceOf(acount, competencyId) >= amount, 
        "CompetencySystem: Doesn't have the amount in balance");
        _;
    }
    
    //Check if an account has the permission to transfer a amount of competencys
    
    modifier canTransfer(uint24 competencyId, uint256 amount ,  address sender) {
        require(
        (_canTransfer[keccak256(abi.encodePacked(competencyId, sender))] - amount > 0 || _competencyRepresentative[competencyId][sender] || sender == _competencyCreator[competencyId]) 
        , "CompetencySystem: Doesn't have permission to transfer");
        _;
    }

    
    /////////////////////Methods/////////////////////////
    
    constructor() ERC1155("") { }

    /* 
    Create a Competency inside the system
    
    @Param from : The address that is creating the competency
    @Param id : The id of the competency in the external storing system
    @Param KEamount : The amount of Knowledge Elements the competency has
    
    */

    function createCompetency(
        address from,
        uint24 id, 
        uint8 KEamount
    ) public {
        // Check id is not saved?
        require (KEamount >= 1, "CompetencySystem: Amount of Knowledge Elements should at least 1");
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        //Create competency
        Competency memory _competencyDescription = Competency(id, KEamount);
        //Add to the array of competencys
        _competencys.push(_competencyDescription);
        //Set owner
        _competencyCreator[_competencys.length - 1] = from;
    }

    /*
    
    Get a competency by its id
    
    */
    function getCompetencys() public view returns (Competency[] memory){
        return _competencys;
    }

        /*
    
    Get a competency by its id
    
    */
    
    function getCompetency(uint24 pos) competencyExist(pos) public view returns (Competency memory){
        return _competencys[pos];
    }

    /*
    
    Get the saved external storing id of the skill levels of an account
    
    @Param owner : The address of the account that ownes the skill levels
    @Param competencyId : The id of the competency
    
    */
    
    function getSkillLevel(
        address owner, 
        uint24 competencyId
    ) competencyExist(competencyId) public view returns (uint24){
        return _skillLevels[keccak256(abi.encodePacked(competencyId, owner))];
    }
    
    
    /*
    This method come from the ERC1155 but was disabled due to it not being suit for the competency system
    */

    function safeTransferFrom( //Award competency
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        (from); (to); (id); (amount); (data);
        require( false, "CompetencySystem: Method is not allowed" );
    }

    /*
    This method come from the ERC1155 but was disabled due to it not being suit for the competency system
    */

    function safeBatchTransferFrom( //Award competencys
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        (from); (to); (ids); (amounts); (data);
        require( false, "CompetencySystem: Method is not allowed" );
    }
    
      
    /*
    
    Instantiate competency
    
    @Param from : The address of the account that wants to mint the competency
    @Param competencyId : The id of the competency
    @Param amount : The amount that is going to be mint
    
    */

    function mintCompentecy(
        address from,
        uint24 competencyId, 
        uint24 amount
    ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {
        _mint(from, competencyId, amount, "");
    }
    
    /*
    
   Award a competency to another wallet
    
    @Param from : The address that is awarding the competency
    @Param to : The address that is receiving the competency
    @Param competencyId : The id of the competency
    @Param skillValuesId : The id of the skill values in the external storing system
    
    */
    
    function awardCompetency(
        address from,
        address to,
        uint24 competencyId,
        uint24 skillValuesId
        //bytes memory data
    ) competencyExist(competencyId) /*canTransfer(competencyId, 1, from)*/ hasBalance(from, competencyId, 1) public { 
        _safeTransferFrom(from, to, competencyId, 1, "");
        if (!( _competencyRepresentative[competencyId][from] || from == _competencyCreator[competencyId])) {  
            _canTransfer[keccak256(abi.encodePacked(competencyId, from))]--;   
        }
        _skillLevels[keccak256(abi.encodePacked(competencyId, to))] = skillValuesId;
    }
    
    /*
    
    Give owners permission to edit a competencys skill values
    
    @Param from : The address that is granting the permission
    @Param to : The address that is receiving the permission
    @Param competencyId : The id of the competency
    @Param permissionv : The permission been granted
    
    */

    function givePermissionFromOwner(
        address from, // who is granting the permission (the owner)
        address to, // to whom the permission is been granted
        uint24 competencyId,
        bool permission
    ) competencyExist(competencyId) /* hasCompetency(from, competencyId) */ public {
        _canEditByOwner[keccak256(abi.encodePacked(competencyId, from))][to] = permission;
    }
    
     /*
    
    Give creators permission to edit a competencys skill values
    
    @Param from : The address that is going to edit
    @Param owner : The address that is granting the permission
    @Param to : The address that is going to be edited
    @Param competencyId : The id of the competency
    @Param permission : The permission been granted
    
    */

    function givePermissionFromCreator(
        address from, // who is granting the permission
        address owner, // who is the competency owner
        address to, // to whom the permission is been granted
        uint24 competencyId,
        bool permission
    ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {
        /*
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );*/
        _canEditByCreator[keccak256(abi.encodePacked(competencyId, owner))][to] = permission;
    }
    
    /*
    
    Obtain the creators permission that an acoount has to edit
    
    @Param from : The address that wants to edit
    @Param owner : The address that owns the competency
    @Param competencyId : The id of the competency
    
    */

    function hasPermissionFromCreator(
        address from, //Who is updating the skill Values
        address owner,
        uint24 competencyId 
    ) competencyExist(competencyId) public view returns (bool){
        return (_canEditByCreator[keccak256(abi.encodePacked(competencyId, owner))][from] || _competencyRepresentative[competencyId][from] || from == _competencyCreator[competencyId]) ;
    }
     /*
    Obtain the owners permission that an acoount has to edit
    
    @Param from : The address that wants to edit
    @Param owner : The address that owns the competency
    @Param competencyId : The id of the competency
    
    */
    function hasPermissionFromOwner(
        address from, //Who is updating the skill Values
        address owner,
        uint24 competencyId 
    ) competencyExist(competencyId) public view returns (bool){
        return (_canEditByOwner[keccak256(abi.encodePacked(competencyId, owner))][from]) ;
    }

    function asignTransferRights(
        address from,
        address to,
        uint24 competencyId,
        uint256 amount
    ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) hasBalance(from, competencyId, amount) public  {
        /*
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );*/
        _safeTransferFrom(from, to, competencyId, amount, "");
        _canTransfer[keccak256(abi.encodePacked(competencyId, to))] = _canTransfer[keccak256(abi.encodePacked(competencyId, to))] + amount;
    }

    /*
    
    Give transfer right to an account
    
    @Param from : The address that granting the rights
    @Param to : The address that is receiving the rights
    @Param competencyId : The id of the competency
    @Params amount: The amount of competencys that can be transfer
    
    */

    function getTransferRights(
        address from,
        uint24 competencyId
    ) competencyExist(competencyId) view public returns (uint){
        return _canTransfer[keccak256(abi.encodePacked(competencyId, from))];
    }
    
     /*
    
    Make an account the representative of the creator for a competency
    
    @Param from : The address that granting the permission
    @Param to : The address that is receiving the permission
    @Param competencyId : The id of the competency
    @Params permission: The permission
    
    */

    function makeComptencyRepresentative(
        address from,
        address to,
        uint24 competencyId,
        bool permission
    ) competencyExist(competencyId) isCompetencyCreator(from, competencyId) public {
        _competencyRepresentative[competencyId][to] = permission;
    }

    function isComptencyRepresentative(
        address from,
        uint24 competencyId
    ) competencyExist(competencyId) view public returns (bool){
        return  (_competencyRepresentative[competencyId][from] || from == _competencyCreator[competencyId]);
    }   
}