<template>
  <v-row class="py-2 px-0">
    <v-row>
      <v-col
        ><v-btn rounded nuxt to="/"
          >&lt; regresar al listado de tareas</v-btn
        ></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12" md="12"><new-product-form></new-product-form></v-col>
    </v-row>
    <v-row>
      <v-col>
        <task-table :id="id"></task-table>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.id = this.$route.params.id;
      let authorization =
        "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";
      this.tasks = [];
      this.$axios
        .$get("vdev/tasks-challenge/tasks/task_id", {
          headers: {
            Authorization: `${authorization}`,
          },
        })
        .then((res) => {
          if (res.success) {
            let task = res.tasks.find((task) => task.id == this.id);
            this.$store.commit("loadTaskDetails", task.items);
          }
        });
    },
  },
};
</script>
