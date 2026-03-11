// ─── Register Page ────────────────────────────────────────────────────

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return toast.error('Please fill all fields');
    if (password.length < 6) return toast.error('Password must be at least 6 characters');
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try { 
      await signup(email, password, name); 
      toast.success('Login successful!'); 
      setTimeout(() => navigate('/'), 600);
    }
    catch (err) { toast.error(err.code === 'auth/email-already-in-use' ? 'Email already in use' : 'Signup failed.'); }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try { 
      await googleLogin(); 
      toast.success('Login successful!'); 
      setTimeout(() => navigate('/'), 600);
    } catch (err) { 
      console.error('Google Signup Error:', err); 
      toast.error('Google signup failed: ' + err.message); 
    }
  }

  const inputClass = "w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-2xl mb-2">
            <span className="bg-gradient-to-r from-emerald-500 to-green-400 text-gray-950 px-3 py-1 rounded-lg text-sm font-black">SHOP</span>
            <span className="text-white">Store</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Create Account</h1>
          <p className="text-gray-500 mt-1">Start shopping in seconds</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-700 hover:border-gray-600 rounded-xl py-3 font-medium text-gray-300 hover:bg-gray-800 transition-all mb-6">
            <FcGoogle size={20} /> Continue with Google
          </button>
          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-gray-700" /><span className="text-xs text-gray-500 font-medium">OR</span><hr className="flex-1 border-gray-700" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required className={inputClass} />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
              {loading ? 'Creating account...' : <><FiUserPlus /> Create Account</>}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-emerald-400 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
