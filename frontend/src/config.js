export const COMPETENCY_SYSTEM_ADDRESS = '0x5E9C7D26671769cA79Da669F6CAa4d3C33Eaa585'

export const COMPETENCY_SYSTEM_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [ [Object], [Object], [Object] ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [ [Object], [Object], [Object], [Object], [Object] ],
    name: 'TransferBatch',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [ [Object], [Object], [Object], [Object], [Object] ],
    name: 'TransferSingle',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [ [Object], [Object] ],
    name: 'URI',
    type: 'event'
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'balanceOf',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'balanceOfBatch',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'isApprovedForAll',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'supportsInterface',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object] ],
    name: 'uri',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'createKnowledgeElement',
    outputs: [ [Object] ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'getKnowledgeElement',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'getKnowledgeElements',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'createDispositions',
    outputs: [ [Object] ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'getDisposition',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'getDispositions',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object], [Object] ],
    name: 'createCompetency',
    outputs: [ [Object] ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'getCompetency',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'getCompetencys',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object] ],
    name: 'getSkillLevel',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object] ],
    name: 'getSkillLevelRecord',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [ [Object], [Object], [Object], [Object], [Object] ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object], [Object], [Object] ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object], [Object], [Object] ],
    name: 'awardCompetency',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object], [Object] ],
    name: 'asignTransferRights',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object] ],
    name: 'givePermissionFromOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object], [Object] ],
    name: 'givePermissionFromCreator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object], [Object], [Object], [Object] ],
    name: 'updateSkillValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
