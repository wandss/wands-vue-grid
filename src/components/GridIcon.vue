<template>
    <div class="col-sm-3" title="title">
        <button @click="$emit('click')">
            <span :class="icon"></span>
        </button>
    </div>
</template>
<script>
    export default{
        name:"GridIcon",
        props:{
            icon:{
                type:String,
                required:true,
            }
        }
    }
</script>
<style scoped>
button{
    border:none;
    background:transparent;
    font-size:1.7rem;
    outline:none;
}
button:hover{
    opacity:0.7;
}

</style>
