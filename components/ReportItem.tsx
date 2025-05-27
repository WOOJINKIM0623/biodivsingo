
import React from 'react';
import { Report } from '../types';
import { UI_TEXT } from '../constants';
import PhotoIcon from './icons/PhotoIcon';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-102 transition-transform duration-300">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {report.photoBase64 ? (
            <img className="h-48 w-full object-cover md:w-48" src={report.photoBase64} alt={report.speciesName} />
          ) : (
            <div className="h-48 w-full md:w-48 bg-gray-100 flex items-center justify-center">
              <PhotoIcon className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">{UI_TEXT.REPORT_ITEM_SPECIES} {report.speciesName}</div>
          <p className="mt-2 text-gray-600"><span className="font-medium">{UI_TEXT.REPORT_ITEM_DATE}</span> {formatDate(report.sightingDate)}</p>
          <p className="text-gray-600"><span className="font-medium">{UI_TEXT.REPORT_ITEM_LOCATION}</span> {report.location}</p>
          {report.reporterName && <p className="text-gray-600"><span className="font-medium">{UI_TEXT.REPORT_ITEM_REPORTER}</span> {report.reporterName}</p>}
          {report.reporterContact && <p className="text-gray-600"><span className="font-medium">{UI_TEXT.REPORT_ITEM_CONTACT}</span> {report.reporterContact}</p>}
          {report.notes && <p className="mt-2 text-sm text-gray-500"><span className="font-medium">{UI_TEXT.REPORT_ITEM_NOTES}</span> {report.notes}</p>}
          <p className="mt-2 text-xs text-gray-400">ID: {report.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
