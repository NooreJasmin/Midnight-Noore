import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, MapPin, AlertCircle } from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({fullName: '', email: '', mobileNumber: '', password: '', confirmPassword: '', address: ''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateMobileNumber = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!validateMobileNumber(formData.mobileNumber)) { setError('Please enter a valid Indian mobile number'); return; }
    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.mobileNumber, formData.address);
    if (error) { setError(error.message); setLoading(false); }
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A4D68] to-[#088395] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0A4D68] to-[#088395] rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Crave Wave today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition" placeholder="Enter your full name" /></div></div>
          <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition" placeholder="your.email@example.com" /></div></div>
          <div><label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label><div className="relative"><Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="mobileNumber" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} required maxLength={10} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition" placeholder="10-digit mobile" /></div></div>
          <div><label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label><div className="relative"><MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition resize-none" placeholder="Enter delivery address" /></div></div>
          <div><label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition" placeholder="Create password" /></div></div>
          <div><label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none transition" placeholder="Confirm password" /></div></div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Have an account? <Link to="/login" className="text-[#088395] font-semibold hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
