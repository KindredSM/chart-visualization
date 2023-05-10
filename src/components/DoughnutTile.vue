<template>
  <div class="tile" v-if="!loading && !errored">
    <Doughnut
      id="my-chart-id"
      ref="doughnut"
      :options="chartOptions"
      :data="chartData" />
  </div>
  <div v-if="loading">Loading...</div>
  <div v-if="errored">
    We're sorry, we're not able to retrieve this information at the moment,
    please try back later
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
import axios from "axios";

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
  data() {
    return {
      loading: true,
      errored: false,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#e896cb", "#424242", "#828282"],
            data: [],
          },
        ],
      },
      chartOptions: {
        cutout: 110,
      },
    };
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        const labels = [];
        const data = [];

        for (const currencyCode in response.data.bpi) {
          labels.push(currencyCode);
          data.push(response.data.bpi[currencyCode].rate_float);
        }

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
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
