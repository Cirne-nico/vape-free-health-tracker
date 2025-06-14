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
      {/* Sección de medallas movida aquí, debajo del header */}
      <div className="block">
        <MedalsSection 
          unlockedAchievements={unlockedAchievements}
          unlockedHealthAchievements={unlockedHealthAchievements}
          totalSavings={totalSavings}
        />
      </div>

      {/* Layout principal con sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar izquierdo - Solo visible en desktop */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">Navegación</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-xs ${
                          activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Tabs horizontales para móvil */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-2">
              <div className="grid grid-cols-3 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg text-xs transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium leading-tight text-center">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Título de la sección activa */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const activeTabData = tabs.find(t => t.id === activeTab);
                  const Icon = activeTabData?.icon || Clock;
                  return (
                    <>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {activeTabData?.label}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {activeTabData?.description}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTabs;