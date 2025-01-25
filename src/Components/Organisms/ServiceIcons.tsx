import { ServiceIconsProps } from "../../Type/Services";
import Image from "../Atoms/Image";
import { useNavigate } from "react-router-dom";

const ServiceIcons: React.FC<ServiceIconsProps> = ({ services }) => {
  const navigate = useNavigate();

  const handleClick = (serviceCode: string) => {
    navigate(`/service/${serviceCode}`);
  };

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="flex flex-col items-center p-4 bg-white rounded-lg cursor-pointer"
          onClick={() => handleClick(service.service_code)}
        >
          <Image
            src={service.service_icon}
            alt={service.service_name}
            className="w-12 h-12"
          />
          <p className="text-sm text-center mt-2">{service.service_name}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceIcons;
