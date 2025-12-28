import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signup({ email: formData.email, password: formData.password, name: formData.name });
        toast({ title: 'Account created!', description: 'Welcome to FootVibe' });
      } else {
        await login({ email: formData.email, password: formData.password });
        toast({ title: 'Welcome back!', description: 'Successfully logged in' });
      }
      navigate(redirect);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">F</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Join FootVibe today' : 'Sign in to continue shopping'}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3">
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-xl text-sm">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p className="text-muted-foreground">Admin: admin@footvibe.com / admin123</p>
            <p className="text-muted-foreground">User: user@footvibe.com / user123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
