<template>
    <thead>
        <tr>
            <th v-for="item in getHeader" :key="item"
             @click="$emit('click', item)">
                {{item}}
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
<style>
</style>
