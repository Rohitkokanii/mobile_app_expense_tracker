import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const pendingNavigation = {
  screen: null,
  params: null,
};

export function navigate(screen, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  } else {
    pendingNavigation.screen = screen;
    pendingNavigation.params = params;
  }
}
