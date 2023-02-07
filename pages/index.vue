<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row>
        <v-col><h2>Listado de Tareas</h2> </v-col>
        <v-col class="text-right">
          <v-btn rounded depressed color="secondary" @click="newTask()">
            <v-icon small>mdi-plus</v-icon>
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
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          small
                          v-bind="attrs"
                          v-on="on"
                          class="mx-2"
                          @click="taskDetails(item)"
                        >
                          mdi-eye
                        </v-icon>
                      </template>
                      <span>Detalles de Tarea</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          small
                          v-bind="attrs"
                          v-on="on"
                          class="mx-2"
                          @click="deleteTask(item)"
                        >
                          mdi-trash-can
                        </v-icon>
                      </template>
                      <span>Borrar Tarea</span>
                    </v-tooltip>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <task-form ref="taskFormView"></task-form>
    <delete-confirmation ref="deleteView"></delete-confirmation>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
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
  watch: {
    refreshTasks(val) {
      if (val) {
        this.initialize();
        this.$store.commit("updateRefreshTasks", false);
      }
    },
  },
  computed: {
    ...mapState(["refreshTasks"]),
  },
  methods: {
    initialize() {
      this.tasks = [];
      this.$axios
        .$get("/vdev/tasks-challenge/tasks?token=" + process.env.myToken)
        .then((tasks) => {
          this.tasks = tasks;
        });
    },
    newTask() {
      this.$refs.taskFormView.show();
    },
    taskDetails(item) {
      this.$refs.taskFormView.show(item.id);
    },
    deleteTask(item) {
      this.$refs.deleteView.show(item.id);
    },
  },
};
</script>
