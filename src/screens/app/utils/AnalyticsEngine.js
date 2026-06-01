export const AnalyticsEngine = {
  total(expenses) {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  },

  categoryBreakdown(expenses) {
    const data = {};

    expenses.forEach(item => {
      if (!data[item.category]) {
        data[item.category] = 0;
      }

      data[item.category] += Number(item.amount);
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

    expenses.forEach(item => {
      if (item.type === 'Necessary') {
        necessary += Number(item.amount);
      }

      if (item.type === 'Growth') {
        growth += Number(item.amount);
      }

      if (item.type === 'Irrelevant') {
        irrelevant += Number(item.amount);
      }
    });

    return {
      necessary,
      growth,
      irrelevant,
    };
  },

  currentMonth(expenses) {
    const month = new Date().getMonth();

    const year = new Date().getFullYear();

    return expenses.filter(item => {
      const d = new Date(item.date);

      return d.getMonth() === month && d.getFullYear() === year;
    });
  },

  monthlyTotals(expenses) {
    const months = {};

    expenses.forEach(item => {
      const date = new Date(item.date);

      const key = `${date.getMonth() + 1}-${date.getFullYear()}`;

      if (!months[key]) {
        months[key] = 0;
      }

      months[key] += Number(item.amount);
    });

    return months;
  },

  insights(expenses) {
    const insights = [];

    const top = this.biggestCategory(expenses);

    insights.push(`Highest spending: ${top.category}`);

    const types = this.typeTotals(expenses);

    if (types.irrelevant > types.growth) {
      insights.push('⚠ Irrelevant spending exceeds investments.');
    }

    if (types.growth > types.necessary) {
      insights.push('✓ Strong investment habit.');
    }

    if (top.category === 'Shopping') {
      insights.push('⚠ Shopping spending is high.');
    }

    return insights;
  },
};
