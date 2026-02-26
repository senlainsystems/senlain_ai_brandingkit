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
                        className="px-6 py-2.5 bg-white text-primary-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
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

                {/* Enhanced Overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90"></div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Premium Badge */}
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-lg">
                            <Icon name="Sparkles" size={16} className="text-accent-400" />
                            <span className="text-sm font-semibold text-white tracking-wide">AI-Powered Brand Creation</span>
                        </div>

                        {/* Main Headline - Zoviz Style (Big, Bold, Tight) */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-tight drop-shadow-2xl">
                            Create your logo and <br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary-400 to-secondary-400">
                                brand identity.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-2xl text-gray-200 font-medium leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md text-balance">
                            Designed by humans, customized by AI. Get print-ready vector logos, full brand kits, and social media assets in minutes.
                        </p>

                        {/* CTA Buttons - Rounded Full & Glassmorphism */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="group relative px-10 py-5 bg-white text-primary-900 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.7)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Create My Logo</span>
                                    <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                                <Icon name="PlayCircle" size={24} />
                                <span>See How It Works</span>
                            </button>
                        </div>

                        {/* Social Proof / Trust Indicators (Optional but adds to premium feel) */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center">
                            <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-widest">Trusted by 1M+ Brands</p>
                            <div className="flex space-x-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Placeholders for trust logos or just icons */}
                                <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                                <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                                <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                                <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background border-t border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Brandbot</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Everything You Need to Scale</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">Our comprehensive suite of AI tools ensures your brand stands out in the modern marketplace.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-surface/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 hover:border-primary-500/30 hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.2)] transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon name={feature.icon} size={32} color="white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed text-lg">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-3 block">Simple Pricing</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Simple, Transparent Pricing</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">Choose the plan that fits your needs. Start free, upgrade as you grow.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-surface/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-white mb-2">Starter</h3>
                                <p className="text-text-secondary text-sm">Perfect for trying out Brandbot</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-white">MWK 0</span>
                                <span className="text-text-secondary ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success-500 mt-0.5" />
                                    <span className="text-text-secondary">5 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success-500 mt-0.5" />
                                    <span className="text-text-secondary">Basic AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success-500 mt-0.5" />
                                    <span className="text-text-secondary">Standard templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-success-500 mt-0.5" />
                                    <span className="text-text-secondary">Community support</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Get Started
                            </button>
                        </motion.div>

                        {/* Pro Plan - Most Popular */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-b from-surface to-background p-10 rounded-[2.5rem] border border-primary-500/50 shadow-2xl relative flex flex-col transform md:-translate-y-4"
                        >
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full shadow-lg">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="mb-6 mt-2">
                                <h3 className="text-3xl font-black text-white mb-2">Pro</h3>
                                <p className="text-indigo-200 text-sm">For growing businesses</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">MWK 15k</span>
                                <span className="text-indigo-200 ml-2">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-500/20">
                                        <Icon name="Check" size={16} className="text-primary-400" />
                                    </div>
                                    <span className="text-gray-300">50 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-500/20">
                                        <Icon name="Check" size={16} className="text-primary-400" />
                                    </div>
                                    <span className="text-gray-300">Advanced AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-500/20">
                                        <Icon name="Check" size={16} className="text-primary-400" />
                                    </div>
                                    <span className="text-gray-300">Premium templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-500/20">
                                        <Icon name="Check" size={16} className="text-primary-400" />
                                    </div>
                                    <span className="text-gray-300">Priority support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-500/20">
                                        <Icon name="Check" size={16} className="text-primary-400" />
                                    </div>
                                    <span className="text-gray-300">Export in all formats</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary-600/30 transition-all duration-300"
                            >
                                Start Pro Trial
                            </button>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-surface/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-white mb-2">Enterprise</h3>
                                <p className="text-text-secondary text-sm">For large organizations</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-white">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent-400 mt-0.5" />
                                    <span className="text-text-secondary">Unlimited brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent-400 mt-0.5" />
                                    <span className="text-text-secondary">Custom AI training</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent-400 mt-0.5" />
                                    <span className="text-text-secondary">White-label options</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent-400 mt-0.5" />
                                    <span className="text-text-secondary">Dedicated support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-accent-400 mt-0.5" />
                                    <span className="text-text-secondary">API access</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all duration-300"
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
