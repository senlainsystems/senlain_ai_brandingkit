import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TwoFactorModal from './components/TwoFactorModal';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const brandExamples = [
    {
      id: 1,
      name: "TechFlow Solutions",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      colors: ["#2563EB", "#7C3AED", "#F59E0B"],
      industry: "Technology"
    },
    {
      id: 2,
      name: "GreenLeaf Organics",
      logo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
      colors: ["#10B981", "#059669", "#34D399"],
      industry: "Organic Food"
    },
    {
      id: 3,
      name: "Urban Design Studio",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      colors: ["#6366F1", "#8B5CF6", "#EC4899"],
      industry: "Architecture"
    }
  ];

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
        if (formData.rememberMe) {
          localStorage.setItem('brandkit_remember', 'true');
        }
        setShowTwoFactor(true);
      } else {
        setAuthError('Invalid email or password');
      }
    } catch (error) {
      setAuthError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.password !== formData.confirmPassword) {
        setAuthError('Passwords do not match');
        return;
      }
      
      // Simulate successful registration
      setShowTwoFactor(true);
    } catch (error) {
      setAuthError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorVerify = async (code) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === '123456') {
        navigate('/brand-brief-creation');
      } else {
        setAuthError('Invalid verification code');
        setShowTwoFactor(false);
      }
    } catch (error) {
      setAuthError('Verification failed. Please try again.');
      setShowTwoFactor(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex">
      {/* Left Side - Brand Examples */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Create Stunning Brand Identities
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of designers and businesses creating professional brand kits with AI
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Featured Brand Examples
            </h3>
            
            {brandExamples.map((brand) => (
              <div key={brand.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{brand.name}</h4>
                    <p className="text-white/70 text-sm">{brand.industry}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {brand.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Palette" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold text-text-primary">BrandKit AI</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-surface rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'login' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'register' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} color="#DC2626" />
              <span className="text-red-700 text-sm">{authError}</span>
            </div>
          )}

          {/* Auth Forms */}
          {activeTab === 'login' ? (
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          )}

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-text-secondary">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-surface text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors">
                <Icon name="Mail" size={20} />
                <span className="ml-2">Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-surface text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors">
                <Icon name="Github" size={20} />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-text-secondary">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary-hover">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-hover">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      {showTwoFactor && (
        <TwoFactorModal
          onVerify={handleTwoFactorVerify}
          onClose={() => setShowTwoFactor(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default LoginRegistration;