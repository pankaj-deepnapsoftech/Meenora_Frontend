import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminSidebar = ({ tabs, activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Top Bar (Mobile Only) */}
      <div className="sm:hidden fixed top-0 left-0 z-50 w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={`p-2 rounded-md transition ${showSidebar ? 'bg-red-500 text-white' : 'text-primary'
            }`}
        >
          {showSidebar ? <X size={22} className='absolute z-50' /> : <Menu size={22} />}
        </button>

        <img src="/Logo/Company_logo2.png" alt="Logo" className="h-8" />
      </div>

      {/* Overlay (mobile only) */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-72 min-h-screen admin-sidebar  shadow-2xl flex flex-col transition-transform duration-300 z-50
          fixed top-0 left-0 sm:relative
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div className="p-6 flex-grow">
          <Link to="/" className="block mb-6">
            <img src="/Logo/Company_logo.png" alt="Company Logo" className="w-56" />
          </Link>

          <nav className="space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowSidebar(false); // Close sidebar on mobile after clicking tab
                }}
                className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-lg transition-all duration-200
                  ${activeTab === tab.id
                    ? 'active-admin-nav font-semibold shadow-xl scale-[1.03] bg-primary text-white'
                    : 'text-muted-foreground/70 hover:bg-primary/10 hover:text-primary hover:scale-[1.01]'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-base">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="p-6 border-t border-border/10">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full flex items-center justify-start px-4 py-3.5 space-x-3.5 text-sm
              text-white bg-destructive hover:bg-destructive/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            © {new Date().getFullYear()} Meenora Admin.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
