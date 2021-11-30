/*
   Create a Competency inside the system
  
   - "from" : The address that is creating the competency
   - "id" : The id of the competency in the external storing system
   - "KEamount" : The amount of Knowledge Elements the competency has
   */
 
   `function createCompetency(
       address from,
       uint24 id,
       uint8 KEamount
   ) public {}`
 
   /*
   Get a competency by its id
   */
 
   `function getCompetencys() public view returns (Competency[] memory){
       return _competencys;
   }
 
   /*
   Get a competency by its id
 
   - "pos" : The id of the competency in the external storing system
   */
  
   `function getCompetency(uint24 pos) competencyExist(pos) public view returns (Competency memory){
       return _competencys[pos];
   }
 
   /*
   Get the saved external storing id of the skill levels of an account
  
   - "owner" : The address of the account that owns the skill levels
   - "competencyId" : The id of the competency
  
   */
  
   `function getSkillLevel(
       address owner,
       uint24 competencyId
   ) competencyExist(competencyId) public view returns (uint24){
       return _skillLevels[keccak256(abi.encodePacked(competencyId, owner))];
   }
  
   /*
   This method come from the ERC1155 but was disabled due to it not being suit for the competency system
   */
 
   `function safeTransferFrom( //Award competency
       address from,
       address to,
       uint256 id,
       uint256 amount,
       bytes memory data
   ) public virtual override {}`
 
   /*
   This method come from the ERC1155 but was disabled due to it not being suit for the competency system
   */
 
   `function safeBatchTransferFrom( //Award Competencies
       address from,
       address to,
       uint256[] memory ids,
       uint256[] memory amounts,
       bytes memory data
   ) public virtual override {}`
  
    
   /*
  
   Instantiate competency
  
   - "from" : The address of the account that wants to mint the competency
   - "competencyId" : The id of the competency
   - "amount" : The amount that is going to be mint
  
   */
 
   `function mintCompentecy(
       address from,
       uint24 competencyId,
       uint24 amount
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {}`
  
   /*
  Award a competency to another wallet
  
   - "from" : The address that is awarding the competency
   - "to" : The address that is receiving the competency
   - "competencyId" : The id of the competency
   - "skillValuesId" : The id of the skill values in the external storing system
   */
  
   `function awardCompetency(
       address from,
       address to,
       uint24 competencyId,
       uint24 skillValuesId
       //bytes memory data
   ) competencyExist(competencyId) /*canTransfer(competencyId, 1, from)*/ hasBalance(from, competencyId, 1) public {}`
  
   /*
   Give owners permission to edit a Competencies skill values
  
   - "from" : The address that is granting the permission
   - "to" : The address that is receiving the permission
   - "competencyId" : The id of the competency
   - "permission" : The permission been granted
   */
 
   `function givePermissionFromOwner(
       address from, // who is granting the permission (the owner)
       address to, // to whom the permission is been granted
       uint24 competencyId,
       bool permission
   ) competencyExist(competencyId) /* hasCompetency(from, competencyId) */ public {}`
  
    /*
   Give permission to edit a Competencies skill values
  
   - "from" : The address that is going to edit
   - "owner" : The address that is granting the permission
   - "to" : The address that is going to be edited
   - "competencyId" : The id of the competency
   - "permission" : The permission been granted
   */
 
   `function givePermissionFromCreator(
       address from, // who is granting the permission
       address owner, // who is the competency owner
       address to, // to whom the permission is been granted
       uint24 competencyId,
       bool permission
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) public {}`
  
   /*
   Obtain the creators permission that an account has to edit
  
   - "from" : The address that wants to edit
   - "owner" : The address that owns the competency
   - "competencyId" : The id of the competency
   */
 
   `function hasPermissionFromCreator(
       address from, //Who is updating the skill Values
       address owner,
       uint24 competencyId
   ) competencyExist(competencyId) public view returns (bool){}`
 
   /*
   Obtain the owner's permission that an account has to edit
  
   - "from" : The address that wants to edit
   - "owner" : The address that owns the competency
   - "competencyId" : The id of the competency
   */
 
   `function hasPermissionFromOwner(
       address from, //Who is updating the skill Values
       address owner,
       uint24 competencyId
   ) competencyExist(competencyId) public view returns (bool){}`
 
   `function asignTransferRights(
       address from,
       address to,
       uint24 competencyId,
       uint256 amount
   ) competencyExist(competencyId) isCompetencyRepresentative(from, competencyId) hasBalance(from, competencyId, amount) public  {}`
 
   /*
   Give transfer right to an account
  
   - "from" : The address that granting the rights
   - "to" : The address that is receiving the rights
   - "competencyId" : The id of the competency
   - "amount": The amount of Competencies that can be transfer
   */
 
   `function getTransferRights(
       address from,
       uint24 competencyId
   ) competencyExist(competencyId) view public returns (uint){}`
  
    /*
   Make an account the representative of the creator for a competency
  
   - "from" : The address that granting the permission
   - "to" : The address that is receiving the permission
   - "competencyId" : The id of the competency
   - "permission": The permission
   */
 
   `function makeComptencyRepresentative(
       address from,
       address to,
       uint24 competencyId,
       bool permission
   ) competencyExist(competencyId) isCompetencyCreator(from, competencyId) public {}`
 
   /*
   Gets whether a address is a competency representative
  
   - "from" : The address to be checked
   - "competencyId" : The id of the competency
   */
 
    
   `function isComptencyRepresentative(
       address from,
       uint24 competencyId
   ) competencyExist(competencyId) view public returns (bool){}`  
}
