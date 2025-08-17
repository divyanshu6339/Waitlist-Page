import { useState } from 'react';
import { X, AlertCircle, CheckCircle, Mail, Loader2 } from 'lucide-react';

const mockAPI = {
  sendOTP: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${email}: ${otp}`);
    localStorage.setItem('mockOTP', otp);
    return { success: true, otp };
  },

  verifyOTP: async (userEmail, otp) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedOTP = localStorage.getItem('mockOTP');
    if (otp === storedOTP) {
      const waitlistNumber = Math.floor(Math.random() * 1000) + 1;
      localStorage.setItem('waitlistNumber', waitlistNumber.toString());
      return { success: true, waitlistNumber };
    }
    return { success: false, error: 'Invalid OTP' };
  }
};

const WaitlistModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOTP = async () => {
    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      await mockAPI.sendOTP(email);
      setStep(2);
    } catch (error) {
      console.error('Send OTP error:', error);
      setErrors({ email: 'Failed to send OTP. Please try again.' });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setErrors({});

    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a 6-digit OTP' });
      return;
    }

    setLoading(true);
    try {
      const result = await mockAPI.verifyOTP(email, otp);
      if (result.success) {
        setWaitlistNumber(result.waitlistNumber);
        setStep(3);
      } else {
        setRetryCount(prev => prev + 1);
        if (retryCount >= 2) {
          setErrors({ otp: 'Too many failed attempts. Please try again later.' });
        } else {
          setErrors({ otp: 'Invalid OTP. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setErrors({ otp: 'Verification failed. Please try again.' });
    }
    setLoading(false);
  };

  const resetModal = () => {
    setStep(1);
    setEmail('');
    setOTP('');
    setErrors({});
    setLoading(false);
    setWaitlistNumber(null);
    setRetryCount(0);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl animate-in fade-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h2>
              <p className="text-gray-400">Get early access when we launch</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
              <p className="text-gray-400">Enter the 6-digit code sent to {email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="123456"
                  maxLength="6"
                />
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-full hover:bg-gray-800 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || retryCount >= 3}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle size={64} className="text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Waitlist!</h2>
              <p className="text-gray-400 mb-4">You're successfully registered</p>

              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Your position:</p>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text blur-sm select-none">
                  #{waitlistNumber}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check your inbox to see your exact spot
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-white">ProductName</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-200"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Revolutionary
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text"> SaaS </span>
            Solution
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your business operations with our cutting-edge platform that automates workflows and drives unprecedented growth.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
          >
            Join Waitlist — It's Free & Fast
          </button>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The Problem That's Costing You
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional business management tools are outdated, fragmented, and inefficient. They're holding back modern companies from reaching their full potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-400 text-lg">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Scattered Data & Systems</h3>
                  <p className="text-gray-400">Multiple disconnected tools create data silos and workflow bottlenecks</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-400 text-lg">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Manual Repetitive Tasks</h3>
                  <p className="text-gray-400">Hours wasted on manual processes that should be automated</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-400 text-lg">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Limited Insights & Analytics</h3>
                  <p className="text-gray-400">Poor visibility into performance metrics and growth opportunities</p>
                </div>
              </div>
            </div>

              <div className="flex justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-gray-700 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📱</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">
            The Cost of Inaction
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">75%</div>
                <h3 className="text-xl font-semibold text-white mb-4">Lost Revenue</h3>
                <p className="text-gray-400">
                  Businesses lose significant revenue due to inefficient processes and missed opportunities
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">25%</div>
                <h3 className="text-xl font-semibold text-white mb-4">Fewer Conversions</h3>
                <p className="text-gray-400">
                  Poor customer experience and delayed responses result in significant conversion losses
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">40%</div>
                <h3 className="text-xl font-semibold text-white mb-4">Customer Value Declined</h3>
                <p className="text-gray-400">
                  Lack of personalization and insights leads to decreased customer lifetime value
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-md">
            <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/50 animate-pulse"></div>
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Be Among the First to Experience the Future
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of forward-thinking businesses waiting for early access to our revolutionary platform.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
              >
                <Mail className="mr-2" size={20} />
                Join Waitlist Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">ProductName</div>
          <p className="text-gray-400">© 2025 ProductName. All rights reserved.</p>
        </div>
      </footer>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;