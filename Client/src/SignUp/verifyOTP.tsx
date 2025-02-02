import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface LocationState {
  email: string;
}

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as LocationState)?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = element.value;
      return newOtp;
    });

    if (element.value !== '' && index < 5) {
      const nextInput = element.parentElement?.nextElementSibling?.querySelector('input');
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        setOtp(prev => {
          const newOtp = [...prev];
          newOtp[index] = '';
          return newOtp;
        });
      } else if (index > 0) {
        const prevInput = e.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
        if (prevInput) {
          prevInput.focus();
          setOtp(prev => {
            const newOtp = [...prev];
            newOtp[index - 1] = '';
            return newOtp;
          });
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const pastedArray = pastedData.split('').map(char => 
      isNaN(Number(char)) ? '' : char
    );
    
    setOtp(prev => [
      ...pastedArray,
      ...prev.slice(pastedArray.length)
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      setIsLoading(false);
      return;
    }

    console.log(email, otpString);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/verifyOTP', {
        email,
        otp: otpString
      });

      if (response.status === 200) {
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || 'Verification failed');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        {success && <p className="text-green-600 text-center text-sm">{success}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">
              Enter OTP
            </label>
            <div className="flex justify-between items-center gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <div key={index} className="w-12 h-12">
                  <input
                    type="text"
                    maxLength={1}
                    className="w-full h-full flex items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:ring-indigo-500"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || otp.some(digit => digit === '')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Didn't receive the code?</p>
          <p>Check your spam folder or contact support</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;