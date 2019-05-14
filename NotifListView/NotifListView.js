import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Notifications } from 'expo'

// Import Components
import NotificationCell from './NotifListCell'

export default class NotificationView extends React.Component {
  // Set Title Bar text and style
  static navigationOptions = {
    headerTitle: 'Your Old Notifs',
    headerTitleStyle: {
      color: '#827dd2',
    },
    headerStyle: {
      backgroundColor: '#fbfbfb',
    }
  }
  
  mapNotifs() {
    // Get notes from navigation
    const { notes } = this.props.navigation.state.params
    // Initialize empty `notifications` array
    // Array holds ScrollView cells
    let notifications = []

    // For each note, create a NotificationCell
    // and push it to `notifications` array
    notes.forEach((note, i) => {
      if (note.title !== 'title') { // this doesn't allow my test case to render, if present in `notes`
        notifications.push(<NotificationCell key={i} note={note} onPress={this.onPress} />)
      }
    })

    return notifications
  }

  // #TODO: make DRY
  // Almost identical method in `CreateNotificationView.js` :-(
  onPress(note) {
    // Notifications options objects
    const localNotification = {
      title: note.title,
      body: note.body,
    }

    // Set Notification
    Notifications.presentLocalNotificationAsync(localNotification)
  }

  render() {
    const { width } = this.props.navigation.state.params.specs
    return (
      <ScrollView>
        {/* Text at top explaining interactivity of cells */}
        <View style={[styles.headingContainer, { width: width - 10 }]}>
          <Text style={styles.heading}>Tap on an old notification to send it again.</Text>
        </View>

        {/* ScrollView to hold many `NotificationCell`s */}
        <View>
          {this.mapNotifs()}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',

    marginTop: 10,
    padding: 10,

    borderRadius: 10,
    
    backgroundColor: '#bb9bc6',
  },
  heading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  }
})