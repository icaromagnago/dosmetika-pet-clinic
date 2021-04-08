import React from 'react';
import { Link } from 'react-router-dom';

import { FiCheck } from 'react-icons/fi';

import './styles.scss';

export default function Success() {
  return (
    <div className="success">
      <div className="container">
        <h2>Reserva concluída</h2>

        <div className="box-success">
          <span className="icon">
            <FiCheck size={20} />
          </span>
          <p>
            A hora de atendimento para <strong>El Chaska</strong> está reservada
            para o próximo domingo <strong>21 de julho</strong> às{' '}
            <strong>14:00 Hrs.</strong> com o <strong>Dr. Juan Pérez.</strong>
          </p>
          <p>
            Lembre-se de chegar com 15 minutos de antecedência do horário de
            antendimento.
          </p>
          <p>
            O custo da consulta é de R$ 150, porém o valor pode variar se for
            necessário procedimentos adicionais.
          </p>
          <p>
            Necessita de indicações para chegar à clínica? Olhe nosso{' '}
            <a
              href="https://goo.gl/maps/K3NWZohiyqzsMrkh9"
              target="_blank"
              rel="noreferrer"
            >
              mapa no Google Maps.
            </a>
          </p>
        </div>

        <Link to="/" className="link-back">
          Voltar à tela Inicial
        </Link>
      </div>
    </div>
  );
}
