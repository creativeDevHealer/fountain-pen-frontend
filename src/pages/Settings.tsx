import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE, authFetch, getAuthToken, clearAuthToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) navigate('/login');
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); setError("");
    if (!newUsername && !newPassword) { setError('Nothing to update'); return; }
    if (newPassword && newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/auth/change`, {
        method: 'POST',
        body: JSON.stringify({ newUsername, newPassword })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Update failed');
      }
      setMessage('Credentials updated. Please sign in again with new values.');
      // Force re-login for safety
      clearAuthToken();
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (err: any) {
      setError(err?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 bg-card p-6 rounded-lg border">
        <h1 className="text-2xl font-semibold">Change Credentials</h1>
        {message ? <div className="text-green-600 text-sm">{message}</div> : null}
        {error ? <div className="text-red-600 text-sm">{error}</div> : null}
        <div className="space-y-2">
          <label className="text-sm">New Username</label>
          <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="admin" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">New Password</label>
          <div className="relative">
            <Input type={showPass ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPass(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded hover:bg-muted">
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Confirm Password</label>
          <div className="relative">
            <Input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" aria-label="Toggle password visibility" onClick={() => setShowConfirm(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded hover:bg-muted">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Save'}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;


