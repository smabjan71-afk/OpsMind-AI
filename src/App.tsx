/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ScreenId } from './components/Sidebar';
import { QuickSearchModal } from './components/QuickSearchModal';
import { OverviewDashboard } from './screens/OverviewDashboard';
import { ActiveIncidentTriage } from './screens/ActiveIncidentTriage';
import { IncidentSubmission } from './screens/IncidentSubmission';
import { MemoryBankVectors } from './screens/MemoryBankVectors';
import { LearningPostMortems } from './screens/LearningPostMortems';
import { HackathonDemoFlow } from './screens/HackathonDemoFlow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview-dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPostMortemId, setSelectedPostMortemId] = useState<string | undefined>(undefined);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenId;
      if (
        [
          'overview-dashboard',
          'active-incident-triage-resolution',
          'incident-submission',
          'hindsight-memory-bank-vectors',
          'learning-loop-post-mortems',
          'hackathon-interactive-demo-flow',
        ].includes(hash)
      ) {
        setCurrentScreen(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (screen: ScreenId, param?: string) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
    if (param && screen === 'learning-loop-post-mortems') {
      setSelectedPostMortemId(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] font-mono selection:bg-[#38bdf8] selection:text-[#00354a]">
      {/* Top Cybernetic Fixed Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} unreadCount={1} />

      {/* Left Command Vector Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        liveIncidentActive={true}
      />

      {/* Main Command Workspace */}
      <div className="pl-72">
        <main className="w-full pt-16 bg-[#0f131c] min-h-screen px-4 pb-12">
          {currentScreen === 'overview-dashboard' && (
            <OverviewDashboard
              onNavigate={handleNavigate}
              onOpenRawQuery={() => setIsSearchOpen(true)}
            />
          )}

          {currentScreen === 'active-incident-triage-resolution' && (
            <ActiveIncidentTriage onNavigate={handleNavigate} />
          )}

          {currentScreen === 'incident-submission' && (
            <IncidentSubmission onNavigate={handleNavigate} />
          )}

          {currentScreen === 'hindsight-memory-bank-vectors' && (
            <MemoryBankVectors onNavigate={handleNavigate} />
          )}

          {currentScreen === 'learning-loop-post-mortems' && (
            <LearningPostMortems
              onNavigate={handleNavigate}
              selectedId={selectedPostMortemId}
            />
          )}

          {currentScreen === 'hackathon-interactive-demo-flow' && (
            <HackathonDemoFlow onNavigate={handleNavigate} />
          )}
        </main>
      </div>

      {/* Quick Search & Vector Query Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
