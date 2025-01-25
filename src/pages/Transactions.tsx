import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransaction } from "../redux/slices/slicer";
import Navbar from "../Components/Molecules/Navbar";
import Container from "../Components/Atoms/Container";
import DashboardProfile from '../Components/Organisms/DashboardProfile';
import TransactionHistory from "../Components/Organisms/TransactionHistory";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const token = sessionStorage.getItem("sims-ppob-tkn");

  const { transactionHistory, loading } = useSelector(
    (state: RootState) => ({
      transactionHistory: state.slicer.transactionHistory || [],
      loading: state.slicer.loading,
      error: state.slicer.error,
    })
  );

  useEffect(() => {
    if (token) {
      dispatch(getTransaction({ token, offset, limit }));
    } else {
      navigate("/login");
    }
  }, [dispatch, token, offset, navigate]);

  return (
    <>
      <Navbar />
      <Container>
        <DashboardProfile />
        <TransactionHistory transactionHistory={transactionHistory} loading={loading} limit={limit} setOffset={setOffset} />
      </Container>
    </>
  );
};

export default Transactions;
