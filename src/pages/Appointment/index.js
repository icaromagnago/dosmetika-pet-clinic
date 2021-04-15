/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FiCheck } from 'react-icons/fi';

import InputMask from 'react-input-mask';
import RadioButton from '../../components/RadioButton';
import Checkbox from '../../components/Checkbox';
import PetSelection from './PetSelection';

import './styles.scss';
import colors from '../../styles/colors.module.scss';

import juan from '../../assets/juan.png';
import maria from '../../assets/maria.png';
import alberto from '../../assets/alberto.png';
import ana from '../../assets/ana.png';

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

  const [selectedPet, setSelectedPet] = useState({});
  const [selectedVet, setSelectedVet] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  const [vaccine, setVaccine] = useState(false);

  const [errors, setErrors] = useState({});

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

  function handleFocus(e) {
    const { name } = e.target;

    const { [name]: removed, ...rest } = errors;

    setErrors({ ...rest });
  }

  function handleGenderChange(e) {
    setPetGender(e.target.value);
    handleFocus(e);
  }

  function validate() {
    const validationErrors = {};
    if (petName.trim() === '') {
      validationErrors.petName = 'O nome é obrigatório';
    }

    if (petBreed === '') {
      validationErrors.petBreed = 'A raça é obrigatória';
    }

    if (petGender === '') {
      validationErrors.petGender = 'O sexo é obrigatório';
    }

    if (petAge === '') {
      validationErrors.petAge = 'A idade é obrigatória';
    }

    if (ownerName === '') {
      validationErrors.ownerName = 'O nome é obrigatório';
    }

    if (ownerEmail === '') {
      validationErrors.ownerEmail = 'O email é obrigatório';
    }

    if (ownerPhone === '') {
      validationErrors.ownerPhone = 'O telefone é obrigatório';
    }

    return validationErrors;
  }

  function handleNext() {
    const index = steps.findIndex((step) => step.key === activeStep.key);

    if (index === steps.length - 1) {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length === 0) {
        history.push('/success');
      }

      setErrors({ ...validationErrors });
    } else {
      steps.find((step) => step.key === activeStep.key).isDone = true;

      setActiveStep(steps[index + 1]);
      setTransictionClass('slide-left');
    }
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
            <PetSelection
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
              transitionClass={transitionClass}
              handleBack={handleBack}
              handleNext={handleNext}
            />
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
              <div className="footer">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleBack}
                >
                  VOLTAR
                </button>
                <button
                  type="button"
                  disabled={Object.keys(selectedVet).length === 0}
                  className="btn primary"
                  onClick={handleNext}
                >
                  AVANÇAR
                </button>
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
                    key={day.date}
                    className={`day-box ${
                      selectedDate === day.date ? 'selected' : ''
                    }`}
                  >
                    <strong>{day.dateFormatted}</strong>
                    <div className="times">
                      {day.times.map((t) => (
                        <button
                          key={t}
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

              <div className="footer">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleBack}
                >
                  VOLTAR
                </button>
                <button
                  type="button"
                  disabled={selectedTime === ''}
                  className="btn primary"
                  onClick={handleNext}
                >
                  AVANÇAR
                </button>
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
                        <input
                          name="petName"
                          type="text"
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          onFocus={handleFocus}
                        />
                        {errors.petName && (
                          <span className="error">{errors.petName}</span>
                        )}
                      </label>
                      <label htmlFor="breed">
                        Raça:
                        <select
                          name="petBreed"
                          value={petBreed}
                          onFocus={handleFocus}
                          onChange={(e) => setPetBreed(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="Akita">Akita</option>
                          <option value="Beagle">Beagle</option>
                          <option value="Border Collie">Border Collie</option>
                          <option value="Cane Corso">Cane Corso</option>
                          <option value="Golden Retriever">
                            Golden Retriever
                          </option>
                        </select>
                        {errors.petBreed && (
                          <span className="error">{errors.petBreed}</span>
                        )}
                      </label>
                    </div>
                    <div className="inner-info">
                      <div>
                        Sexo:
                        <div className="radio-group">
                          <RadioButton
                            id="genderMale"
                            name="petGender"
                            changed={handleGenderChange}
                            onFocus={handleFocus}
                            label="Macho"
                            value="male"
                            isSelected={petGender === 'male'}
                          />
                          <RadioButton
                            id="genderFemale"
                            name="petGender"
                            changed={handleGenderChange}
                            onFocus={handleFocus}
                            label="Fêmea"
                            value="female"
                            isSelected={petGender === 'female'}
                          />
                        </div>
                        {errors.petGender && (
                          <span className="error">{errors.petGender}</span>
                        )}
                      </div>
                      <label htmlFor="petAge">
                        Idade:
                        <input
                          name="petAge"
                          type="number"
                          min={1}
                          value={petAge}
                          onFocus={handleFocus}
                          onChange={(e) => setPetAge(e.target.value)}
                        />
                        {errors.petAge && (
                          <span className="error">{errors.petAge}</span>
                        )}
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
                        <input
                          name="ownerName"
                          type="text"
                          value={ownerName}
                          required
                          onChange={(e) => setOwnerName(e.target.value)}
                          onFocus={handleFocus}
                        />
                        {errors.ownerName && (
                          <span className="error">{errors.ownerName}</span>
                        )}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="email">
                        Email:
                        <input
                          name="ownerEmail"
                          type="email"
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          onFocus={handleFocus}
                        />
                        {errors.ownerEmail && (
                          <span className="error">{errors.ownerEmail}</span>
                        )}
                      </label>

                      <label htmlFor="phone">
                        Telefone:
                        <InputMask
                          name="ownerPhone"
                          mask="(99) 99999-9999"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          onFocus={handleFocus}
                        />
                        {errors.ownerPhone && (
                          <span className="error">{errors.ownerPhone}</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <Checkbox
                    id="vaccine"
                    label="Todas as vacinas em dia."
                    value={vaccine}
                    changed={(e) => setVaccine(e.target.value)}
                  />
                </div>
              </div>

              <div className="footer">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleBack}
                >
                  VOLTAR
                </button>
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleNext}
                >
                  AVANÇAR
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
