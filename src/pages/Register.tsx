import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { register } from '../redux/slices/slicer';
import { showToast } from '../redux/slices/toastSlices';  // Import showToast
import { validateRegistration } from '../Middleware/Validate';
import { useNavigate } from 'react-router-dom';
import Card from '../Components/Atoms/Card';
import { Input } from '../Components/Atoms/Input';
import Button from '../Components/Atoms/Button';
import Box from '../Components/Atoms/Box';

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ first_name?: string; last_name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.slicer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistration({ first_name, last_name, email, password, confirmPassword, setErrors })) {
      const result = await dispatch(register({ first_name, last_name, email, password }));
      if (register.fulfilled.match(result)) {
        dispatch(showToast({ message: 'Berhasil Registrasi!', type: 'success' }));
        navigate('/');
      } else {
        dispatch(showToast({ message: error ?? 'Terjadi sebuah kesalahan, silahkan periksa kembali!', type: 'error' }));
      }
    }
  };

  return (
    <Card>
      <Box className='w-[50%] my-auto'>
        <form onSubmit={handleSubmit} className="p-6">
            <Box className='flex flex-row justify-center mb-4 gap-2'>
                <img src="/assets/images/Logo.png" alt="Logo" />
                <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
            </Box>
            <h2 className="text-2xl font-semibold mb-4 text-center">Lengkapi data untuk membuat akun</h2>
            <Input type='text' placeholder='First Name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
            {errors.first_name && <p className="text-red-500 mb-4">{errors.first_name}</p>}
            <Input type='text' placeholder='Last Name' value={last_name} onChange={(e) => setLastName(e.target.value)} />
            {errors.last_name && <p className="text-red-500 mb-4">{errors.last_name}</p>}
            <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}
            <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
            <Input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <p className="text-red-500 mb-4">{errors.confirmPassword}</p>}
            <Button type='submit' className='w-full'>
              {loading ? 'Sedang Meregistrasi Akun Anda...' : 'Registrasi'}
            </Button>
            <p className='text-center mt-2'>sudah punya akun? login <a href="/" className='text-blue-500 hover:text-blue-400 underline'>di sini</a></p>
        </form>
      </Box>
      <Box className='w-[50%]'>
        <img src="/assets/images/Illustrasi-Login.png" alt="Illustrasi" className='rounded-br rounded-tr' />
      </Box>
    </Card>
  );
};

export default Register;
