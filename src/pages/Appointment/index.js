/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { GiSittingDog, GiCat, GiHummingbird, GiSquirrel } from 'react-icons/gi';

import { FiCheck } from 'react-icons/fi';

import './styles.scss';
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

export default function Appointment() {
  const [petOptions, setPetOptions] = useState([
    { id: 'dog', text: 'Cachorro', checked: false },
    { id: 'cat', text: 'Gato', checked: false },
    { id: 'bird', text: 'Ave', checked: false },
    { id: 'rodent', text: 'Roedor', checked: false },
  ]);

  function handlePetSelection(optionId) {
    const options = petOptions.map((po) => ({ ...po, checked: false }));
    options.find((po) => po.id === optionId).checked = true;

    setPetOptions(options);
  }

  return (
    <>
      <section className="steps">
        <div className="container">
          <h2>Assitente de reserva</h2>
          <p>Preço da consulta: R$ 150</p>

          <nav>
            <ul>
              <li className="active">
                <div />
                <span>ESPECIALIDADE</span>
              </li>
              <li>
                <div />
                <span>PROFISSIONAL</span>
              </li>
              <li>
                <div />
                <span>DATE E HORA</span>
              </li>
              <li>
                <div />
                <span>DADOS</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="form-area">
        <div className="container">
          <h3>Tipo do pet</h3>
          <p>Selecione o tipo do pet para o atendimento</p>

          <div className="petOptions">
            {petOptions.map((option) => {
              const { icon: Icon } = petIcons[option.id];
              return (
                <button
                  key={option.id}
                  type="button"
                  className={option.checked ? 'selected' : ''}
                  onClick={() => handlePetSelection(option.id)}
                >
                  {option.checked && (
                    <FiCheck
                      size={20}
                      className="check"
                      color={colors.colorPrimary}
                    />
                  )}
                  <Icon size={40} />
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
