import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const FinancialReportScreen = ({ route }) => {
  const { transactions } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Filter out the Salary category
    const filteredTransactions = transactions.filter(transaction => transaction.category !== 'Salary');

    const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = { name: category, amount: 0, color: getCategoryColor(category) };
      }
      acc[category].amount += Math.abs(transaction.amount);
      return acc;
    }, {});

    const chartData = Object.values(categoryTotals).map(item => ({
      ...item,
      amount: parseFloat(item.amount.toFixed(2)), // Round to 2 decimal places
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }));

    setData(chartData);
  }, [transactions]);

  const totalExpense = data.reduce((sum, item) => sum + item.amount, 0).toFixed(2);

  const getCategoryColor = (category) => {
    const categoryColors = {
      Shopping: '#FFA726',
      Subscription: '#42A5F5',
      Food: '#66BB6A',
      Transportation: '#FF7043',
      Entertainment: '#29B6F6',
      Utilities: '#26A69A',
      Healthcare: '#EC407A',
    };
    return categoryColors[category] || '#6200ee'; // Default color if category not found
  };

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

      <Text style={styles.totalAmount}>Total: ${totalExpense}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAmount}>-${item.amount.toFixed(2)}</Text>
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

export default FinancialReportScreen;
