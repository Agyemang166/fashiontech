import React from 'react';

const PaymentOption = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold text-black mb-4 text-left">
        Payment Information
      </h2>

      <p className="text-justify text-gray-700 mb-3">
        🎉 <strong>Simple and Secure Payment Solutions</strong> 🎉
      </p>

      <p className="text-justify text-gray-700 mb-3">
        To facilitate a seamless shopping experience, we require payment to be made before delivery. For this purpose, we have partnered with <strong>Paystack</strong>, a reputable and secure third-party payment service that ensures your transactions are safe and efficient. With Paystack, you can have peace of mind knowing your financial information is handled with the highest level of security.
      </p>

      <p className="text-justify text-gray-700 mb-3">
        Customers can easily choose their preferred payment method, whether it’s via mobile money or bank account transfer, all processed securely through Paystack. Enjoy the convenience of shopping without any hassle at checkout! Our user-friendly interface allows you to complete your transaction quickly and effortlessly, so you can focus on what you love.
      </p>

      <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        📦 Return Policy 📦
      </h3>

      <p className="text-justify text-gray-700 mb-3">
        We value your satisfaction, but please note that all items purchased through our platform are considered final and non-returnable. If you need to make any modifications to your order, you are welcome to cancel it before delivery or shipment. We understand that sometimes plans change, and we aim to be as accommodating as possible.
      </p>

      <p className="text-justify text-gray-700 mb-3">
        Our goal is to provide you with high-quality products that meet your expectations. If you have received a damaged or incorrect item, please reach out to our customer support team within 48 hours of delivery, and we will work diligently to resolve the issue for you.
      </p>

      <p className="text-justify text-gray-700 mb-3">
        Thank you for choosing to shop with us! Your trust and satisfaction are our top priorities. If you have any inquiries or require further assistance, please do not hesitate to reach out to our customer support team. We are here to help you every step of the way!
      </p>
    </div>
  );
};

export default PaymentOption;
