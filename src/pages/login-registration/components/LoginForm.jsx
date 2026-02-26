import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
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
            className={`w-full px-5 py-4 pl-12 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.email ? 'border-error shadow-sm shadow-error/10' : 'border-border group-hover:border-primary/50'
              }`}
            placeholder="name@company.com"
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
        <div className="flex items-center justify-between ml-1">
          <label htmlFor="password" className="block text-xs font-black text-text-muted uppercase tracking-widest">
            Password
          </label>
          <a href="#" className="text-[10px] font-bold text-primary hover:underline underline-offset-4 uppercase tracking-tighter">
            Forgot?
          </a>
        </div>
        <div className="relative group">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-5 py-4 pl-12 pr-12 bg-white border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none text-sm font-medium ${errors.password ? 'border-error shadow-sm shadow-error/10' : 'border-border group-hover:border-primary/50'
              }`}
            placeholder="••••••••"
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
        {errors.password && (
          <p className="mt-1 text-[10px] font-bold text-error uppercase tracking-tight ml-2">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center">
        <div className="flex items-center cursor-pointer group">
          <div className="relative flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
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
          <label htmlFor="rememberMe" className="ml-3 block text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors cursor-pointer">
            Keep me signed in
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full relative py-4 px-6 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:scale-100 flex items-center justify-center space-x-2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:animate-shimmer"></div>
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            <span className="tracking-wide text-sm uppercase">Authorizing...</span>
          </>
        ) : (
          <>
            <span className="tracking-wide text-sm uppercase">Enter Workspace</span>
            <Icon name="ArrowRight" size={18} />
          </>
        )}
      </button>

      <div className="pt-2">
        <div className="flex items-center space-x-3 text-xs text-text-muted justify-center">
          <Icon name="Info" size={14} />
          <span>Quick access: demo@example.com / demo123</span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
