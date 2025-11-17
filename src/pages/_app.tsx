import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Container } from "@mui/material";
import { store, persistor } from "@/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
          <Component {...pageProps} />
        </Container>
      </PersistGate>
    </Provider>
  );
}
