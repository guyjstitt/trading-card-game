import { Component, createEffect, createSignal } from 'solid-js';
import { fieldConfig } from "./field.config"
import styles from './App.module.css';

const App: Component = () => {
  const [fieldState, setFieldState] = createSignal(fieldConfig, { equals: false });
  const [summon, setSummon] = createSignal({ player: "", handZoneId: 0, fieldZoneId: 0, imageUrl: "" }, { equals: false });
  const [deckList, setDeckList] = createSignal([], { equals: false });
  const [cardList, setCardList] = createSignal({}, { equals: false });

  createEffect(async () => {
    const fetchCardList = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes`);
  
    setCardList(await fetchCardList.json());
  });
  
  function createDeckList(cards: any) {
    if (cards && Array.isArray(cards.data) && cards.data.length != -1) {
      setDeckList(cards.data.map((element: any) => {
        return {
          id: element.id,
          name: element.name,
          atk: element.atk,
          def: element.def,
          imageData: element.card_images[0]
        }
      }));
    }
  }

  function drawCards(deckList: any) {
    setFieldState((current) => {
      const playerDeck = deckList;
      let currentDeckListIndex = 0;
  
      return current.map((zone) => {
        if (zone.data?.includes('hand-zone')) {
          // zone.classList.push('single-card');
          if (Array.isArray(playerDeck) && playerDeck.length && playerDeck[currentDeckListIndex]) {
            zone.imageUrl = playerDeck[currentDeckListIndex].imageData.image_url;
            playerDeck.splice(currentDeckListIndex, 1);
            currentDeckListIndex++;
          }
  
          return zone;
        }
  
        return zone;
      });
    });
  }

  function handleSummon({player, handZoneId, fieldZoneId, imageUrl}) {
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
      
      current[fieldZoneIndex].imageUrl = imageUrl;
      current[handZoneIndex].imageUrl = '';

      return current;
    });

    setSummon({ player: "", handZoneId: 0, fieldZoneId: 0, imageUrl: ''});
  }

  createEffect(() => createDeckList(cardList()));
  createEffect(() => drawCards(deckList()))
  createEffect(() => handleSummon(summon()));

  function handleClick(id: number, data: string[] | undefined, imageUrl: any) {
    setSummon((current: any) => {
      const isHandZoneUpdate = data && data.includes('hand-zone');
      const isFieldZoneUpdate = data && data.includes('field-zone');
      const isPlayerOne = data && data.includes('player-one');

      console.log(imageUrl);

      current.player = isPlayerOne ? 'player-one' : 'player-two';

      // temp logic, if the active and clicked player zone do not match, reset state
      if(current.player && !data?.includes(current.player)) {
        return { player: "", handZoneId: 0, fieldZoneId: 0 };
      }

      // if the player has clicked on a field zone before clicking in the handzone, do nothing
      if (isFieldZoneUpdate && !current.handZoneId) {
        return current;
      }

      // if the player clicks in the hand zone and no field zone id exists, update the hand zone id
      if (isHandZoneUpdate && !current.fieldZoneId) {
        current.handZoneId = id;
        current.imageUrl = imageUrl;
        
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

  const image = (props: any) => {
    const imageUrl = props?.imageUrl;
    
    if (!imageUrl) {
      return;
    }

    return <img src={imageUrl}></img>;
  }

  return (
    <div class={styles.App}>
      <div class="wrapper">
        {
          fieldState().map((value, index) => {
            return <div class={value.classList.join(" ")} onClick={() => handleClick(value.id, value.data, value.imageUrl)}>
              {image(value)}
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default App;
