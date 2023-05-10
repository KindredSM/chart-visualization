<template>
  <div class="tile">
    <Doughnut
      id="my-chart-id"
      ref="doughnut"
      :options="chartOptions"
      :data="chartData" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "DoughnutTile",
  components: { Doughnut },
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    chartData() {
      return this.data;
    },
    chartOptions() {
      return this.options;
    },
  },
};
</script>

<style lang="scss" scoped>
.tile {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: rgb(232, 232, 232);
  border-radius: 10px;
}
</style>
