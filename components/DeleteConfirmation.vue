<template>
  <div>
    <v-dialog v-model="showDeleteConfirmation" width="600" persistent>
      <v-card shaped>
        <v-card-title class="secondary py-1 px-1">
          <div class="mx-2">{{ title }}</div>
          <v-spacer></v-spacer>
          <v-btn
            text
            fab
            x-small
            class="ma-0 pa-0"
            @click="showDeleteConfirmation = false"
            :disabled="saving"
          >
            <v-icon small color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form @submit.prevent="deleteTask" ref="deleteView">
          <v-card-text>
            <div class="px-3">
              <v-row>
                <v-col
                  ><h3>
                    ¿Estas seguro de que quieres borrar la tarea #{{ id }}?
                  </h3></v-col
                >
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
              @click="showDeleteConfirmation = false"
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
      showDeleteConfirmation: false,
      title: "Confirmación",
      saving: false,
      id: null,
    };
  },
  methods: {
    show(id) {
      this.showDeleteConfirmation = true;
      this.id = id;
    },

    deleteTask() {
      if (!this.id) {
        return;
      }
      this.$axios
        .delete(
          `/vdev/tasks-challenge/tasks/${this.id}?token=${process.env.myToken}`
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            this.$store.commit("updateRefreshTasks", true);
            this.showDeleteConfirmation = false;
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
    },
  },
};
</script>
