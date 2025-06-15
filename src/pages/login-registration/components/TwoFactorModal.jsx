import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const TwoFactorModal = ({ onVerify, onClose, isLoading }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    if (pastedData.length === 6) {
      handleSubmit(pastedData);
    } else if (pastedData.length > 0) {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = (codeString = code.join('')) => {
    if (codeString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    onVerify(codeString);
  };

  const handleResend = () => {
    setCode(['', '', '', '', '', '']);
    setError('');
    // In a real app, this would trigger a new code to be sent
    console.log('Resending verification code...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-text-secondary">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center space-x-3 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600 text-sm">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading || code.some(digit => !digit)}
            className="w-full btn-primary py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Icon name="Check" size={20} />
                <span>Verify Code</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              onClick={handleResend}
              className="text-primary hover:text-primary-hover"
            >
              Resend Code
            </button>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Demo Mode</p>
              <p>Use code <strong>123456</strong> to continue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;