import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE, saveAuthToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Login failed');
      }
      const data = await res.json();
      if (data && data.token) {
        saveAuthToken(data.token);
        navigate("/", { replace: true });
      } else {
        throw new Error('Invalid server response');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 bg-card p-6 rounded-lg border">
        <h1 className="text-2xl font-semibold">Admin Sign In</h1>
        {error ? <div className="text-red-600 text-sm">{error}</div> : null}
        <div className="space-y-2">
          <label className="text-sm">Username</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" autoFocus />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <div className="relative">
            <Input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPass(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded hover:bg-muted">
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default Login;


