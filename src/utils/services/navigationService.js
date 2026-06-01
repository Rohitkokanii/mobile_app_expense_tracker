import {NavigationActions} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.navigate(routeName, params);
}

function reset(object) {
  navigator.reset(object);
}

function push(routeName, params) {
  navigator.push(routeName, params);
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function replace() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  push,
  reset,
  replace,
};
