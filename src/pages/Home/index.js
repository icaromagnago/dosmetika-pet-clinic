import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';
import image from '../../assets/dog.png';

export default function Home() {
  const history = useHistory();

  function handleRoute() {
    history.push('/appointment');
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <span>Porque são nossos melhores amigos</span>
          <h1>Atendimento veterinário de primeiro nível</h1>
          <p>
            Reserva uma hora para que o seu pet seja atendido por um de nossos
            profissionais
          </p>
          <button type="button" onClick={handleRoute}>
            RESERVE SEU HORÁRIO
          </button>
        </div>
        <div className="image">
          <img src={image} alt="dog" />
        </div>
        <div className="services">
          <div>
            <span>EMERGÊNCIAS</span>
            <p>Estamos quando você mais precisa de nós</p>
          </div>

          <div>
            <span>LABORATÓRIO</span>
            <p>Realizamos todos os tipos de exames</p>
          </div>

          <div>
            <span>HOSPITAL</span>
            <p>Quando seu pet pede cuidados únicos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
