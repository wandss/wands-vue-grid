<template>
    <tbody>
        <tr id="row" v-for="(data, index) in gridData" :key="index"> 
            <td v-for="item in data" :key="item" @click="$emit('click', data)">
                {{item}}
            </td>
        </tr>
    </tbody>
</template>
<script>
    export default{
        name:'GridRows',
        props:['gridData'],
    }
</script>
<style>
#row{
    cursor:pointer;
}
</style>
