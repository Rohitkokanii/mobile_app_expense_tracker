// Helper to safely parse dates from local store or Firebase Timestamps
const parseDate = item => {
  const dateVal = item?.date || item?.createdAt;
  if (!dateVal) return new Date(0); // Fallback to epoch if missing

  // Handle Firebase Firestore Timestamp objects
  if (typeof dateVal.toDate === 'function') {
    return dateVal.toDate();
  }

  // Handle standard date strings / numbers / Date objects
  const parsed = new Date(dateVal);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

export const AnalyticsEngine = {
  total(expenses) {
    if (!Array.isArray(expenses)) return 0;
    return expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  },

  categoryBreakdown(expenses) {
    const data = {};
    if (!Array.isArray(expenses)) return data;

    expenses.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!data[category]) {
        data[category] = 0;
      }
      data[category] += Number(item.amount || 0);
    });

    return data;
  },

  biggestCategory(expenses) {
    const map = this.categoryBreakdown(expenses);

    let max = 0;
    let winner = 'None';

    Object.keys(map).forEach(category => {
      if (map[category] > max) {
        max = map[category];
        winner = category;
      }
    });

    return {
      category: winner,
      amount: max,
    };
  },

  typeTotals(expenses) {
    let necessary = 0;
    let growth = 0;
    let irrelevant = 0;

    if (!Array.isArray(expenses)) {
      return {necessary, growth, irrelevant};
    }

    expenses.forEach(item => {
      const amt = Number(item.amount || 0);
      if (item.type === 'Necessary') {
        necessary += amt;
      } else if (item.type === 'Growth') {
        growth += amt;
      } else if (item.type === 'Irrelevant') {
        irrelevant += amt;
      }
    });

    return {
      necessary,
      growth,
      irrelevant,
    };
  },

  currentMonth(expenses) {
    if (!Array.isArray(expenses)) return [];

    const now = new Date();
    const currentMonthNum = now.getMonth();
    const currentYearNum = now.getFullYear();

    return expenses.filter(item => {
      const d = parseDate(item);
      return (
        d.getMonth() === currentMonthNum && d.getFullYear() === currentYearNum
      );
    });
  },

  monthlyTotals(expenses) {
    const months = {};
    if (!Array.isArray(expenses)) return months;

    expenses.forEach(item => {
      const date = parseDate(item);
      // Skip fallback dates if completely invalid
      if (date.getTime() === 0) return;

      const key = `${date.getMonth() + 1}-${date.getFullYear()}`;

      if (!months[key]) {
        months[key] = 0;
      }

      months[key] += Number(item.amount || 0);
    });

    return months;
  },

  insights(expenses) {
    const insights = [];
    if (!Array.isArray(expenses) || expenses.length === 0) {
      return ['No spending data available.'];
    }

    const top = this.biggestCategory(expenses);
    if (top.category !== 'None') {
      insights.push(`Highest spending: ${top.category}`);
    }

    const types = this.typeTotals(expenses);

    if (types.irrelevant > types.growth) {
      insights.push('⚠ Irrelevant spending exceeds investments.');
    }

    if (types.growth > types.necessary && types.growth > 0) {
      insights.push('✓ Strong investment habit.');
    }

    if (top.category === 'Shopping') {
      insights.push('⚠ Shopping spending is high.');
    }

    return insights;
  },
};
