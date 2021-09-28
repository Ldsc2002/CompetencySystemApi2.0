import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS } from './config'
//import ComboBox from './Components/ComboBox';
import CompetencyCreator from './Components/CompetencyCreator';
import ItemCreator from './Components/ItemCreator';
import CompetencyConsultor from './Components/CompetencyConsultor';
import CompetencyTransfer from './Components/CompetencyTransfer';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://127.0.0.1:8545")
    const accounts = await web3.eth.getAccounts()
    //console.log(COMPETENCY_SYSTEM_ABI)
    this.setState({ accounts: accounts })
    const competencySystem = new web3.eth.Contract(COMPETENCY_SYSTEM_ABI, COMPETENCY_SYSTEM_ADDRESS)
    this.setState({ competencySystem })
    //console.log(competencySystem.methods)
    console.log(competencySystem.methods)
    
    /*
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }*/
  }
  constructor(props) {
    super(props)
    this.state = { 
      accounts: [],
    }
  }

  render() {
    //console.log(this.state)
    return (
      <>
      <div style={{display: 'flex'}}>
        <CompetencyCreator
          accounts = {this.state.accounts}
        />
        <ItemCreator
          accounts = {this.state.accounts}
          method = {(name, description)=>this.competencySystem.methods.createKnowledgeElement(name, description)}
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
    );
  }
}


export default App;