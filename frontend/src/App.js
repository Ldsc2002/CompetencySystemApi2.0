import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS } from './config'
import CompetencyCreator from './Components/CompetencyCreator';
import ItemCreator from './Components/ItemCreator';
import CompetencyConsultor from './Components/CompetencyConsultor';
import CompetencyTransfer from './Components/CompetencyTransfer';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    this.setState({ loading: false })
    
    const response = await competencySystem.methods.createKnowledgeElement("qwerty", "qwerty").send({from : "0x778E2aEf7bC67d6D7d54969862eBB75eC4aF5618"})
    console.log("r", response)
    const response2 = await competencySystem.methods.getKnowledgeElement(0).call({from : "0x778E2aEf7bC67d6D7d54969862eBB75eC4aF5618"})
    console.log("r2", response2)

  }

  constructor(props) {
    super(props)
    this.state = { 
      accounts: [],
      account : '',
      loading: true
    }

    this.createKnowledgeElement = this.createKnowledgeElement.bind(this)
  }
  
  createKnowledgeElement(name, description) {
    this.setState({ loading: true })
    const a = this.state.competencySystem.methods.prueba().call({from : '0x2299349b39c97E8C490141808107bf60B651C248'})
    console.log(a)
    /*
    this.
    this.state.competencySystem.methods.createKnowledgeElement({ 0: "Prueba"},{1: "esto es una prueba" })
    .send({from : '0x2299349b39c97E8C490141808107bf60B651C248'})
    */
    this.setState({ loading: false })
  }

  render() {
    console.log(this.state)
    return (
      <div style={{height: '100vh'}}>
        { (!this.state.loading) &&
        <>
          <div style={{display: 'flex'}}>
            <CompetencyCreator
              accounts = {this.state.accounts}
            />
            <ItemCreator
              accounts = {this.state.accounts}
              createKnowledgeElement = { this.createKnowledgeElement }
            />
            <CompetencyConsultor
              accounts = {this.state.accounts}
            />          
          </div>
          <div style={{display: 'flex'}}>
            <CompetencyTransfer
              accounts = {this.state.accounts}
            />
            <ItemCreator
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