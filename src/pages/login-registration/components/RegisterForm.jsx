import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-xs font-black text-text-muted uppercase tracking-widest ml-1">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-5 py-3.5 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.firstName ? 'border-error shadow-sm shadow-error/10' : 'border-border hover:border-primary/50'
              }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-xs font-black text-text-muted uppercase tracking-widest ml-1">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-5 py-3.5 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.lastName ? 'border-error shadow-sm shadow-error/10' : 'border-border hover:border-primary/50'
              }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-black text-text-muted uppercase tracking-widest ml-1">
          Email Address
        </label>
        <div className="relative group">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-5 py-3.5 pl-12 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.email ? 'border-error shadow-sm shadow-error/10' : 'border-border group-hover:border-primary/50'
              }`}
            placeholder="john@example.com"
          />
          <Icon
            name="Mail"
            size={18}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.email ? 'text-error' : 'text-text-muted group-focus-within:text-primary'
              }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-xs font-black text-text-muted uppercase tracking-widest ml-1">
          Password
        </label>
        <div className="relative group">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-5 py-3.5 pl-12 pr-12 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.password ? 'border-error shadow-sm shadow-error/10' : 'border-border group-hover:border-primary/50'
              }`}
            placeholder="Min. 8 characters"
          />
          <Icon
            name="Lock"
            size={18}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.password ? 'text-error' : 'text-text-muted group-focus-within:text-primary'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {formData.password && (
          <div className="mt-3 px-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Security Strength</span>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${passwordStrength <= 2 ? 'text-error' : passwordStrength <= 4 ? 'text-warning' : 'text-success'
                }`}>
                {strengthLabels[passwordStrength - 1] || 'Very Weak'}
              </span>
            </div>
            <div className="flex space-x-1.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${level <= passwordStrength
                      ? (passwordStrength <= 2 ? 'bg-error' : passwordStrength <= 4 ? 'bg-warning' : 'bg-success')
                      : 'bg-surface-hover'
                    }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {errors.password && (
          <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-xs font-black text-text-muted uppercase tracking-widest ml-1">
          Confirm Password
        </label>
        <div className="relative group">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-5 py-3.5 pl-12 pr-12 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.confirmPassword ? 'border-error shadow-sm shadow-error/10' : 'border-border group-hover:border-primary/50'
              }`}
            placeholder="Confirm Password"
          />
          <Icon
            name="Lock"
            size={18}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${errors.confirmPassword ? 'text-error' : 'text-text-muted group-focus-within:text-primary'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start group cursor-pointer pt-1">
        <div className="relative flex items-center mt-0.5">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
          />
          <div className="h-5 w-5 border-2 border-border rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all duration-200"></div>
          <Icon
            name="Check"
            size={12}
            className="absolute left-[4px] top-[4px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          />
        </div>
        <label htmlFor="agreeToTerms" className="ml-3 block text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors cursor-pointer leading-tight">
          I agree to the <a href="#" className="font-bold text-primary hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.agreeToTerms}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full relative py-4 px-6 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:scale-100 flex items-center justify-center space-x-2 overflow-hidden mt-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:animate-shimmer"></div>
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            <span className="tracking-wide text-sm uppercase">Creating Account...</span>
          </>
        ) : (
          <>
            <span className="tracking-wide text-sm uppercase">Join Brandbot</span>
            <Icon name="UserPlus" size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
