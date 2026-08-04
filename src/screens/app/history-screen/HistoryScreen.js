import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {PieChart, BarChart} from 'react-native-chart-kit';

import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import {Texts} from '../../../components/common/Texts';
import layout from '../../../theme/layout';

import {AnalyticsEngine} from '../utils/AnalyticsEngine';
import SizedView from '../../../components/common/SizedView';
import {rwp} from '../../../utils/helpers/responsivePixelHelper';
import {useHistory} from './useHistory';

const HistoryScreen = () => {
  const {expenses, loading, fetchExpenses} = useHistory();

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [fetchExpenses]),
  );

  const onRefresh = useCallback(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const currentMonth = useMemo(
    () => AnalyticsEngine.currentMonth(expenses),
    [expenses],
  );

  const total = AnalyticsEngine.total(currentMonth);

  const biggest = AnalyticsEngine.biggestCategory(currentMonth);

  const types = AnalyticsEngine.typeTotals(currentMonth);

  const insights = AnalyticsEngine.insights(currentMonth);

  const categoryData = AnalyticsEngine.categoryBreakdown(currentMonth);

  const pieData = Object.keys(categoryData).map((category, index) => ({
    name: category,
    amount: categoryData[category],
    color: [
      '#8B5CF6',
      '#34D399',
      '#F59E0B',
      '#EF4444',
      '#06B6D4',
      '#EC4899',
      '#6366F1',
    ][index % 7],
    legendFontColor: '#fff',
    legendFontSize: 12,
  }));
  console.log(expenses);

  const monthlyMap = AnalyticsEngine.monthlyTotals(expenses);

  const months = Object.keys(monthlyMap).slice(-6);

  const amounts = months.map(month => monthlyMap[month]);

  return (
    <DefaultWrap MainContainer={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     // refreshing={loading}
        //     onRefresh={onRefresh}
        //     tintColor="#8B5CF6"
        //     colors={['#8B5CF6']}
        //   />
        // }
      >
        <SizedView height={50} />

        {loading && expenses.length === 0 ? (
          <ActivityIndicator
            size="large"
            color="#8B5CF6"
            style={styles.loader}
          />
        ) : (
          <>
            <LinearGradient
              colors={['#111827', '#1E293B', '#0F172A']}
              style={styles.headerCard}>
              <Texts.pt18 style={styles.smallTitle}>This Month</Texts.pt18>

              <Texts.pt34 style={styles.total}>₹{total}</Texts.pt34>

              <Texts.pt16 style={styles.biggest}>
                Highest: {biggest?.category || 'N/A'}
              </Texts.pt16>
            </LinearGradient>

            <View style={styles.analyticsCard}>
              <Texts.pt20 style={styles.title}>Financial Health</Texts.pt20>

              <Texts.pt14 style={styles.metric}>
                Growth: ₹{types.growth || 0}
              </Texts.pt14>

              <Texts.pt14 style={styles.metric}>
                Necessary: ₹{types.necessary || 0}
              </Texts.pt14>

              <Texts.pt14 style={styles.metric}>
                Irrelevant: ₹{types.irrelevant || 0}
              </Texts.pt14>
            </View>

            {pieData.length > 0 && (
              <View style={styles.chartCard}>
                <Texts.pt20 style={styles.title}>
                  Spending Distribution
                </Texts.pt20>

                <PieChart
                  data={pieData}
                  width={320}
                  height={220}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="10"
                  absolute
                  chartConfig={{
                    color: () => '#fff',
                  }}
                />
              </View>
            )}

            {months.length > 0 && (
              <View style={styles.chartCard}>
                <Texts.pt20 style={styles.title}>Monthly Trend</Texts.pt20>

                <BarChart
                  data={{
                    labels: months,
                    datasets: [
                      {
                        data: amounts,
                      },
                    ],
                  }}
                  width={340}
                  height={220}
                  fromZero
                  yAxisLabel="₹"
                  chartConfig={{
                    backgroundGradientFrom: '#111827',
                    backgroundGradientTo: '#111827',
                    decimalPlaces: 0,
                    color: opacity => `rgba(139,92,246,${opacity})`,
                    labelColor: () => '#fff',
                  }}
                  style={{
                    borderRadius: 18,
                  }}
                />
              </View>
            )}

            <View style={styles.analyticsCard}>
              <Texts.pt20 style={styles.title}>AI Insights</Texts.pt20>

              {insights.map((item, index) => (
                <Texts.pt13 key={index} style={styles.insight}>
                  • {item}
                </Texts.pt13>
              ))}
            </View>

            <Texts.pt22 style={styles.historyTitle}>Expense History</Texts.pt22>

            <FlatList
              data={currentMonth}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View style={styles.rowCard}>
                  <View>
                    <Texts.pt17 style={styles.itemTitle}>
                      {item.title}
                    </Texts.pt17>

                    <Texts.pt12 style={styles.category}>
                      {item.category}
                    </Texts.pt12>
                  </View>

                  <Texts.pt18 style={styles.amount}>₹{item.amount}</Texts.pt18>
                </View>
              )}
            />
          </>
        )}

        <SizedView height={100} />
      </ScrollView>
    </DefaultWrap>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: rwp(10),
  },

  loader: {
    marginVertical: 40,
  },

  headerCard: {
    borderRadius: 26,
    padding: 22,
    marginBottom: 18,
  },

  smallTitle: {
    color: '#94A3B8',
  },

  total: {
    color: '#fff',
    fontWeight: '800',
    marginVertical: 10,
  },

  biggest: {
    color: '#CBD5E1',
  },

  analyticsCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  chartCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 14,
    marginBottom: 18,
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontWeight: '800',
    marginBottom: 10,
  },

  metric: {
    color: '#CBD5E1',
    marginBottom: 8,
  },

  insight: {
    color: '#CBD5E1',
    marginBottom: 6,
  },

  historyTitle: {
    color: '#fff',
    fontWeight: '800',
    marginBottom: 12,
  },

  rowCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    ...layout.rowBetween,
  },

  itemTitle: {
    color: '#fff',
    fontWeight: '700',
  },

  category: {
    color: '#8B5CF6',
    marginTop: 6,
  },

  amount: {
    color: '#34D399',
    fontWeight: '800',
  },
});
