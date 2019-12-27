<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="920px">
      <v-card>
        <v-toolbar
                color="cyan"
                dark
                flat
              >
            <v-toolbar-title>Modifier session</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" @submit.prevent="update()">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" @image-removed="handleImageRemoved" v-model="postBody.content" />
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan" text @click.stop="show = false">Quitter</v-btn>
                <v-btn type="submit" color="cyan" dark @click.stop="show = false">Modifier</v-btn>
              </v-card-actions>
            </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from '../../http-common'
  import { VueEditor } from "vue2-editor"

  export default {
    components:{
      VueEditor
    },

    data: () => ({
      valid: false,
      postBody: {
        id: null,
        content: ''
      },
    }),
    props: {
      value: Boolean,
      val: Object
    },
    computed: {
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

        var formData = new FormData();
        formData.append("image", file);

        axios({
          url: "/admin/contacts/logs/img",
          method: "POST",
          data: formData
        })
          .then(result => {
            let url = result.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleImageRemoved: function(image) {
        axios({
          url: image,
          method: "DELETE",
        })
          .catch(err => {
            console.log(err);
          });
      },
      update() {
        axios
          .put(`/admin/contacts/logs/put/${this.postBody.id}`, this.postBody)
          .then((resp) => {
            localStorage.setItem('msg', resp.data.msg)
            setTimeout(() => {
              return this.$flash.$emit('msg')
            }, 500)
          })
      }
    },
    created() {
      this.postBody = this.val
    }
    
  }
</script>
