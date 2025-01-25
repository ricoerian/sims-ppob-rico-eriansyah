import { useState } from "react";
import Form from "../Molecules/Form";
import { Input } from "../Atoms/Input";
import Button from "../Atoms/Button";
import React from "react";
import { postBalance } from "../../redux/slices/slicer";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "../Atoms/Box";
import { validateAmount } from "../../Middleware/Validate";

const TopUpForm = () => {
  const [amount, setAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("sims-ppob-tkn");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateAmount(amount);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    if (!token) {
      console.error("Token is null");
      setIsSubmitting(false);
      return;
    }

    const result = await dispatch(postBalance({ token: token, top_up_amount: amount }));
    if (postBalance.fulfilled.match(result)) {
      setIsSubmitting(false);
      navigate("/dashboard");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(1000000, Number(e.target.value)));
    setAmount(value);

    const validationError = validateAmount(value);
    setError(validationError);
  };

  return (
    <>
      <Box className="my-8">
        <h1>Silahkan masukan</h1>
        <h1>Nominal Top Up</h1>
      </Box>
      <Box className="flex flex-row justify-center gap-4">
        <Form onSubmit={handleSubmit} className="w-[70%]">
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min={0}
            max={1000000}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting || amount <= 0}
            className="w-full disabled:!bg-gray-400 disabled:!cursor-not-allowed"
          >
            {isSubmitting ? "Proses Top Up..." : "Top Up"}
          </Button>
        </Form>
        <Box className="flex w-[30%] gap-3 flex-wrap">
          {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
            <Button
              key={nominal}
              className="w-[31%] bg-white !text-red-500 border !border-red-500 hover:!bg-red-100 hover:!border-transparent"
              onClick={() => setAmount(nominal)}
            >
              Rp {nominal.toLocaleString("id-ID")}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TopUpForm;
