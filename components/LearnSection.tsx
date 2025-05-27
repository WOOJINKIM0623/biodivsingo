import React, { useState, useCallback } from 'react';
import { getSpeciesInfo, generateSpeciesImage } from '../services/geminiService';
import { UI_TEXT } from '../constants';
import SearchIcon from './icons/SearchIcon';
import PhotoIcon from './icons/PhotoIcon'; // For placeholder/error states

const LearnSection: React.FC = () => {
  const [speciesQuery, setSpeciesQuery] = useState('');
  
  // Text info states
  const [info, setInfo] = useState<string | null>(null);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);

  // Image states
  const [speciesImage, setSpeciesImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!speciesQuery.trim()) {
      setInfoError("검색할 교란종 이름을 입력해주세요.");
      setImageError(null); // Clear previous image error
      setInfo(null);
      setSpeciesImage(null);
      return;
    }

    // Reset states for new search
    setIsInfoLoading(true);
    setIsImageLoading(true);
    setInfoError(null);
    setImageError(null);
    setInfo(null);
    setSpeciesImage(null);

    let currentSpeciesQuery = speciesQuery.trim();

    try {
      // Fetch text info
      const textResult = await getSpeciesInfo(currentSpeciesQuery);
      setInfo(textResult);
    } catch (err: any) {
      setInfoError(err.message || UI_TEXT.GEMINI_GENERAL_ERROR);
    } finally {
      setIsInfoLoading(false);
    }

    try {
      // Fetch image
      const imageResult = await generateSpeciesImage(currentSpeciesQuery);
      setSpeciesImage(imageResult);
    } catch (err: any) {
      setImageError(err.message || UI_TEXT.LEARN_IMAGE_ERROR);
    } finally {
      setIsImageLoading(false);
    }
  }, [speciesQuery]);

  const formatTextToParagraphs = (text: string): React.ReactNode => {
    return text.split('\\n').map((paragraph, index) => ( // Gemini might return \\n for newlines
      paragraph.trim() ? <p key={index} className="mb-4 last:mb-0">{paragraph.replace(/\\n/g, '\n')}</p> : null
    ));
  };


  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6">{UI_TEXT.LEARN_SECTION_TITLE}</h2>
      <div className="mb-6">
        <label htmlFor="speciesQuery" className="block text-sm font-medium text-gray-700">{UI_TEXT.LEARN_SPECIES_INPUT_LABEL}</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="speciesQuery"
            value={speciesQuery}
            onChange={(e) => setSpeciesQuery(e.target.value)}
            placeholder={UI_TEXT.LEARN_SPECIES_INPUT_PLACEHOLDER}
            className="flex-1 block w-full min-w-0 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          <button
            onClick={handleSearch}
            disabled={isInfoLoading || isImageLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            aria-busy={isInfoLoading || isImageLoading}
          >
            <SearchIcon className="w-5 h-5 mr-2"/>
            {(isInfoLoading || isImageLoading) ? UI_TEXT.LEARN_LOADING.substring(0,6)+'...' : UI_TEXT.LEARN_SEARCH_BUTTON}
          </button>
        </div>
      </div>

      {(isInfoLoading || isImageLoading) && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-2"></div>
          {isImageLoading && <p className="text-green-600">{UI_TEXT.LEARN_IMAGE_LOADING}</p>}
          {isInfoLoading && !isImageLoading && <p className="text-green-600">{UI_TEXT.LEARN_LOADING}</p>}
        </div>
      )}
      
      {/* Image Display Area */}
      {!isImageLoading && speciesImage && (
        <div className="mb-6 p-4 border border-gray-200 bg-gray-50 rounded-md flex justify-center items-center min-h-[200px]">
          <img 
            src={speciesImage} 
            alt={UI_TEXT.LEARN_SPECIES_IMAGE_ALT.replace('{speciesName}', speciesQuery)} 
            className="max-w-full max-h-96 rounded-md shadow-md object-contain"
          />
        </div>
      )}
       {!isImageLoading && imageError && (
         <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-md flex flex-col justify-center items-center min-h-[200px] text-amber-700" role="status">
            <PhotoIcon className="w-16 h-16 text-amber-400 mb-2" />
            <p className="font-semibold">{UI_TEXT.LEARN_ERROR_PREFIX}</p>
            <p>{imageError}</p>
        </div>
      )}


      {/* Text Info Display Area */}
      {!isInfoLoading && infoError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert">
          <p className="font-bold">{UI_TEXT.LEARN_ERROR_PREFIX}</p>
          <p>{infoError}</p>
        </div>
      )}
      {!isInfoLoading && info && (
        <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md prose prose-sm max-w-none">
          {formatTextToParagraphs(info)}
        </div>
      )}
      
      {/* Initial state or no results (and no errors) */}
      {!isInfoLoading && !isImageLoading && !info && !speciesImage && !infoError && !imageError && speciesQuery && (
         <div className="mt-6 text-center text-gray-500">
           <p>{UI_TEXT.LEARN_NO_RESULT}</p>
         </div>
      )}
    </div>
  );
};

export default LearnSection;
