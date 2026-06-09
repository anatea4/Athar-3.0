'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Users, BookOpen, Settings, LogOut, Plus, Trash2,
  Edit3, Save, Eye, EyeOff, ChevronDown, ChevronRight, Shield,
  Globe, MessageSquare, Image as ImageIcon, DollarSign, Bell,
  FileText, Phone, Star, Award, Menu, X, Lock, Key, UserPlus,
  RefreshCw, CheckCircle, AlertCircle, Info, ChevronUp, Loader2,
  Building2, HelpCircle, Newspaper, Calendar, HandHeart, Map
} from 'lucide-react';

type AdminUser = { id: string; username: string; isSuper: boolean };
type Tab = 'overview' | 'content' | 'programs' | 'team' | 'faq' | 'news' | 'contact' | 'admins' | 'settings';

interface ToastMsg { id: number; type: 'success' | 'error' | 'info'; message: string }

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [loading, setLoading] = useState(false);

  // Content state
  const [siteContent, setSiteContent] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Admins state
  const [admins, setAdmins] = useState<Array<{ id: string; username: string; is_super: boolean; created_at: string }>>([]);
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminSuper, setNewAdminSuper] = useState(false);
  const [changingPassFor, setChangingPassFor] = useState<string | null>(null);
  const [newPassValue, setNewPassValue] = useState('');

  const addToast = useCallback((type: ToastMsg['type'], message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentAdmin(data.admin);
        setIsLoggedIn(true);
        addToast('success', `Welcome back, ${data.admin.username}!`);
      } else {
        addToast('error', data.error || 'Login failed');
      }
    } catch {
      addToast('error', 'Connection error');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    addToast('info', 'Logged out successfully');
  };

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (res.ok) setSiteContent(data.content || {});
    } catch {
      addToast('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const saveContent = async (key: string, value: string) => {
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) {
        setSiteContent(prev => ({ ...prev, [key]: value }));
        setEditingKey(null);
        addToast('success', 'Content saved!');
      } else {
        addToast('error', 'Failed to save');
      }
    } catch {
      addToast('error', 'Connection error');
    }
  };

  const loadAdmins = useCallback(async () => {
    try {
      const res = await fetch('/api/admins');
      const data = await res.json();
      if (res.ok) setAdmins(data.admins || []);
    } catch {
      addToast('error', 'Failed to load admins');
    }
  }, [addToast]);

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newAdminUser, password: newAdminPass, isSuper: newAdminSuper }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdmins(prev => [...prev, data.admin]);
        setNewAdminUser(''); setNewAdminPass(''); setNewAdminSuper(false);
        addToast('success', `Admin "${data.admin.username}" created!`);
      } else {
        addToast('error', data.error || 'Failed to create admin');
      }
    } catch {
      addToast('error', 'Connection error');
    }
  };

  const deleteAdmin = async (id: string, username: string) => {
    if (!confirm(`Delete admin "${username}"?`)) return;
    try {
      const res = await fetch('/api/admins', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setAdmins(prev => prev.filter(a => a.id !== id));
        addToast('success', `Admin "${username}" deleted`);
      } else {
        const data = await res.json();
        addToast('error', data.error || 'Failed to delete');
      }
    } catch {
      addToast('error', 'Connection error');
    }
  };

  const changePassword = async (adminId: string) => {
    if (!newPassValue) return;
    try {
      const res = await fetch('/api/admins/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, newPassword: newPassValue }),
      });
      if (res.ok) {
        setChangingPassFor(null);
        setNewPassValue('');
        addToast('success', 'Password changed!');
      } else {
        const data = await res.json();
        addToast('error', data.error || 'Failed to change password');
      }
    } catch {
      addToast('error', 'Connection error');
    }
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === 'content') loadContent();
    if (isLoggedIn && activeTab === 'admins') loadAdmins();
  }, [isLoggedIn, activeTab, loadContent, loadAdmins]);

  // ---------- CONTENT SECTIONS ----------
  const contentSections = [
    {
      id: 'hero', label: 'Hero Section', icon: <Star className="w-4 h-4" />,
      keys: [
        { key: 'hero_title_ar', label: 'Title (Arabic)' },
        { key: 'hero_title_en', label: 'Title (English)' },
        { key: 'hero_title_ms', label: 'Title (Malay)' },
        { key: 'hero_subtitle_ar', label: 'Subtitle (Arabic)' },
        { key: 'hero_subtitle_en', label: 'Subtitle (English)' },
        { key: 'hero_subtitle_ms', label: 'Subtitle (Malay)' },
        { key: 'hero_image_url', label: 'Hero Image URL' },
      ]
    },
    {
      id: 'about', label: 'About Section', icon: <Building2 className="w-4 h-4" />,
      keys: [
        { key: 'about_title_ar', label: 'Title (Arabic)' },
        { key: 'about_title_en', label: 'Title (English)' },
        { key: 'about_title_ms', label: 'Title (Malay)' },
        { key: 'about_desc_ar', label: 'Description (Arabic)' },
        { key: 'about_desc_en', label: 'Description (English)' },
        { key: 'about_desc_ms', label: 'Description (Malay)' },
        { key: 'about_vision_ar', label: 'Vision (Arabic)' },
        { key: 'about_vision_en', label: 'Vision (English)' },
        { key: 'about_mission_ar', label: 'Mission (Arabic)' },
        { key: 'about_mission_en', label: 'Mission (English)' },
      ]
    },
    {
      id: 'stats', label: 'Statistics', icon: <Award className="w-4 h-4" />,
      keys: [
        { key: 'stats_students', label: 'Total Students' },
        { key: 'stats_teachers', label: 'Total Teachers' },
        { key: 'stats_programs', label: 'Total Programs' },
        { key: 'stats_countries', label: 'Countries Served' },
        { key: 'stats_years', label: 'Years Operating' },
        { key: 'stats_graduates', label: 'Total Graduates' },
      ]
    },
    {
      id: 'contact_info', label: 'Contact Info', icon: <Phone className="w-4 h-4" />,
      keys: [
        { key: 'contact_email', label: 'Email' },
        { key: 'contact_phone', label: 'Phone' },
        { key: 'contact_whatsapp', label: 'WhatsApp' },
        { key: 'contact_address_ar', label: 'Address (Arabic)' },
        { key: 'contact_address_en', label: 'Address (English)' },
        { key: 'social_facebook', label: 'Facebook URL' },
        { key: 'social_instagram', label: 'Instagram URL' },
        { key: 'social_twitter', label: 'Twitter/X URL' },
        { key: 'social_youtube', label: 'YouTube URL' },
        { key: 'social_telegram', label: 'Telegram URL' },
        { key: 'social_tiktok', label: 'TikTok URL' },
      ]
    },
    {
      id: 'footer', label: 'Footer', icon: <Map className="w-4 h-4" />,
      keys: [
        { key: 'footer_desc_ar', label: 'Description (Arabic)' },
        { key: 'footer_desc_en', label: 'Description (English)' },
        { key: 'footer_desc_ms', label: 'Description (Malay)' },
        { key: 'footer_copyright_ar', label: 'Copyright (Arabic)' },
        { key: 'footer_copyright_en', label: 'Copyright (English)' },
      ]
    },
  ];

  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  const navItems: { id: Tab; label: string; icon: React.ReactNode; superOnly?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'content', label: 'Website Content', icon: <Globe className="w-5 h-5" /> },
    { id: 'programs', label: 'Programs', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'team', label: 'Team Members', icon: <Users className="w-5 h-5" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'news', label: 'News & Media', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact Info', icon: <Phone className="w-5 h-5" /> },
    { id: 'admins', label: 'Admin Users', icon: <Shield className="w-5 h-5" />, superOnly: true },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // ---------- LOGIN PAGE ----------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#192d4a] to-[#0d1e33] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#C09E5B]/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#C09E5B]/40">
              <Shield className="w-10 h-10 text-[#C09E5B]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Athar Admin</h1>
            <p className="text-white/50 text-sm">Secure Dashboard Access</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-5">
            <div>
              <label className="text-white/70 text-sm mb-2 block">Username</label>
              <input
                type="text" value={loginUser} onChange={e => setLoginUser(e.target.value)} required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C09E5B] transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={loginPass} onChange={e => setLoginPass(e.target.value)} required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-[#C09E5B] transition-colors"
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit" disabled={loginLoading}
              className="w-full bg-[#C09E5B] hover:bg-[#ad8d4a] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
              {loginLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>

        {/* Toasts */}
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map(t => (
            <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium max-w-xs ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
              {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> : t.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
              {t.message}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="ltr">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#192d4a] text-white flex flex-col fixed h-full z-40`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C09E5B]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#C09E5B]" />
              </div>
              <span className="font-bold text-sm">Athar Admin</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {navItems.filter(item => !item.superOnly || currentAdmin?.isSuper).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#C09E5B] text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-xs text-white/40">Logged in as</p>
              <p className="text-sm font-semibold text-[#C09E5B] flex items-center gap-1">
                {currentAdmin?.username}
                {currentAdmin?.isSuper && <Shield className="w-3 h-3" />}
              </p>
            </div>
          )}
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 flex-1 p-6`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Dashboard
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: siteContent['stats_students'] || '—', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
                { label: 'Teachers', value: siteContent['stats_teachers'] || '—', icon: <BookOpen className="w-6 h-6" />, color: 'bg-green-500' },
                { label: 'Programs', value: siteContent['stats_programs'] || '—', icon: <Award className="w-6 h-6" />, color: 'bg-yellow-500' },
                { label: 'Countries', value: siteContent['stats_countries'] || '—', icon: <Globe className="w-6 h-6" />, color: 'bg-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#C09E5B]" /> Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Edit Website Content', tab: 'content' as Tab, icon: <Edit3 className="w-4 h-4" /> },
                    { label: 'Manage Programs', tab: 'programs' as Tab, icon: <BookOpen className="w-4 h-4" /> },
                    { label: 'Update Contact Info', tab: 'contact' as Tab, icon: <Phone className="w-4 h-4" /> },
                    { label: 'Manage Admin Users', tab: 'admins' as Tab, icon: <Shield className="w-4 h-4" /> },
                  ].map((action, i) => (
                    <button key={i} onClick={() => setActiveTab(action.tab)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700">
                      <span className="text-[#C09E5B]">{action.icon}</span>
                      {action.label}
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#192d4a] to-[#1f3f69] rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#C09E5B]" /> System Info
                </h3>
                <div className="space-y-2 text-sm text-white/70">
                  <p>Platform: <span className="text-white">Athar Academy</span></p>
                  <p>Stack: <span className="text-white">Next.js 15 + Supabase</span></p>
                  <p>Admin: <span className="text-[#C09E5B]">{currentAdmin?.username}</span></p>
                  <p>Role: <span className="text-white">{currentAdmin?.isSuper ? 'Super Admin' : 'Admin'}</span></p>
                  <p>DB: <span className="text-green-400">Connected ✓</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={loadContent} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <p className="text-sm text-gray-500">Changes are saved to Supabase and override the default content.</p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#C09E5B]" /></div>
            ) : (
              contentSections.map(section => (
                <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-800">
                      <span className="text-[#C09E5B]">{section.icon}</span>
                      {section.label}
                    </div>
                    {expandedSection === section.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {expandedSection === section.id && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {section.keys.map(({ key, label }) => (
                        <div key={key} className="p-4 flex items-start gap-4">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                            {editingKey === key ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editValue}
                                  onChange={e => setEditValue(e.target.value)}
                                  rows={3}
                                  className="w-full border border-[#C09E5B] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C09E5B]/30 resize-none"
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => saveContent(key, editValue)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C09E5B] text-white rounded-lg text-xs font-medium hover:bg-[#ad8d4a] transition-colors">
                                    <Save className="w-3 h-3" /> Save
                                  </button>
                                  <button onClick={() => setEditingKey(null)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-700 min-h-[24px]">
                                {siteContent[key] || <span className="text-gray-300 italic">Not set</span>}
                              </p>
                            )}
                          </div>
                          {editingKey !== key && (
                            <button
                              onClick={() => { setEditingKey(key); setEditValue(siteContent[key] || ''); }}
                              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors mt-4 shrink-0"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* PROGRAMS - Static display, edit via content */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#C09E5B]" />
              <h2 className="text-lg font-semibold">Programs Management</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Quran Circles', name_ar: 'حلقات القرآن الكريم', level: 'All Levels', status: 'Active' },
                { name: 'Tajweed Mastery', name_ar: 'إتقان التجويد', level: 'Intermediate', status: 'Active' },
                { name: 'Hifz Program', name_ar: 'برنامج الحفظ', level: 'Advanced', status: 'Active' },
                { name: 'Arabic Language', name_ar: 'اللغة العربية', level: 'Beginner', status: 'Active' },
                { name: 'Islamic Studies', name_ar: 'الدراسات الإسلامية', level: 'All Levels', status: 'Active' },
                { name: 'Kids Quran', name_ar: 'قرآن الأطفال', level: 'Children', status: 'Active' },
              ].map((prog, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-[#C09E5B]/30 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{prog.name}</p>
                    <p className="text-sm text-gray-500">{prog.name_ar}</p>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-1 inline-block">{prog.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">{prog.status}</span>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> To edit program details (titles, descriptions in 3 languages), use the Website Content tab.
            </p>
          </div>
        )}

        {/* TEAM */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#C09E5B]" />
                <h2 className="text-lg font-semibold">Team Members</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C09E5B] text-white rounded-xl text-sm font-medium hover:bg-[#ad8d4a] transition-colors">
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Sheikh Ahmad Al-Rashid', role_en: 'Quran & Tajweed Teacher', role_ar: 'معلم القرآن والتجويد' },
                { name: 'Ustazah Maryam Ibrahim', role_en: 'Arabic Language Instructor', role_ar: 'مدرسة اللغة العربية' },
                { name: 'Dr. Hassan Abdullah', role_en: 'Islamic Studies Scholar', role_ar: 'عالم الدراسات الإسلامية' },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#C09E5B]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C09E5B]/10 rounded-full flex items-center justify-center text-[#C09E5B] font-bold text-lg">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role_en} / {member.role_ar}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#C09E5B]" />
                <h2 className="text-lg font-semibold">FAQ Management</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C09E5B] text-white rounded-xl text-sm font-medium hover:bg-[#ad8d4a] transition-colors">
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>
            <div className="space-y-3">
              {[
                { q_en: 'How can I enroll in a program?', q_ar: 'كيف يمكنني التسجيل في برنامج؟' },
                { q_en: 'What are the program fees?', q_ar: 'ما هي رسوم البرامج؟' },
                { q_en: 'Are there online classes available?', q_ar: 'هل تتوفر دروس عبر الإنترنت؟' },
                { q_en: 'What qualifications do teachers have?', q_ar: 'ما هي مؤهلات المعلمين؟' },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-[#C09E5B]/30 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{faq.q_en}</p>
                      <p className="text-sm text-gray-500 mt-0.5" dir="rtl">{faq.q_ar}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Newspaper className="w-6 h-6 text-[#C09E5B]" />
                <h2 className="text-lg font-semibold">News & Media</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C09E5B] text-white rounded-xl text-sm font-medium hover:bg-[#ad8d4a] transition-colors">
                <Plus className="w-4 h-4" /> Add Article
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Athar Academy Opens New Branch', date: '2024-11-01', status: 'Published' },
                { title: 'Annual Quran Competition 2024', date: '2024-10-15', status: 'Published' },
                { title: 'Partnership with Islamic Center', date: '2024-09-20', status: 'Draft' },
              ].map((article, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-[#C09E5B]/30 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-gray-800 text-sm">{article.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${article.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {article.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{article.date}</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs text-[#C09E5B] hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                    <button className="flex items-center gap-1 text-xs text-red-400 hover:underline"><Trash2 className="w-3 h-3" /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-[#C09E5B]" />
              <h2 className="text-lg font-semibold">Contact & Social Media</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'contact_email', label: 'Email', placeholder: 'info@atharacademy.com', icon: <MessageSquare className="w-4 h-4" /> },
                { key: 'contact_phone', label: 'Phone', placeholder: '+60 12-345 6789', icon: <Phone className="w-4 h-4" /> },
                { key: 'contact_whatsapp', label: 'WhatsApp', placeholder: '+60 12-345 6789', icon: <MessageSquare className="w-4 h-4" /> },
                { key: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...', icon: <Globe className="w-4 h-4" /> },
                { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...', icon: <Globe className="w-4 h-4" /> },
                { key: 'social_youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/...', icon: <Globe className="w-4 h-4" /> },
              ].map(({ key, label, placeholder, icon }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 block">
                    <span className="text-[#C09E5B]">{icon}</span> {label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={siteContent[key] || ''}
                      placeholder={placeholder}
                      id={`contact-${key}`}
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C09E5B] transition-colors"
                    />
                    <button
                      onClick={() => {
                        const el = document.getElementById(`contact-${key}`) as HTMLInputElement;
                        if (el) saveContent(key, el.value);
                      }}
                      className="px-3 py-2 bg-[#C09E5B] text-white rounded-xl hover:bg-[#ad8d4a] transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMINS */}
        {activeTab === 'admins' && currentAdmin?.isSuper && (
          <div className="space-y-6">
            {/* Create new admin */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#C09E5B]" /> Add New Admin
              </h2>
              <form onSubmit={createAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text" value={newAdminUser} onChange={e => setNewAdminUser(e.target.value)} required
                  placeholder="Username" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C09E5B] transition-colors"
                />
                <input
                  type="password" value={newAdminPass} onChange={e => setNewAdminPass(e.target.value)} required
                  placeholder="Password" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C09E5B] transition-colors"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={newAdminSuper} onChange={e => setNewAdminSuper(e.target.checked)} className="w-4 h-4 accent-[#C09E5B]" />
                    Super Admin
                  </label>
                  <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C09E5B] text-white rounded-xl text-sm font-medium hover:bg-[#ad8d4a] transition-colors">
                    <Plus className="w-4 h-4" /> Create
                  </button>
                </div>
              </form>
            </div>

            {/* Admin list */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#C09E5B]" /> Admin Users
                </h2>
                <button onClick={loadAdmins} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </button>
              </div>
              <div className="space-y-3">
                {admins.map(admin => (
                  <div key={admin.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#C09E5B]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1f3f69]/10 rounded-full flex items-center justify-center">
                        <Shield className={`w-5 h-5 ${admin.is_super ? 'text-[#C09E5B]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          {admin.username}
                          {admin.is_super && <span className="text-xs bg-[#C09E5B]/10 text-[#C09E5B] px-2 py-0.5 rounded-full">Super</span>}
                        </p>
                        <p className="text-xs text-gray-400">Created: {new Date(admin.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {changingPassFor === admin.id ? (
                        <div className="flex gap-2">
                          <input
                            type="password" value={newPassValue} onChange={e => setNewPassValue(e.target.value)}
                            placeholder="New password" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-36 focus:outline-none focus:border-[#C09E5B]"
                          />
                          <button onClick={() => changePassword(admin.id)} className="px-3 py-1.5 bg-[#C09E5B] text-white rounded-lg text-xs font-medium hover:bg-[#ad8d4a]">Save</button>
                          <button onClick={() => { setChangingPassFor(null); setNewPassValue(''); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setChangingPassFor(admin.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                          <Key className="w-3.5 h-3.5" /> Change Password
                        </button>
                      )}
                      {admin.id !== currentAdmin?.id && (
                        <button onClick={() => deleteAdmin(admin.id, admin.username)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {admins.length === 0 && (
                  <p className="text-center text-gray-400 py-8">No admins found. Database may not be set up yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-[#C09E5B]" /> Change My Password
              </h2>
              <form onSubmit={async e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newPwd = (form.elements.namedItem('newPwd') as HTMLInputElement).value;
                if (currentAdmin) {
                  const res = await fetch('/api/admins/password', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ adminId: currentAdmin.id, newPassword: newPwd }),
                  });
                  if (res.ok) { addToast('success', 'Password changed!'); form.reset(); }
                  else addToast('error', 'Failed to change password');
                }
              }} className="flex gap-4 max-w-md">
                <input type="password" name="newPwd" required placeholder="New password" minLength={6}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C09E5B] transition-colors"
                />
                <button type="submit" className="px-6 py-2.5 bg-[#C09E5B] text-white rounded-xl text-sm font-medium hover:bg-[#ad8d4a] transition-colors">
                  Update
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#C09E5B]" /> Payment Integration
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                <p className="font-medium mb-1">Stripe Integration — Coming Soon</p>
                <p className="text-yellow-700">Student registration and online payments will be available in the next update. The database schema is already prepared.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C09E5B]" /> Image Settings
              </h2>
              <p className="text-sm text-gray-500 mb-3">Upload images to replace placeholder images across the site. Image URLs can be updated via the Website Content tab.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Hero Image', 'About Image', 'Logo', 'Footer Logo'].map((img, i) => (
                  <div key={i} className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#C09E5B]/40 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">{img}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Toasts */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium max-w-xs ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
            {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> : t.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
