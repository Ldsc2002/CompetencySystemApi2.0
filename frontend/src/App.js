import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS } from './config'
import CompetencyCreator from './Components/CompetencyCreator';
import ItemCreator from './Components/ItemCreator';
import CompetencyConsultor from './Components/CompetencyConsultor';
import ItemConsultor from './Components/ItemConsultor';
import CompetencyTransfer from './Components/CompetencyTransfer';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditPermission from './Components/editPermission';
import Button from '@material-ui/core/Button';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    //console.log("load")
    const web3 = new Web3("http://127.0.0.1:8545")
    const accounts = await web3.eth.getAccounts()
    //console.log(COMPETENCY_SYSTEM_ABI)
    this.setState({ accounts: accounts })
    this.setState({ account: accounts[0] })
    const competencySystem = new web3.eth.Contract(COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS)
    this.setState({ competencySystem })
    this.setState({ loading: false })
    
    const kes = await competencySystem.methods.getKnowledgeElements().call({from : this.state.account})
    this.setState({ 
      knowledgeElements: (kes.map(element => {return {"name": element[0], "anotation": element[1]}}))
    })
    const dispositions = await competencySystem.methods.getDispositions().call({from : this.state.account})
    this.setState({ 
      dispositions: (dispositions.map(element => {return {"name": element[0], "anotation": element[1]}}))
    })
    /*
    this.state.competencySystem.methods.createCompetency(
      accounts[0], "c1", "statement", [0], [0]
    ).send({from : this.state.account}).then(
      function(receipt){
        console.log(receipt)
      }
    )*/
    const competencys = await this.state.competencySystem.methods.getCompetencys().call({from : this.state.account})
    console.log(competencys)
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

    this._createKnowledgeElement = this._createKnowledgeElement.bind(this)
    this.createKnowledgeElement = this.createKnowledgeElement.bind(this)
    this.createDispositions = this.createDispositions.bind(this)
    this._createCompetency = this._createCompetency.bind(this)
    this.getDispositions = this.getDispositions.bind(this)
    this.getKnowledgeElements = this.getKnowledgeElements.bind(this)
    this.fill = this.fill.bind(this)
  }

  async fill(){
    const dispositions = [
      {
        name: "Disposition 1",
        anotation: "This is the disposition 1"
      },
      {
        name: "Disposition 2",
        anotation: "This is the disposition 2"
      },
      {
        name: "Disposition 3",
        anotation: "This is the disposition 3"
      },
    ]

    const knowledgeElements = [
      {
        name: "Knowledge Element 1",
        anotation: "This is the Knowledge Element 1"
      },
      {
        name: "Knowledge Element 2",
        anotation: "This is the Knowledge Element 2"
      },
      {
        name: "Knowledge Element 3",
        anotation: "This is the Knowledge Element 3"
      },
    ]

    const compentecys = [
      {
        name: "Competency 1",
        statement: "This is the statement of the competency 1",
        knowledgeElements: [1, 2, 3],
        dispositions: [1, 2, 3],
      },
      {
        name: "Competency 2",
        statement: "This is the statement of the competency 2",
        knowledgeElements: [1, 2, 3],
        dispositions: [1, 2, 3],
      },
      {
        name: "Competency 3",
        statement: "This is the statement of the competency 3",
        knowledgeElements: [1, 2, 3],
        dispositions: [1, 2, 3],
      },
    ]

    dispositions.map(async (disposition) => (this._createDispositions(disposition.name, disposition.anotation)))
    knowledgeElements.map(async (knowledgeElement) => (this._createKnowledgeElement(knowledgeElement.name, knowledgeElement.anotation)))
    //compentecys.map(async (compentecy) => (this._createCompetency(this.state.account, compentecy.name, compentecy.name, compentecy.knowledgeElements, compentecy.dispositions)))

  }


  /*////////////////////////////// Knowledge Elements ////////////////////////// */

  async getKnowledgeElements(){
    //console.log("inicio 2")
    const kes = await this.state.competencySystem.methods.getKnowledgeElements().call({from : this.state.account})
    this.setState({ 
      knowledgeElements: (kes.map(element => {return {"name": element[0], "anotation": element[1]}}))
    })
    //console.log("fin 2")
  }

  async _createKnowledgeElement(name, description) {
    //console.log("inicio 1")
    this.state.competencySystem.methods.createKnowledgeElement(name, description).send({from : this.state.account}).then(
      function(receipt){
        console.log(receipt)
      }
    );
    //console.log("fin 1")
  }

  async createKnowledgeElement(name, description) {
    this.setState({ loading: true })
    await this._createKnowledgeElement(name, description)
    await this.getKnowledgeElements()
    this.setState({ loading: false })
  }

  /*////////////////////////////// Dispositions ////////////////////////// */

  async getDispositions(){
    this.setState({ loading: true })
    const dispositions = await this.state.competencySystem.methods.getDispositions().call({from : this.state.account})
    this.setState({ 
      dispositions: (dispositions.map(element => {return {"name": element[0], "anotation": element[1]}}))
    })
    this.setState({ loading: false })
  }

  async _createDispositions(name, description) {
    this.setState({ loading: true })
    this.state.competencySystem.methods.createDispositions(name, description).send({from : this.state.account}).then(
      function(receipt){
        console.log(receipt)
      }
    );
    this.setState({ loading: false })
  }

  async createDispositions(name, description) {
    this.setState({ loading: true })
    this.state.competencySystem.methods.createDispositions(name, description).send({from : this.state.account}).then(
      function(receipt){
        console.log(receipt)
      }
    );
    this.setState({ loading: false })
  }

  /*////////////////////////////// Competencys ////////////////////////// */

  async getCompetencys(){
    //console.log("inicio 2")
    const competencys = await this.state.competencySystem.methods.getCompetencys().call({from : this.state.account})
    console.log("Competencys", competencys)
    /*
    this.setState({ 
      Competencys: (kes.map(element => {return {"name": element[0], "anotation": element[1]}}))
    })*/
    //console.log("fin 2")
  }

  async _createCompetency(from, name, statement, knowledgeElements, dispositions) {

    console.log("valores")
    console.log(from, name, statement, knowledgeElements, dispositions)

    //this.setState({ loading: true })
    this.state.competencySystem.methods.createCompetency(from, name, statement, knowledgeElements, dispositions)
    .send({from : this.state.account}).then(
      function(receipt){
        console.log(receipt)
      }
    );
    //this.setState({ loading: false })
  }

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
          <Button 
            size="medium" 
            variant="outlined" 
            color="secondary"
            onClick={
              () => {
                this.state.competencySystem.methods.createCompetency(
                   "c1", "statement", [0], [0]
                ).send({from : this.state.account}).then(
                  function(receipt){
                    console.log(receipt)
                  }
                )
              }
            }>
            Crear
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
              accounts = {this.state.accounts}
              createKnowledgeElement = { this.createKnowledgeElement }
              createDispositions = { this.createDispositions }
            />  
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <ItemConsultor // Permisos de edición
                accounts = {this.state.accounts}
              />  
              <CompetencyConsultor //Asignacion de representante
                accounts = {this.state.accounts}
              />  
            </div>        
          </div>
          <div style={{display: 'flex'}}>
            <EditPermission
              accounts = {this.state.accounts}
            />  
            <CompetencyTransfer
              accounts = {this.state.accounts}
            />  
            <EditPermission
              accounts = {this.state.accounts}
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