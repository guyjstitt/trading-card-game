import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from "@suid/material";

const App: Component = () => {
  return (
    <div class={styles.App}>
    <div class="wrapper">
      <div class="one">One</div>
      <div class="two">Two</div>
      <div class="three">Three</div>
      <div class="four">Four</div>
      <div class="five">Five</div>
      <div class="six">Six</div>
      <div class="seven">Seven</div>
      <div class="one">One</div>
      <div class="two">Two</div>
      <div class="three">Three</div>
      <div class="four">Four</div>
      <div class="five">Five</div>
      <div class="six">Six</div>
      <div class="seven">Seven</div>
      <div class="one">One</div>
      <div class="two">Two</div>
      <div class="three">Three</div>
      <div class="four">Four</div>
      <div class="five">Five</div>
      <div class="six">Six</div>
      <div class="seven">Graveyard</div>
      <div class="player-one-extra-deck">Extra Deck</div>
      <div class="player-one-card-one single-card">Card One</div>
      <div class="player-one-card-two single-card">Card Two</div>
      <div class="player-one-card-three single-card">Card Three</div>
      <div class="player-one-card-four single-card">Card Four</div>
      <div class="player-one-card-five single-card">Card Five</div>
      <div class="player-one-card-deck">Deck</div>
    </div>
      {/* <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
      <Button variant="contained">Hello world</Button> */}
    </div>
  );
};

export default App;
