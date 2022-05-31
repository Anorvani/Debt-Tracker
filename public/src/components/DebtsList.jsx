import React from 'react';

import Debts from './Debts.jsx';

const DebtsList = ({debts, isSelected, handleOnChange}) => {
  return (
  <div className="txn">
    

    <div role="debtTable" className="txn-table">
      <div className="txn-header txn-row">
        <div className="txn-data"><input type="checkbox"></input></div>
        <div className="txn-data">Creditor Name</div>
        <div className="txn-data">First Name</div>
        <div className="txn-data">Last Name</div>
        <div className="txn-data">Min Pay%</div>
        <div className="txn-data">Balance</div>
      </div>
      <div>
        {debts.map((debt, index) => <Debts debt={debt} key={debt.id} index={index} handleOnChange={handleOnChange} isSelected={isSelected}/>)}
      </div>

    </div>
  </div>
  )
}


export default DebtsList;
