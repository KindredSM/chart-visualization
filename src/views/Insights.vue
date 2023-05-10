<template>
  <div class="page">
    <h1>Bitcoin Price Index</h1>

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
