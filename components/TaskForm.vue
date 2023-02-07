<template>
  <div>
    <v-dialog v-model="showNewTask" width="800" persistent>
      <v-card shaped>
        <v-card-title class="secondary py-1 px-1">
          <div class="mx-2">{{ title }}</div>
          <v-spacer></v-spacer>
          <v-btn
            text
            fab
            x-small
            class="ma-0 pa-0"
            @click="showNewTask = false"
            :disabled="saving"
          >
            <v-icon small color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form @submit.prevent="submit" ref="taskForm">
          <v-card-text>
            <div class="px-3">
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Título"
                    v-model="task.title"
                    :disabled="readOnlyMode"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pa-0 pb-0">
                  <v-checkbox
                    v-model="task.is_completed"
                    :label="
                      task.is_completed == 1 ? 'Completada' : 'No Completada'
                    "
                    :false-value="0"
                    :true-value="1"
                    color="orange"
                    :disabled="readOnlyMode"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3" class="pb-0">
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    type="date"
                    label="Fecha límite"
                    v-model="task.due_date"
                    :disabled="readOnlyMode"
                  >
                  </v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Comentarios"
                    v-model="task.comments"
                    :disabled="readOnlyMode"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" class="pb-0">
                  <v-textarea
                    :rules="[rules.required]"
                    outlined
                    rounded
                    label="Descripción"
                    v-model="task.description"
                    :disabled="readOnlyMode"
                  >
                  </v-textarea>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Etiquetas"
                    v-model="task.tags"
                    :disabled="readOnlyMode"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              depressed
              rounded
              type="button"
              :disabled="saving"
              v-show="readOnlyMode"
              @click="readOnlyMode = false"
              >Editar Tarea</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              color="default"
              depressed
              rounded
              type="button"
              @click="showNewTask = false"
              :disabled="saving"
              v-show="!readOnlyMode"
              >Cancelar</v-btn
            >
            <v-btn
              color="secondary"
              depressed
              rounded
              type="submit"
              :disabled="saving"
              v-show="!readOnlyMode"
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      readOnlyMode: true,
      showNewTask: false,
      saving: false,
      task: {},
      rules: {
        required: (v) => {
          return !!String(v) || "Este campo es requerido";
        },
      },
    };
  },
  methods: {
    show(id) {
      if (this.$refs.taskForm) {
        this.$refs.taskForm.reset();
      }
      this.showNewTask = true;
      this.task = {
        token: process.env.myToken,
        title: "",
        is_completed: "",
        due_date: "",
        comments: "",
        description: "",
        tags: "",
      };
      this.readOnlyMode = false;
      if (id) {
        this.$axios
          .get(`/vdev/tasks-challenge/tasks/${id}?token=${process.env.myToken}`)
          .then((res) => {
            if (res) {
              if (res.status == 200) {
                this.readOnlyMode = true;
                this.showNewTask = true;
                this.task = res.data[0];
                return;
              }
            }
          });
      } else {
        this.showNewTask = true;
      }
    },
    submit() {
      if (!this.$refs.taskForm || !this.$refs.taskForm.validate()) {
        return;
      }
      if (this.task.id) {
        this.update();
      } else {
        this.create();
      }
      this.saving = true;
      this.$refs.taskForm.reset();
    },

    create() {
      this.$axios
        .post("/vdev/tasks-challenge/tasks", this.taskParams)
        .then((res) => {
          this.refreshTasks(res);
        })
        .finally(() => {
          this.saving = false;
        });
    },

    update() {
      this.$axios
        .put(`/vdev/tasks-challenge/tasks/${this.task.id}`, this.taskParams)
        .then((res) => {
          this.refreshTasks(res);
        })
        .finally(() => {
          this.saving = false;
        });
    },

    refreshTasks(res) {
      if (res.status == 201) {
        this.$store.commit("updateRefreshTasks", true);
        this.showNewTask = false;
      } else {
        alert(res.data.detail, {
          title: "AVISO",
        });
      }
    },
  },
  computed: {
    taskParams() {
      const params = new URLSearchParams();
      for (let key in this.task) {
        params.append(key, this.task[key]);
      }
      return params;
    },
    title() {
      if (!this.task.id) {
        return "Nueva Tarea";
      }
      if (this.readOnlyMode) {
        return `Tarea #${this.task.id}`;
      }
      return `Editar Tarea #${this.task.id}`;
    },
  },
};
</script>
