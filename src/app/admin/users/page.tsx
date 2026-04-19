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
  const [success, setSuccess] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Edit name state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');

  // Delete confirm state
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

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

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
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
        showSuccess(t.userRoleUpdated);
      }
    } catch {
      setError('Failed to update role');
    } finally {
      setUpdatingId(null);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name ?? '');
    setError('');
  };

  const handleEditSave = async () => {
    if (!editingUser) return;
    setUpdatingId(editingUser.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update name');
      } else {
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? data : u)));
        setEditingUser(null);
        showSuccess(t.userNameUpdated);
      }
    } catch {
      setError('Failed to update name');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    setUpdatingId(deletingUser.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to delete user');
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
        setDeletingUser(null);
        showSuccess(t.userDeleted);
      }
    } catch {
      setError('Failed to delete user');
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
      {success && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-md text-sm">
          {success}
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
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
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
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRoleChange(user)}
                        disabled={updatingId === user.id}
                        className="text-sm text-primary-600 hover:underline disabled:opacity-50"
                      >
                        {user.role === 'ADMIN' ? t.demoteToCustomer : t.promoteToAdmin}
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        disabled={updatingId === user.id}
                        className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                      >
                        {t.editNameBtn}
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        disabled={updatingId === user.id}
                        className="text-sm text-red-600 hover:underline disabled:opacity-50"
                      >
                        {t.deleteUserBtn}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Name Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">{t.editUserTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{editingUser.email}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.colUserName}
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-sm border dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t.formCancel}
              </button>
              <button
                onClick={handleEditSave}
                disabled={updatingId === editingUser.id}
                className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {t.saveBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">{t.deleteUserBtn}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-medium">{deletingUser.email}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t.deleteUserConfirm}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 text-sm border dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t.formCancel}
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={updatingId === deletingUser.id}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {updatingId === deletingUser.id ? t.loadingText : t.deleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
