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
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Título"
                    v-model="task.title"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Estado"
                    v-model="task.is_completed"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Fecha límite"
                    v-model="task.due_date"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Comentarios"
                    v-model="task.comments"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Descripción"
                    v-model="task.description"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Etiquetas"
                    v-model="task.tags"
                    class="uppercase"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="default"
              depressed
              rounded
              type="button"
              @click="showNewTask = false"
              :disabled="saving"
              >Cancelar</v-btn
            >
            <v-btn
              color="secondary"
              depressed
              rounded
              type="submit"
              :disabled="saving"
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
      showNewTask: false,
      title: "Nueva Tarea",
      saving: false,
      task: {},
      rules: {
        //en este required hay que poner return porque puse llavecitas. retorna true o el texto
        required: (v) => {
          return !!v || "Este campo es requerido";
        },
      },
    };
  },
  methods: {
    show() {
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
    },
    submit() {
      if (this.$refs.taskForm && this.$refs.taskForm.validate()) {
        let authorization =
          "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";

        this.$axios
          .post("/vdev/tasks-challenge/tasks", this.taskParams, {
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status == 201) {
              this.$store.commit("updateRefreshTasks", true);
              this.showNewTask = false;
            } else {
              alert(res.data.detail, {
                title: "AVISO",
              });
            }
          })
          .finally(() => {
            this.saving = false;
          });
        this.saving = true;
        this.$refs.taskForm.reset();
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
  },
};
</script>
