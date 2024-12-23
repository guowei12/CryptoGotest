/// <reference types="vite/client" />
declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  export { }
  declare module 'vue' {
    interface ComponentCustomProperties {
      $newUrl: any
    }
    interface ComponentCustomProperties {
      $copyBtn: any
    }
    interface ComponentCustomProperties {
      $failToast: any
    }
    interface ComponentCustomProperties {
      $closeToast: any
    }
    interface ComponentCustomProperties {
      $successToast: any
    }
    interface ComponentCustomProperties {
      $moment: any
    }
  }
  
  