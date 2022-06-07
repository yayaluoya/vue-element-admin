<template>
  <div>
    <Editor
      api-key="no-api-key"
      :init="init"
      v-model="content_"
      tag-name="div"
      :disabled="disabled"
    />
  </div>
</template>
 
 
<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: { Editor },
  props: {
    disabled: {
      type: Boolean,
      defalut: false,
    },
    content: {
      type: String,
      defalut: "",
    },
    imgUpload: Function,
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh-Hans.js", //引入语言包文件
        language: "zh-Hans", //语言类型
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
        images_upload_handler: (blobInfo, success, failure) => {
          // console.log(blobInfo);
          if (this.imgUpload) {
            this.imgUpload(new File([blobInfo.blob()], blobInfo.filename()))
              .then((url) => {
                success(url);
              })
              .catch(() => {
                failure("上传错误");
              });
          } else {
            const img = "data:image/jpeg;base64," + blobInfo.base64();
            success(img);
          }
        },
      },
    };
  },
  computed: {
    content_: {
      get() {
        return this.content;
      },
      set(value) {
        this.$emit("update:content", value);
      },
    },
  },
};
</script>

<style>
.tox {
  z-index: 9999 !important;
}
</style>