<template>
  <div class="datepicker-container position-relative">
    <Datepicker startingView="month"
                :upperLimit="maxDate"
                :lowerLimit="minDate"
                id="date"
                v-model="(holidayDate)"
                inputFormat="dd-MM-yyyy"
                name="date"
                @click="clearDateValidity"
                @blur="updateDate"/>
    <font-awesome-icon
      :icon="['fas', 'calendar']"/>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import ListsMixin from '@/mixins/ListsMixin'

export default {
  name: 'BaseDateInput',
  components: {
    Datepicker
  },
  mixins: [ListsMixin],
  props: ['year', 'holidayDate'],
  emits: ['updateDate'],
  methods: {
    updateDate($event) {
      const convertedDate = new Date($event.target.value.split('-').reverse().join('-'))
      this.$emit('updateDate', convertedDate)
    }
  }
}
</script>

<style lang="scss" scoped>

.fa-calendar {
  color: $base-color;
  position: absolute;
  top: 25%;
  right: 1rem;
}

</style>
