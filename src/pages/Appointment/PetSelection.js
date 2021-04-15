/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { GiSittingDog, GiCat, GiHummingbird, GiSquirrel } from 'react-icons/gi';
import { FiCheck } from 'react-icons/fi';

import colors from '../../styles/colors.module.scss';

const petIcons = {
  dog: {
    icon: GiSittingDog,
  },
  cat: {
    icon: GiCat,
  },
  bird: {
    icon: GiHummingbird,
  },
  rodent: {
    icon: GiSquirrel,
  },
};

export default function PetSelection({
  selectedPet,
  setSelectedPet,
  transitionClass,
  handleBack,
  handleNext,
}) {
  const [petOptions, setPetOptions] = useState([
    { id: 'dog', text: 'Cachorro' },
    { id: 'cat', text: 'Gato' },
    { id: 'bird', text: 'Ave' },
    { id: 'rodent', text: 'Roedor' },
  ]);

  return (
    <div className={`step-content ${transitionClass}`}>
      <h3>Tipo do pet</h3>
      <p>Selecione o tipo do pet para o atendimento</p>

      <div className="petOptions">
        {petOptions.map((pet) => {
          const { icon: Icon } = petIcons[pet.id];
          return (
            <button
              key={pet.id}
              type="button"
              className={selectedPet.id === pet.id ? 'selected' : ''}
              onClick={() => setSelectedPet(pet)}
            >
              {selectedPet.id === pet.id && (
                <FiCheck
                  size={20}
                  className="check"
                  color={colors.colorPrimary}
                />
              )}
              <Icon size={40} />
              <span>{pet.text}</span>
            </button>
          );
        })}
      </div>

      <div className="footer">
        <button type="button" className="btn secondary" onClick={handleBack}>
          VOLTAR
        </button>
        <button
          type="button"
          disabled={Object.keys(selectedPet).length === 0}
          className="btn primary"
          onClick={handleNext}
        >
          AVANÇAR
        </button>
      </div>
    </div>
  );
}
