import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Upload,
    ArrowRight,
    PlayCircle,
    Palette,
    Share2,
    FileText,
    Check,
    Globe,
    Zap,
    Shield
} from 'lucide-react';

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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center p-1.5 border border-border">
                            <img src="/Senlain_logo-removebg-preview.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-black text-text-primary italic">
                            Brand<span className="text-primary">bot</span>
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/login-registration')}
                        className="px-6 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-primary-700 transition-all duration-300 shadow-md"
                    >
                        Launch App
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
                {/* Animated Background Gradients - Zoviz Style Light Glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.3, 0.1],
                            x: [0, -50, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary-200 mix-blend-multiply filter blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, -90, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary-200 rounded-full mix-blend-multiply filter blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-teal-100 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                </div>

                {/* Enhanced Overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0"></div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 mt-12"
                    >
                        <span className="px-4 py-2 rounded-full bg-primary-50 border border-primary-100/50 text-primary-700 text-sm font-medium inline-flex items-center gap-2 backdrop-blur-md shadow-sm">
                            <Sparkles className="h-4 w-4" />
                            AI-Powered Brand Creation
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl lg:text-8xl font-black text-text-primary tracking-tighter leading-[1.1] mb-8"
                    >
                        Create Your <br />
                        <span className="text-text-primary">
                            Professional Logo &
                        </span>
                        <br />
                        <span className="text-text-primary">
                            Brand Identity
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-3xl mb-12 font-medium leading-relaxed"
                    >
                        Human-designed, AI-customized. Get print-ready vector logos, a custom website, and marketing automation in one platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="w-full max-w-2xl mx-auto flex items-center p-2 rounded-full bg-surface border border-border shadow-elevation-2 mb-8"
                    >
                        <input
                            type="text"
                            placeholder="Enter your business name"
                            className="flex-1 bg-transparent border-none focus:ring-0 px-6 text-lg text-text-primary placeholder:text-text-muted"
                        />
                        <button className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center whitespace-nowrap">
                            Design My Brand
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                        <Upload className="h-5 w-5" />
                        Already have a logo?
                    </motion.div>
                </div>
            </section>

            {/* Trusted By Section (Moved up to match Zoviz) */}
            <section className="py-12 bg-surface border-b border-border">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        <span className="text-2xl font-bold text-text-primary">4.8</span>
                        <div className="flex gap-1 text-warning">
                            <Sparkles className="h-5 w-5 fill-current" />
                            <Sparkles className="h-5 w-5 fill-current" />
                            <Sparkles className="h-5 w-5 fill-current" />
                            <Sparkles className="h-5 w-5 fill-current" />
                            <Sparkles className="h-5 w-5 fill-current" />
                        </div>
                        <span className="text-sm font-medium text-text-secondary tracking-wider">Trusted By +1M Users</span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale hover:grayscale-0 opacity-70 transition-all duration-300">
                        {/* Placeholder logos representing generic companies */}
                        <div className="flex items-center gap-2 font-bold text-xl text-text-primary"><div className="w-8 h-8 rounded-full bg-red-500"></div> G2</div>
                        <div className="flex items-center gap-2 font-bold text-xl text-text-primary"><div className="w-8 h-8 rounded-full bg-orange-500"></div> Product Hunt</div>
                        <div className="flex items-center gap-2 font-bold text-xl text-text-primary"><div className="w-8 h-8 rounded-full bg-blue-500"></div> SOURCEFORGE</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Brandbot</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-text-primary mb-6 tracking-tight">Everything You Need to Scale</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">Our comprehensive suite of AI tools ensures your brand stands out in the modern marketplace.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-surface p-10 rounded-[2rem] border border-border hover:border-primary-200 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon name={feature.icon} size={32} color="white" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-6 relative z-10 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">Simple Pricing</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-text-primary mb-6 tracking-tight">Simple, Transparent Pricing</h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">Choose the plan that fits your needs. Start free, upgrade as you grow.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-surface p-10 rounded-[2rem] border border-border hover:border-primary-200 transition-all duration-300 flex flex-col shadow-sm"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-text-primary mb-2">Starter</h3>
                                <p className="text-text-secondary text-sm">Perfect for trying out Brandbot</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-text-primary">MWK 0</span>
                                <span className="text-text-secondary ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">5 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Basic AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Standard templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Community support</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-surface border border-border rounded-full font-bold text-text-primary hover:bg-surface-hover transition-all duration-300"
                            >
                                Get Started
                            </button>
                        </motion.div>

                        {/* Pro Plan - Most Popular */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[2rem] border-2 border-primary shadow-2xl relative flex flex-col transform md:-translate-y-4"
                        >
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary rounded-full shadow-lg">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Most Popular</span>
                            </div>
                            <div className="mb-6 mt-2">
                                <h3 className="text-3xl font-black text-text-primary mb-2">Pro</h3>
                                <p className="text-primary-600 text-sm">For growing businesses</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-6xl font-black text-text-primary">MWK 15k</span>
                                <span className="text-text-secondary ml-2">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-50">
                                        <Icon name="Check" size={16} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary">50 brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-50">
                                        <Icon name="Check" size={16} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary">Advanced AI generation</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-50">
                                        <Icon name="Check" size={16} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary">Premium templates</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-50">
                                        <Icon name="Check" size={16} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary">Priority support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="p-1 rounded-full bg-primary-50">
                                        <Icon name="Check" size={16} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary">Export in all formats</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary-700 hover:shadow-lg transition-all duration-300"
                            >
                                Start Pro Trial
                            </button>
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-surface p-10 rounded-[2rem] border border-border hover:border-primary-200 transition-all duration-300 flex flex-col shadow-sm"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-text-primary mb-2">Enterprise</h3>
                                <p className="text-text-secondary text-sm">For large organizations</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black text-text-primary">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow">
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Unlimited brand projects</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Custom AI training</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">White-label options</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">Dedicated support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                                    <span className="text-text-secondary">API access</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/login-registration')}
                                className="w-full py-4 px-6 bg-surface border border-border rounded-full font-bold text-text-primary hover:bg-surface-hover transition-all duration-300"
                            >
                                Contact Sales
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border bg-surface">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center p-1 border border-border">
                            <img src="/Senlain_logo-removebg-preview.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-bold text-text-primary italic">
                            Brand<span className="text-primary">bot</span>
                        </span>
                    </div>
                    <div className="flex items-center space-x-8">
                        <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Contact</a>
                    </div>
                    <div className="text-sm text-text-muted">
                        © {new Date().getFullYear()} Brandbot AI. All rights reserved.
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default LandingPage;
