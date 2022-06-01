import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DebtsList from './DebtsList.jsx';

const App = () => {
  let [debts, setDebts] = useState([]);
  let [isSelected, setIsSelected] = useState([]);
  let [totalBalanceChecked, setTotalBalanceChecked] = useState(0);
  let [checkRowCount, setCheckRowCount] = useState(0);
  let [count, setCount] =useState(0)

  useEffect(() => {
    getDebts();
  }, [count]);

  const getDebts = () => {
    axios.get('/api/debts')
      .then((results) => {
        setDebts(results.data);
        setCount(results.data.length);
        if (isSelected.length === 0) {
          setIsSelected(new Array(results.data.length).fill(false))
        }
      })
      .catch(err => console.error(err))
  }

  const addDebts = ()  => {
    axios.post('/api/debts', {creditorName: "Wells Fargo", firstName: "Bob", lastName: "Baker", minPaymentPercentage: 1.50, balance: 500})
      .then(() => {
        setIsSelected([...isSelected, false])
        setCount(count + 1)
      })
  }

  const deleteDebts = () => {
    if (isSelected[isSelected.length - 1] === true) {
      setTotalBalanceChecked(totalBalanceChecked - debts[debts.length - 1].balance)
      setCheckRowCount(checkRowCount - 1)
    }
    setIsSelected(isSelected.slice(0, isSelected.length - 1))
    axios.delete('/api/debts')
      .then(() => {
        setCount(count - 1)
      })
  }

  const handleOnChange = (position) => {
    const updatedIsSelected = isSelected.map((item, index) => index === position ? !item : item)

    setIsSelected(updatedIsSelected)

    const totalBalance = updatedIsSelected.reduce((sum, currentState, index) => {
      if (currentState === true) {

        return sum + Number(debts[index].balance)
      }
      return sum
    }, 0)

    const totalCheckedRows = updatedIsSelected.reduce((count, currentState) => {
      if (currentState === true) {
        return count + 1;
      }
      return count;
    }, 0)

    setTotalBalanceChecked(totalBalance)
    setCheckRowCount(totalCheckedRows)
  }

  if (debts.length === 0) {
    return (<h2>Loading...</h2>)
  }
  return (
    <div>
      <h1>Debt Calculator</h1>
      <h3>Debts</h3>
      <DebtsList debts={debts} isSelected={isSelected} handleOnChange={handleOnChange}/>
      <div>
      <button data-testid="addDebt" onClick ={addDebts}>Add Debt</button>
      <button onClick={deleteDebts} >Delete Debt</button>
      </div>

      <div className="totalChecked">
        <div className="total">Total: </div>
        <div className="totalAmount">{totalBalanceChecked}</div>
      </div>
      <div className="rowInfo">
        <div data-testid="rowCount" >Total Row Count: {count}</div>
        <div data-testid="checkedRowCount">Check Row Count: {checkRowCount}</div>
      </div>
    </div>
  )
};

export default App;

