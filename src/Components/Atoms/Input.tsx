import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { putImage } from "../../redux/slices/slicer";
import { useNavigate } from "react-router-dom";

interface InputProps {
    type: string;
    placeholder?: string;
    value: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, value, disabled, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
    );
};

interface InputFileProps {
  fileImage: string;
}

export const InputFile: React.FC<InputFileProps> = ({ fileImage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('sims-ppob-tkn') || '';
  const [image, setImage] = useState<string>(fileImage || '');
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (fileImage) {
      setImage(fileImage);
    }
  }, [fileImage]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (file.size > 100 * 1024) {
        setError("Ukuran file terlalu besar! Maksimal 100KB.");
        return;
      } else {
        setError("");
      }

      const result = await dispatch(putImage({ token: token, file: file }));
      if (putImage.fulfilled.match(result)) {
        setImage(URL.createObjectURL(file));
        navigate("/akun");
      }
    }
  };

  return (
    <>
        <div className="flex items-center justify-center">
        <label htmlFor="file-input" className="cursor-pointer">
            <div
            className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-full border-2 border-gray-300 overflow-hidden"
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
            {!image && <span className="text-gray-500">Pilih Gambar</span>}
            </div>
        </label>
        <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
        />
        </div>
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
    </>
  );
};
