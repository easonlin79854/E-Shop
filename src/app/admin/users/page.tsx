'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/components/AppProviders';
import { translations } from '@/lib/i18n';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
}

export default function AdminUsersPage() {
  const { lang } = useLang();
  const t = translations[lang];

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUsers(emailFilter?: string) {
    setLoading(true);
    setError('');
    try {
      const query = emailFilter ? `?email=${encodeURIComponent(emailFilter)}` : '';
      const res = await fetch(`/api/admin/users${query}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(search.trim());
  };

  const handleRoleChange = async (user: User) => {
    const newRole = user.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    setUpdatingId(user.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update role');
      } else {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? data : u)));
      }
    } catch {
      setError('Failed to update role');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t.usersTitle}</h1>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchEmail}
          className="flex-1 border dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          {t.searchBtn}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">{t.loadingText}</p>
      ) : (
        <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colEmail}</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colUserName}</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colRole}</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colCreatedAt}</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">{user.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {user.role === 'ADMIN' ? t.roleAdmin : t.roleCustomer}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRoleChange(user)}
                      disabled={updatingId === user.id}
                      className="text-sm text-primary-600 hover:underline disabled:opacity-50"
                    >
                      {user.role === 'ADMIN' ? t.demoteToCustomer : t.promoteToAdmin}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
