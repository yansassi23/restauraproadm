import React from 'react';
import { 
  LayoutDashboard, 
  FileImage, 
  Settings,
  Menu,
  X
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
    },
    {
      id: 'requests' as const,
      name: 'Pedidos',
      icon: FileImage,
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
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileImage className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Restore Admin</h2>
              <p className="text-sm text-gray-500">Painel Administrativo</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
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
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-4 py-3">
            <Settings className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Sistema v1.0</span>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>
    </>
  );
}