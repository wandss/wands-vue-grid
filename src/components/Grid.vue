<template>
  <div>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="gridData" />
          <GridRows :gridData="gridData" @click="getRow"/>
      </table>    
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    export default{
        name:'Grid',
        props:['gridData'],
        components:{GridHeader,GridRows },
        methods:{
            getRow(item){
            // eslint-disable-next-line
                console.log(item)
                console.log(item.ID)
            }
        }
  }
</script>
<style>
</style>
