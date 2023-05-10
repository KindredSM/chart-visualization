<template>
  <div class="page">
    <h1>Bitcoin Price Index</h1>

    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else v-for="currency in info" class="currency">
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span
          >{{ currencyDecimal(currency.rate_float) }}
        </span>
      </div>
    </section>

    <h1>Managed Devices</h1>
    <div class="grid">
      <keep-alive>
        <draggable
          class="tile-list"
          :list="tiles"
          :item-key="'id'"
          @update:modelValue="updateTiles">
          <template #item="{ element }">
            <template v-if="element.type === 'doughnut'">
              <DoughnutTile
                :key="element.id"
                :data="element.data"
                :options="element.options" />
            </template>
            <template v-else-if="element.type === 'bar'">
              <BarTile
                :key="element.id"
                :data="element.data"
                :options="element.options" />
            </template>
          </template>
        </draggable>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DoughnutTile from "../components/DoughnutTile.vue";
import BarTile from "../components/BarTile.vue";
import draggable from "vuedraggable";
import axios from "axios";

export default {
  components: {
    DoughnutTile,
    BarTile,
    draggable,
  },

  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      tiles: [
        {
          id: 1,
          type: "doughnut",
          label: "Managed Devices",
          data: {
            labels: ["Bitcoin"],
            datasets: [
              {
                backgroundColor: ["#e896cb", "#424242", "#828282"],
                data: [],
              },
            ],
          },
          options: {
            cutout: 110,
          },
        },
        {
          id: 2,
          type: "bar",
          data: {
            labels: ["Sager", "Alienware"],
            datasets: [
              {
                backgroundColor: ["#e896cb", "#424242", "#828282"],
                data: [40, 10],
              },
            ],
          },
        },
        {
          id: 3,
          type: "bar",
          data: {
            labels: ["Ipod", "Dell", "Sager", "Alienware"],
            datasets: [
              {
                backgroundColor: ["#e896cb", "#424242", "#828282"],
                data: [60, 10, 30, 3],
              },
            ],
          },
        },
      ],
    };
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        this.info = response.data.bpi;

        const labels = [];
        const data = [];

        for (const currencyCode in response.data.bpi) {
          labels.push(currencyCode);
          data.push(response.data.bpi[currencyCode].rate_float);
        }

        const doughnutTile = this.tiles.find(
          (tile) => tile.type === "doughnut"
        );

        if (doughnutTile) {
          doughnutTile.data.labels = labels;
          doughnutTile.data.datasets[0].data = data;
          doughnutTile.data.datasets[0].backgroundColor = [
            "#e896cb",
            "#424242",
            "#828282",
          ];
        }
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },

  methods: {
    currencyDecimal(value) {
      return value.toFixed(2);
    },
    updateTiles(newTiles) {
      this.tiles = newTiles;
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.tile-list {
  display: contents;
}
</style>
