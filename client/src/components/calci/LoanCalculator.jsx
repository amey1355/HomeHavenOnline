import React, { useState } from 'react';
import './LoanCalculator.css'; // Import your CSS file

const LoanCalculator = () => {
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [loanAmount, setLoanAmount] = useState(null);

  const calculateLoanAmount = () => {
    // Loan calculation logic here
    // For simplicity, let's say loan amount = salary * 5
    const calculatedLoanAmount = parseFloat(salary) * 5;
    setLoanAmount(calculatedLoanAmount);
  };

  return (
    <div className="loan-calculator">
      <h2>Loan Calculator</h2>
      <div className="input-container">
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="occupation">Occupation:</label>
        <input
          type="text"
          id="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </div>
      <button onClick={calculateLoanAmount}>Calculate Loan</button>
      {loanAmount !== null && (
        <div className="result">
          <p>Maximum Loan Amount: ${loanAmount}</p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
