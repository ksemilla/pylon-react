import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from "stores/auth"
import { CommonProvider } from 'stores/common'

import { ThemeProvider } from "styled-components"
import DefaultTheme from "styles/theme"

ReactDOM.render(
  <React.StrictMode>
		<CommonProvider>
			<AuthProvider>
				<ThemeProvider theme={DefaultTheme}>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</CommonProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
