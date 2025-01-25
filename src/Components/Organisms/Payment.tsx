import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Box from "../Atoms/Box";
import Form from "../Molecules/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getServices, postTransaction } from "../../redux/slices/slicer";
import { Service } from "../../Type/Services";
import Image from "../Atoms/Image";
import {Input} from "../Atoms/Input";
import Button from "../Atoms/Button";
import { showToast } from "../../redux/slices/toastSlices";

const Payment = ({ serviceCode }: { serviceCode: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('sims-ppob-tkn');

  useEffect(() => {
    if (token) {
      dispatch(getServices(token));
    }
  }, [dispatch, token]);

  const service = useSelector((state: RootState) => state.slicer.services as Service[]) || [];
  const selectedService = service.find((service) => service.service_code === serviceCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.error("Token is null");
      return;
    }
    if (!selectedService?.service_code) {
      console.error("Service code is undefined");
      return;
    }
    const result = await dispatch(postTransaction({ token: token, service_code: selectedService.service_code }));
    if (postTransaction.fulfilled.match(result)) {
      dispatch(showToast({ message: 'Berhasil dibayar!', type: 'success' }));
      navigate('/dashboard');
    } else {
      dispatch(showToast({ message: 'Terjadi sebuah kesalahan, silahkan periksa kembali!', type: 'error' }));
    }
  };
    return (
        <>
            <Box className="mb-6">
                <h2 className="text-lg font-semibold">Pembayaran</h2>
                <Box className="flex flex-row items-center gap-2">
                    <Image src={selectedService?.service_icon || ''} alt={selectedService?.service_name || 'Service Image'} className="rounded-md w-10" />
                    <p className="text-base">{selectedService?.service_name}</p>
                </Box>
            </Box>

            <Form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <Input
                type="number"
                value={selectedService?.service_tariff || ''}
                disabled
                />
                <Button
                type="submit"
                className="p-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                Bayar
                </Button>
            </Form>
        </>
    )
}

export default Payment;