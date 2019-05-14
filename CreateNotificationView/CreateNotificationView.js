import React from 'react'
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Keyboard,
} from 'react-native'
import { Notifications, Permissions, Constants } from 'expo'

export default class CreateNotificationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permission: false,

      // Notification input is set here
      notifTitle: '',
      notifBody: '',
    }

    // Binding Methods to `this`
    this.onSubmit = this.onSubmit.bind(this)
    this.renderSubmitBtn = this.renderSubmitBtn.bind(this)
  }

  async componentDidMount() {
    // Check Permissions for Notifications
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    // If Permissions are granted
    // set `this.state.permission` to `true`
    if (Constants.isDevice && result['status'] === 'granted') {
      this.setState({ permission: true })
    }
  }

  onSubmit() {
    const { notifTitle, notifBody } = this.state
    Keyboard.dismiss()

    // Notifications options object
    const localNotification = {
      title: notifTitle,
      body: notifBody,
    }

    // Set Notification
    Notifications.presentLocalNotificationAsync(localNotification)

    // Save note to AsyncStorage
    this.props.saveNote(localNotification)
    
    // Reset state in TextInputs
    this.clearState()
  }

  clearState() {
    // Clear state text for `TextInput`
    this.setState({
      notifTitle: ''
    })
    this.setState({
      notifBody: ''
    })

    // Clear refs text for `TextInput`s
    this.refs['titleInput'].setNativeProps({text: ''})
    this.refs['bodyInput'].setNativeProps({text: ''})
  }

  renderSubmitBtn() {
    const { permission, notifTitle } = this.state

    // If `this.state.permission` is `true`
    if (permission) {
      // If `this.state.notifTitle` is empty,
      // return an unpressable, grey button and
      // text tip explaining why
      if (notifTitle == '') {
        return (
          <View>
            <Button
              onPress={() => console.log('')} // #TODO: this is empty on purpose, what should go here?
              title="submit"
              color="#aaafb4"
            />
            <Text style={[{paddingTop: 5, color: '#773278'}]}>Enter a title to submit.</Text>
          </View>
          
        )
      }

      return (
        <View>
          <Button
            onPress={this.onSubmit}
            title="submit"
            color="#fa8185"
          />
          {/* #TODO: making the text white instead of removing it because the height is off */}
          <Text style={[{paddingTop: 5, color: '#fff'}]}>Enter a title to submit.</Text>
        </View>
      )
    }

    // If `this.state.permission` is `false`
    return <Text>Please enable your Expo Notifications to create a notif.</Text>
  }
  
  render() {
    return (
      <View style={[styles.container, { width: this.props.specs.width }]}>
        <Text style={styles.heading}>Create a New Notif</Text>
        {/* TextInput to control Notification Title */}
        <TextInput
          ref={'titleInput'}
          onChangeText={(text) => this.setState({ notifTitle: text })}
          placeholder="Title"

          autoFocus={true}
          returnKeyType={'next'}
          onSubmitEditing={() => { this.refs['bodyInput'].focus() }}

          maxLength={55}
          multiline={false}
          style={styles.input}
        ></TextInput>

        {/* TextInput to control Notification Body */}
        <TextInput
          ref={'bodyInput'}
          onChangeText={(text) => this.setState({ notifBody: text })}
          placeholder="Note"
          multiline={true}
          style={styles.input}
        ></TextInput>

        {/* Button to control Notification submission,
        only shows when Notification Permissions are on */}
        {this.renderSubmitBtn()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 200,
  },
  heading: {
    marginBottom: 15,

    fontSize: 32,
    fontWeight: '400',
    color: '#773278',
  },
  input: {
    padding: 5,
    marginBottom: 20,
    borderColor: '#fa8185',
    borderBottomWidth: 1,
    
    fontSize: 24,
  },
})