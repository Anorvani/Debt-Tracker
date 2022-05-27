import React from 'react';

const Debts = ({debt, index, handleOnChange, isSelected}) => {
    return (
      <div className="txn-row">
        <div className="txn-data">
          <input
            type="checkbox"
            value = {debt.balance}
            selected = {isSelected[index]}
            onChange={() => handleOnChange(index)}
          >
          </input>
        </div>
        <div className="txn-data">{debt.creditor}</div>
        <div className="txn-data">{debt.firstName}</div>
        <div className="txn-data">{debt.lastName}</div>
        <div className="txn-data">{debt.minPaymentPercentage}</div>
        <div className="txn-data">{debt.balance}</div>
      </div>
    )
}

export default Debts;