import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemPress = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItems.includes(item.id) && styles.selectedItem,
      ]}
      onPress={() => handleItemPress(item.id)}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleItemPress(item.id)}
          style={styles.checkIconContainer}
        >
          <Ionicons
            name={selectedItems.includes(item.id) ? "checkmark-circle" : "checkmark-circle-outline"}
            size={24}
            color={selectedItems.includes(item.id) ? "#007AFF" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Render your items here */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    // Add your item styles here
  },
  selectedItem: {
    // Add your selected item styles here
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  itemLeft: {
    flex: 1,
  },
  checkIconContainer: {
    padding: 8,
  },
  itemText: {
    // Add your item text styles here
  },
  itemDescription: {
    // Add your item description styles here
  },
});

export default HomeScreen; 