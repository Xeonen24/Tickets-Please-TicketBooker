import React, { useState, useEffect } from "react";
import "./payment.css";

const Payment = () => {
  const [amount, setAmount] = useState(
    localStorage.getItem("totalPrice") || ""
  );
  const [isPaid, setIsPaid] = useState(false);
  const [title, setTitle] = useState("TicketsPlease | Payment");

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("Please enter an amount");
    } else {
      var options = {
        key: process.env.REACT_APP_RZPAYKEY,
        key_secret: process.env.REACT_APP_RZPAYKEYSECRET,
        amount: amount * 100,
        currency: "INR",
        name: "TicketsPlease Merchant",
        handler: function (response) {
          setIsPaid(true);
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        notify: {
          sms: true,
          email: true,
        },
        notes: {
          address: "Alibag, 402201",
        },
        theme: {
          color: "black",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div className="form-containerss">
      <div className="App">
        <h2>Razorpay Payment Integration Using React</h2>
        <br />
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          disabled="true"
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />
        {!isPaid ? (
          <button onClick={handleSubmit}>Pay Now</button>
        ) : (
          <input
            type="text"
            placeholder="Payment Status: Paid"
            disabled="true"
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
