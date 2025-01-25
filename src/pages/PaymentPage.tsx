import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Molecules/Navbar";
import Container from "../Components/Atoms/Container";
import DashboardProfile from '../Components/Organisms/DashboardProfile';
import Payment from "../Components/Organisms/Payment";

const PaymentPage: React.FC = () => {
  const { serviceCode } = useParams();

  return (
    <>
      <Navbar />
      <Container>
        <DashboardProfile />
        <Payment serviceCode={serviceCode || ''} />
      </Container>
    </>
  );
};

export default PaymentPage;
