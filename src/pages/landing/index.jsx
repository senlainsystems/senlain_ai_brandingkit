import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "AI Brand Generation",
            description: "Create complete brand identities including logos, colors, and typography in seconds.",
            icon: "Sparkles",
            color: "from-primary-500 to-primary-700"
        },
        {
            title: "Smart Brand Briefs",
            description: "Guided process to help you define your brand vision and target audience effectively.",
            icon: "FileText",
            color: "from-secondary-500 to-secondary-700"
        },
        {
            title: "Interactive Editor",
            description: "Fine-tune your AI-generated assets with our powerful and intuitive brand editor.",
            icon: "Palette",
            color: "from-accent-400 to-accent-600"
        }
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 border border-white/20">
                            <img src="/Senlain_logo-removebg-preview.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-black text-white italic">
                            Brand<span className="text-blue-400">bot</span>
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/login-registration')}
                        className="px-6 py-2.5 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                    >
                        Launch App
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/branding.mp4" type="video/mp4" />
                </video>

                {/* Enhanced Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>

                {/* Content - centered vertically and horizontally */}
                {/* <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Badge with enhanced glassmorphism */}
                {/* <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-8 shadow-2xl">
                            <Icon name="Stars" size={18} className="text-white drop-shadow-lg" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest drop-shadow-lg">The Future of Branding is Here</span>
                        </div> */}

                {/* Main heading with enhanced background and glow */}
                {/* <div className="mb-8 p-8 rounded-3xl bg-black/30 backdrop-blur-2xl border border-white/20 shadow-2xl">
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-0 leading-tight" style={{ textShadow: '0 0 40px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)' }}>
                                Design Your Brand with{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" style={{ textShadow: 'none' }}>
                                    AI Precision
                                </span>
                            </h1>
                        </div> */}

                {/* Description with glassmorphism background */}
                {/* <div className="mb-10 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                            <p className="text-lg lg:text-xl text-white font-medium leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                Brandbot uses advanced artificial intelligence to transform your ideas into professional, high-impact brand identities in minutes.
                            </p>
                        </div> */}

                {/* CTA Buttons with enhanced styling */}
                {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="px-12 py-5 bg-white text-primary rounded-2xl font-black text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-3 group"
                            >
                                <span>Get Started Free</span>
                                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-12 py-5 bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-2xl font-bold text-lg text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-xl">
                                View Showcase
                            </button>
                        </div> */}
                {/* </motion.div>
                </div> */}
            </section>

            {/* Features Section */}
            <section className="py-20 bg-surface/50 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-5xl font-black text-text-primary mb-4">Everything You Need to Scale</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">Our comprehensive suite of AI tools ensures your brand stands out in the modern marketplace.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-[2rem] border border-border shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <Icon name={feature.icon} size={28} color="white" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-black text-text-primary mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">Choose the plan that fits your needs. Start free, upgrade as you grow.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[2rem] border border-border shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-text-primary mb-2">Starter</h3>
                                <p className="text-text-muted text-sm">Perfect for trying out Brandbot</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-text-primary">MWK 0</span>
                                <span className="text-text-muted ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success mt-0.5" />
                                    <span className="text-text-secondary">5 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success mt-0.5" />
                                    <span className="text-text-secondary">Basic AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success mt-0.5" />
                                    <span className="text-text-secondary">Standard templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success mt-0.5" />
                                    <span className="text-text-secondary">Community support</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-3 px-6 bg-surface-hover border border-border rounded-xl font-bold text-text-primary hover:bg-border transition-all duration-300"
                            >
                                Get Started
                            </button>
                        </motion.div>

                        {/* Pro Plan - Most Popular */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[2rem] border-2 border-primary shadow-elevation-3 hover:shadow-elevation-5 transition-all duration-300 relative"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-full">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-text-primary mb-2">Pro</h3>
                                <p className="text-text-muted text-sm">For growing businesses</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">MWK 15,000</span>
                                <span className="text-text-muted ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">50 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Advanced AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Premium templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Priority support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Export in all formats</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                            >
                                Start Pro Trial
                            </button>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[2rem] border border-border shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-text-primary mb-2">Enterprise</h3>
                                <p className="text-text-muted text-sm">For large organizations</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-text-primary">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                                    <span className="text-text-secondary">Unlimited brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                                    <span className="text-text-secondary">Custom AI training</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                                    <span className="text-text-secondary">White-label options</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                                    <span className="text-text-secondary">Dedicated support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                                    <span className="text-text-secondary">API access</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-3 px-6 bg-surface-hover border border-border rounded-xl font-bold text-text-primary hover:bg-border transition-all duration-300"
                            >
                                Contact Sales
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center p-1 border border-border/30">
                            <img src="/Senlain_logo-removebg-preview.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-black text-text-primary italic">Brandbot</span>
                    </div>
                    <div className="flex items-center space-x-8 text-sm font-medium text-text-muted">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                    <p className="text-xs text-text-muted">© 2024 Brandbot AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
