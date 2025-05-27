
import React from 'react';
import { Report } from '../types';
import { UI_TEXT } from '../constants';
import ReportItem from './ReportItem';

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0-6.75H6.75m5.25 0H17.25" />
        </svg>
        <p className="text-gray-500">{UI_TEXT.NO_REPORTS}</p>
      </div>
    );
  }

  const sortedReports = [...reports].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-green-700 mb-4">{UI_TEXT.RECENT_REPORTS_TITLE}</h3>
      {sortedReports.map(report => (
        <ReportItem key={report.id} report={report} />
      ))}
    </div>
  );
};

export default ReportList;
