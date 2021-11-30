

#Competency storing system 

   //Competency stroting structure
   //@atribute id: The id of the Competency in the external storing system
   //@atribute KEamount: The amount of Knowledge Elements that the
   struct Competency {
       uint24 id;
       uint8 KEamount;
   }
  
   //Array of the store Competencies
   Competency[] private _competencys;
  
   mapping(bytes32 =>  uint24) private _skillLevels;
   /////////////////////Permissions/////////////////////////
  
   //Mapping from Competencies ids to creator address
   mapping(uint256 => address) private _competencyCreator;
  
   //Mapping from Competencies ids to Competencies representatives
   mapping(uint24 => mapping(address => bool)) private _competencyRepresentative;
   
   //Mapping from a Competency id and an address to the amount it can transfer
   mapping(bytes32 => uint256) private _canTransfer;
 
   //Mapping from a Competency id and an address to the creators permission to edit
   mapping(bytes32 => mapping(address => bool)) private _canEditByCreator;
 
   //Mapping from a Competency id and an address to the owners permission to edit
   mapping(bytes32 => mapping(address => bool)) private _canEditByOwner;
  
   /////////////////////Modifiers/////////////////////////
  
   //Check if an account is the creator of a competency
 
   modifier isCompetencyCreator(address account, uint24 competencyId) {}
  
   //Check if an account is a representative for a competency
 
   modifier isCompetencyRepresentative(address account, uint24 competencyId){}
 
   //Check if a competency exist
 
   modifier competencyExist(uint24 competencyId) {}
 
   //Check if an account has the owner's permission to edit
  
   modifier canEditByOwner(address account, address owner, uint256 competencyId) {}
  
   //Check if an account has a competency
 
   modifier hasCompetency(address account, uint256 competencyId) {}
  
   modifier hasBalance(address account, uint256 competencyId,uint256 amount) {}
  
   //Check if an account has the permission to transfer a amount of Competencies
  
   modifier canTransfer(uint24 competencyId, uint256 amount ,  address sender) {}
 
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
   ) public {}
 
   /*
   Get a competency by its id
   */
 
   function getCompetencys() public view returns (Competency[] memory){
       return _competencys;
   }
 
   /*
   Get a competency by its id
 
   @Param pos : The id of the competency in the external storing system
   */
  
   function getCompetency(uint24 pos) competencyExist(pos) public view returns (Competency memory){
       return _competencys[pos];
   }
 
   /*
   Get the saved external storing id of the skill levels of an account
  
   @Param owner : The address of the account that owns the skill levels
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
   ) public virtual override {}
 
   /*
   This method come from the ERC1155 but was disabled due to it not being suit for the competency system
   */
 
   function safeBatchTransferFrom( //Award Competencies
       address from,
       address to,
       uint256[] memory ids,
       uint256[] memory amounts,
       bytes memory data
   ) public virtual override {}
  
    
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
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {}
  
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
   ) competencyExist(competencyId) /*canTransfer(competencyId, 1, from)*/ hasBalance(from, competencyId, 1) public {}
  
   /*
   Give owners permission to edit a Competencies skill values
  
   @Param from : The address that is granting the permission
   @Param to : The address that is receiving the permission
   @Param competencyId : The id of the competency
   @Param permission : The permission been granted
   */
 
   function givePermissionFromOwner(
       address from, // who is granting the permission (the owner)
       address to, // to whom the permission is been granted
       uint24 competencyId,
       bool permission
   ) competencyExist(competencyId) /* hasCompetency(from, competencyId) */ public {}
  
    /*
   Give permission to edit a Competencies skill values
  
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
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {}
  
   /*
   Obtain the creators permission that an account has to edit
  
   @Param from : The address that wants to edit
   @Param owner : The address that owns the competency
   @Param competencyId : The id of the competency
   */
 
   function hasPermissionFromCreator(
       address from, //Who is updating the skill Values
       address owner,
       uint24 competencyId
   ) competencyExist(competencyId) public view returns (bool){}
 
   /*
   Obtain the owner's permission that an account has to edit
  
   @Param from : The address that wants to edit
   @Param owner : The address that owns the competency
   @Param competencyId : The id of the competency
   */
 
   function hasPermissionFromOwner(
       address from, //Who is updating the skill Values
       address owner,
       uint24 competencyId
   ) competencyExist(competencyId) public view returns (bool){}
 
   function asignTransferRights(
       address from,
       address to,
       uint24 competencyId,
       uint256 amount
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) hasBalance(from, competencyId, amount) public  {}
 
   /*
   Give transfer right to an account
  
   @Param from : The address that granting the rights
   @Param to : The address that is receiving the rights
   @Param competencyId : The id of the competency
   @Param amount: The amount of Competencies that can be transfer
   */
 
   function getTransferRights(
       address from,
       uint24 competencyId
   ) competencyExist(competencyId) view public returns (uint){}
  
    /*
   Make an account the representative of the creator for a competency
  
   @Param from : The address that granting the permission
   @Param to : The address that is receiving the permission
   @Param competencyId : The id of the competency
   @Param permission: The permission
   */
 
   function makeComptencyRepresentative(
       address from,
       address to,
       uint24 competencyId,
       bool permission
   ) competencyExist(competencyId) isCompetencyCreator(from, competencyId) public {}
 
   /*
   Gets whether a address is a competency representative
  
   @Param from : The address to be checked
   @Param competencyId : The id of the competency
   */
 
   function isComptencyRepresentative(
       address from,
       uint24 competencyId
   ) competencyExist(competencyId) view public returns (bool){}  
}



