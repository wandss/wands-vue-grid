<template>
  <div>
    <Grid :gridData="gridData"/>
  </div>
</template>
<script>
    import Grid from './components/Grid';
    export default{
        name:'APP',
        components:{Grid, },
        data(){
            return{
                gridData:[
                {ID:'183', User:'John Doe',
                    Date:'11-07-2014',Status:'Aproved'},
                {ID:'219', User:'Alexander Pierce',
                    Date:'11-07-2014',Status:'Pending'},
                ]
            }
    }
}
</script>
<style>
    @import './assets/css/bootstrap.min.css';
</style>
