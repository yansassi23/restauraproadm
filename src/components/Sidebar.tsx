import React from 'react';
import { 
  LayoutDashboard, 
  FileImage, 
  Settings,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'requests';
  onTabChange: (tab: 'dashboard' | 'requests') => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard' as const,
      name: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral do sistema'
    },
    {
      id: 'requests' as const,
      name: 'Pedidos',
      icon: FileImage,
      description: 'Gerenciar restaurações'
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl z-50 w-72 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FileImage className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Restore Admin</h2>
              <p className="text-sm text-slate-300">Painel Administrativo</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-3">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Navegação
            </h3>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={`
                w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <item.icon className={`h-5 w-5 ${
                  activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`} />
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className={`text-xs ${
                    activeTab === item.id ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-300'
                  }`}>
                    {item.description}
                  </span>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${
                activeTab === item.id ? 'text-white rotate-90' : 'text-slate-500 group-hover:text-slate-300'
              }`} />
            </button>
          ))}
        </nav>

        {/* Stats Card */}
        <div className="mx-6 mb-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-300">Sistema Online</span>
          </div>
          <p className="text-xs text-slate-400">
            Conectado ao Supabase
          </p>
        </div>
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Sistema v1.0</span>
            </div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-6 left-6 z-30 p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Menu className="h-5 w-5 text-slate-700" />
      </button>
    </>
  );
}