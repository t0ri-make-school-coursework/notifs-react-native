import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  AsyncStorage,
  Platform
} from 'react-native'

// Import Components
import CreateNotificationView from './CreateNotificationView/CreateNotificationView'
import OldNotificationsBtn from './ViewOldNotifsBtn/ViewOldNotifsBtn'

export default class HomeScreen extends React.Component {
  // Set Title Bar text and style
  static navigationOptions = {
    headerTitle: 'Notifs',
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#827dd2',
    },
    headerStyle: {
      backgroundColor: '#fbfbfb',
    }
  }

  constructor(props) {
    super(props)
  
    this.state = {
      // Device Specs
      specs: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        notchHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        get safeHeight () {
          return this.height - this.notchHeight
        },
      },
      // Notes List of Note Objects
      notes: [],
    }

    // Binding Methods to `this`
    this.saveNoteToState = this.saveNoteToState.bind(this)
  }

  componentDidMount() {
    this.getNotes()
  }

  componentWillUnmount() {
    this.setNotes()
  }
  
  getNotes = async () => {
    // Retrieve Notes from AsyncStorage and send to `setNotesState()`
    AsyncStorage.getItem('notes')
      .then(req => JSON.parse(req))
      .then(json => this.setNotesState(json))
  }

  setNotes = async () => {
    // Get notes from `this.state` and set in AsyncStorage
    const { notes } = this.state
    AsyncStorage.setItem('notes', JSON.stringify(notes))
  }

  setNotesState(notes) {
    // If notes array is empty, clear/set notes as an array
    if (notes == null) {
      console.log('notes before refresh', notes)
      console.log('Notes was null!  Full refresh... 😥')
      notes = []
    }

    // Set `this.state.notes` to `notes`
    this.setState({ notes })
  }

  saveNoteToState(note) {
    // Save `note` object passed from 
    // CreateNotificationView to `this.state.notes` array
    
    // Create new array and update reference in state.
    const notes = this.state.notes.concat(note)
    this.setState({ notes })
    this.setNotes()

    // Better (broken) solution:
      // Spread operator to add `note` to `this.state.notes` array
      // BUG: "invalid attempt to spread non-iterable instance"
      // this.setState(prevState => ({
      //   notes: [...prevState.notes, note]
      // }))
  }

  render() {
    return (
      <View style={[styles.container, {
        height: this.state.specs.safeHeight,
      }]}>

        {/* OldNotificationsBtn controls the view of
        previous notifications sent to the device. */}
        <OldNotificationsBtn
          specs={this.state.specs}
          notes={this.state.notes}
          navigation={this.props.navigation}
        />

        {/* CreateNotificationView controls the input
        and sending of notifications to the device. */}
        <CreateNotificationView
          specs={this.state.specs}
          saveNote={(note) => this.saveNoteToState(note)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#fbfbfb',
  },
})
