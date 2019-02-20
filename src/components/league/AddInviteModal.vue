<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <v-layout align-center justify-center>
        <v-flex xs12 xm8 lg4 class="pa-2">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Invite Friends</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="inviteForm"
                v-model="valid"
                laxy-validation
                id="inviteForm"
                @submit.prevent="sendInvites">
                <v-combobox
                  v-model="emailChips"
                  chips
                  label="Email addresses"
                  append-icon=""
                  :rules="comboboxRules"
                  clearable
                  solo
                  multiple>
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="removeChip(data.item)">
                      <span>{{ data. item }}</span>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="warning"
                @click="$emit('close')">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="!valid"
                type="submit"
                form="inviteForm">Send Invites</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "AddInviteModal",
  props: {
    leagueId: {
      type: String
    }
  },
  data() {
    return {
      valid: false,
      emailChips: [],
      comboboxRules: [
        v => (v || []).length > 0 || "Email addresses are required"
      ]
    };
  },
  methods: {
    sendInvites() {
      const inviteData = {
        type: "league",
        groupId: this.leagueId,
        emails: this.emailChips
      };
      axios
        .post(
          `${process.env.VUE_APP_API_BASE}/api/invitations/create`,
          inviteData
        )
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            this.emailChips = [];
            this.$emit("reloadInvites");
            this.$emit("close");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeChip(item) {
      this.emailChips.splice(this.emailChips.indexOf(item), 1);
      this.emailChips = [...this.emailChips];
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
