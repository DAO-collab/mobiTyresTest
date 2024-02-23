<template>
        <label :for="labelPurpose">{{ labelText }}</label>
        <input :id="inputID" :name="inputName" required placeholder="" :class="inputClass" :type="inputType" :value="inputValue">
</template>

<script lang="ts" setup>

// defineProps<{
//   msg: string
// }>()

defineProps(["labelPurpose", "labelText", "inputName", "inputID", "inputType", "inputClass", "inputValue"])

</script>

<style lang="scss" scoped>

                   
label{
    font-size: 1.2rem;
}


input{
    background-color: transparent;
    padding: 1rem .4rem;
    border: 1px solid rgba(49, 43, 43, 0.375);
    font-weight: 400;
    font-size: 1.4rem;
    width: 100%;
    color: black;
    margin-bottom: 2rem;
    
    &:focus{
        outline: none;
        border: 1px solid rgb(0, 0, 0);
    }
}


</style>