// ─── Login Page (Amazon-style) ───────────────────────────────────────

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential' ? 'Invalid email or password'
        : err.code === 'auth/too-many-requests' ? 'Too many attempts. Try again later.' : 'Login failed.';
      toast.error(msg);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      console.error('Google Login Error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        toast.error('Domain not authorized. Add localhost to Firebase Console → Authentication → Settings → Authorized Domains.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        toast('Sign-in cancelled', { icon: '⚠️' });
      } else {
        toast.error('Google login failed: ' + err.message);
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-[#0F1111]">
      <div className="w-full max-w-[350px]">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-1">
            <span className="text-white font-black text-2xl">Shop</span>
            <span className="text-[#FF9900] font-black text-2xl">.in</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
          <h1 className="text-[22px] font-bold text-[#0F1111] mb-4">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#0F1111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] amz-input"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password" required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#0F1111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] amz-input"
              />
            </div>

            <button type="submit" disabled={loading}
              className="w-full amz-btn py-2 px-4 text-sm rounded-lg disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            By continuing, you agree to Shop.in's <a href="#" className="text-[#007185] hover:text-[#FF9900] hover:underline">Conditions of Use</a> and <a href="#" className="text-[#007185] hover:text-[#FF9900] hover:underline">Privacy Notice</a>.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google */}
          <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 rounded-lg py-2 text-sm font-medium text-gray-700 transition-all">
            <FcGoogle size={18} /> Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-5 mb-3">
          <hr className="flex-1 border-gray-600" />
          <span className="text-xs text-gray-400">New to Shop.in?</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Create Account */}
        <Link to="/register"
          className="block w-full text-center py-2 px-4 bg-[#232F3E] hover:bg-[#37475A] border border-gray-600 rounded-lg text-sm font-semibold text-white transition-colors">
          Create your Shop.in account
        </Link>
      </div>
    </div>
  );
}
