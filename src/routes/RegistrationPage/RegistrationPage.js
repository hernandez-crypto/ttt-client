import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = (user) => {
    const { history, toggleLoading } = this.props;
    toggleLoading();
    history.push('/offline');
  };

  render() {
    return (
      <Section className="RegistrationPage">
        <h2>Register</h2>
        <RegistrationForm
          toggleLoading={this.props.toggleLoading}
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
    );
  }
}
