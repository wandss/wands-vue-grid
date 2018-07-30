<template>
  <div>
      <table class="table table-bordered table-striped">
          <GridHeader :gridData="getGrid" @click="sortBy" />
          <GridRows :gridData="getGrid" @click="getRow" @getAction="getAction"/>
      </table>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    export default{
        name:'Grid',
        props:['gridData','hasActionButtons','confirmDelete'],
        components:{GridHeader, GridRows },
        data(){
            return {
                sortedBy:'',
                chosenItem:undefined,
            }
        },
        created(){
        },
        computed:{
            getGrid(){
                const grid = this.gridData.slice()
                if(this.hasActionButtons){
                    grid.forEach((item)=>item['Action']='actionButtons')
                }
                if(this.confirmDelete){
                    console.log('Remove item and update Grid')

                }
                return this.grid = grid
            }
        },
        methods:{
            getRow(item){
            // eslint-disable-next-line
                console.log(item)
            // eslint-disable-next-line
                console.log(item.id)
                this.chosenItem=item;
            },
            getAction(item, action){
                if(action === 'deletebtn'){
                    this.$emit('deleteItem',item)
                }
            },
            sortBy(col){
            // eslint-disable-next-line
                const newGrid = this.grid.slice();

                if(col === this.sortedBy){
                    newGrid.reverse((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                else{
                    newGrid.sort((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                this.grid = newGrid;
                this.sortedBy = col;
            }
        }
  }
</script>
<style>
</style>
