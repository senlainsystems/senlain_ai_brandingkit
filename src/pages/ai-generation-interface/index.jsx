import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';
import GenerationQueue from './components/GenerationQueue';
import GenerationLogs from './components/GenerationLogs';
import GenerationHistory from './components/GenerationHistory';

const AIGenerationInterface = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    logo: 0,
    name: 0,
    tagline: 0,
    colorPalette: 0,
    overall: 0
  });
  const [estimatedTime, setEstimatedTime] = useState(120);
  const [currentService, setCurrentService] = useState('logo');
  const [generationStatus, setGenerationStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [queueItems, setQueueItems] = useState([]);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showLogs, setShowLogs] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [userTier, setUserTier] = useState('Pro');
  const [concurrentLimit, setConcurrentLimit] = useState(3);
  const [activeGenerations, setActiveGenerations] = useState(1);
  const wsRef = useRef(null);

  // Mock data for generation services
  const services = [
    {
      id: 'logo',
      name: 'Logo Generation',
      status: 'processing',
      progress: generationProgress.logo,
      estimatedTime: 45,
      icon: 'Palette',
      color: 'primary'
    },
    {
      id: 'name',
      name: 'Brand Name',
      status: generationProgress.name > 0 ? 'processing' : 'pending',
      progress: generationProgress.name,
      estimatedTime: 30,
      icon: 'Type',
      color: 'secondary'
    },
    {
      id: 'tagline',
      name: 'Tagline',
      status: generationProgress.tagline > 0 ? 'processing' : 'pending',
      progress: generationProgress.tagline,
      estimatedTime: 25,
      icon: 'MessageSquare',
      color: 'accent'
    },
    {
      id: 'colorPalette',
      name: 'Color Palette',
      status: generationProgress.colorPalette > 0 ? 'processing' : 'pending',
      progress: generationProgress.colorPalette,
      estimatedTime: 20,
      icon: 'Droplet',
      color: 'success'
    }
  ];

  // Mock generation logs
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 5000),
      type: 'info',
      service: 'logo',
      message: 'Starting logo generation with DALL-E 3...'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3000),
      type: 'success',
      service: 'logo',
      message: 'Logo concepts generated successfully'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 2000),
      type: 'info',
      service: 'name',
      message: 'Analyzing brand brief for name generation...'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000),
      type: 'warning',
      service: 'name',
      message: 'Rate limit approaching for GPT-4, switching to backup service'
    }
  ];

  // Mock queue items
  const mockQueueItems = [
    {
      id: 1,
      name: 'TechFlow Branding',
      status: 'processing',
      progress: 65,
      estimatedTime: 45,
      services: ['logo', 'name', 'tagline'],
      priority: 'high'
    },
    {
      id: 2,
      name: 'EcoVibe Brand Kit',
      status: 'queued',
      progress: 0,
      estimatedTime: 120,
      services: ['logo', 'name', 'tagline', 'colorPalette'],
      priority: 'normal'
    },
    {
      id: 3,
      name: 'RetailMax Identity',
      status: 'failed',
      progress: 25,
      estimatedTime: 0,
      services: ['logo'],
      priority: 'normal',
      error: 'API rate limit exceeded'
    }
  ];

  // Mock generation history
  const mockHistory = [
    {
      id: 1,
      name: 'TechStart Branding',
      completedAt: new Date(Date.now() - 3600000),
      duration: 95,
      status: 'completed',
      services: ['logo', 'name', 'tagline', 'colorPalette']
    },
    {
      id: 2,
      name: 'GreenLife Brand',
      completedAt: new Date(Date.now() - 7200000),
      duration: 120,
      status: 'completed',
      services: ['logo', 'name', 'tagline']
    },
    {
      id: 3,
      name: 'UrbanStyle Kit',
      completedAt: new Date(Date.now() - 10800000),
      duration: 85,
      status: 'partial',
      services: ['logo', 'name']
    }
  ];

  useEffect(() => {
    setLogs(mockLogs);
    setQueueItems(mockQueueItems);
    setGenerationHistory(mockHistory);
    
    // Set tier-based limits
    const limits = {
      'Hobby': 1,
      'Pro': 3,
      'Agency': 10
    };
    setConcurrentLimit(limits[userTier] || 1);
  }, [userTier]);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          const newProgress = { ...prev };
          const services = ['logo', 'name', 'tagline', 'colorPalette'];
          
          services.forEach(service => {
            if (newProgress[service] < 100) {
              newProgress[service] = Math.min(100, newProgress[service] + Math.random() * 15);
            }
          });
          
          const overall = services.reduce((sum, service) => sum + newProgress[service], 0) / services.length;
          newProgress.overall = overall;
          
          if (overall >= 100) {
            setIsGenerating(false);
            setGenerationStatus('completed');
            setTimeout(() => {
              navigate('/brand-kit-preview-editor');
            }, 2000);
          }
          
          return newProgress;
        });
        
        setEstimatedTime(prev => Math.max(0, prev - 5));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating, navigate]);

  const handleStartGeneration = () => {
    if (activeGenerations >= concurrentLimit) {
      alert(`You've reached your concurrent generation limit (${concurrentLimit}). Please wait for current generations to complete or upgrade your plan.`);
      return;
    }
    
    setIsGenerating(true);
    setGenerationStatus('processing');
    setGenerationProgress({
      logo: 0,
      name: 0,
      tagline: 0,
      colorPalette: 0,
      overall: 0
    });
    setEstimatedTime(120);
    setActiveGenerations(prev => prev + 1);
  };

  const handlePauseGeneration = () => {
    setIsGenerating(false);
    setGenerationStatus('paused');
  };

  const handleCancelGeneration = () => {
    setIsGenerating(false);
    setGenerationStatus('cancelled');
    setGenerationProgress({
      logo: 0,
      name: 0,
      tagline: 0,
      colorPalette: 0,
      overall: 0
    });
    setActiveGenerations(prev => Math.max(0, prev - 1));
  };

  const handleRetryGeneration = () => {
    handleStartGeneration();
  };

  const getStatusColor = (status) => {
    const colors = {
      'idle': 'text-text-secondary',
      'processing': 'text-primary',
      'paused': 'text-warning',
      'completed': 'text-success',
      'cancelled': 'text-error',
      'failed': 'text-error'
    };
    return colors[status] || 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'idle': 'Clock',
      'processing': 'Loader',
      'paused': 'Pause',
      'completed': 'CheckCircle',
      'cancelled': 'XCircle',
      'failed': 'AlertCircle'
    };
    return icons[status] || 'Clock';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">AI Generation Interface</h1>
              <p className="text-text-secondary">Monitor and control your brand generation process in real-time</p>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                connectionStatus === 'connected' ?'bg-success-50 border-success-200 text-success-700' :'bg-error-50 border-error-200 text-error-700'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-success animate-pulse' : 'bg-error'
                }`}></div>
                <span className="text-sm font-medium">
                  {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              {/* Tier Badge */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-accent-50 border border-accent-200 rounded-lg">
                <Icon name="Crown" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent-700">{userTier}</span>
                <span className="text-xs text-text-muted">
                  {activeGenerations}/{concurrentLimit} active
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Generation Queue - Left Panel */}
            <div className="lg:col-span-1">
              <GenerationQueue 
                items={queueItems}
                concurrentLimit={concurrentLimit}
                activeGenerations={activeGenerations}
                userTier={userTier}
                onRetry={handleRetryGeneration}
              />
            </div>

            {/* Main Generation Panel - Center */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                {/* Generation Status Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isGenerating ? 'bg-primary animate-pulse' : 
                      generationStatus === 'completed' ? 'bg-success' :
                      generationStatus === 'failed' ? 'bg-error' : 'bg-text-muted'
                    }`}></div>
                    <h2 className="text-xl font-semibold text-text-primary">
                      Brand Generation Progress
                    </h2>
                  </div>
                  
                  <div className={`flex items-center space-x-2 ${getStatusColor(generationStatus)}`}>
                    <Icon name={getStatusIcon(generationStatus)} size={16} />
                    <span className="text-sm font-medium capitalize">{generationStatus}</span>
                  </div>
                </div>

                {/* Overall Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">Overall Progress</span>
                    <span className="text-sm text-text-secondary">
                      {Math.round(generationProgress.overall)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                      style={{ width: `${generationProgress.overall}%` }}
                    ></div>
                  </div>
                  {isGenerating && (
                    <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
                      <span>Estimated time remaining: {formatTime(estimatedTime)}</span>
                      <span>{activeGenerations} of {concurrentLimit} slots used</span>
                    </div>
                  )}
                </div>

                {/* Service Progress Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {services.map((service) => (
                    <div key={service.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          service.color === 'primary' ? 'bg-primary-50' :
                          service.color === 'secondary' ? 'bg-secondary-50' :
                          service.color === 'accent'? 'bg-accent-50' : 'bg-success-50'
                        }`}>
                          <Icon 
                            name={service.icon} 
                            size={16} 
                            className={
                              service.color === 'primary' ? 'text-primary' :
                              service.color === 'secondary' ? 'text-secondary' :
                              service.color === 'accent'? 'text-accent' : 'text-success'
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-text-primary">{service.name}</h3>
                          <p className="text-xs text-text-secondary">{service.status}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Progress</span>
                          <span className="text-text-primary font-medium">
                            {Math.round(service.progress)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ease-out ${
                              service.color === 'primary' ? 'bg-primary' :
                              service.color === 'secondary' ? 'bg-secondary' :
                              service.color === 'accent'? 'bg-accent' : 'bg-success'
                            }`}
                            style={{ width: `${service.progress}%` }}
                          ></div>
                        </div>
                        {service.status === 'processing' && (
                          <p className="text-xs text-text-muted">
                            ~{service.estimatedTime}s remaining
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-4">
                  {!isGenerating && generationStatus !== 'completed' && (
                    <button
                      onClick={handleStartGeneration}
                      disabled={activeGenerations >= concurrentLimit}
                      className="btn-primary px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="Play" size={18} />
                      <span>Start Generation</span>
                    </button>
                  )}
                  
                  {isGenerating && (
                    <>
                      <button
                        onClick={handlePauseGeneration}
                        className="px-6 py-3 border border-warning text-warning hover:bg-warning-50 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Icon name="Pause" size={18} />
                        <span>Pause</span>
                      </button>
                      
                      <button
                        onClick={handleCancelGeneration}
                        className="px-6 py-3 border border-error text-error hover:bg-error-50 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors duration-200"
                      >
                        <Icon name="X" size={18} />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                  
                  {generationStatus === 'completed' && (
                    <button
                      onClick={() => navigate('/brand-kit-preview-editor')}
                      className="btn-primary px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
                    >
                      <Icon name="Eye" size={18} />
                      <span>View Results</span>
                    </button>
                  )}
                  
                  {(generationStatus === 'failed' || generationStatus === 'cancelled') && (
                    <button
                      onClick={handleRetryGeneration}
                      className="btn-secondary px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
                    >
                      <Icon name="RotateCcw" size={18} />
                      <span>Retry</span>
                    </button>
                  )}
                </div>

                {/* Success Animation */}
                {generationStatus === 'completed' && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 text-success">
                      <Icon name="CheckCircle" size={24} />
                      <span className="text-lg font-medium">Generation Complete!</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      Redirecting to preview in 2 seconds...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Logs and History - Right Panel */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Panel Toggle */}
                <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg p-1">
                  <button
                    onClick={() => {
                      setShowLogs(true);
                      setShowHistory(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      showLogs 
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-primary'
                    }`}
                  >
                    Logs
                  </button>
                  <button
                    onClick={() => {
                      setShowLogs(false);
                      setShowHistory(true);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      showHistory 
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-primary'
                    }`}
                  >
                    History
                  </button>
                </div>

                {/* Logs Panel */}
                {showLogs && (
                  <GenerationLogs 
                    logs={logs}
                    isGenerating={isGenerating}
                  />
                )}

                {/* History Panel */}
                {showHistory && (
                  <GenerationHistory 
                    history={generationHistory}
                    onRegenerate={handleRetryGeneration}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickActionsMenu />
    </div>
  );
};

export default AIGenerationInterface;