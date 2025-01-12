import React, { useState } from "react";
import { Button } from "@mui/material";
import { BsReceipt } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payments/status/${paymentId}`);
      const data = await response.json();
      
      if (data.success && data.status === 'COMPLETED') {
        setPaymentStatus("Payment Completed!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ödeme durumu kontrol hatası:', error);
      return false;
    }
  };

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
        
        // Ödeme durumunu kontrol et
        const paymentId = data.paymentId;
        let checkCount = 0;
        const maxChecks = 10;

        const statusCheck = setInterval(async () => {
          checkCount++;
          const isCompleted = await checkPaymentStatus(paymentId);
          
          if (isCompleted || checkCount >= maxChecks) {
            clearInterval(statusCheck);
            if (!isCompleted && checkCount >= maxChecks) {
              setPaymentStatus("Payment timeout. Please try again.");
            }
          }
        }, 1000);

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
            <h4 className="mb-4">ÖDEME ÖZETİ</h4>
            <div className="d-flex align-items-center mb-3">
              <span>Ara Toplam</span>
              <span className="ml-auto text-red font-weight-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <span>Kargo</span>
              <span className="ml-auto">
                <b>Ücretsiz</b>
              </span>
            </div>
            <div className="d-flex align-items-center mb-4">
              <span>Toplam</span>
              <span className="ml-auto text-red font-weight-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button 
              onClick={handleSubmit}
              className="btn-purple btn-lg btn-big w-100" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : <><BsReceipt /> &nbsp; SAVE AND PAY</>}
            </Button>
          </div>
        </div>
      </div>

      {paymentStatus && (
        <div className="payment-status-popup">
          <div className="popup-content">
            <h3>{paymentStatus}</h3>
            {paymentStatus === "Processing..." && <p>Lütfen bekleyin...</p>}
            {paymentStatus === "Payment Processing..." && <p>Ödemeniz işleniyor...</p>}
            {paymentStatus === "Payment Completed!" && <p>Ödemeniz başarıyla tamamlandı.</p>}
            {paymentStatus === "Payment failed. Please try again." && <p>Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.</p>}
            {paymentStatus === "Payment timeout. Please try again." && <p>Ödeme zaman aşımına uğradı. Lütfen tekrar deneyin.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
