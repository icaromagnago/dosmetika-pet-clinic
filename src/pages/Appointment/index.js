/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

  const [transitionClass, setTransictionClass] = useState('slide-left');

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
    { date: '2021-04-06', times: ['09:00', '10:00', '14:00', '17:30'] },
    { date: '2021-04-07', times: ['09:30', '10:30', '14:00', '17:30'] },
    { date: '2021-04-08', times: ['08:30', '11:30', '15:00', '17:00'] },
    { date: '2021-04-09', times: ['08:00', '11:00', '12:00', '15:00'] },
    {
      date: '2021-04-10',
      times: ['09:00', '11:00', '13:00', '15:00', '16:00', '17:00'],
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const dates = availableDates.map((d) => {
      const date = new Date(d.date);
      return {
        ...d,
        dateFormatted: format(date, "EEE'.' dd 'de' MMMM", { locale: pt }),
      };
    });

    setAvailableDates(dates);
  }, []);

  function handleDateSelection(date, time) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

  function handleNext() {
    const index = steps.findIndex((step) => step.key === activeStep.key);

    if (index === steps.length - 1) {
      history.push('/success');
    }

    steps.find((step) => step.key === activeStep.key).isDone = true;

    setActiveStep(steps[index + 1]);
    setTransictionClass('slide-left');
  }

  function handleBack() {
    const index = steps.findIndex((step) => step.key === activeStep.key);

    if (index === 0) {
      history.push('/');
    }

    steps.find((step) => step.key === activeStep.key).isDone = false;

    setActiveStep(steps[index - 1]);
    setTransictionClass('slide-right');
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

      <form className="form-area">
        <div className="container">
          {activeStep.key === steps[0].key && (
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
            </div>
          )}

          {activeStep.key === steps[1].key && (
            <div className={`step-content ${transitionClass}`}>
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
            <div className={`step-content ${transitionClass}`}>
              <h3>Horário de atendimento</h3>
              <p>Selecione o dia e o horário para a consulta</p>

              <div className="time-select">
                {availableDates.map((day) => (
                  <div
                    className={`day-box ${
                      selectedDate === day.date ? 'selected' : ''
                    }`}
                  >
                    <strong>{day.dateFormatted}</strong>
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

          {activeStep.key === steps[3].key && (
            <div className={`step-content ${transitionClass}`}>
              <div className="information">
                <div>
                  <h3>Dados do seu pet</h3>
                  <div className="pet-information">
                    <div className="inner-info">
                      <label htmlFor="name">
                        Nome:
                        <input id="name" type="text" />
                      </label>
                      <label htmlFor="breed">
                        Raça:
                        <select>
                          <option value="">Selecione...</option>
                          <option value="Akita">Akita</option>
                          <option value="Beagle">Beagle</option>
                          <option value="Border Collie">Border Collie</option>
                          <option value="Cane Corso">Cane Corso</option>
                          <option value="Golden Retriever">
                            Golden Retriever
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="inner-info">
                      <label htmlFor="gender">
                        Sexo:
                        <span className="gender-radio">
                          <span>
                            <input
                              type="radio"
                              name="gender"
                              id="gender"
                              value="M"
                            />
                            Macho
                          </span>
                          <span>
                            <input
                              type="radio"
                              name="gender"
                              id="gender"
                              value="F"
                            />
                            Fêmea
                          </span>
                        </span>
                      </label>

                      <label htmlFor="age">
                        Idade:
                        <input id="age" type="text" />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Dados do tutor</h3>
                  <div className="owner-information">
                    <div>
                      <label htmlFor="full-name">
                        Nome Completo:
                        <input id="full-name" type="text" />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="email">
                        Email:
                        <input id="email" type="text" />
                      </label>

                      <label htmlFor="phone">
                        Telefone:
                        <input id="phone" type="text" />
                      </label>
                    </div>
                  </div>
                </div>
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
      </form>
    </>
  );
}
