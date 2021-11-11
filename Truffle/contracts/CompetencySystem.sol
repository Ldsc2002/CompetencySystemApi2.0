pragma solidity ^0.8.0;

//import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol';
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract CompetencySystem is ERC1155{
    
    /* Skill level, using Blooms taxonomi
    0. Remembering
    1. Understanding
    2. Applying
    3. Analyzing
    4. Evaluating
    5. Creating
    */
    
    ////////////////////CompetencySystem////////////////////
    
    uint24 competencyCounter;
    uint24 skillLevelCounter;
    
    struct Competency {
        uint24 id; 
        uint8 KEamount;
    }
    
    //Competency[] _competencys;
    
    Competency[] private _competencys; 
    
    mapping(bytes32 =>  uint24) private _skillLevels;
    /////////////////////Permissions/////////////////////////
    
    mapping(uint256 => address) private _competencyCreator;
    
    mapping(uint24 => mapping(address => bool)) private _competencyRepresentative;
    
    mapping(bytes32 => uint256) private _canTransfer; 
    
    mapping(bytes32 => mapping(address => bool)) private _canEditByCreator;
    
    mapping(bytes32 => mapping(address => bool)) private _canEditByOwner;
    
    /////////////////////Modifiers/////////////////////////
    
    modifier isCompetencyCreator(address acount, uint24 competencyId) {
        require( acount == _competencyCreator[competencyId], 
        "CompetencySystem: Only competency creator");
        _;
    }
    
    modifier isCompetencyRepresentative(address acount, uint24 competencyId) {
        require( _competencyRepresentative[competencyId][acount] || acount == _competencyCreator[competencyId] , 
        "CompetencySystem: Only competency creator");
        _;
    }

    modifier competencyExist(uint24 competencyId) {
        require( competencyId < _competencys.length, 
        "CompetencySystem: Competency does not exit");
        _;
    }
    
    modifier canEditByOwner(address acount, address owner, uint256 competencyId) {
        require(_canEditByOwner[keccak256(abi.encodePacked(competencyId, owner))][acount],
        "CompetencySystem: Doesn't have owners permission to edit");
        _;
    }
    
    modifier hasCompetency(address acount, uint256 competencyId) {
        require(balanceOf(acount, competencyId) > 0, 
        "CompetencySystem: Doesn't have the competency");
        _;
    }
    
    modifier canTransfer(uint24 competencyId, uint256 amount ,  address sender) {
        require(_canTransfer[keccak256(abi.encodePacked(competencyId, sender))] - amount > 0 || _competencyRepresentative[competencyId][sender] || sender == _competencyCreator[competencyId] 
        , "CompetencySystem: Doesn't have permission to transfer");
        _;
    }

    
    /////////////////////Methods/////////////////////////
    
    constructor() ERC1155("") {
        competencyCounter = 0;
        skillLevelCounter = 0;
    }
    //Como UVG (ente creador de competencias), deseo poder crear competencias, para definir los saberes qué se pueden obtener en mi institución.

    function _getId() public returns(uint24) {
        competencyCounter += 1;
        return competencyCounter;
    }

    function lastId() public view returns(uint24) {
        return competencyCounter;
    }
    
    function _getSkillId() public returns(uint24) {
        skillLevelCounter += 1;
        return skillLevelCounter;
    }

    function lastSkillId() public view returns(uint24) {
        return skillLevelCounter;
    }

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

    function getCompetencys() public view returns (Competency[] memory){
        return _competencys;
    }
    
    function getCompetency(uint24 pos) competencyExist(pos) public view returns (Competency memory){
        return _competencys[pos];
    }
    
    /*
    function _setSkillLevel(
        address owner,
        uint24 id,
        uint24 competencyId
    ) competencyExist(competencyId) /*hasCompetency(owner, competencyId) public {
        _skillLevels[keccak256(abi.encodePacked(competencyId, owner))] = (id);

    }*/
    
    //Add validation
    function getSkillLevel(
        address owner, 
        uint24 competencyId
    ) competencyExist(competencyId)  public view returns (uint24){
        return _skillLevels[keccak256(abi.encodePacked(competencyId, owner))];
    }
    
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
    
    
    function mintCompentecy(
        address from,
        uint24 competencyId, 
        uint24 amount
    ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {
        _mint(from, competencyId, amount, "");
    }
    
    function awardCompetency(
        address from,
        address to,
        uint24 competencyId,
        uint24 skillValuesId
        //bytes memory data
    ) competencyExist(competencyId) /*canTransfer(competencyId, 1, from)*/ public { //has enought to transfer
        /*
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );*/
        _safeTransferFrom(from, to, competencyId, 1, "");
        if (!( _competencyRepresentative[competencyId][from] || from == _competencyCreator[competencyId])) {  
            _canTransfer[keccak256(abi.encodePacked(competencyId, from))]--;   
        }
        _skillLevels[keccak256(abi.encodePacked(competencyId, to))] = skillValuesId;
    }
    

    function givePermissionFromOwner(
        address from, // who is granting the permission (the owner)
        address to, // to whom the permission is been granted
        uint24 competencyId,
        bool permission
    ) competencyExist(competencyId) hasCompetency(from, competencyId) public {
        _canEditByOwner[keccak256(abi.encodePacked(competencyId, from))][to] = permission;
    }
    
     
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
    
    
    function hasPermissionFromCreator(
        address from, //Who is updating the skill Values
        address owner,
        uint24 competencyId 
    ) competencyExist(competencyId) public view returns (bool){
        return (_canEditByCreator[keccak256(abi.encodePacked(competencyId, owner))][from] || _competencyRepresentative[competencyId][from] || from == _competencyCreator[competencyId]) ;
    }
    
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
    ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public  {
        /*
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );*/
        _safeTransferFrom(from, to, competencyId, amount, "");
        _canTransfer[keccak256(abi.encodePacked(competencyId, from))] = amount;
    }

    function getTransferRights(
        address from,
        uint24 competencyId
    ) competencyExist(competencyId) view public returns (uint){
        return _canTransfer[keccak256(abi.encodePacked(competencyId, from))];
    }
    
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
        return  _competencyRepresentative[competencyId][from];
    }   
}