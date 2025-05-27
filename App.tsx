import React, { useState, useCallback, useEffect } from 'react';
import { Report, AppView } from './types';
import { UI_TEXT } from './constants';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import LearnSection from './components/LearnSection';
import Navbar from './components/Navbar';
import ExampleSpeciesSection from './components/ExampleSpeciesSection'; // Import new component

const App: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(() => {
    const savedReports = localStorage.getItem('invasiveSpeciesReports');
    return savedReports ? JSON.parse(savedReports) : [];
  });
  const [currentView, setCurrentView] = useState<AppView>(AppView.Reporting);
  const [apiKeyExists, setApiKeyExists] = useState(true);

  useEffect(() => {
    if (!process.env.API_KEY) {
        setApiKeyExists(false);
        console.warn(UI_TEXT.API_KEY_ERROR);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('invasiveSpeciesReports', JSON.stringify(reports));
  }, [reports]);

  const addReport = useCallback((report: Report) => {
    setReports(prevReports => [report, ...prevReports]);
  }, []);

  const handleViewChange = useCallback((view: AppView) => {
    setCurrentView(view);
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar currentView={currentView} onViewChange={handleViewChange} />
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {!apiKeyExists && (currentView === AppView.Learning || currentView === AppView.Examples) && ( // Also check for API key if examples might use API in future
             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6" role="alert">
                <p className="font-bold">API 키 경고</p>
                <p>{UI_TEXT.API_KEY_ERROR}</p>
             </div>
        )}
        {currentView === AppView.Reporting && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ReportForm onSubmit={addReport} />
            <div className="mt-8 md:mt-0">
              <ReportList reports={reports} />
            </div>
          </div>
        )}
        {currentView === AppView.Learning && (
          <LearnSection />
        )}
        {currentView === AppView.Examples && ( // Render new section
          <ExampleSpeciesSection />
        )}
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} {UI_TEXT.APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
