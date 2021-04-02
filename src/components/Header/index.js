import React from 'react';
import { Phone, Mail } from 'react-feather';

import logo from '../../assets/logo.svg';

import './styles.scss';
import colors from '../../styles/colors.module.scss';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="logo" />
      <div className="header__infos">
        <span>
          <Mail size={24} color={colors.colorPrimary} />
          <p>info@petclinic.com.br</p>
        </span>
        <span>
          <Phone size={24} color={colors.colorPrimary} />
          <p>info@petclinic.com.br</p>
        </span>
      </div>
    </header>
  );
}
