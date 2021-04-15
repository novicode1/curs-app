import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AppAnswerButton from './ui/AppAnswerButton';

export default function({ status, question, highlight, callback, style }) {
  const [answerIndex, setAnswerIndex] = useState(null);
  const isAnswer = answerIndex !== null;

  console.log({ highlight, question });

  useEffect(() => {
    console.log('create AppQuestion', { answerIndex });
  }, []);

  useEffect(() => {
    if (status === 'next') {
      setAnswerIndex(null);
    }
  }, [status]);

  const onAnswer = index => {
    if (highlight) {
      return;
    }

    if (!isAnswer) {
      setAnswerIndex(index);
      callback(index);
    } else {
      console.log('ANSWER ALREADY SEND!');
    }
  };

  const getType = index => {
    // const isCorrectAnswerIndex = answerIndex === question.correctAnswer;
    let type = 'default';

    if (answerIndex === index) {
      type = 'primary';
    }

    if (highlight && index === answerIndex) {
      type = 'error';
    }

    if (highlight && index === question.correctAnswer) {
      type = 'success';
    }

    return type;
  };

  if (!question.answers) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {question.answers.map((answer, index) => {
        const type = getType(index);
        return (
          <AppAnswerButton
            title={answer}
            key={index}
            type={type}
            onPress={() => onAnswer(index)}
            // disabled={highlight && index !== question.correctAnswer}
          />
        );
      })}
    </>
  );
}
