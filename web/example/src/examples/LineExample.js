import LineChart from '../BaseCharts/Line'

export default LineChart.extend({
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Data One',
                backgroundColor: 'rgba(17, 128, 255, 0.26)',
                borderColor: 'rgb(17, 128, 255)',
                borderWidth: 1,
                data: [40, 39, 10, 40, 39, 80, 40]
            }, {
                label: 'Data two',
                backgroundColor: 'rgba(255, 127, 17, 0.26)',
                borderColor: 'rgb(255, 127, 17)',
                borderWidth: 1,
                data: [20, 11, 33, 12, 41, 130, 10]
            }]
        }, { responsive: true, maintainAspectRatio: false })
    }
})
