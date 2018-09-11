<template>
    <button :type="type" :class="['btn', cssClass]" 
     :style="btnGroup" :disabled="disabled"
     @click="$emit('click')" @mouseover="$emit('mouseover')">
        <i v-if="icon" :class="icon"></i>
         {{name}}
    </button>
</template>
<script>
    export default{
        name:'AppButton',
        props:{
            name:{
                type:String,
                required:true,
                default:'Default Name',
            },
            type:{
                type:String,
                default:'button',
            },
            cssClass:{
                type:String,
                default:'btn-default',
            },
            icon:{
                type:String
            },
            isGroup:{
                type:Boolean,
                default:false,
            },
            disabled:{
                type:Boolean,
                default:false,
            }
        },
        computed:{
            btnGroup(){
                const btnGroupStyle = {'margin-right':'1rem'};
                if(!this.isGroup){
                    return btnGroupStyle
                }

            }
        }
    }
</script>
<style scoped>
button{
    border-radius:0;
}
</style>
