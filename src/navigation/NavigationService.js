import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const canGoBack = () =>
  navigationRef.isReady() && navigationRef.canGoBack();

export const goBack = () => {
  if (canGoBack()) {
    navigationRef.goBack();
  }
};

export const resetRoute = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name, params}],
    });
  }
};
