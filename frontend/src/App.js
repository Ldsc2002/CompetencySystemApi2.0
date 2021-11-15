import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS } from './config'
import CompetencyCreator from './Components/CompetencyCreator';
import ItemCreator from './Components/ItemCreator';
import CompetencyConsultor from './Components/CompetencyConsultor';
import CompetencyMiner from './Components/CompetencyMiner';
import ItemConsultor from './Components/ItemConsultor';
import CompetencyTransfer from './Components/CompetencyTransfer';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditPermission from './Components/EditPermission';
import BalanceConsultor from './Components/BalanceConsultor';
import SkillConsultor from './Components/SkillConsultor';
import PermissionConsultor from './Components/PermissionConsultor';
import Button from '@material-ui/core/Button';
import ConsultTransferRights from './Components/ConsultTransferRights';
import TransferRights from './Components/TransferRights';
import { 
  getKnowledgeElements ,
  createKnowledgeElements, 
  getKnowledgeElement,
  getDispositions,
  createDispositions,
  getDisposition,
  getCompetencys,
  createCompetencys,
  getCompetency,
  getSkillLevels,
  createSkillLevels,
  getSkillLevel,
  patchSkillLevel
} from './Components/functions'

//ganache-cli --gasLimit=0x1fffffffffffff --gasPrice=0
//$ json-server --watch db.json --port 3004

const SKILLLEVELS = [ "Remembering", "Understanding", "Applying", "Analyzing", "Evaluating", "Creating"]



