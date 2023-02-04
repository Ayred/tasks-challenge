<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row>
        <v-col><h2>Listado de Tareas</h2> </v-col>
        <v-col class="text-right">
          <v-btn rounded depressed color="secondary" @click="newTask()">
            <v-icon small>fa-plus</v-icon>
            &nbsp; Agregar nueva
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text
              ><template>
                <v-data-table
                  :headers="headers"
                  :items="tasks"
                  class="elevation-1"
                >
                </v-data-table>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <task-form ref="taskFormView"></task-form>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "No. Tarea",
        value: "id",
        align: "start",
      },
      { text: "Título", value: "title" },
      { text: "Estado", value: "is_completed" },
      { text: "Fecha Límite", value: "due_date" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    tasks: [],
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      let authorization =
        "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";
      this.tasks = [];
      this.$axios
        .$get("/vdev/tasks-challenge/tasks?token=" + process.env.myToken, {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        })
        .then((tasks) => {
          this.tasks = tasks;
        });
    },
    newTask() {
      this.$refs.taskFormView.show();
    },
  },
};
</script>
