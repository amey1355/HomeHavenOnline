import React, { useState } from 'react';
import './LoanCalculator.css'; // Import your CSS file

const LoanCalculator = ({ propertyPrice }) => {
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [loanAmount, setLoanAmount] = useState(null);

  const calculateLoanAmount = () => {
    // Convert salary to a number
    const annualSalary = parseFloat(salary);

    // Check the age range and calculate the loan amount accordingly
    let calculatedLoanAmount = 0;
    if (age >= 18 && age <= 30) {
      calculatedLoanAmount = annualSalary * 3;
    } else if (age >= 31 && age <= 50) {
      calculatedLoanAmount = annualSalary * 5;
    } else if (age >= 51) {
      calculatedLoanAmount = annualSalary * 2;
    }

    // Calculate the loan based on property price (e.g., 80% of property price)
    const loanBasedOnProperty = propertyPrice * 0.8;

    // Set the calculated loan amount, considering the property price
    setLoanAmount(Math.min(calculatedLoanAmount, loanBasedOnProperty));
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
          <p>Maximum Loan Amount: ₹{loanAmount}</p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
