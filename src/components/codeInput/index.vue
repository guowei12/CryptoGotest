<template>
  <div class="input-box">
    <!-- {{ codeValue }} -->
    <div class="code-item" :class="codeValue.length == 0 && inputFocus ? 'code-item-active' : ''">{{ codeValue[0] }}
    </div>
    <div class="code-item" :class="codeValue.length == 1 && inputFocus ? 'code-item-active' : ''">{{ codeValue[1] }}
    </div>
    <div class="code-item" :class="codeValue.length == 2 && inputFocus ? 'code-item-active' : ''">{{ codeValue[2] }}
    </div>
    <div class="code-item" :class="codeValue.length == 3 && inputFocus ? 'code-item-active' : ''">{{ codeValue[3] }}
    </div>
    <div class="code-item" :class="codeValue.length == 4 && inputFocus ? 'code-item-active' : ''">{{ codeValue[4] }}
    </div>
    <div class="code-item" :class="isShowCursor">{{ codeValue[5] }}</div>
    <div class="pc-input" v-show="!keyboard">
      <input id="inputCode" class="input-code" v-model="codeValue" :maxlength="6" type="tel" @blur="codeInputBlur" @focus="codeInputFocus" @input="codeInputChange" @update:model-value="updateChange" autocomplete="off" />
    </div>
    <div class="phone-input" v-show="keyboard">
      <input id="inputCode1" class="input-code" v-model="codeValue" :maxlength="6" type="tel" @blur="codeInputBlur1"
        @focus="codeInputFocus" @input="codeInputChange" @update:model-value="updateChange"
        v-if="isShowInput && !codeValue" :readonly="isReadonly" @click="handleClick" autocomplete="off" />
      <van-number-keyboard v-model="codeValue" :show="show" :maxlength="6" safe-area-inset-bottom />
    </div>
    <!-- 这段代码无用不会展示，只为加载字体包 -->
    <div class="font">font</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive, computed, defineEmits, watch, nextTick, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'codeInput',
  emits: ['submitCode', 'update:data', 'blur', 'focus'],
  props: {
    data: {
      type: [Number, String, Boolean],
      required: false,
    },
    autofocus: {
      type: [Number, String, Boolean],
      required: false,
    },
    keyboard: {
      type: [Boolean],
      required: true,
    },
    type: {
      type: [Number, String, Boolean],
      required: false,
    }
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const isShowInput = ref(false);
    const isAutofocus = ref(false);
    let inputFocus = ref(false) as any;
    let show = ref(true);
    let isReadonly = ref(true);
    inputFocus.value = props.autofocus;
    const data = reactive({
      codeValue:'' as any
    })
    onBeforeMount(() => {
    })
    onMounted(() => {
      data.codeValue = props.data;
      isShowInput.value = true;
      isAutofocus.value = true;
      // console.log(inputFocus.value)
      nextTick(() => {
        document.getElementById('inputCode1')?.focus();
        if (inputFocus.value) {
          document.getElementById('inputCode')?.focus();
        }
      });
    })

    const isShowCursor = computed(() => {
      if (data.codeValue?.length == 6 && inputFocus.value) {
        return 'code-item-active no_cursor';
      } else if (data.codeValue?.length >= 5 && inputFocus.value) {
        return 'code-item-active';
      } else {
        return '';
      }
    });
    // 验证码输入框input
    const codeInputChange = (event: any) => {
      if (event  && props.keyboard) {
        data.codeValue = '';
        isReadonly.value = true;
      }
      // console.log(event,data.codeValue)
      if (data.codeValue) {
        data.codeValue = data.codeValue.replace(/[^\d]/g, '');
        emit('update:data', data.codeValue);
      }
      if (data.codeValue && data.codeValue.length >= 6 && !props.keyboard) {
        emit('submitCode', data.codeValue?.slice(0, 6));
      }
    };
    const updateChange = (e: string) => {
      emit('update:data', e);
    };
    // 验证码输入框失去焦点
    const codeInputBlur = () => {
      inputFocus.value = false;
      isReadonly.value = true;
      emit('blur', '');
    };
    const codeInputBlur1 = () => {
      isReadonly.value = true;
      emit('blur', '');
    };
    // 验证码输入框获取到焦点
    const codeInputFocus = () => {
      inputFocus.value = true;
      nextTick(() => {
        isReadonly.value = true;
        setTimeout(() => {
          isReadonly.value = false;
        }, 0);
      });
      emit('focus', '');
    };
    // 点击输入框
    const handleClick = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent?.includes('android')) {
        nextTick(() => {
          isReadonly.value = true;
          setTimeout(() => {
            isReadonly.value = false;
          });
        });
      }
    };
    watch(
      () => data.codeValue,
      (newVal) => {
        if (newVal?.length === 6 && props.type === 'phy' && !props.keyboard) {
          emit('submitCode', data.codeValue?.slice(0, 6));
        }
      }
    );
    watch(
      () => props.data,
      (newVal) => {
        data.codeValue = props.data;
      }
    );
    watch(data.codeValue, (newVal) => {
      if (!inputFocus.value) {
        data.codeValue = '';
        return;
      }
      if (newVal.length == 0) {
        isReadonly.value = true;
      }
      // 移动端存在值时输入框隐藏使用此方法触发
      if (data.codeValue) {
        data.codeValue = data.codeValue.replace(/[^\d]/g, '');
        emit('update:data', data.codeValue);
      }
    });
    watch(
      () => props.autofocus,
      () => {
        inputFocus.value = props.autofocus;
        if (inputFocus.value) {
          document.getElementById('inputCode')?.focus();
        }
      }
    );
    return {
      ...toRefs(data),
      show,
      isShowInput,
      isAutofocus,
      inputFocus,
      isReadonly,
      isShowCursor,
      codeInputChange,
      updateChange,
      codeInputBlur,
      codeInputBlur1,
      codeInputFocus,
      handleClick
    };
  },
})

</script>
<style lang="scss" scoped>
.phone-input {
  display: block;
  font-family: 'sf-pro-display_medium_500';
}

.input-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  font-family: 'ssf-pro-display_semibold_600';
  justify-content: space-between;

  :deep(.n-drawer--bottom-placement) {
    height: 500px !important;
  }

  .input-code {
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
    color: transparent;
    background-color: transparent;
    caret-color: transparent;
    opacity: 0;
  }

  .code-item {
    font-size: 20px;
    line-height: 28px;
    color: #191B1F;
    width: 48px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #EDEFF2;
  }

  .code-item-active {
    border-radius: 12px;
    background-color: #fff;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }

  .code-item-active::after {
    content: '';
    display: block;
    width: 2px;
    height: 20px;
    background: #1A72F6;
    position: absolute;
    z-index: -1;
    animation: cursor-blink 1s infinite;
  }

  .no_cursor::after {
    display: none;
  }
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

:deep(.van-number-keyboard) {
  font-style: normal;
  font-size: 14px;
  color: #191B1F;
  font-family: 'sf-pro-display_medium_500';
  background-color: #E0E3E7;

  .van-key__wrapper:nth-child(10) {
    display: none;
  }

  .van-key__wrapper:nth-child(11) {
    flex-basis: 66%;
  }

  .van-key {
    background: #ffffff;
  }
}

.is_click {
  pointer-events: none;
}

.font {
  opacity: 0;
  position: absolute;
  top: -99999px;
  font-family: 'ssf-pro-display_semibold_600';
}
</style>
