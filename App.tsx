import React, {useEffect} from 'react';
import MyModule from './specs/NativeMyModule';
import {Provider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  useEffect(() => {
    const deviceName = MyModule.getDeviceName();
    console.log(`ccccc deviceName: ${deviceName}`);
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
