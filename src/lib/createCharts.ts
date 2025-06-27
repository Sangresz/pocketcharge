import Chart, { type ChartItem } from 'chart.js/auto';
import type { Tables } from './database.types';

const groupBy = <T,>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => string
): { key: string; values: T[] }[] => {
    const grouped = array.reduce((acc: Record<string, T[]>, value, index, array) => {
        const key = predicate(value, index, array);
        (acc[key] ||= []).push(value);
        return acc;
    }, {});

    return Object.entries(grouped).map(([key, values]) => ({ key, values }));
};

export const createCharts = (charges: Tables<'charges'>[]) => {
    const sortedSharges = charges.toSorted((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    })

    let lastYearCharges = sortedSharges.filter((charge) => {
        const date = new Date(charge.created_at);
        const currentDate = new Date();
        return (date.getFullYear() === currentDate.getFullYear()) || (date.getMonth() > currentDate.getMonth());
    })

    const yearData = groupBy(lastYearCharges, (charge) => {
        const date = new Date(charge.created_at);
        return date.toLocaleDateString('en-UK', { month: 'long' });
    });

    const yearCanva = document.getElementById('last_year_charges_canvas') as ChartItem;

    new Chart(yearCanva, {
        type: 'bar',
        data: {
            labels: yearData.map((row) => row.key),
            datasets: [
                {
                    label: 'Expenses',
                    data: yearData.map((row) =>
                        row.values.reduce((acc, charge) => {
                            if (charge.is_expense) {
                                return acc + charge.amount;
                            } else {
                                return acc;
                            }
                        }, 0)
                    ),
                    borderColor: '#fb2c36',
                    backgroundColor: '#ffa2a2',
                },
                {
                    label: 'Gains',
                    data: yearData.map((row) =>
                        row.values.reduce((acc, charge) => {
                            if (!charge.is_expense) {
                                return acc + charge.amount;
                            } else {
                                return acc;
                            }
                        }, 0)
                    ),
                    borderColor: '#00c951',
                    backgroundColor: '#7bf1a8',
                }
            ]
        }
    });

    let lastMonthCharges = sortedSharges.filter((charge) => {
        const date = new Date(charge.created_at);
        const currentDate = new Date();
        return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    })

    const monthData = groupBy(lastMonthCharges, (charge) => {
        const date = new Date(charge.created_at);
        return date.getDate().toString();
    });

    const monthCanva = document.getElementById('last_month_charges_canvas') as ChartItem;

    new Chart(monthCanva, {
        type: 'bar',
        data: {
            labels: monthData.map((row) => row.key),
            datasets: [
                {
                    label: 'Expenses',
                    data: monthData.map((row) =>
                        row.values.reduce((acc, charge) => {
                            if (charge.is_expense) {
                                return acc + charge.amount;
                            } else {
                                return acc;
                            }
                        }, 0)
                    ),
                    borderColor: '#fb2c36',
                    backgroundColor: '#ffa2a2',
                },
                {
                    label: 'Gains',
                    data: monthData.map((row) =>
                        row.values.reduce((acc, charge) => {
                            if (!charge.is_expense) {
                                return acc + charge.amount;
                            } else {
                                return acc;
                            }
                        }, 0)
                    ),
                    borderColor: '#00c951',
                    backgroundColor: '#7bf1a8',
                }
            ]
        }
    });
}