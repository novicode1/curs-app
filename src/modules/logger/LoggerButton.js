import React, { useState } from 'react';
import { Button } from 'react-native';
import Logger from './Logger';

export default ({ data }) => {
  const [logData, setLogData] = useState(null);
  const getLogInfo = () => setLogData(data);

  return (
    <>
      <Button title="logs" onPress={getLogInfo} type="clear" />
      <Logger data={logData} setter={setLogData} />
    </>
  );
};