class App extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://127.0.0.1:8545")
    const accounts = await web3.eth.getAccounts()
    //console.log(COMPETENCY_SYSTEM_ABI)
    this.setState({ accounts: accounts })
    this.setState({ account: accounts[0] })
    const competencySystem = new web3.eth.Contract(COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS)
    this.setState({ competencySystem })
    //Get Json server data
    this.loadData() 
    this.loadCompetencys()
    this.setState({ loading: false })
  }

  async loadData() {
    const kes = await getKnowledgeElements();
    this.setState({ knowledgeElements: kes })
    const dis = await getDispositions();
    this.setState({ dispositions: dis })
  }

  async loadCompetencys(){
    let com = await getCompetencys();
    const competencys = await this.state.competencySystem.methods.getCompetencys().call({from : this.state.account})
    if (competencys.length > 0){
      com.map((competency, index) => {
        const id = competencys.map(
          (c, i) => {
            if (c[0] == competency.id){
              return i
            } else {
              return undefined
            }
          }).find((element) => element !== undefined)
        com[index]["blockId"] = id
      })
    }
    this.setState({ competencys: com })
  }

  constructor(props) {
    super(props)
    this.state = { 
      accounts: [],
      knowledgeElements: [],
      dispositions: [],
      competencys: [],
      account : '',
      loading: true
    }
    //GETS
    this._createCompetency = this._createCompetency.bind(this)
    this._consultBalance = this._consultBalance.bind(this)
    this._mintCompetency = this._mintCompetency.bind(this)
    this._awardCompetency = this._awardCompetency.bind(this)
    this._updateCompetency = this._updateCompetency.bind(this)
    this._consultSkillLevel = this._consultSkillLevel.bind(this)
    this._consultPermissionFromCreator = this._consultPermissionFromCreator.bind(this)
    this._consultPermissionFromOwner = this._consultPermissionFromOwner.bind(this)
    this._givePermissionFromCreator = this._givePermissionFromCreator.bind(this)
    this._givePermissionFromOwner = this._givePermissionFromOwner.bind(this)
    this._consultTransferRights = this._consultTransferRights.bind(this)
    this._isCompetencyRepresentative = this._isCompetencyRepresentative.bind(this)
    this._asignTransferRights = this._asignTransferRights.bind(this)
    this._makeComptencyRepresentative = this._makeComptencyRepresentative.bind(this)
    this.fill = this.fill.bind(this)
  }

  async fill(){
    this.setState({ loading: true })
    //Map existing json-Server competencies, and create new ones on the blockchain
    this.state.competencys.map(
      (competency) => {
        this.state.competencySystem.methods.createCompetency(
          this.state.account, competency.id, competency.knowledgeElements.length
        ).send({from : this.state.account}).then(
          function(receipt){
            console.log(receipt)
          }
        )
      }
    )
    //update the state
    let com = await getCompetencys();
    const competencys = await this.state.competencySystem.methods.getCompetencys().call({from : this.state.account})
    com.map((competency, index) => {
      const id = competencys.map(
        (c, i) => {
           if (c[0] == competency.id){
             return i
           } 
        }).find((element) => element !== undefined)
      com[index]["blockId"] = id
    })
    this.setState({ competencys: com })
    //this._mintCompetency(this.account, 0, 10)
    this.setState({ loading: false })
  }
  
  /*////////////////////////////// Competencys ////////////////////////// */

  async _createCompetency(account, obj) {
    if (account && obj) {
      //Create Json server competency ///////////FIX
      const oldIds = this.state.competencys.map((compentecy) => {return compentecy.id } )
      const res = await createCompetencys(obj)
      let com = await getCompetencys();
      this.setState({ competencys: com })
      const newIds = this.state.competencys.map((compentecy) => {return compentecy.id } )
      //Get the new id
      const id = newIds.filter((id) => !oldIds.includes(id))[0]
      //Create competency in blockchain
      this.state.competencySystem.methods.createCompetency(
        account, id, obj.knowledgeElements.length
      ).send({from : account}).then(
        function(receipt){
          console.log(receipt)
        }
      )
      //update the state
      this.loadCompetencys()
    }
  }

  async _consultBalance(account){
    const ids = this.state.competencys.map((compentecy) => { return compentecy.blockId })
    const balance = await this.state.competencySystem.methods.balanceOfBatch(ids.map(id => {return account}), ids)
    .call({from : this.state.account})
    const response = this.state.competencys.map((compentecy, index) => { return {"name":compentecy.name, "amount": balance[index]} })
    return response
  }
 
  async _mintCompetency(account, competencyId, amount){
    let response;
    await this.state.competencySystem.methods.mintCompentecy(
        account, competencyId, amount
      ).send({from : account}).then(
        function(receipt){
          console.log(receipt)
          response = null
        },
        function(reason){
          response = reason.message.substring(65).trim()
        }
      )
    return response
  }

  async _awardCompetency(from, to, competencyId, skillValues){
    let response
    const isAuthorized = await this.state.competencySystem.methods.hasPermissionFromCreator( from, to, competencyId ).call({from : this.state.account})
    const obj = {
      records : [
        {
          "author": from, 
          "isAuthorized": isAuthorized,
          "value": skillValues
        }
      ]
    }
    //Create Json server competency
    const oldIds = (await getSkillLevels()).map(id => {return id.id})
    const res = await createSkillLevels(obj)
    const newIds = (await getSkillLevels()).map(id => {return id.id})
    //Get the new id
    const id = newIds.filter((id) => !oldIds.includes(id))[0]
    await this.state.competencySystem.methods.awardCompetency(
      from, to, competencyId, id
    ).send({from : from}).then(
      function(receipt){
        console.log(receipt)
      },
      function(reason){
        console.log(reason.message)
      }
    )
  }
 
  async _updateCompetency(from, to, competencyId, skillValues){
    let response
    const isAuthorizedByCreator = await this.state.competencySystem.methods.hasPermissionFromCreator( from, to, competencyId ).call({from : this.state.account})
    const isAuthorizedByOwner = await this.state.competencySystem.methods.hasPermissionFromOwner( from, to, competencyId ).call({from : this.state.account})
    if (isAuthorizedByOwner) {
      const skillsId = await this.state.competencySystem.methods.getSkillLevel(to, competencyId).call({from : this.state.account})
      //console.log("values", from, to, competencyId, skillValues, skillsId)
      const skillsValues = await getSkillLevel(skillsId)
      const obj = 
      {
        "records": [
          {
            "author": from, 
            "isAuthorized": isAuthorizedByCreator,
            "value": skillValues
          }
          , ...skillsValues.records
        ]
      }
      //skillsValues.records.push(obj)
      const res = await patchSkillLevel(skillsId, obj)
    } else {
      return ("Dosent have permission")
    }
  }
 
  async _consultSkillLevel(account, competencyId){
    console.log("Consult",  account, competencyId)
    let skillsId 
    await this.state.competencySystem.methods.getSkillLevel(account, competencyId)
    .call({from : this.state.account}).then(
      function(receipt){
        skillsId = receipt
      },
      function(reason){
        console.log(reason.message)
      }
    )

    if (skillsId != 0){
      const skillsValues = await getSkillLevel(skillsId)
      const competency = await getCompetency(competencyId + 1)
      const knowledgeElements = this.state.knowledgeElements.filter(
        (knowledgeElement) => competency.knowledgeElements.includes(knowledgeElement.id) 
      ).map(
        (knowledgeElement) => {return knowledgeElement.name}
      )
      skillsValues.records.map( 
        (record) => (
          record.value = record.value.map((value, i) => {
            return knowledgeElements[i]+":"+value
          })
        )
      ) 
      const response = skillsValues.records
      return response
    }
  }

  async _consultPermissionFromCreator(from, to, competencyId){
    const response = await this.state.competencySystem.methods.hasPermissionFromCreator(from, to, competencyId).call({from : this.state.account})
    return response
  }

  async _consultPermissionFromOwner(from, to, competencyId){
    const response = await this.state.competencySystem.methods.hasPermissionFromOwner(from, to, competencyId).call({from : this.state.account})
    console.log("Consult with", from, to, competencyId)
    console.log(response)
    return response
  }

  async _givePermissionFromCreator(creator, from, to, competencyId, permission){
    this.state.competencySystem.methods.givePermissionFromCreator(
      creator, from, to, competencyId, permission
    ).send({from : from}).then(
      function(receipt){
        console.log(receipt)
      }
    )
    const response = await this.state.competencySystem.methods.hasPermissionFromCreator(from, to, competencyId).call({from : this.state.account})
  }

  async _givePermissionFromOwner(from, to, competencyId, permission){
    this.state.competencySystem.methods.givePermissionFromOwner(
      from, to, competencyId, permission
    ).send({from : from}).then(
      function(receipt){
        console.log(receipt)
      }
    )
    const response = await this.state.competencySystem.methods.hasPermissionFromOwner(to, from, competencyId).call({from : this.state.account})
  }

  async _consultTransferRights(from, competencyId){
    const response = await this.state.competencySystem.methods.getTransferRights(from, competencyId).call({from : this.state.account})
    console.log(response)
    return response
  }

  async _isCompetencyRepresentative(from, competencyId){
    const response = await this.state.competencySystem.methods.isComptencyRepresentative(from, competencyId).call({from : this.state.account})
    console.log(response)
    return response
  }

  async _asignTransferRights(from, to, competencyId, amount){
    let response
    await this.state.competencySystem.methods.asignTransferRights(
      from, to, competencyId, amount
    ).send({from : from}).then(
      function(receipt){
        console.log(receipt)
      },
      function(reason){
        response = reason.message.substring(65).trim()
      }
    )
    return response
  }

  async _makeComptencyRepresentative(from, to, competencyId, permission){
    console.log(from, to, competencyId, permission)
    let response
    await this.state.competencySystem.methods.makeComptencyRepresentative(
      from, to, competencyId, permission
    ).send({from : from}).then(
      function(receipt){
        console.log(receipt)
      },
      function(reason){
        response = reason.message.substring(65).trim()
      }
    )
    return response
  }

  /*//////////////////////////////  ////////////////////////// */


  render() {
    console.log(this.state)
    return (
      <div style={{height: '100vh'}}>
        { (!this.state.loading) &&
        <>          
          <Button 
            size="medium" 
            variant="outlined" 
            color="secondary"
            onClick={
              () => this.fill()
            }>
            LLenar
          </Button>
          <br/>
          <div style={{display: 'flex'}}>
            <CompetencyCreator
              accounts = {this.state.accounts}
              knowledgeElements = {this.state.knowledgeElements ? this.state.knowledgeElements : []}
              dispositions = {this.state.dispositions ? this.state.dispositions : []}
              createCompetency = {this._createCompetency}
            />
             <ItemCreator
              createKnowledgeElement = { (value) => {
                this.setState({ loading: true })
                createKnowledgeElements(value) 
                this.loadData()
                this.setState({ loading: false })
              }}
              createDispositions = { (value) => { 
                this.setState({ loading: true })
                createDispositions(value) 
                this.loadData()
                this.setState({ loading: false })
              }}
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <ItemConsultor // Permisos de edición
                accounts = {this.state.accounts}
                knowledgeElements = {this.state.knowledgeElements ? this.state.knowledgeElements : []}
                dispositions = {this.state.dispositions ? this.state.dispositions : []}
                knowledgeElementsMethod = {(value) => getKnowledgeElement(value)}
                dispositionsMethod = {(value) => getDisposition(value)}
              />  
              <CompetencyConsultor //Asignacion de representante
                competencys = {this.state.competencys ? this.state.competencys  : []}
                knowledgeElements = {this.state.knowledgeElements ? this.state.knowledgeElements : []}
                dispositions = {this.state.dispositions ? this.state.dispositions : []}
                competencysMethod = { (value) => getCompetency(value) }
              />  
            </div>        
          </div>
          <div style={{display: 'flex'}}>
            <CompetencyMiner 
              competencys = {this.state.competencys ? this.state.competencys  : []}
              accounts = {this.state.accounts}         
              competencysMethod = { (value1, value2, value3) => this._mintCompetency(value1, value2, value3) }
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <BalanceConsultor
                accounts = {this.state.accounts} 
                balanceMethod = {this._consultBalance}
              />
              <SkillConsultor // Permisos de edición
                accounts = {this.state.accounts}
                competencys = {this.state.competencys ? this.state.competencys  : []}
                method = {this._consultSkillLevel}
              />
            </div>  
            <TransferRights // Permisos de edición
              accounts = {this.state.accounts}
              competencys = {this.state.competencys ? this.state.competencys  : []}
              methodRights = {this._asignTransferRights}
              methodRepresentative = {this._makeComptencyRepresentative}
            /> 
            <ConsultTransferRights // Permisos de edición
              accounts = {this.state.accounts}
              competencys = {this.state.competencys ? this.state.competencys  : []}
              methodRights = {this._consultTransferRights}
              methodRepresentative = {this._isCompetencyRepresentative}
            />  
          </div>
          <div style={{display: 'flex'}}>
            <CompetencyTransfer
              competencys = {this.state.competencys ? this.state.competencys  : []}
              knowledgeElements = {this.state.knowledgeElements ? this.state.knowledgeElements : []}
              accounts = {this.state.accounts}
              skillLevels = {SKILLLEVELS}
              awardMethod = {this._awardCompetency}
              updateMethod = {this._updateCompetency}
            /> 
            <EditPermission
              accounts = {this.state.accounts}
              competencys = {this.state.competencys ? this.state.competencys  : []}
              methodOwner = {this._givePermissionFromOwner}
              methodCreator = {this._givePermissionFromCreator}
            /> 
            <PermissionConsultor // Permisos de edición
              accounts = {this.state.accounts}
              competencys = {this.state.competencys ? this.state.competencys  : []}
              methodOwner = {this._consultPermissionFromOwner}
              methodCreator = {this._consultPermissionFromCreator}
            />    
          </div>
        </>
        }
        { (this.state.loading) &&
          <div style={{display: 'flex', justifyContent: "center", alignItems: "center", height: '100%'}}>
            <CircularProgress 
              color="secondary"
              size={200}/>
          </div>          
        }
      </div>
      
    );
  }
}


export default App;