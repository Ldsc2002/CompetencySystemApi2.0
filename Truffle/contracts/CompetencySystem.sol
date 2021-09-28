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
    
    /*Competency*/
    struct Registry {
        string name; 
        string anotation;
    }
    
    struct CompetencyDescription {
        string statement;
        uint[] knowledgeElement;
        uint[] dispositions;
    }
    
    /* skill level*/
    
    struct SkillRecord {
        uint256[] value;
        bool byValidAccount;
        address autor;
    }
    
    CompetencyDescription[] _competencys;
    Registry[] _knowledgeElements;
    Registry[] _dispositions;
    
    mapping(uint256 => mapping(address => uint[])) private _skillLevels; //Map to the array of records
    SkillRecord[] _skillRecords;
    
    /////////////////////Permissions/////////////////////////
    
    mapping(uint256 => address) private _competencyCreator;
    
    mapping(uint256 => mapping(address => uint256)) private _canTransfer; 
    
    mapping(bytes32 => mapping(address => bool)) private _canEditByCreator;
    mapping(bytes32 => mapping(address => bool)) private _canEditByOwner;
    
    mapping(uint256 => mapping(address => bool)) private _canGivePermissionToEdit;
    
    //Still working on them
    mapping(uint256 => mapping(address => bool)) private _canGivePermissionToGivePermissionToEdit;
    mapping(uint256 => mapping(address => bool)) private _canGiveTransferRights;

    /////////////////////Modifiers/////////////////////////
    
    modifier isCompetencyCreator(address acount, uint256 competencyId) {
        require( acount == _competencyCreator[competencyId], "CompetencySystem: Only competency creator");
        _;
    }
    
    //check
    modifier isCompetencysCreator(address acount, uint256[] memory competencyIds) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require( acount == _competencyCreator[competencyIds[i]], 
            "CompetencySystem: Only competency creator");
        }
        _;
    }
    
    modifier competencyExist(uint256 competencyId) {
        require( competencyId < _competencys.length, 
        "CompetencySystem: Competency does not exit");
        _;
    }
    
    modifier competencysExist(uint256[] memory competencyIds) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require( competencyIds[i] < _competencys.length,
            "CompetencySystem: Competency(s) does not exit");
        }
        _;
    }
    
    modifier canTransfer(uint256 competencyId, uint256 amount ,  address sender) {
        require(_canTransfer[competencyId][sender] - amount > 0, "CompetencySystem: Doesn't have permission to transfer");
        _;
    }
    
    modifier canTransferBatch(uint256[] memory  competencyIds, uint256[] memory  amounts, address sender) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require(_canTransfer[competencyIds[i]][sender] - amounts[i] > 0 , "CompetencySystem: Doesn't have permission(s) to transfer");
        }
        _;
    }
    
    modifier hasCompetency(address acount, uint256 competencyId) {
        require(balanceOf(acount, competencyId) > 0, 
        "CompetencySystem: Doesn't have the competency");
        _;
    }
    
    modifier canEditByOwner(address acount, address owner, uint256 competencyId) {
        require(_canEditByOwner[keccak256(abi.encodePacked(competencyId, owner))][acount],
        "CompetencySystem: Doesn't have owners permission to edit");
        _;
    }
    
    modifier canGivePermissionToEdit(address acount, uint256 competencyId) {
        require( (_canGivePermissionToEdit[competencyId][acount] || (acount == _competencyCreator[competencyId]) ), 
        "CompetencySystem: Can't give permission to edit");
        _;
    }
    
    modifier canGivePermissionToGivePermissionToEdit(address acount, uint256 competencyId) {
        require( (_canGivePermissionToGivePermissionToEdit[competencyId][acount] || (acount == _competencyCreator[competencyId]) ), 
        "CompetencySystem: Can't give permission to give permission to edit");
        _;
    }
    
    modifier areSkillLevelsValid(uint256[] memory skillLevels) {
        for (uint i = 0; i < skillLevels.length; i++ ){
            require( (skillLevels[i] < 6), "CompetencySystem: Invalid skill level");
        }
        _;
    }
    
    /////////////////////Methods/////////////////////////
    constructor() ERC1155("") {}
    //Como UVG (ente creador de competencias), deseo poder crear competencias, para definir los saberes qué se pueden obtener en mi institución.
    function createKnowledgeElement(
        string memory name,
        string memory anotation
    ) public returns (uint256) {
        Registry memory _knowledgeElement = Registry(name, anotation);
        //Add to the array of KnowledgeElement
        _knowledgeElements.push(_knowledgeElement);
        uint256 pos = _knowledgeElements.length - 1;
        return pos;
    }
    
    function getKnowledgeElement(uint pos) public view returns (Registry memory){
        return _knowledgeElements[pos];
    }
    

    
    function getKnowledgeElements() public view returns (Registry[] memory){
        return _knowledgeElements;
    }
    
    function createDispositions(
        string memory name,
        string memory anotation
    ) public returns (uint256) {
        Registry memory _disposition = Registry(name, anotation);
        //Add to the array of KnowledgeElement
        _dispositions.push(_disposition);
        uint256 pos = _dispositions.length - 1;
        return pos;
    }
    
    function getDisposition(uint pos) public view returns (Registry memory){
        return _dispositions[pos];
    }
    
    function getDispositions() public view returns (Registry[] memory){
        return _dispositions;
    }
    
    function createCompetency(
        string memory statement, 
        uint[] memory knowledgeElement, 
        uint[] memory dispositions
    ) public returns (uint256) {
        /* Add Validations */
        //Create competency
        CompetencyDescription memory _competencyDescription = CompetencyDescription(statement, knowledgeElement, dispositions);
        //Add to the array of competencys
        _competencys.push(_competencyDescription);
        uint256 pos = _competencys.length - 1;
        //Set owner
        //_competencyCreator[pos] = _msgSender();
        return pos;
    }
    
    function getCompetency(uint pos) competencyExist(pos) public view returns (CompetencyDescription memory){
        return _competencys[pos];
    }
    
    function getCompetencys() public view returns (CompetencyDescription[] memory){
        return _competencys;
    }
    
    function _setSkillLevel(
        address from, //Who is updating the skill Values
        address owner,
        uint256[] memory skillValues,
        uint256 competencyId,
        bool hasPermission
    ) private  {
        bool _hasPermission = hasPermission;
        SkillRecord memory _skillLevel = SkillRecord(skillValues, _hasPermission, from);
        _skillRecords.push(_skillLevel);
        uint pos = _skillRecords.length - 1;
        uint[] storage tempArray = _skillLevels[competencyId][owner];
        tempArray.push(pos);
        _skillLevels[competencyId][owner] = tempArray;
    }
    
    function getSkillLevel(address owner, uint256 skillId) public view returns (uint[] memory){
        return _skillLevels[skillId][owner];
    }
    
    function getSkillLevelRecord(uint256 pos) public view returns (SkillRecord memory){
        return _skillRecords[pos];
    }
    
    function safeTransferFrom( //Award competency
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require( false, "CompetencySystem: Method is not allowed" );
    }

    function safeBatchTransferFrom( //Award competencys
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require( false, "CompetencySystem: Method is not allowed" );
    }
    
    function awardCompetency(
        address from,
        address to,
        uint256 competencyId,
        uint256[] memory skillLevels,
        bytes memory data
    ) public canTransfer(competencyId, 1 ,from) areSkillLevelsValid(skillLevels) {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, competencyId, 1, data);
        _canTransfer[competencyId][from] = _canTransfer[competencyId][from] - 1;
        _setSkillLevel(from, to ,skillLevels, competencyId, true);
    }
    
    function asignTransferRights(
        address from,
        address to,
        uint256 competencyId,
        uint256 amount
    ) public isCompetencyCreator(from, competencyId) competencyExist(competencyId) {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
       _canTransfer[competencyId][to] = amount;
    }
    
    /**/
    function givePermissionFromOwner(
        address from,
        address to,
        uint256 competencyId
    ) public competencyExist(competencyId) hasCompetency(from ,competencyId) {
        /*require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );*/
        _canEditByOwner[keccak256(abi.encodePacked(competencyId, from))][to] = true;
    }
    
    
    function givePermissionFromCreator(
        address from, // who is granting the permission
        address owner, // who is the competency owner
        address to, // to whom the permission is been granted
        uint256 competencyId 
    ) public competencyExist(competencyId) canGivePermissionToEdit(from, competencyId){
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );
        _canEditByCreator[keccak256(abi.encodePacked(competencyId, owner))][to] = true;
    }
    
    //Dosent allow operator
    function updateSkillValues(
        address from, //Who is updating the skill Values
        address owner, //Who is the competecyOwner
        uint256 competencyId,
        uint256[] memory skillValues
    ) public competencyExist(competencyId) canEditByOwner(from, owner, competencyId) {
        bool hasPermission = _canEditByCreator[keccak256(abi.encodePacked(competencyId, owner))][_msgSender()];
        _setSkillLevel(from, owner,skillValues, competencyId, hasPermission);
    }
    
    /*
    function givePermissionToGivePermissionToEdit(
        address from,
        address to,
        uint256 competencyId,
    ) public canGivePermissionToGivePermissionToEdit(from, competencyId){
        _canGivePermissionToGivePermissionToEdit[competencyId][to] = true;
    }*/  
}

