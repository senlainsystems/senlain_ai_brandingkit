import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LazyImage from 'components/ui/LazyImage';
import { useToast } from 'components/ui/ToastProvider';
import { useAuth } from 'context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TwoFactorModal from './components/TwoFactorModal';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      await login(formData.email, formData.password);

      if (formData.rememberMe) {
        localStorage.setItem('brandkit_remember', 'true');
      }
      toast.success('Login successful!');
      navigate('/brand-brief-creation');
    } catch (error) {
      console.error(error);
      toast.error('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      await signup(formData.email, formData.password);

      toast.success('Account created successfully!');
      navigate('/brand-brief-creation');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed: ' + error.message);
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
        toast.success('Welcome to BrandKit AI!');
        navigate('/brand-brief-creation');
      } else {
        toast.error('Invalid verification code');
        setShowTwoFactor(false);
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
      setShowTwoFactor(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-6xl flex bg-surface/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[800px]">
        {/* Left Side - Success Showcase */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated meshes or patterns can go here */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
                <Icon name="Stars" size={16} className="text-yellow-300" />
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">Powered by Genkit AI</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Turn your vision <br />
                <span className="text-indigo-200">into a masterpiece.</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-md">
                Generate professional brand identities, logos, and taglines in seconds using state-of-the-art artificial intelligence.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">
                Trusted by 500+ Innovators
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {brandExamples.map((brand) => (
                  <div key={brand.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:translate-x-2">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 p-2 overflow-hidden">
                        <LazyImage
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-cover rounded-lg"
                          placeholder={<div className="w-full h-full bg-white/10 animate-pulse" />}
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{brand.name}</h4>
                        <p className="text-white/60 text-xs">{brand.industry}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {brand.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white/30"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">AI Generated</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 p-2">
                  <img src="/Senlain_logo-removebg-preview.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-3xl font-black text-text-primary tracking-tight italic">
                  Brand<span className="text-primary">bot</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-text-secondary">
                {activeTab === 'login'
                  ? 'Sign in to access your brand workspace'
                  : 'Start your brand journey today for free'}
              </p>
            </div>

            {/* Tab Navigation - Pill Style */}
            <div className="flex bg-surface-hover rounded-2xl p-1.5 mb-10 border border-border/50">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'register'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Forms */}
            <div className="min-h-[340px]">
              {activeTab === 'login' ? (
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              ) : (
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              )}
            </div>

            {/* Social Login */}
            <div className="mt-10">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                  <span className="px-4 bg-transparent text-text-muted">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3.5 px-4 border border-border rounded-2xl bg-white hover:bg-surface-hover transition-all duration-300 shadow-sm active:scale-95">
                  <Icon name="Mail" size={20} className="text-[#EA4335]" />
                  <span className="text-sm font-bold text-text-primary">Google</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3.5 px-4 border border-border rounded-2xl bg-white hover:bg-surface-hover transition-all duration-300 shadow-sm active:scale-95">
                  <Icon name="Github" size={20} className="text-text-primary" />
                  <span className="text-sm font-bold text-text-primary">GitHub</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-xs text-text-muted leading-relaxed">
                By entering, you agree to Brandbot's <br />
                <a href="#" className="font-bold text-primary hover:underline underline-offset-4">Terms</a> and <a href="#" className="font-bold text-primary hover:underline underline-offset-4">Privacy Policy</a>
              </p>
            </div>
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