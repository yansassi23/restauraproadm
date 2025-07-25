import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { RequestsList } from './components/RequestsList';
import { OrdersList } from './components/OrdersList';
import { RequestModal } from './components/RequestModal';
import { useRestorationRequests } from './hooks/useRestorationRequests';
import { RestorationRequest } from './lib/supabase';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'requests' | 'orders'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RestorationRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { requests, loading, error, refetch, updateRequestStatus, deleteRequest } = useRestorationRequests();

  console.log('App rendered');
  console.log('- activeTab:', activeTab);
  console.log('- requests:', requests);
  console.log('- requests count:', requests?.length || 0);
  console.log('- loading:', loading);
  console.log('- error:', error);

  const handleViewRequest = (request: RestorationRequest) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalOpen(false);
  };

  const handleUpdateStatus = async (id: string, status: RestorationRequest['status'], notes?: string) => {
    const success = await updateRequestStatus(id, status, notes);
    if (success) {
      handleCloseModal();
    }
    return success;
  };

  const handleDeleteRequest = async (id: string) => {
    const success = await deleteRequest(id);
    if (success) {
      handleCloseModal();
    }
    return success;
  };
  const handleTabChange = (tab: 'dashboard' | 'requests' | 'orders') => {
    console.log('Tab change requested:', tab);
    setActiveTab(tab);
  };
  
  // Verificar se as variáveis de ambiente estão definidas
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Configuração do Supabase Necessária</h2>
          <p className="text-gray-600 mb-4">
            As variáveis de ambiente do Supabase não foram encontradas.
          </p>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Para resolver:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Clique no botão "Connect to Supabase" no canto superior direito</li>
              <li>• Ou crie um arquivo .env na raiz do projeto com:</li>
              <li className="font-mono text-xs bg-yellow-100 p-2 rounded mt-2">
                VITE_SUPABASE_URL="sua-url-do-supabase"<br/>
                VITE_SUPABASE_ANON_KEY="sua-chave-anonima"
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">Carregando painel administrativo...</p>
          <p className="text-sm text-gray-500">Conectando com o Supabase e carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Tentar novamente</span>
          </button>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Possíveis soluções:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Verifique se a tabela 'customers' existe no Supabase</li>
              <li>• Confirme se as credenciais do Supabase estão corretas</li>
              <li>• Verifique as políticas RLS da tabela</li>
              <li>• Confirme se há dados na tabela 'customers'</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 lg:ml-0">
        <div className="p-6 lg:p-8">
          {console.log('Rendering content for tab:', activeTab)}
          {activeTab === 'dashboard' && <Dashboard requests={requests} />}
          {activeTab === 'requests' && (
            <RequestsList
              requests={requests}
              onViewRequest={handleViewRequest}
              onUpdateStatus={updateRequestStatus}
              onDeleteRequest={handleDeleteRequest}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersList
              requests={requests}
              onViewRequest={handleViewRequest}
              onUpdateStatus={updateRequestStatus}
              onDeleteRequest={handleDeleteRequest}
            />
          )}
        </div>
      </div>

      <RequestModal
        request={selectedRequest}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateStatus}
        onDeleteRequest={handleDeleteRequest}
      />
    </div>
  );
}

export default App;