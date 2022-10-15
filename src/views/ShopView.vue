<template>
    <ShopComponent :items="items" @purchase="purchase(item, $event)"/>
</template>

<script>
import ShopComponent from '@/components/ShopComponent.vue'
export default {

    metaInfo: {
        title: 'Shop - Toksan'
    },
    
    computed: {
        items() {
            return this.$store.state.items.filter(item => item.shopItem === true);
        },
    },
    components: { ShopComponent }
}
</script>

<style>

</style>