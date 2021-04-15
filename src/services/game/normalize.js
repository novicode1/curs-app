export const normalizeData = (game, userId) => {
  // console.log('normalizeData', { game, userId });
  const { questions } = game;

  let { status } = game;
  const { messageType, state, isEnded } = game;
  const question = {};

  if (questions) {
    const currentQuestion = getQuestion(questions[game.questionIndex]);

    Object.assign(question, {
      ...currentQuestion,
      index: game.questionIndex,
    });

    if (game.questionIndex >= questions.length) {
      status = 'game-over';
    }
  }

  const questionPack = {
    title: game.questionPackTitle,
    // id: game.questionPackId,
  };

  const isHost = game.hostId === userId;
  const id = game._id;
  const players = game.players
    .map(player => getPlayer({ player, hostId: game.hostId, userId }))
    .sort((a, b) => b.points - a.points);
  const player = players.find(p => p.id === userId);

  return {
    question,
    questionPack,
    isHost,
    id,
    player,
    players,
    status,
    messageType,
    state,
    isEnded,
  };
};

const getPlayer = ({ player, hostId, userId }) => {
  const { id, answers, avatar } = player;
  const isHost = id === hostId;
  const isCurrent = id === userId;

  const points = answers.reduce((acc, current) => {
    const isCorrect = current ? Number(current.isCorrect) : 0;
    return acc + isCorrect;
  }, 0);

  return { id, answers, avatar, points, isHost, isCurrent };
};

const getQuestion = question => {
  if (!question) {
    return {};
  }

  const {
    answers,
    correctAnswer,
    id,
    index,
    isBlitz,
    questionTitle,
  } = question;

  return { answers, correctAnswer, id, index, isBlitz, questionTitle };
};
