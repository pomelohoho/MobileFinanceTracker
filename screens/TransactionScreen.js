import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

const TransactionScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([
    { id: '1', category: 'Shopping', description: 'Bought groceries', amount: -120, time: '10:00 AM', type: 'expense' },
    { id: '2', category: 'Subscription', description: 'Disney+ Annual', amount: -80, time: '03:30 PM', type: 'expense' },
    { id: '3', category: 'Food', description: 'Pho', amount: -32, time: '07:30 PM', type: 'expense' },
    { id: '4', category: 'Salary', description: 'Salary for August', amount: 5000, time: '04:30 PM', type: 'income' },
    { id: '5', category: 'Transportation', description: 'Gas', amount: -18, time: '08:30 PM', type: 'expense' },
  ]);

  const categories = ["Shopping", "Subscription", "Food", "Salary", "Transportation", "Entertainment", "Utilities", "Healthcare"];
  
  const categoryColors = {
    Shopping: '#FFA726',
    Subscription: '#42A5F5',
    Food: '#66BB6A',
    Salary: '#AB47BC',
    Transportation: '#FF7043',
    Entertainment: '#29B6F6',
    Utilities: '#26A69A',
    Healthcare: '#EC407A',
  };

  const categoryDescriptions = {
    Shopping: ['Bought groceries', 'New clothes', 'Online shopping', 'Gadgets purchase'],
    Subscription: ['Netflix subscription', 'Spotify premium', 'Disney+ Annual', 'Hulu monthly subscription'],
    Food: ['Ramen lunch', 'Burger and fries', 'Pizza night', 'Grocery food items'],
    Salary: ['Salary for July', 'Freelance project', 'Bonus received'],
    Transportation: ['Tesla charging', 'Gas refill', 'Uber ride', 'Bus fare'],
    Entertainment: ['Movie night', 'Concert ticket', 'Streaming service'],
    Utilities: ['Electricity bill', 'Water bill', 'Internet service', 'Gas bill'],
    Healthcare: ['Doctor visit', 'Medication', 'Dentist appointment', 'Therapy session'],
  };

  const generateRandomTransactions = () => {
    const newTransactions = Array.from({ length: 5 }, () => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const amount = randomCategory === 'Salary' 
        ? parseFloat((Math.random() * 1000).toFixed(2)) 
        : parseFloat((Math.random() * -500).toFixed(2));

      // Pick a random description for the selected category
      const descriptions = categoryDescriptions[randomCategory];
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

      return {
        id: Math.random().toString(),
        category: randomCategory,
        description: randomDescription,
        amount,
        time: '12:00 PM',
        type: amount > 0 ? 'income' : 'expense',
      };
    });

    setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);
  };

  const handleFileUpload = async () => {
    generateRandomTransactions();
    Alert.alert("Button Clicked", "File picker will open");

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
      });

      if (result.type === 'success') {
        console.log('Selected File:', result.uri);
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.transactionIcon, { backgroundColor: categoryColors[item.category] || '#6200ee' }]}>
        <Ionicons name={item.category === 'Salary' ? 'cash' : 'cart'} size={24} color="white" />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <Text style={[styles.amountText, item.type === 'income' ? styles.income : styles.expense]}>
        {item.type === 'income' ? `+ $${item.amount}` : `- $${Math.abs(item.amount)}`}
      </Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('FinancialReport', { transactions })}>
        <Text style={styles.reportButtonText}>See your financial report</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.listHeader}>Today</Text>}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handleFileUpload}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  reportButton: {
    backgroundColor: '#e6e6ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  reportButtonText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#888',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#28a745',
  },
  expense: {
    color: '#ff4500',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 10,
    zIndex: 999,
  },
});
