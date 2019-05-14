import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

export default class ViewOldNotifsBtn extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    const { notes, specs } = this.props
    // Whole <View> is touchable to navigate to NotifListView
    return (
      <TouchableOpacity
        style={[
          styles.container, 
          { width: this.props.specs.width }]}
        onPress={() => navigate('Notifications', { notes, specs })}
        >
        <Text style={styles.text}>View My Old Notifs →</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    backgroundColor: '#bb9bc6',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  }
})