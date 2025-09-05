import * as Yup from "yup";
export const cardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .test("card-length", "Card number must be 16 digits", (value) => {
      return value?.replace(/\s/g, "").length === 16;
    }),
  cardholderName: Yup.string().required("Cardholder name is required").min(2, "Name must be at least 2 characters"),
  expiryMonth: Yup.string()
    .required("Month is required")
    .matches(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  expiryYear: Yup.string()
    .required("Year is required")
    .matches(/^\d{2}$/, "Invalid year")
    .test("not-expired", "Card is expired", function (value) {
      const month = this.parent.expiryMonth;
      if (!month || !value) return true;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const cardYear = parseInt(value);
      const cardMonth = parseInt(month);

      if (cardYear > currentYear) return true;
      if (cardYear === currentYear && cardMonth >= currentMonth) return true;

      return false;
    }),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3-4 digits"),
});
