<template>
    <div class="w-full h-full flex justify-center items-center flex-col gap-y-5">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full max-w-[400px]" />
        <div class="color-3">Your system data </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);
    return {
        labels: ['A13', 'B123', 'C123','D12313'],
        datasets: [
            {
                data: [1, 2, 3,5],
                backgroundColor: [
                    documentStyle.getPropertyValue('--p-cyan-500'), 
                    documentStyle.getPropertyValue('--p-orange-500'), 
                    documentStyle.getPropertyValue('--p-gray-500'),
                    documentStyle.getPropertyValue('--p-purple-700'),
                ],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: false,
                    color: textColor
                }
            }
        }
    };
};
</script>

<style scoped>

</style>