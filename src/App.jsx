import { useState } from "react";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null); // aylık
  const [totalPayment, setTotalPayment] = useState(null); // total
  const [yearsValue, setYearsValue] = useState(null);
  const [interestValue, setInterestValue] = useState(null);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleYearsInputChange = (e) => {
    setYearsValue(e.target.value);
  };

  const handleInteresInputChange = (e) => {
    setInterestValue(e.target.value);
  };

  const calculatePayment = () => {
    const alinanKredi = parseFloat(inputValue); // alinan kredi (inputtan kullanicidan aldığım değer)
    const annualInterestRate = interestValue; // yillik faiz (simdilik sabit verdim)
    const aylikFaiz = annualInterestRate / 100 / 12; //  aylik faiz
    const sene = yearsValue;
    const toplamDonem = sene * 12; // toplam dönem

    console.log("alınan kredi:" + alinanKredi);
    console.log("toplamDonem" + toplamDonem);

    if (alinanKredi && !isNaN(alinanKredi)) {
      // inputtan aldığım değer
      const aylikTaksit =
        (alinanKredi * (aylikFaiz * Math.pow(1 + aylikFaiz, toplamDonem))) /
        (Math.pow(1 + aylikFaiz, toplamDonem) - 1);
      const total = aylikTaksit * toplamDonem;
      console.log(total);
      console.log(aylikTaksit);
      setMonthlyPayment(aylikTaksit.toFixed(2));
      setTotalPayment(total.toFixed(2));
    }
  };

  // chatgbt de hesaplattım

  return (
    <>
      <div className="containerBox">
        <div className="container">
          <Header />
          <form className="customForm">
            <div className="mortgageAmount">
              <p>Mortgage Amount</p>
              <input
                type="number"
                placeholder="£"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="mortgage">
              <div className="mortageItem">
                <p>Mortgage Term</p>
                <input
                  type="number"
                  placeholder="years"
                  onChange={handleYearsInputChange}
                  value={yearsValue}
                />
              </div>
              <div className="mortageItem">
                <p>Interest Rate </p>
                <input
                  type="number"
                  placeholder="%"
                  onChange={handleInteresInputChange}
                  value={interestValue}
                />
              </div>
            </div>
          </form>
          <CalculatorBtn calculatePayment={calculatePayment} />
        </div>
        <div className="mortgageResult">
          <MortgageResultContainer
            calculatePayment={calculatePayment}
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
          />
        </div>
      </div>
    </>
  );
}

function Header() {
  // baslik ve temizleme butonunn oldugu kismi ayri tuttum
  return (
    <div className="header">
      <h1>Mortgage Calculator</h1>
      <ClearBtn />
    </div>
  );
}

function ClearBtn() {
  //! temizleme butonu yapilcak (tip calc. deki reset gibi)
  return <button>Clear All</button>;
}

function CalculatorBtn({ calculatePayment }) {
  // hesaplama yapan buton
  return (
    <button onClick={calculatePayment} className="calcRep">
      Calculate Repayments
    </button>
  );
}

function MortgageResultContainer({ monthlyPayment, totalPayment }) {
  // ekrana basilan kisim

  // buradaki kisimda html kısmını hazırlayım degerlerin gelmesi gerekn yerlere {içinde} yazdım.
  return (
    <>
      <div className="inform">
        <h3>Your results</h3>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click “calculate repayments”
          again.
        </p>
      </div>

      <div className="result">
        <div className="monthlyResult">
          <h5>Your monthly repayments</h5>
          <h1>£{monthlyPayment}</h1>
        </div>
        <hr />
        <div className="totalResult">
          <h5>Total you'll repay over the term</h5>
          <h3>£{totalPayment}</h3>
        </div>
      </div>
    </>
  );
}
