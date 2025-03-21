import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Extensão do tema para customizar o estilo dos botões
const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontFamily: "'Bai Jamjuree', sans-serif", // Alterando a fonte dos botões
      },
    },
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
