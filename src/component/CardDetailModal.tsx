import React, { useRef, useState } from "react";
import useOutSideToClose from "../hooks/useOutSideToClose";
import { cardSchema } from "../utls/formSchma";
import { useNavigate } from "react-router";
import useGenericEdit from "../api/useGenericEdit";
import { API_ENDPOINTS } from "../utls/ApiEndPoints";
import { useQueryClient } from "@tanstack/react-query";
import { USER_ID } from "../utls/const";

const CardDetailModal = ({ handleCloseModal, orderId }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: makePayment, isPending: isMakingPayment } = useGenericEdit();
  const modalRef = useRef<HTMLElement>(null);

  useOutSideToClose({ ref: modalRef, close: handleCloseModal, isLocked: isMakingPayment });

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    } else if (name === "expiryMonth") {
      formattedValue = value.replace(/\D/g, "").slice(0, 2);
    } else if (name === "expiryYear") {
      formattedValue = value.replace(/\D/g, "").slice(0, 2);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear specific field error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      await cardSchema.validate(formData, { abortEarly: false });

      const url = `${API_ENDPOINTS.ORDER}/${orderId}/status?status=confirmed`;

      await makePayment({
        url: url,
        body: undefined,
      });

      navigate("/orders");
      handleCloseModal();
    } catch (validationErrors) {
      const errorObj = {};
      validationErrors.inner.forEach((error) => {
        errorObj[error.path] = error.message;
      });
      setErrors(errorObj);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute z-[50] left-0 top-0 h-[100dvh] w-[100dvw] flex items-center justify-center overflow-hidden bg-black/50">
      <div ref={modalRef} className=" bg-white border-2 py-1 lg:py-4 z-10 rounded-xl overflow-hidden ">
        <div className="bg-white  p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Information</h2>

          <div className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Smith"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.cardholderName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  placeholder="MM"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.expiryMonth ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryMonth && <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  placeholder="YY"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.expiryYear ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryYear && <p className="text-red-500 text-xs mt-1">{errors.expiryYear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isMakingPayment}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isMakingPayment ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isMakingPayment ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Submit Payment"
              )}
            </button>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs opacity-80">DEBIT</div>
              <div className="text-xl font-bold">💳</div>
            </div>
            <div className="text-lg font-mono mb-4 tracking-wider">{formData.cardNumber || "•••• •••• •••• ••••"}</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-80 mb-1">CARDHOLDER</div>
                <div className="font-semibold text-sm uppercase">{formData.cardholderName || "YOUR NAME"}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                <div className="font-semibold">
                  {formData.expiryMonth || "MM"}/{formData.expiryYear || "YY"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;
