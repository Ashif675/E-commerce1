// ─── Register Page (Amazon-style) ────────────────────────────────────

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      toast.success('Account created successfully!');
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
      if (err.code === 'auth/unauthorized-domain') {
        toast.error('Domain not authorized. Add localhost to Firebase Console.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        toast('Sign-in cancelled', { icon: '⚠️' });
      } else {
        toast.error('Google signup failed: ' + err.message);
      }
    }
  }

  const inputClass = "w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#0F1111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] amz-input";

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
          <h1 className="text-[22px] font-bold text-[#0F1111] mb-4">Create account</h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Your name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="First and last name" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters" required className={inputClass} />
              <p className="text-[11px] text-gray-500 mt-1">ⓘ Passwords must be at least 6 characters.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0F1111] mb-1">Re-enter password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password" required className={inputClass} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full amz-btn py-2 px-4 text-sm rounded-lg disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create your Shop.in account'}
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            By creating an account, you agree to Shop.in's <a href="#" className="text-[#007185] hover:text-[#FF9900] hover:underline">Conditions of Use</a> and <a href="#" className="text-[#007185] hover:text-[#FF9900] hover:underline">Privacy Notice</a>.
          </p>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 rounded-lg py-2 text-sm font-medium text-gray-700 transition-all">
            <FcGoogle size={18} /> Continue with Google
          </button>
        </div>

        {/* Sign-in link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-[#FF9900] font-semibold hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
