import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { BsReceipt } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentStatus("Processing...");

    try {
      const response = await fetch('http://localhost:3001/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus("Payment Processing...");
        setTimeout(() => {
          setPaymentStatus("Payment Completed!");
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }, 3000);
      } else {
        throw new Error(data.message || 'Ödeme başlatılamadı');
      }
    } catch (error) {
      console.error('Ödeme hatası:', error);
      setPaymentStatus("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content w-100 d-flex justify-content-center align-items-start" style={{ minHeight: "100vh" }}>
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        <div className="col-md-6 mx-auto">
          <div className="card border p-4 shadow">
            <h4 className="mb-4">PAYMENT DETAILS</h4>
            
            {/* Card Information */}
            <div className="mb-4">
              <h5 className="mb-3">Card Information</h5>
              <TextField
                fullWidth
                label="Cardholder Name"
                variant="outlined"
                className="mb-3"
                placeholder="John Doe"
              />
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                className="mb-3"
                placeholder="**** **** **** ****"
                inputProps={{ maxLength: 19 }}
              />
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    variant="outlined"
                    className="mb-3"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    className="mb-3"
                    placeholder="***"
                    inputProps={{ maxLength: 3 }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-4">
              <h5 className="mb-3">Contact Information</h5>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                className="mb-3"
                placeholder="+1 (___) ___ ____"
              />
              <TextField
                fullWidth
                label="Delivery Address"
                variant="outlined"
                className="mb-3"
                multiline
                rows={3}
                placeholder="Enter your delivery address..."
              />
            </div>

            {/* Payment Summary */}
            <div className="payment-summary mb-4">
              <h5 className="mb-3">Order Summary</h5>
              <div className="d-flex align-items-center mb-2">
                <span>Subtotal</span>
                <span className="ml-auto text-red font-weight-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span>Shipping</span>
                <span className="ml-auto">
                  <b>Free</b>
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span>Total</span>
                <span className="ml-auto text-red font-weight-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="btn-purple btn-lg btn-big w-100" 
              disabled={isSubmitting}
              variant="contained"
            >
              {isSubmitting ? "Processing..." : <><BsReceipt /> &nbsp; PAY NOW</>}
            </Button>
          </div>
        </div>
      </div>

      {paymentStatus && (
        <div className="payment-status-popup">
          <div className="popup-content">
            <h3>{paymentStatus}</h3>
            {paymentStatus === "Processing..." && <p>Please wait...</p>}
            {paymentStatus === "Payment Processing..." && <p>Processing your payment...</p>}
            {paymentStatus === "Payment Completed!" && <p>Payment completed successfully!</p>}
            {paymentStatus === "Payment failed. Please try again." && <p>Payment failed. Please try again.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
