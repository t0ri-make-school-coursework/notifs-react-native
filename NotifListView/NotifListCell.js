import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const NotificationCell = ({ note, onPress }) => {
  // Each note becomes a NotificationCell
  // Each NotificationCell is a touchable cell
  // that resends the notification visible
  // within the cell onPress
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(note)}
    >
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.body}>{note.body}</Text>
    </TouchableOpacity>
  )
}

export default NotificationCell

const styles = StyleSheet.create({
  container: {
    margin: 10,

    borderBottomWidth: .5,
    borderBottomColor: '#bb9bc6',
  },
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 18,
  },
})