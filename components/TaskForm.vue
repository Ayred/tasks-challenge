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
            <v-icon small color="white">mdi-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-form ref="taskForm">
          <v-card-text>
            <div class="px-3">
              <v-row>
                <v-col>
                  <v-text-field
                    :rules="[rules.required]"
                    rounded
                    outlined
                    dense
                    label="Token"
                    v-model="task.token"
                    type="number"
                    hide-spin-buttons
                  >
                  </v-text-field>
                </v-col>
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
                    label="Fecha límite"
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
                    label="Fecha límite"
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
                    label="Fecha límite"
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
      this.$axios
        .$post("/vdev/tasks-challenge/tasks", this.task)
        .then((res) => {
          if (res.retcode == 0) {
            this.$store.commit("updateRefreshtasks", true);
            this.showNewTask = false;
          } else {
            this.$alert(res.message, {
              title: "AVISO",
            });
          }
        })
        .finally(() => {
          this.saving = false;
        });
      this.saving = true;
    },
  },
};
</script>
