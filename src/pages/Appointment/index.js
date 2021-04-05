/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GiSittingDog, GiCat, GiHummingbird, GiSquirrel } from 'react-icons/gi';
import { FiCheck } from 'react-icons/fi';

import './styles.scss';
import colors from '../../styles/colors.module.scss';

import juan from '../../assets/juan.png';
import maria from '../../assets/maria.png';
import alberto from '../../assets/alberto.png';
import ana from '../../assets/ana.png';

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
  const history = useHistory();

  const [steps, setSteps] = useState([
    { key: 'specialty', label: 'ESPECIALIDADE', isDone: false },
    { key: 'professional', label: 'PROFISSIONAL', isDone: false },
    { key: 'date', label: 'DATE E HORA', isDone: false },
    { key: 'information', label: 'DADOS', isDone: false },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const [petOptions, setPetOptions] = useState([
    { id: 'dog', text: 'Cachorro' },
    { id: 'cat', text: 'Gato' },
    { id: 'bird', text: 'Ave' },
    { id: 'rodent', text: 'Roedor' },
  ]);

  const [selectedPet, setSelectedPet] = useState({});

  const [vets, setVets] = useState([
    {
      id: '1',
      name: 'Dr. Juan Pérez',
      specialty: 'Médico Veterinário',
      university: 'U. de Chile',
      pic: juan,
    },
    {
      id: '2',
      name: 'Dr. Maria López',
      specialty: 'Médico Veterinário',
      university: 'U. de Chile',
      pic: maria,
    },
    {
      id: '3',
      name: 'Dr. Alberto Ruiz',
      specialty: 'Médico Veterinário',
      university: 'U. de Chile',
      pic: alberto,
    },
    {
      id: '4',
      name: 'Dr. Ana González',
      specialty: 'Médico Veterinário',
      university: 'U. de Chile',
      pic: ana,
    },
  ]);

  const [selectedVet, setSelectedVet] = useState({});

  const [availableDates, setAvailableDates] = useState([
    { date: '06/04/2021', times: ['09:00', '10:00', '14:00', '17:30'] },
    { date: '07/04/2021', times: ['09:30', '10:30', '14:00', '17:30'] },
    { date: '08/04/2021', times: ['08:30', '11:30', '15:00', '17:00'] },
    { date: '09/04/2021', times: ['08:00', '11:00', '12:00', '15:00'] },
    {
      date: '10/04/2021',
      times: ['09:00', '11:00', '13:00', '15:00', '16:00', '17:00'],
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  function handleDateSelection(date, time) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

  function handleNext() {
    const index = steps.findIndex((step) => step.key === activeStep.key);

    if (index === steps.length - 1) {
      return;
    }

    steps.find((step) => step.key === activeStep.key).isDone = true;

    setActiveStep(steps[index + 1]);
  }

  function handleBack() {
    const index = steps.findIndex((step) => step.key === activeStep.key);

    if (index === 0) {
      history.push('/');
    }

    steps.find((step) => step.key === activeStep.key).isDone = false;

    setActiveStep(steps[index - 1]);
  }

  return (
    <>
      <section className="steps">
        <div className="container">
          <h2>Assitente de reserva</h2>
          <p>Preço da consulta: R$ 150</p>

          <nav>
            <ul>
              {steps.map((step) => (
                <li
                  key={step.key}
                  className={`${step.key === activeStep.key ? 'active' : ''} ${
                    step.isDone ? 'done' : ''
                  }`}
                >
                  <div />
                  <span>{step.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="form-area">
        <div className="container">
          {activeStep.key === steps[0].key && (
            <div className="step-content">
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
            </div>
          )}

          {activeStep.key === steps[1].key && (
            <div className="step-content">
              <h3>Médico veterinário</h3>
              <p>Selecione o médico veterinário para atender o seu pet</p>

              <div className="vets">
                {vets.map((vet) => (
                  <button
                    key={vet.id}
                    type="button"
                    className={vet.id === selectedVet.id ? 'selected' : ''}
                    onClick={() => setSelectedVet(vet)}
                  >
                    {vet.id === selectedVet.id && (
                      <FiCheck
                        size={20}
                        className="check"
                        color={colors.colorPrimary}
                      />
                    )}
                    <img src={vet.pic} alt="vet profile" />
                    <div className="vet-bio">
                      <strong>{vet.name}</strong>
                      <span>{vet.specialty}</span>
                      <span>{vet.university}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep.key === steps[2].key && (
            <div className="step-content">
              <h3>Horário de atendimento</h3>
              <p>Selecione o dia e o horário para a consulta</p>

              <div className="time-select">
                {availableDates.map((day) => (
                  <div
                    className={`day-box ${
                      selectedDate === day.date ? 'selected' : ''
                    }`}
                  >
                    <strong>{day.date}</strong>
                    <div className="times">
                      {day.times.map((t) => (
                        <button
                          type="button"
                          className={
                            selectedDate === day.date && selectedTime === t
                              ? 'selected'
                              : ''
                          }
                          onClick={() => handleDateSelection(day.date, t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="footer">
            <button
              type="button"
              className="btn secondary"
              onClick={handleBack}
            >
              VOLTAR
            </button>
            <button type="button" className="btn primary" onClick={handleNext}>
              AVANÇAR
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
