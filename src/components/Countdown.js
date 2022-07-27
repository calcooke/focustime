import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontsizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

//function to convert minuts to milliseconds. Takes an amount in minutes, times a thousand, times 60
const minutesToMillis = (min) => min * 1000 * 60;
//function to format . Take the amount of time left, if its smaller than 10, ad a 0 in front of the
//seconds so we get a 00:09 instead of a 00.9.
const formatTime = (time) => (time < 10 ? `0${time}` : time);

//On Prgress tells the parent compoent to let it know where it's at in the countdown cycle
//onEnd is for the parent to tell this what to do when the countdown ends.
export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  //useRef is a hook from REact. useRef doesn't cause a re-render.
  // a Ref only returns you one object, in which you can set the state variable, not get the state variable.
  //we're using this to track the value of set interval in case we want to puause or cleaer the timeer,
  //or if our compenent is removed from the screen.
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  const reset = () => setMillis(minutesToMillis(minutes));

  const countDown = () => {

    //Getting miliseconds using a callback function to ensure the milisecond is the previous one
    //As it;s constantly counting down in memory
    setMillis((time) => {
      //If time is 0, end the contdown and return 0.
      if (time === 0) {
        clearInterval(interval.current);
        //Pass the result of the reset function to onEnd, which in turn passes it up to Timer.js
        //Seeing as the onEnd function is being passed in as a paramater
        onEnd(reset);
        return time;
      }
      //if it isnt, take a second off the milliseconds and return that
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  //This gives us a % umber that tracks down to 0
  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [millis]);

  //Pass isPaused as the second arguement to useEffect.
  useEffect(() => {
    //If it is paused, clear the interval (if it was given a value, no point clearing null)
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

  //Call the countdown function every second.
    interval.current = setInterval(countDown, 1000);

  //If we remove it from the screen, clear interval completely for memorry sakes.
    return () => clearInterval(interval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  //millisiecons divide by a thousand, modulus 60 gives us minutes
  const minute = Math.floor(millis / 1000 / 60) % 60;
  //milliseconds divided by a thousandsmodules 60gives us seconds
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontsizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});