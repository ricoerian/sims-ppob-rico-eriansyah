import { useDispatch, useSelector } from 'react-redux';
import { getBanners, getServices } from '../redux/slices/slicer';
import Navbar from '../Components/Molecules/Navbar';
import { AppDispatch, RootState } from '../redux/store';
import DashboardProfile from '../Components/Organisms/DashboardProfile';
import ServiceIcons from '../Components/Organisms/ServiceIcons';
import Container from '../Components/Atoms/Container';
import SliderBanner from '../Components/Organisms/SliderBanner';
import { useEffect } from 'react';
import { Service } from '../Type/Services';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = sessionStorage.getItem('sims-ppob-tkn');

  useEffect(() => {
    if (token) {
      dispatch(getBanners(token));
      dispatch(getServices(token));
    }
  }, [dispatch, token]);

  const banners = useSelector((state: RootState) => state.slicer.banners as { banner_image: string }[]) || [];
  const services = useSelector((state: RootState) => state.slicer.services as Service[]) || [];
  const bannerImages = banners.map((banner: { banner_image: string }) => banner.banner_image);

  return (
    <>
      <Navbar />
      <Container>
        <DashboardProfile />
        <section>
          <ServiceIcons services={services} />
          <SliderBanner images={bannerImages} speed={20} />
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
