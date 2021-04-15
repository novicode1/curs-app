import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { icons, avatars, animations } from '../resources';
import AppDefaultTemplate from './AppDefaultTemplate';
import AppBlitzWinnerTemplate from './AppBlitzWinnerTemplate';

const presets = {
  blitzNoWinner: {
    title: 'No correct answer',
  },
  blitzWinner: {
    title: 'Well done, {{avatarName}}!',
    blitzWinnerTemplate: true,
  },
  beforeBlitz: {
    title: 'Get ready for blitz',
    timer: 5,
    iconName: 'blitzLighting',
  },
};

// const replacer = (str, obj) => {
//   const regexp = /{{(.*?)}}/g;
//   const matchAll = str.matchAll(regexp);
//   const array = Array.from(matchAll);
//   return array.length ? str.replace(array[0], obj[array[1]]) : str;
// };

export default function({ options = {}, set = () => {}, settings }) {
  presets.beforeBlitz.timer = settings.beforeBlitzTimeout - 1;

  let { timer, title, iconName, avatarName, blitzWinnerTemplate } = {
    ...presets[options.preset || null],
    ...options,
  };

  if (options.preset === 'blitzWinner') {
    title = title.replace(/{{(.*?)}}/g, avatarName);
  }

  const iconSource = iconName ? icons[iconName] : null;
  const avatarSource = avatarName ? avatars[avatarName] : null;
  const avatarAnimationSource = avatarName ? animations[avatarName] : null;

  const [timerId, setTimerId] = useState(null);
  const [count, setCount] = useState(timer);
  // const [freeze, setFreeze] = useState(false);
  const visible = !!options.preset;

  useEffect(() => {
    if (timer) {
      setCount(timer);
    }
  }, [timer]);

  useEffect(() => {
    if (timer) {
      // setFreeze(true);
      const t = setTimeout(() => {
        if (count > 0) {
          return setCount(count - 1);
        }

        // setFreeze(false);
        closeHandler();
      }, 1000);
      setTimerId(t);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const closeHandler = () => {
    clearInterval(timerId);
    set({ preset: null });
  };

  return (
    <Overlay
      // onBackdropPress={() => !freeze && closeHandler()}
      isVisible={visible}
      overlayStyle={styles.overlayStyle}>
      {blitzWinnerTemplate ? (
        <AppBlitzWinnerTemplate
          title={title}
          avatarSource={avatarAnimationSource}
        />
      ) : (
        <AppDefaultTemplate
          timerCount={count}
          title={title}
          avatarSource={avatarSource}
          iconSource={iconSource}
        />
      )}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
});
