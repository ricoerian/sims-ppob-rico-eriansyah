export interface Service {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: string;
}

export interface ServiceIconsProps {
  services: Service[];
}