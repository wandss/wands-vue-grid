<template>
    <div class="col-sm-3" title="title">
        <button>
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
}

</style>
