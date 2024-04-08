<script setup>
import { VChart } from "@visactor/vchart";

const props = defineProps({
  options: {
    type: Object
  }
});

let chart
const container = ref(null)

function createOrUpdateChart(chartProps) {
  if (container.value && !chart) {
    
    chart = new VChart(chartProps.options, {
      dom: container.value,
      canvasControled: true,
    });

    chart.on('legendItemHover', e => {
      const hoveredName = e?.value?.data?.label;
      if (hoveredName) {
        chart.updateState({
          dimension_hover_reverse: {
            filter: d => {
              return d[0].type !== hoveredName
            }
          }
        });
      }
    })
    
    chart.on('legendItemUnHover', e => {
      chart.updateState({
        dimension_hover_reverse: {
          filter: d => false
        }
      });
    })

    
    chart.renderSync();
    return true;
  } else if (chart) {
    chart.updateSpec(props.options);
    return true;
  }
  return false;
}

onMounted(() => {
  createOrUpdateChart(props);
});

onUpdated(() => {
  createOrUpdateChart(props);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.release();
  }
});
</script>

<template>
  <div class="treemap-container" ref="container"></div>
</template>

<style scoped>
.treemap-container {
  width: 100%;
  height: 100%;
}
</style>
