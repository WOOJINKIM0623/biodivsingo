import React, { useState, useCallback } from 'react';
import { Report } from '../types';
import { UI_TEXT } from '../constants';
import PhotoIcon from './icons/PhotoIcon';
import UploadIcon from './icons/UploadIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon'; // Import new icon

interface ReportFormProps {
  onSubmit: (report: Report) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [speciesName, setSpeciesName] = useState('');
  const [sightingDate, setSightingDate] = useState('');
  const [location, setLocation] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationSuccess, setLocationSuccess] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoBase64(null);
      setPhotoPreview(null);
    }
  }, []);

  const handleGetCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('브라우저에서 위치 정보 기능을 사용할 수 없습니다.');
      return;
    }

    setIsFetchingLocation(true);
    setLocationError(null);
    setLocationSuccess(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation(`위도: ${latitude.toFixed(5)}, 경도: ${longitude.toFixed(5)} (정확도: ${accuracy.toFixed(0)}m)`);
        setIsFetchingLocation(false);
        setLocationSuccess(UI_TEXT.LOCATION_FETCH_SUCCESS);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError(`${UI_TEXT.LOCATION_FETCH_ERROR} (오류: ${error.message})`);
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (!speciesName || !sightingDate || !location) {
      alert(UI_TEXT.REQUIRED_FIELDS_ERROR);
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      speciesName,
      sightingDate,
      location,
      photoBase64, 
      reporterName: reporterName || undefined,
      reporterContact: reporterContact || undefined,
      notes: notes || undefined,
      timestamp: Date.now(),
    };

    const emailTo = UI_TEXT.REPORT_SUBMISSION_EMAIL_ADDRESS;
    const emailSubject = `${UI_TEXT.EMAIL_SUBJECT_PREFIX} ${speciesName}`;
    
    let emailBody = `다음은 생태계 교란종 신고 내용입니다:\n`;
    emailBody += `------------------------------------\n`;
    emailBody += `교란종 이름: ${speciesName}\n`;
    emailBody += `발견 날짜/시간: ${new Date(sightingDate).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}\n`;
    emailBody += `발견 위치: ${location}\n`;
    if (reporterName) emailBody += `신고자 이름: ${reporterName}\n`;
    if (reporterContact) emailBody += `연락처: ${reporterContact}\n`;
    if (notes) emailBody += `추가 설명: ${notes}\n`;
    emailBody += `------------------------------------\n`;

    if (photoBase64) {
      emailBody += `\n중요: 양식에 사진을 첨부하셨습니다. 이메일 전송 시, 열린 이메일 창에 해당 사진 파일을 직접 첨부해주세요.\n`;
    }
    emailBody += `\n본 이메일은 "${UI_TEXT.APP_TITLE}" 웹사이트에서 자동 생성된 신고 양식입니다.`;

    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    try {
        window.location.href = mailtoLink;
    } catch (e) {
        console.error("Failed to open mailto link:", e);
        alert(`${UI_TEXT.EMAIL_SUBMISSION_MANUAL_INSTRUCTION}\n\nTo: ${emailTo}\nSubject: ${emailSubject}\n\nBody:\n${emailBody}`);
    }

    alert(`${UI_TEXT.EMAIL_SUBMISSION_INSTRUCTION_TITLE}\n\n${UI_TEXT.EMAIL_SUBMISSION_INSTRUCTION_BODY}`);
    
    onSubmit(newReport); 

    setSpeciesName('');
    setSightingDate('');
    setLocation('');
    setPhotoBase64(null);
    setPhotoPreview(null);
    setReporterName('');
    setReporterContact('');
    setNotes('');
    setLocationError(null);
    setLocationSuccess(null);
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

  }, [speciesName, sightingDate, location, photoBase64, reporterName, reporterContact, notes, onSubmit]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6">{UI_TEXT.REPORT_FORM_TITLE}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="speciesName" className="block text-sm font-medium text-gray-700">{UI_TEXT.SPECIES_NAME_LABEL} <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="speciesName"
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            placeholder={UI_TEXT.SPECIES_NAME_PLACEHOLDER}
            required
            aria-required="true"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="sightingDate" className="block text-sm font-medium text-gray-700">{UI_TEXT.SIGHTING_DATE_LABEL} <span className="text-red-500">*</span></label>
          <input
            type="datetime-local"
            id="sightingDate"
            value={sightingDate}
            onChange={(e) => setSightingDate(e.target.value)}
            required
            aria-required="true"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">{UI_TEXT.LOCATION_LABEL} <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLocationSuccess(null); // Clear success message on manual edit
              setLocationError(null); // Clear error message on manual edit
            }}
            placeholder={UI_TEXT.LOCATION_PLACEHOLDER}
            required
            aria-required="true"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isFetchingLocation}
            className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            <LocationMarkerIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            {isFetchingLocation ? UI_TEXT.LOCATION_FETCHING : UI_TEXT.GET_CURRENT_LOCATION_BUTTON}
          </button>
          {locationSuccess && <p className="mt-1 text-xs text-green-600">{locationSuccess}</p>}
          {locationError && <p className="mt-1 text-xs text-red-600">{locationError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{UI_TEXT.PHOTO_LABEL}</label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center" aria-label="첨부된 사진 미리보기 영역">
              {photoPreview ? (
                <img src={photoPreview} alt="첨부 사진 미리보기" className="h-full w-full object-cover rounded-md" />
              ) : (
                <PhotoIcon className="w-12 h-12 text-gray-400" aria-hidden="true" />
              )}
            </div>
            <label htmlFor="photo" className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200 font-medium py-2 px-4 rounded-md shadow-sm text-sm inline-flex items-center">
              <UploadIcon className="w-5 h-5 mr-2" aria-hidden="true" />
              {photoPreview ? UI_TEXT.PHOTO_CHANGE : UI_TEXT.PHOTO_LABEL}
            </label>
            <input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
          </div>
          <p className="mt-2 text-xs text-gray-500">{UI_TEXT.PHOTO_HELPER}</p>
        </div>

        <div>
          <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700">{UI_TEXT.REPORTER_NAME_LABEL}</label>
          <input
            type="text"
            id="reporterName"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder={UI_TEXT.REPORTER_NAME_PLACEHOLDER}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="reporterContact" className="block text-sm font-medium text-gray-700">{UI_TEXT.REPORTER_CONTACT_LABEL}</label>
          <input
            type="text"
            id="reporterContact"
            value={reporterContact}
            onChange={(e) => setReporterContact(e.target.value)}
            placeholder={UI_TEXT.REPORTER_CONTACT_PLACEHOLDER}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{UI_TEXT.NOTES_LABEL}</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder={UI_TEXT.NOTES_PLACEHOLDER}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {UI_TEXT.SUBMIT_REPORT_VIA_EMAIL_BUTTON}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;