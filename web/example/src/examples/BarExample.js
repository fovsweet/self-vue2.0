import BarChart from '../BaseCharts/Bar'

export default BarChart.extend({
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Data One',
                width: 30,
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }, {
                label: 'Data Two',
                width: 30,
                backgroundColor: '#fb1',
                data: [20, 33, 32, 11, 2, 5, 31, 51, 40, 20, 32, 1]
            }]
        }, { responsive: true, maintainAspectRatio: false })
    }
})
