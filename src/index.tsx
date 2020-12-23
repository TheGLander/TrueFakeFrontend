import React from "react"
import { render } from "react-dom"
import App from "./components/App"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
		width: 100vw;
		height: 100vh;
  }
`
render(
	<>
		<GlobalStyle />
		<App />
	</>,
	document.getElementById("root")
)
