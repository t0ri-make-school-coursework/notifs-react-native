import { createStackNavigator, createAppContainer } from 'react-navigation'
import { fromRight, fromLeft } from 'react-navigation-transitions'

// Import Components
import HomeScreen from './HomeScreen'
import NotifListView from './NotifListView/NotifListView'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Notifications') {
    return fromRight()
  } else if (prevScene
    && prevScene.route.routeName === 'Notifications'
    && nextScene.route.routeName === 'Home') {
    return fromLeft()
  }
}


const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotifListView },
},
{
  transitionConfig: (nav) => handleCustomTransition(nav)
})

const App = createAppContainer(MainNavigator)

export default App
