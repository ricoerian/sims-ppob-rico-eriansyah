interface LoginParams {
    email: string;
    password: string;
    setErrors: (errors: { email?: string; password?: string }) => void;
}

export const validateLogin = ({ email, password, setErrors }: LoginParams) => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email tidak boleh kosong';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Format email tidak valid';
    if (!password) newErrors.password = 'Password tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

interface RegistrationParams {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    setErrors: (errors: { first_name?: string; last_name?: string; email?: string; password?: string; confirmPassword?: string }) => void;
}

export const validateRegistration = ({ first_name, last_name, email, password, confirmPassword, setErrors }: RegistrationParams) => {
    const newErrors: { first_name?: string; last_name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (!first_name) newErrors.first_name = 'First Name tidak boleh kosong';
    if (!last_name) newErrors.last_name = 'Last Name tidak boleh kosong';
    if (!email) newErrors.email = 'Email tidak boleh kosong';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Format email tidak valid';
    if (!password) newErrors.password = 'Password tidak boleh kosong';
    if (password.length < 8) newErrors.password = 'Password harus lebih dari 8 karakter';
    if (!confirmPassword) newErrors.confirmPassword = 'Konfirmasi Password tidak boleh kosong';
    if (confirmPassword !== password) newErrors.confirmPassword = 'Password yang anda masukan tidak sama';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

export const validateAmount = (amount: number): string | null => {
    if (amount < 0) {
      return "Jumlah tidak boleh kurang dari 0.";
    }
    if (amount > 1000000) {
      return "Jumlah tidak boleh lebih dari 1.000.000.";
    }
    if (!Number.isInteger(amount)) {
      return "Jumlah harus berupa angka bulat.";
    }
    return null;
  };
  