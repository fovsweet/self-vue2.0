<script>
import BarExample from './BarExample'
import LineExample from './LineExample'
import DoughnutExample from './DoughnutExample'
import PieExample from './PieExample'
import RadarExample from './RadarExample'
import PolarAreaExample from './PolarAreaExample'
import BubbleExample from './BubbleExample'
import ReactiveExample from './ReactiveExample'
import ReactivePropExample from './ReactivePropExample'

export default {
    components: {
        BarExample,
        LineExample,
        DoughnutExample,
        PieExample,
        RadarExample,
        PolarAreaExample,
        BubbleExample,
        ReactiveExample,
        ReactivePropExample
    }
}
</script>
<template>
    <div class="container">
        <h1>Barchart</h1>
        <bar-example></bar-example>
        <h1>Barchart with reactive mixing for live data</h1>
        <reactive-example></reactive-example>
        <h1>Linechart</h1>
        <line-example></line-example>
        <h1>Doughnutchart</h1>
        <doughnut-example></doughnut-example>
        <h1>Piechart</h1>
        <pie-example></pie-example>
        <h1>Radarchart</h1>
        <radar-example></radar-example>
        <h1>Polararea</h1>
        <polar-area-example></polar-area-example>
        <h1>Bubblechart</h1>
        <bubble-example></bubble-example>
    </div>
</template>
<style lang='less' scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    h1 {
        text-align: center;
        margin: 40px 0
    }
}
</style>
