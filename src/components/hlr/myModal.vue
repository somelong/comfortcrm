

<template>
  <div>
    <div v-show="Mshow" :transition="transition" >
      <div class="modal" @click.self="clickMask" style="background-color: rgba(81,81,81,0.49)">
        <div class="modal-dialog modal-lg" :class="modalClass" ref="dialog">
          <div class="modal-content">
            <!--Header-->
            <div class="modal-header">
              <slot name="header">

                <h4 class="modal-title ">
                  <slot name="title">
                    <!--{{title}}-->
                    <h3 class="text-center">活动编辑</h3>
                  </slot>
                </h4>
                <a type="button primary" class="close" @click="cancel">x</a>
              </slot>
            </div>
            <!--Container-->
            <div class="modal-body">
              <slot>
                <div class="text-left">
                  <form>
                    <div class="form-group ">
                      <label for="recipient-name" class="control-label">编号:</label>
                      <input type="text" class="form-control" id="recipient-id">
                    </div>
                    <div class="form-group ">
                      <label for="recipient-name" class="control-label">主题:</label>
                      <input type="text" class="form-control" id="recipient-name">
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="control-label">描述:</label>
                      <textarea class="form-control" id="message-text"></textarea>
                    </div>
                    <div>
                      <!--图片预览-->
                      <div class="list ChangeImgM" v-for="(n, index) in imageList" :data-index="index" >
                        <img @click="open($event)" :src="n.url" :height="120" class="ChangeImg">
                      </div>
                      <!--图片上传-->

                    </div>
                  </form>
                </div>
              </slot>
            </div>
            <!--Footer-->
            <div class="modal-footer">
              <slot name="footer">
                <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                <button type="button" :class="okClass" @click="ok">{{okText}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
  </div>
</template>
<script>

  function getFileUrl(obj) {
    let url;
    url = window.URL.createObjectURL(obj.files.item(0));
    return url;
  }



  export default {
    props: {
      show: {
        type: Boolean,
        twoWay: true,
        default: true
      },
      title: {
        type: String,
        default: 'Modal'
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      full: {
        type: Boolean,
        default: false
      },
      // 为true时无法通过点击遮罩层关闭modal
      force: {
        type: Boolean,
        default: false
      },
      // 自定义组件transition
      transition: {
        type: String,
        default: 'modal'
      },
      // 确认按钮text
      okText: {
        type: String,
        default: 'OK'
      },
      // 取消按钮text
      cancelText: {
        type: String,
        default: 'Cancel'
      },
      // 确认按钮className
      okClass: {
        type: String,
        default: 'btn blue'
      },
      // 取消按钮className
      cancelClass: {
        type: String,
        default: 'btn red btn-outline'
      },
      // 点击确定时关闭Modal
      // 默认为false，由父组件控制prop.show来关闭
      closeWhenOK: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        duration: null,
        Mshow:this.show,
        imageList: [
          { width: 900, height: 675, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
          { width: 601, height: 1024, url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
          { width: 1024, height: 700, url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg' }
        ],
        imgNum:4, //上传的照片数量，可根据实际情况自定义
        imgList: [],
        size: 0
      };
    },
    computed: {
      modalClass () {
        return {
          'modal-lg': this.large,
          'modal-sm': this.small,
          'modal-full': this.full
        }
      },

    },
    created () {
      if (this.show) {
        document.body.className += ' modal-open';
      }
    },
    beforeDestroy () {
      document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },
    watch: {
      show (value) {
        // 在显示时去掉body滚动条，防止出现双滚动条
        if (value) {
          document.body.className += ' modal-open';
        }
        // 在modal动画结束后再加上body滚动条
        else {
          if (!this.duration) {
            this.duration = window.getComputedStyle(this.$refs)['transition-duration'].replace('s', '') * 1000;
          }

          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
          }, this.duration || 0);
        }
      }
    },
    methods: {
      ok() {
        this.$emit('ok');
        if (this.closeWhenOK) {
          this.show = false;
        }
      },
      cancel() {
        this.$emit('cancel');
        this.Mshow = false;

      },
      // 点击遮罩层
      clickMask() {
        if (!this.force) {
          this.cancel();
        }
      },
      open(e) {
        fancyBox(e.target, this.imageList);
      },
    }
  };
</script>
<style scoped>
  .modal {
    display: block;
  }
  .modal-transition {
    transition: all .6s ease;
  }
  .modal-leave {
    /* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
    border-radius: 1px !important;
  }
  .modal-transition .modal-dialog, .modal-transition .modal-backdrop {
    transition: all .5s ease;
  }
  .modal-enter .modal-dialog, .modal-leave .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }
  .modal-enter .modal-backdrop, .modal-leave .modal-backdrop {
    opacity: 0;
  }
  .ChangeImg{
    float: left;
  }
  .ChangeImgM img{
    margin-left: 5px;
  }
</style>
