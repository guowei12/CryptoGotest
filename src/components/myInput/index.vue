<template>
  <div id="myInput" :error="error" :style="`height:${props.height}px;`">
    <input :type="props.type === 'code' ? 'tel' : 'text'" v-model="data" :placeholder="props.placeholder"
      :disabled="props.disabled" @update:model-value="updateChange" @blur="onBlur" @input="changeVal" @focus="onFocus"
      :maxlength="props.maxlength" :minlength="props.minlength"
      :style="`width: ${props.width}px;height:${props.height}px;`" autocapitalize="off" />
    <div class="suffix code_text" v-if="isCode">
      <span @click="handSendCode" v-if="!active" :class="props.phone ? '' : 'send_code'"> {{ $t('googleCode.Send_code')
        }}</span>
      <span class="countdown" v-else>
        <n-countdown :render="renderCountdown" :duration="59000" @finish="handleFinish" />
        s</span>
    </div>
    <div class="suffix clear_icon" v-if="props.clear">
      <img @click="clearVal" src="@/assets/images/verification/clear_icon.png" alt="" />
    </div>
  </div>
  <div :class="error ? 'error-tip-show error-tip' : 'error-tip'">{{ props.errorTip }}</div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type CountdownProps, NCountdown } from 'naive-ui';
export default defineComponent({
  name: 'myInput',
  components: {  NCountdown },
  props: {
    data:{
      type: [Number, String, Boolean],
      required: false,
    },
    error :{
      type: [Number, String, Boolean],
      required: false,
    },
    isCode:{
      type: [Number, String, Boolean],
      required: false,
    },
    maxlength: 200,
    type: 'text',
    phone: true ,
    clear: false,
  },
  setup(props) {

    const route = useRoute();
    const router = useRouter();
    const emit = defineEmits<{
      (e: 'update:data', value: string): void;
      (e: 'blur', value: string): void;
      (e: 'input', value: string): void;
      (e: 'focus', value: string): void;
      (e: 'click', value: string): void;
    }>();

    const updateChange = (e: string) => {
      emit('update:data', e);
    };

    const clearVal = () => {
      updateVal.value = '';
      emit('update:data', updateVal.value);
    };
    let data = props.data;
    let error = props.error;
    const active = ref(false);
    const updateVal = ref('');
    const changeVal = (event: any) => {
      if (props.type === 'street') {
        updateVal.value = data.replace(/[^a-zA-Z0-9~`!@#$%^&*()_+=-{}|\|"':;>.?<,《》？「」：～｜、……¥—— ]/g, '');
        // nextTick(() => {
        //   // emit('update:data', data);
        // });
      } else if (props.type === 'digit' || props.type === 'code') {
        updateVal.value = data.replace(/[^\d]/g, '');
        // emit('update:data', data);
      } else if (props.type === 'city' || props.type === 'name') {
        updateVal.value = data.replace(/[^a-zA-Z]/g, '');
        // emit('update:data', data);
      } else if (props.type === 'address') {
        updateVal.value = data.replace(/[^a-zA-Z\s~`!@#$%^&*()_+=\-{}|\:"';>.?<,]/g, '');
      } else {
        updateVal.value = data;
      }

      nextTick(() => {
        emit('update:data', updateVal.value);
        emit('input', event);
      });
    };

    const onBlur = (event: any) => {
      emit('blur', event);
    };

    const onFocus = (event: any) => {
      emit('focus', event);
    };

    const handSendCode = (event: any) => {
      if (props.phone) {
        active.value = true;
      }
      emit('click', event);
    };


    // 渲染倒计时
    const renderCountdown: CountdownProps['render'] = ({ hours, minutes, seconds }) => {
      return `${String(seconds).padStart(2, '0')}`;
    };
    const handleFinish = () => {
      active.value = false;
    };
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })

    watch(
      () => props.data,
      (val) => {
        data = props.data;
      }
    );


    watch(
      () => props.error,
      (val) => {
        error = props.error;
      }
    );
    return {
      data,
      error,
      active,
      updateChange,
      renderCountdown,
      handleFinish,
      handSendCode,
      changeVal,
      onBlur,
      onFocus,
      clearVal
    };
  },
})
</script>

<style scoped lang="scss">
// 输入框样式统一处理- 需要外面再包裹一层
#myInput {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s linear;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background: #EDEFF2;
}

#myInput:hover {
  background: #E0E3E7;
}

#myInput:focus-within {
  background: #E0E3E7;
  transition: all 0.1s linear;
}

#myInput[error='true'] {
  background: rgba(245, 63, 63, 0.1);
  transition: all 0.1s linear;
}

#myInput[error='true']:focus-within {
  background: rgba(245, 63, 63, 0.1);
  transition: all 0.1s linear;
}

#myInput input {
  height: 56px;
  width: 280px;
  font-family: 'sf-pro-display_medium_500';
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  box-sizing: border-box;
  color: #191B1F;
  background: transparent;
  caret-color: #1A72F6;
  flex: 1;
  width: calc(100%);
  font-size: 16px;
}

#myInput input {
  padding: 0 16px;
  box-sizing: border-box;
}

#myInput[disabled='true'] {
  background: #EDEFF2;
}

#myInput input::placeholder {
  font-family: 'sf-pro-display_regular_400';
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  color: #737A86;
}

#myInput input::-webkit-input-placeholder {
  font-family: 'sf-pro-display_regular_400';
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  color: #737A86;
}

/* WebKit browsers */
::-webkit-input-placeholder {
  color: #737A86;
}

/* Mozilla Firefox 4 to 18 */
:-moz-placeholder {
  color: #737A86;
}

/* Mozilla Firefox 19+ */
::-moz-placeholder {
  color: #737A86;
}

/* Internet Explorer 10+ */
:-ms-input-placeholder {
  color: #737A86;
}

.error-tip {
  font-family: 'sf-pro-display_regular_400';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
  color: #F53F3F;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  word-wrap: normal;
}

.error-tip-show {
  max-height: 28px;
}

.suffix {
  font-family: 'sf-pro-display_regular_400';
  font-style: normal;
  font-size: 16px;
  line-height: 19.2;
  color: #0260E7;
  cursor: pointer;
  padding-right: 16px;
  white-space: nowrap;

  position: relative;
  top: 1px;

  .send_code {
    cursor: auto;
    color: #B7BCC5;
  }
}

.code_text {
  position: relative;
  top: 0px;
}

.clear_icon {
  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: 16px;
  }
}

.countdown {
  font-family: 'sf-pro-display_regular_400';
  font-style: normal;
  font-size: 14px;
  line-height: 120%;
  color: #7C7C82;
  min-width: 20px;
}
</style>
