import React from 'react';
import { UI_TEXT, EXAMPLE_SPECIES_LIST } from '../constants';
import { ExampleSpecies } from '../types';

const ExampleSpeciesCard: React.FC<{ species: ExampleSpecies }> = ({ species }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img 
        src={species.imageUrl} 
        alt={UI_TEXT.EXAMPLE_SPECIES_CARD_ALT.replace('{speciesName}', species.name)} 
        className="w-full h-48 object-cover" 
        loading="lazy"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-green-800">{species.name}</h3>
        {species.scientificName && (
          <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
        )}
      </div>
    </div>
  );
};

const ExampleSpeciesSection: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">{UI_TEXT.EXAMPLES_SECTION_TITLE}</h2>
      {EXAMPLE_SPECIES_LIST.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {EXAMPLE_SPECIES_LIST.map(species => (
            <ExampleSpeciesCard key={species.name} species={species} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{UI_TEXT.NO_REPORTS} (교란종 예시가 아직 없습니다.)</p> // Using NO_REPORTS as a generic placeholder
      )}
    </div>
  );
};

export default ExampleSpeciesSection;
