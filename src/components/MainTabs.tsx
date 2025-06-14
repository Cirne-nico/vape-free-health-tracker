import EmotionLogger from './EmotionLogger';
import HealthTracker from './HealthTracker';
import AchievementsList from './AchievementsList';
import HistoryView from './HistoryView';
import SettingsPanel from './SettingsPanel';
import SocialStats from './SocialStats';
import VirtualRewards from './VirtualRewards';
import PredictiveAnalysis from './PredictiveAnalysis';
import MedalsSection from './MedalsSection';
import EpicQuestsManager from './EpicQuestsManager';
import HabitsManager from './HabitsManager';
import { Clock, Trophy, Heart, Brain, Settings, Scroll, Zap } from 'lucide-react';
import { useState } from 'react';

interface MainTabsProps {
  startDate: Date | null;
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
  unlockedHealthAchievements: any[];
}

const MainTabs = ({ 
  startDate, 
  currentDay, 
  totalSavings, 
  unlockedAchievements,
  unlockedHealthAchievements 
}: MainTabsProps) => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: Clock,
      description: 'Estado emocional y estadísticas'
    },
    {
      id: 'emotivity',
      label: 'Emotividad',
      icon: Brain,
      description: 'Análisis emocional avanzado'
    },
    {
      id: 'health',
      label: 'Salud',
      icon: Heart,
      description: 'Recuperación física'
    },
    {
      id: 'achievements',
      label: 'Epopeya',
      icon: Trophy,
      description: 'Los trabajos de Hércula'
    },
    {
      id: 'epic',
      label: 'La épica',
      icon: Scroll,
      description: 'Gestas heroicas'
    },
    {
      id: 'poderio',
      label: 'Poderío',
      icon: Zap,
      description: 'Hábitos científicos'
    },
    {
      id: 'settings',
      label: 'Ajustes',
      icon: Settings,
      description: 'Configuración'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4 sm:space-y-6">
            <EmotionLogger startDate={startDate} />
            <SocialStats 
              currentDay={currentDay}
              totalSavings={totalSavings}
            />
          </div>
        );
      case 'emotivity':
        return (
          <div className="space-y-4 sm:space-y-6">
            <VirtualRewards 
              currentDay={currentDay}
              totalSavings={totalSavings}
              unlockedAchievements={unlockedAchievements}
            />
            <PredictiveAnalysis currentDay={currentDay} />
            <HistoryView />
          </div>
        );
      case 'health':
        return <HealthTracker startDate={startDate} />;
      case 'achievements':
        return <AchievementsList days={currentDay} savings={totalSavings} />;
      case 'epic':
        return <EpicQuestsManager />;
      case 'poderio':
        return <HabitsManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sección de medallas - siempre visible */}
      <MedalsSection 
        unlockedAchievements={unlockedAchievements}
        unlockedHealthAchievements={unlockedHealthAchievements}
        totalSavings={totalSavings}
      />

      {/* LAYOUT PRINCIPAL CON SIDEBAR REAL */}
      <div className="min-h-screen">
        {/* SIDEBAR FIJO LATERAL IZQUIERDO - SOLO DESKTOP */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:overflow-y-auto lg:bg-white lg:border-r lg:border-gray-200">
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navegación</h2>
          </div>
          <nav className="flex flex-1 flex-col p-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex w-full items-center gap-x-3 rounded-md p-3 text-left text-sm font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-xs mt-0.5 ${
                          activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL CON MARGEN PARA SIDEBAR */}
        <div className="lg:pl-72">
          {/* TABS HORIZONTALES PARA MÓVIL */}
          <div className="lg:hidden">
            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* HEADER DE SECCIÓN - SOLO DESKTOP */}
          <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              {(() => {
                const activeTabData = tabs.find(t => t.id === activeTab);
                const Icon = activeTabData?.icon || Clock;
                return (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">
                        {activeTabData?.label}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {activeTabData?.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* CONTENIDO DE LA PESTAÑA */}
          <main className="p-4 sm:p-6">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainTabs;