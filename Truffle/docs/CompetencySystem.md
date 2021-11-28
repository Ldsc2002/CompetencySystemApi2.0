## `CompetencySystem`





### `isCompetencyCreator(address acount, uint24 competencyId)`





### `isCompetencyRepresentative(address acount, uint24 competencyId)`





### `competencyExist(uint24 competencyId)`





### `canEditByOwner(address acount, address owner, uint256 competencyId)`





### `hasCompetency(address acount, uint256 competencyId)`





### `hasBalance(address acount, uint256 competencyId, uint256 amount)`





### `canTransfer(uint24 competencyId, uint256 amount, address sender)`






### `_getId() → uint24` (public)





### `lastId() → uint24` (public)





### `_getSkillId() → uint24` (public)





### `lastSkillId() → uint24` (public)





### `createCompetency(address from, uint24 id, uint8 KEamount)` (public)





### `getCompetencys() → struct CompetencySystem.Competency[]` (public)





### `getCompetency(uint24 pos) → struct CompetencySystem.Competency` (public)





### `getSkillLevel(address owner, uint24 competencyId) → uint24` (public)





### `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)` (public)





### `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)` (public)





### `mintCompentecy(address from, uint24 competencyId, uint24 amount)` (public)





### `awardCompetency(address from, address to, uint24 competencyId, uint24 skillValuesId)` (public)





### `givePermissionFromOwner(address from, address to, uint24 competencyId, bool permission)` (public)





### `givePermissionFromCreator(address from, address owner, address to, uint24 competencyId, bool permission)` (public)





### `hasPermissionFromCreator(address from, address owner, uint24 competencyId) → bool` (public)





### `hasPermissionFromOwner(address from, address owner, uint24 competencyId) → bool` (public)





### `asignTransferRights(address from, address to, uint24 competencyId, uint256 amount)` (public)





### `getTransferRights(address from, uint24 competencyId) → uint256` (public)





### `makeComptencyRepresentative(address from, address to, uint24 competencyId, bool permission)` (public)





### `isComptencyRepresentative(address from, uint24 competencyId) → bool` (public)







### `Competency`


uint24 id


uint8 KEamount



