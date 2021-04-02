import React from 'react';
import './styles.scss';

export default function Appointment() {
  return (
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
  );
}
