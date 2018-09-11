<template>
    <div class="form-group">
        <label>
            {{label}}
        </label>
        <div :class="{'input-group':limit!==undefined}">
            <input @input="$emit('input', $event.target.value)"
             class="form-control" :type="type" 
             :placeholder="placeholder" 
             :disabled="disabled"
             :maxlength="limit"
             :value="value"
            />
            <span v-if="limit !== undefined" 
             :class="['input-group-addon',{'outOfSpace':value.length===limit}]">
             {{limit - value.length}}
            </span>
        </div>
    </div>
</template>
<script>
    export default{
        name:'AppInput',
        props:{
            type:{
                type:String,
                required:true,
                default:'text',
            },
            label:{
                type:String,
                default:'Nome do Input',
            },
            placeholder:{
                type:String,
            },
            disabled:{
                type:Boolean,
                default:false,
            },
            limit:{
                type:Number,
            },
            value:{
                default:'',
            }
        },
    }
</script>
<style scoped>
input{
    margin-right:1rem;
    border-radius:0;
}
span{
    border-radius:0;
}
.outOfSpace{
    border-color:red;
    color:red;
}

</style>
