import Navbar from "../Components/Molecules/Navbar";
import Container from "../Components/Atoms/Container";
import DashboardProfile from '../Components/Organisms/DashboardProfile';
import TopUpForm from "../Components/Organisms/TopUpForm";

const TopUp = () => {
  return (
    <>
      <Navbar />
      <Container>
        <DashboardProfile />
        <TopUpForm />
      </Container>
    </>
  );
};

export default TopUp;
