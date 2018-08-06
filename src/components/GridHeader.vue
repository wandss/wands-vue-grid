<template>
    <thead>
        <tr>
            <th v-for="(item, index) in getHeader" :key="index"
<<<<<<< HEAD
             @click="$emit('sort', item)">
                <i class="fa fa-sort">
                {{item}}
                </i >
                <div id="hidecol" @click="$emit('hideColumn', item)">
                    <i class="fa fa-eye-slash"></i>
=======
             @click.prevent.self="$emit('sort', item)">
                <span class="fa fa-sort">
                {{item}}
                </span>
                <div id="hideColumn" @click="$emit('hideColumn', item)">
                    <i class='fa fa-eye-slash'></i>
>>>>>>> 578b7147b0d04c9e1753cfcfa4bbdfa5be343b9d
                </div>
            </th>
        </tr>
        </thead>
    </template>
<script>
    export default{
        name:'GridHeader',
        props:['gridData'],
        data(){
            return{
                headerData:undefined,
            }
        },
        computed:{
            getHeader(){
                return Object.keys(this.gridData[0]);
            },
        },
  }
</script>
<style scoped>
tr{
    cursor:pointer;
}
th{
    text-transform:capitalize;
}
<<<<<<< HEAD
#hidecol{
    float:right;
}
#hidecol:hover{
=======
#hideColumn{
    float:right;
    font-size:1.5rem;
}
#hideColumn:hover{
>>>>>>> 578b7147b0d04c9e1753cfcfa4bbdfa5be343b9d
    opacity:.8;
}
</style>
