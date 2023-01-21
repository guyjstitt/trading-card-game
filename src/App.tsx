import { Component, createEffect, createSignal } from 'solid-js';
import { fieldConfig } from "./field.config"
import styles from './App.module.css';

const App: Component = () => {
  const [fieldState, setFieldState] = createSignal(fieldConfig, { equals: false });
  const [summon, setSummon] = createSignal({ player: "", handZoneId: 0, fieldZoneId: 0 }, { equals: false });

  function handleClick(id: number, data: string[] | undefined) {
    console.log('data', data)
    setSummon((current) => {
      console.log('set summon', data);
      const isHandZoneUpdate = data && data.includes('hand-zone');
      const isFieldZoneUpdate = data && data.includes('field-zone');
      const isPlayerOne = data && data.includes('player-one');

      console.log({
        isHandZoneUpdate, isFieldZoneUpdate, isPlayerOne
      })

      current.player = isPlayerOne ? 'player-one' : 'player-two';

      // temp logic, if the active and clicked player zone do not match, reset state
      if(current.player && !data?.includes(current.player)) {
        return { player: "", handZoneId: 0, fieldZoneId: 0 };
      }

      // if the player has clicked on a field zone before clicking in the handzone, do nothing
      if ((isFieldZoneUpdate && !current.handZoneId)) {
        return current;
      }

      // if the player clicks in the hand zone and no field zone id exists, update the hand zone id
      if (isHandZoneUpdate && !current.fieldZoneId) {
        current.handZoneId = id;
        
        return current;
      }

      // if the player has clicked in the hand zone and clicked in the field zone, update the field zone id
      if (isFieldZoneUpdate && current.handZoneId) {
        current.fieldZoneId = id;

        return current;
      }

      return current;
    });
  }

  function handleSummon({player, handZoneId, fieldZoneId}) {
    console.log('effect');
    console.log({
      player, handZoneId, fieldZoneId
    });

    if (!player || !handZoneId || !fieldZoneId) {
      return;
    }

    setFieldState((current) => {
      const fieldZoneIndex = current.findIndex((element) => element.id === fieldZoneId);
      const handZoneIndex = current.findIndex((element) => element.id === handZoneId);
      
      current[fieldZoneIndex].classList.push('single-card');

      const classIndex = current[handZoneIndex].classList.indexOf('single-card');

      current[handZoneIndex].classList.splice(classIndex, 1);

      return current;
    });

    // reset summon data
    setSummon({ player: "", handZoneId: 0, fieldZoneId: 0 });
  }

  createEffect(() => handleSummon(summon()));

  // temp draw phase
  setFieldState((current) => {
    return current.map((zone) => {
      if (zone.data?.includes('hand-zone')) {
        zone.classList.push('single-card');

        return zone;
      }

      return zone;
    });
  })

  return (
    <div class={styles.App}>
      <div class="wrapper">
        {
          fieldState().map((value, index) => {
            return <div class={value.classList.join(" ")} onClick={() =>handleClick(value.id, value.data)}></div>;
          })
        }
      </div>
    </div>
  );
};

export default App;
