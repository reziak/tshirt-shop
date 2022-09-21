import type { AppProps } from 'next/app'

import { Header } from '../components/Header';
import { Cart } from '../components/Cart';
import { Container } from '../styles/pages/app';

import { globalStyles } from '../styles/global'
import {  wrapper } from '../store';
import { Provider } from 'react-redux';

globalStyles();

function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Component {...props.pageProps} />
        <Cart />
      </Container>
    </Provider>
  )
}

export default MyApp;
