<template>
    <div class='props'>
        <table>
        <tr>
            <td>Category</td><td v-html='item.category'></td>
        </tr>
        <tr>
            <td>Posted</td><td :style="{ color:item.young ? 'red' : 'white' }">{{ item.date }}</td>
        </tr>
        <tr>
            <td>Country</td><td>{{ item.country }}</td>
        </tr>
        <tr v-if='item.budget'>
            <td>Budget</td><td>{{ item.budget }}</td>
        </tr>
        <tr v-if='item.hourly'>
            <td>Hourly</td><td>{{ item.hourly }}</td>
        </tr>
        <tr>
            <td>Skills</td><td>
                <div class='skills' v-html='item.skills'></div>
            </td>
        </tr>
        </table>
    </div>
</template>

<script>

export default {
    props: ['item'],
}

</script>

<style scoped>

.props {
  width:280px;
  height:100%;
  padding:10px;
  background-color:rgba(0, 0, 0, 0.25);
  border-radius:10px;
}

td {
    vertical-align: top;
    text-align:left;
    padding:6px 5px;
}

.skills {
    max-height:150px; 
    overflow:hidden;
}


</style>