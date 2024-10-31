import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const FinancialReport = () => {
  // Mock data for categories
  const [data, setData] = useState([
    { name: "Shopping", amount: 120, color: "#FFCC00", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Subscription", amount: 80, color: "#8A2BE2", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Food", amount: 32, color: "#FF6347", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  ]);

  const totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Financial Report</Text>

      <PieChart
        data={data.map(item => ({
          name: item.name,
          population: item.amount,
          color: item.color,
          legendFontColor: item.legendFontColor,
          legendFontSize: item.legendFontSize
        }))}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 10]}
        absolute
      />

      <Text style={styles.totalAmount}>${totalExpense}</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, styles.activeButton]}>
          <Text style={styles.toggleText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Income</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAmount}>-${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  activeButton: {
    backgroundColor: "#9b59b6",
  },
  toggleText: {
    color: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF4757",
  },
});

export default FinancialReport;
