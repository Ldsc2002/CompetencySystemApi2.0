pragma solidity ^0.8.0;

//import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol';
//import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';
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
    //can start as constants
    struct CompetencyDescription {
        string statement;
        string[] knowledgeElement;
        string[] dispositions;
    }

    // Competency array
    CompetencyDescription[] _competency;
    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint[])) private _skillLevel;
    /////////////////////////////////////////////////////////
    ////////////////////modifiers////////////////////
    //Register students?
    mapping(uint256 => address) private _competencyCreator; //add owner?
    mapping(uint256 => mapping(address => uint256)) private _canTransfer;
    // the first key is a keccak256(<competencyId>, <competencyOwnerAddress>)
    mapping(bytes32 => mapping(address => bool)) private _editStudentPermission;
    // the first key is a keccak256(<competencyId>, <competencyOwnerAddress>)
    mapping(bytes32 => mapping(address => bool)) private _editCreatorPermission;
    /////////////////////////////////////////////////////////
    modifier isCompetencyCreator(uint256 competencyId) {
        require( _msgSender() == _competencyCreator[competencyId], "CompetencySystem: Only competency creator");
        _;
    }
    
    //check
    modifier isCompetencysCreator(uint256[] memory competencyIds) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require( _msgSender() == _competencyCreator[competencyIds[i]], "CompetencySystem: Only competency creator");
        }
        _;
    }
    modifier competencyExist(uint256 competencyId) {
        require( competencyId < _competency.length, "CompetencySystem: Competency does not exit");
        _;
    }
    
    //check
    modifier competencysExist(uint256[] memory competencyIds) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require( competencyIds[i] < _competency.length, "CompetencySystem: Competency(s) does not exit");
        }
        _;
    }
    modifier canTransfer(uint256 competencyId, uint256 amount ,  address sender) {
        require(_canTransfer[competencyId][sender] - amount > 0, "CompetencySystem: Doesn't have permission to transfer");
        _;
    }
    
    modifier canTransferMulti(uint256[] memory  competencyIds, uint256[] memory  amounts, address sender) {
        for (uint i = 0; i < competencyIds.length; i++ ){
            require(_canTransfer[competencyIds[i]][sender] - amounts[i] > 0 , "CompetencySystem: Doesn't have permission(s) to transfer");
        }
        _;
    }
    
    modifier areSkillLevelsValid(uint256[] memory skillLevels) {
        for (uint i = 0; i < skillLevels.length; i++ ){
            require( (skillLevels[i] < 6), "CompetencySystem: Invalid skill level");
        }
        _;
    }
    
    modifier canEdit(address editor, address owner, uint256 competencyId) {
        require( 
            (
            _editStudentPermission[keccak256(abi.encodePacked(competencyId, owner))][editor]
                &&
            _editCreatorPermission[keccak256(abi.encodePacked(competencyId, _competencyCreator[competencyId]  ))][editor]
            ), 
            "CompetencySystem: Has no permission to edit"
        );
        _;
    }
    
    ///////////////////////////////////////////////////////////
    constructor() ERC1155("") {}
    //Como UVG (ente creador de competencias), deseo poder crear competencias, para definir los saberes qué se pueden obtener en mi institución.
    function createCompetency(
        string memory statement, 
        string[] memory knowledgeElement, 
        string[] memory dispositions) 
    public returns (uint256) {
        /* Add Validations */
        //Create competency
        CompetencyDescription memory _competencyDescription = CompetencyDescription(statement, knowledgeElement, dispositions);
        //Add to the array of competencys
        _competency.push(_competencyDescription);
        uint256 pos = _competency.length - 1;
        //Set owner
        _competencyCreator[pos] = _msgSender();
        return pos;
    }
    //Como UVG (ente creador de competencias), deseo poder visualizar las competencias qué he creado, para tener una noción de qué contiene cada 
    //una de mis competencias.
    function getCompetencyInfo(uint256 competencyId) public view returns (CompetencyDescription memory) { //modifier?
        return _competency[competencyId];
    }
    //Como UVG (ente creador de competencias), deseo poder abastecer competencias , para seguir utilizando las mismas definiciones de competencias 
    //en nuevas iteraciones de mis cursos.
    function mint(uint256 competencyId, uint256 amount) public isCompetencyCreator(competencyId) competencyExist(competencyId) {
        _mint(_msgSender(), competencyId, amount, "");
         _canTransfer[competencyId][_msgSender()] = _canTransfer[competencyId][_msgSender()] + amount;
    }
    function mintBatch(uint256[] memory competencyIds, uint256[] memory amount) public isCompetencysCreator(competencyIds) competencysExist(competencyIds){
        _mintBatch(_msgSender(), competencyIds, amount, "");
        for (uint i = 0; i < competencyIds.length; i++ ){
            _canTransfer[competencyIds[i]][_msgSender()] = _canTransfer[competencyIds[i]][_msgSender()] + amount[i];
        }
    }
    //Como UVG (ente creador de competencias), deseo poder transferir competencias , para qué el maestro encargado  de un curso pueda acreditar a 
    //los alumnos qué las alcancen .
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public canTransfer(id, amount, from) virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
        _canTransfer[id][from] = _canTransfer[id][from] - amount;
        _canTransfer[id][to] = _canTransfer[id][to] + amount;
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public canTransferMulti(ids, amounts, from) virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );
        //add can transfer
        _safeBatchTransferFrom(from, to, ids, amounts, data);
        for (uint i = 0; i < ids.length; i++ ){
            _canTransfer[ids[i]][from] = _canTransfer[ids[i]][from] - amounts[i];
            _canTransfer[ids[i]][to] = _canTransfer[ids[i]][to] + amounts[i];
        }
    }
    
    /*Check every think that comes next */
    
    //Como maestro de la UVG (ente intermediario), deseo poder establecer el nivel de competencias de mis estudiantes, para especificar el nivel 
    //al cual han desarrollado sus habilidades .
    function _setSkillValues(
        address to,
        uint256 competencyId, 
        uint256[] memory skillLevels
    ) internal areSkillLevelsValid(skillLevels) {
        //check that receiver doesnt have the skill   
        //check that the sender has the skill
        //check that the skills are valid
        _skillLevel[competencyId][to] = skillLevels;
    }
    
    //Como maestro de la UVG (ente intermediario), deseo poder transferir competencias , para acreditar a aquellos estudiantes qué hayan alcanzado 
    //los niveles requeridos de una competencia.
    
    
    function awardCompetency(
        address from,
        address to,
        uint256 id,
        uint256[] memory skillLevels,
        bytes memory data
    ) public canTransfer(id, 1 ,from) areSkillLevelsValid(skillLevels) {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, 1, data);
        _canTransfer[id][from] = _canTransfer[id][from] - 1;
        _setSkillValues(to, id, skillLevels);
    }
    
    /**/

    //Como maestro de la UVG (ente intermediario), deseo poder editar el nivel de competencias de mis estudiantes, para poder actualizar sus 
    //habilidades en caso hayan demostrado un nivel mayor al alcanzado inicialmente .
    
    //Como estudiante de la UVG (ente objetivo), deseo poder autorizar una actualización de nivel de habilidad en mis competencias, para poder 
    //recibir una actualización en caso haya mejorado mi desempeño.
    
    function givePermissionToTeacherFromStudent(
        address to,
        uint256 competencyId
    ) public /*check that the sender has the competency*/ {
        _editStudentPermission[keccak256(abi.encodePacked(competencyId, _msgSender()))][to] = true;
    }
    
    
    //Historia UVG
    
    function givePermissionToTeacherFromOwner(
        address to,
        address owner,
        uint256 competencyId
    ) public /*check that the sender is owner (creator) of the competnecy*/ {
        _editCreatorPermission[keccak256(abi.encodePacked(competencyId, owner))][to] = true;
    }
    
    function updateSkillValues(
        address owner,
        uint256 competencyId,
        uint256[] memory skillLevels
    ) public canEdit(_msgSender(), owner, competencyId) {
        _setSkillValues(owner, competencyId, skillLevels);
    }


    //Add ownership handle
    //Add permissions for watching
    // 


}