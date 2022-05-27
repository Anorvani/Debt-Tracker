import React from 'react';
import axios from 'axios';
import DebtsList from './DebtsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      debts: [],
      isSelected: [],
      total: 0,
      checkRowCount: 0
    }

    this.getDebts = this.getDebts.bind(this);
    this.addDebts = this.addDebts.bind(this);
    this.deleteDebts = this.deleteDebts.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
   }

  componentDidMount() {
    this.getDebts();

  }

  getDebts() {
    axios.get('/api/debts')
      .then((results) => {
        this.setState({debts: results.data});
        this.setState({isSelected: new Array(this.state.debts.length).fill(false)})

      })
      .catch(err => console.error(err))
  }

  addDebts () {
    axios.post('/api/debts', {creditor: "Wells Fargo", firstName: "Bob", lastName: "Baker", minPaymentPercentage: 1.50, balance: 500})
      .then(() => {
        this.getDebts()
        this.setState({isSelected: [...false]})
      })
  }

  deleteDebts () {
    if (this.state.isSelected[this.state.isSelected.length - 1] === true) {
      this.setState({total: this.state.total - this.state.debts[this.state.debts.length - 1].balance})
      this.setState({checkRowCount: this.state.checkRowCount - 1})
    }
    axios.delete('/api/debts')
      .then(() => {
        this.getDebts()
      })
  }

  handleOnChange(position) {
    const updatedIsSelected = this.state.isSelected.map((item, index) => index === position ? !item : item)

    this.setState({isSelected: updatedIsSelected})

    const totalBalance = updatedIsSelected.reduce((sum, currentState, index) => {
      if (currentState === true) {

        return sum + Number(this.state.debts[index].balance)
      }
      return sum
    }, 0)

    const totalCheckedRows = updatedIsSelected.reduce((count, currentState) => {
      if (currentState === true) {
        return count + 1;
      }
      return count;
    }, 0)

    this.setState({total: totalBalance})
    this.setState({checkRowCount: totalCheckedRows})
  }

  render() {
    return (
      <div>
        <h1>Debt Calculator</h1>
        <DebtsList debts={this.state.debts} isSelected={this.state.isSelected} handleOnChange={this.handleOnChange}/>
        <button onClick ={this.addDebts}>Add Debt</button>
        <button onClick={this.deleteDebts} >Delete Debt</button>
        <div>Total: {this.state.total}</div>
        <div>Total Row Count: {this.state.debts.length}</div>
        <div>Check Row Count: {this.state.checkRowCount}</div>
      </div>
    )
  }
};



export default App;

