import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS } from './config'
import CompetencyCreator from './Components/CompetencyCreator'
import ItemCreator from './Components/ItemCreator'
import CompetencyConsultor from './Components/CompetencyConsultor'
import CompetencyMiner from './Components/CompetencyMiner'
import ItemConsultor from './Components/ItemConsultor'
import CompetencyTransfer from './Components/CompetencyTransfer'
import CircularProgress from '@material-ui/core/CircularProgress'
import EditPermission from './Components/EditPermission'
import BalanceConsultor from './Components/BalanceConsultor'
import SkillConsultor from './Components/SkillConsultor'
import PermissionConsultor from './Components/PermissionConsultor'
import Button from '@material-ui/core/Button'
import ConsultTransferRights from './Components/ConsultTransferRights'
import TransferRights from './Components/TransferRights'
import { 
  getKnowledgeElements, createKnowledgeElements, getKnowledgeElement,
  getDispositions, createDispositions, getDisposition,
  getCompetencys, createCompetencys, getCompetency,
  getSkillLevels, createSkillLevels, getSkillLevel, patchSkillLevel
} from './Components/functions'

const SKILLLEVELS = ["Remembering", "Understanding", "Applying", "Analyzing", "Evaluating", "Creating"]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      accounts: [],
      knowledgeElements: [],
      dispositions: [],
      competencys: [],
      account: '',
      loading: true
    }

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

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://127.0.0.1:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts, account: accounts[0] })

    const competencySystem = new web3.eth.Contract(COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS)
    this.setState({ competencySystem })

    await this.loadData()
    await this.loadCompetencys()
    this.setState({ loading: false })
  }

  async loadData() {
    const knowledgeElements = await getKnowledgeElements()
    const dispositions = await getDispositions()
    this.setState({ knowledgeElements, dispositions })
  }

  async loadCompetencys() {
    let com = await getCompetencys()
    const competencys = await this.state.competencySystem.methods.getCompetencys().call({ from: this.state.account })

    if (competencys.length > 0) {
      com.forEach((competency, index) => {
        const id = competencys.findIndex(c => c[0] === competency.id)
        if (id !== -1) com[index]["blockId"] = id
      })
    }
    this.setState({ competencys: com })
  }

  async fill() {
    this.setState({ loading: true })
    const { competencySystem, account, competencys } = this.state

    competencys.forEach((competency) => {
      competencySystem.methods.createCompetency(
        account, competency.id, competency.knowledgeElements.length
      ).send({ from: account }).then(console.log)
    })

    const updatedCompetencys = await getCompetencys()
    const blockchainCompetencys = await competencySystem.methods.getCompetencys().call({ from: account })

    updatedCompetencys.forEach((competency, index) => {
      const id = blockchainCompetencys.findIndex(c => c[0] === competency.id)
      if (id !== -1) updatedCompetencys[index]["blockId"] = id
    })

    this.setState({ competencys: updatedCompetencys, loading: false })
  }

  async _createCompetency(account, obj) {
    if (account && obj) {
      const oldIds = this.state.competencys.map((compentecy) => compentecy.id)
      await createCompetencys(obj)

      const newIds = this.state.competencys.map((compentecy) => compentecy.id)
      const id = newIds.filter((id) => !oldIds.includes(id))[0]

      this.state.competencySystem.methods.createCompetency(
        account, id, obj.knowledgeElements.length
      ).send({ from: account }).then(console.log)

      this.loadCompetencys()
    }
  }

  async _consultBalance(account) {
    const ids = this.state.competencys.map(compentecy => compentecy.blockId)
    const balance = await this.state.competencySystem.methods.balanceOfBatch(ids.map(() => account), ids)
      .call({ from: this.state.account })

    return this.state.competencys.map((compentecy, index) => ({
      name: compentecy.name,
      amount: balance[index]
    }))
  }

  async _mintCompetency(account, competencyId, amount) {
    let response
    await this.state.competencySystem.methods.mintCompentecy(
      account, competencyId, amount
    ).send({ from: account }).then(console.log, reason => {
      response = reason.message.substring(65).trim()
    })
    return response
  }

  async _awardCompetency(from, to, competencyId, skillValues) {
    const isAuthorized = await this.state.competencySystem.methods.hasPermissionFromCreator(from, to, competencyId)
      .call({ from: this.state.account })
    
    const oldIds = (await getSkillLevels()).map(id => id.id)
    await createSkillLevels({ records: [{ author: from, isAuthorized, value: skillValues }] })

    const newIds = (await getSkillLevels()).map(id => id.id)
    const id = newIds.filter((id) => !oldIds.includes(id))[0]

    let msg
    await this.state.competencySystem.methods.awardCompetency(from, to, competencyId, id)
      .send({ from }).then(() => { msg = "" }, reason => { msg = reason.message.substring(65).trim() })

    return msg
  }

  async _updateCompetency(from, to, competencyId, skillValues) {
    const isAuthorizedByOwner = await this.state.competencySystem.methods.hasPermissionFromOwner(from, to, competencyId)
      .call({ from: this.state.account })

    if (isAuthorizedByOwner) {
      const skillsId = await this.state.competencySystem.methods.getSkillLevel(to, competencyId)
        .call({ from: this.state.account })
      
      const skillsValues = await getSkillLevel(skillsId)
      const obj = { records: [{ author: from, value: skillValues }, ...skillsValues.records] }
      await patchSkillLevel(skillsId, obj)
      return ""
    } else {
      return "No cuenta con permiso"
    }
  }

  async _consultSkillLevel(account, competencyId) {
    const skillsId = await this.state.competencySystem.methods.getSkillLevel(account, competencyId)
      .call({ from: this.state.account })

    if (skillsId != 0) {
      const skillsValues = await getSkillLevel(skillsId)
      const competency = await getCompetency(competencyId + 1)

      const knowledgeElements = this.state.knowledgeElements.filter(
        (ke) => competency.knowledgeElements.includes(ke.id)
      ).map(ke => ke.name)

      skillsValues.records.forEach(record => {
        record.value = record.value.map((value, i) => `${knowledgeElements[i]}:${value}`)
      })

      return skillsValues.records
    }
  }

  async _consultPermissionFromCreator(from, to, competencyId) {
    return await this.state.competencySystem.methods.hasPermissionFromCreator(from, to, competencyId)
      .call({ from: this.state.account })
  }

  async _consultPermissionFromOwner(from, to, competencyId) {
    return await this.state.competencySystem.methods.hasPermissionFromOwner(from, to, competencyId)
      .call({ from: this.state.account })
  }

  async _givePermissionFromCreator(creator, from, to, competencyId, permission) {
    await this.state.competencySystem.methods.givePermissionFromCreator(
      creator, from, to, competencyId, permission
    ).send({ from }).then(console.log)

    return await this.state.competencySystem.methods.hasPermissionFromCreator(from, to, competencyId)
      .call({ from: this.state.account })
  }

  async _givePermissionFromOwner(from, to, competencyId, permission) {
    await this.state.competencySystem.methods.givePermissionFromOwner(
      from, to, competencyId, permission
    ).send({ from }).then(console.log)

    return await this.state.competencySystem.methods.hasPermissionFromOwner(to, from, competencyId)
      .call({ from: this.state.account })
  }

  async _consultTransferRights(from, competencyId) {
    return await this.state.competencySystem.methods.getTransferRights(from, competencyId)
      .call({ from: this.state.account })
  }

  async _isCompetencyRepresentative(from, competencyId) {
    return await this.state.competencySystem.methods.isComptencyRepresentative(from, competencyId)
      .call({ from: this.state.account })
  }

  async _asignTransferRights(from, to, competencyId, amount) {
    let response
    await this.state.competencySystem.methods.asignTransferRights(from, to, competencyId, amount)
      .send({ from }).then(console.log, reason => {
        response = reason.message.substring(65).trim()
      })
    return response
  }

  async _makeComptencyRepresentative(from, to, competencyId, permission) {
    let response
    await this.state.competencySystem.methods.makeComptencyRepresentative(
      from, to, competencyId, permission
    ).send({ from }).then(console.log, reason => {
      response = reason.message.substring(65).trim()
    })
    return response
  }

  render() {
    const { loading, accounts, knowledgeElements, dispositions, competencys } = this.state

    return (
      <div style={{ height: '100vh' }}>
        {!loading ? (
          <>
            <Button
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={this.fill}
            >
              Llenar
            </Button>
            <br />
            <div style={{ display: 'flex' }}>
              <CompetencyCreator
                accounts={accounts}
                knowledgeElements={knowledgeElements}
                dispositions={dispositions}
                createCompetency={this._createCompetency}
              />
              <ItemCreator
                createKnowledgeElement={(value) => {
                  this.setState({ loading: true })
                  createKnowledgeElements(value)
                  this.loadData()
                  this.setState({ loading: false })
                }}
                createDispositions={(value) => {
                  this.setState({ loading: true })
                  createDispositions(value)
                  this.loadData()
                  this.setState({ loading: false })
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ItemConsultor
                  accounts={accounts}
                  knowledgeElements={knowledgeElements}
                  dispositions={dispositions}
                  knowledgeElementsMethod={getKnowledgeElement}
                  dispositionsMethod={getDisposition}
                />
                <CompetencyConsultor
                  competencys={competencys}
                  knowledgeElements={knowledgeElements}
                  dispositions={dispositions}
                  competencysMethod={getCompetency}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <CompetencyMiner
                competencys={competencys}
                accounts={accounts}
                competencysMethod={this._mintCompetency}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <BalanceConsultor
                  accounts={accounts}
                  balanceMethod={this._consultBalance}
                />
                <SkillConsultor
                  accounts={accounts}
                  competencys={competencys}
                  method={this._consultSkillLevel}
                />
              </div>
              <TransferRights
                accounts={accounts}
                competencys={competencys}
                methodRights={this._asignTransferRights}
                methodRepresentative={this._makeComptencyRepresentative}
              />
              <ConsultTransferRights
                accounts={accounts}
                competencys={competencys}
                methodRights={this._consultTransferRights}
                methodRepresentative={this._isCompetencyRepresentative}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <CompetencyTransfer
                competencys={competencys}
                knowledgeElements={knowledgeElements}
                accounts={accounts}
                skillLevels={SKILLLEVELS}
                awardMethod={this._awardCompetency}
                updateMethod={this._updateCompetency}
              />
              <EditPermission
                accounts={accounts}
                competencys={competencys}
                methodOwner={this._givePermissionFromOwner}
                methodCreator={this._givePermissionFromCreator}
              />
              <PermissionConsultor
                accounts={accounts}
                competencys={competencys}
                methodOwner={this._consultPermissionFromOwner}
                methodCreator={this._consultPermissionFromCreator}
              />
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress color="secondary" size={200} />
          </div>
        )}
      </div>
    )
  }
}

export default App
