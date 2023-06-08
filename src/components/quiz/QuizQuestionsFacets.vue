<template>
  <base-card class="questions-facets-container ms-0 me-0 p-0">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h4 class="h4 facets-title">Filters</h4>
        </div>
        <div class="flex-shrink-0">
          <a href="#" class="text-decoration-underline facets-link"
             id="clearall"
             @click="clearSelectedOptions"
          >Clear All</a>
        </div>
      </div>
      <div class="choices mt-3" v-if="hasSelectedOptions">
        <div class="choices-list d-inline-block">
          <div class="choices-item"
               v-for="option in selectedOptions">{{ option.value }}
            <base-button type="button" mode="close" @click="removeSelectedOption(option)">
              <font-awesome-icon
                :icon="['fas', 'xmark']"/>
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion accordion-flush filter-accordion" v-if="hasFacets">
      <div class="accordion-item" v-for="facet in facets">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent shadow-none" type="button">
            <span class="text-muted text-uppercase">{{ facet.name }}</span>
            <span class="badge rounded-pill align-middle ms-1 filter-badge">1</span>
          </button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body text-body pt-1">
            <div class="d-flex flex-column gap-2 filter-check">
              <div class="form-check"
                   v-for="value in facet.values"
                   :key="createCheckboxId(value.name)">
                <base-checkbox :label="value.name"
                               :id="createCheckboxId(value.name)"
                               :checked=isChecked(facet.code,value.name)
                               @update:checked="check(facet.code, value.name, $event)"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingRating">
          <button class="accordion-button bg-transparent shadow-none collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseRating" aria-expanded="false" aria-controls="flush-collapseRating">
            <span class="text-muted text-uppercase fs-12 fw-medium">Rating</span> <span
            class="badge bg-success rounded-pill align-middle ms-1 filter-badge">1</span>
          </button>
        </h2>

        <div id="flush-collapseRating" class="accordion-collapse collapse" aria-labelledby="flush-headingRating">
          <div class="accordion-body text-body">
            <div class="d-flex flex-column gap-2 filter-check">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="4 &amp; Above Star" id="productratingRadio4"
                       checked="">
                <label class="form-check-label" for="productratingRadio4">
                                                            <span class="text-muted">
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star"></i>
                                                            </span> 4 &amp; Above
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="3 &amp; Above Star" id="productratingRadio3">
                <label class="form-check-label" for="productratingRadio3">
                                                            <span class="text-muted">
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                            </span> 3 &amp; Above
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="2 &amp; Above Star" id="productratingRadio2">
                <label class="form-check-label" for="productratingRadio2">
                                                            <span class="text-muted">
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                            </span> 2 &amp; Above
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="1 Star" id="productratingRadio1">
                <label class="form-check-label" for="productratingRadio1">
                                                            <span class="text-muted">
                                                                <i class="mdi mdi-star text-warning"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                                <i class="mdi mdi-star"></i>
                                                            </span> 1
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>-->
      <!-- end accordion-item -->
    </div>
  </base-card>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'QuizQuestionsFacets',
  components: { BaseButton },
  computed: {
    ...mapGetters({
      facets: 'quiz/questionFacets',
      hasFacets: 'quiz/hasQuestionFacets',
      selectedOptions: 'quiz/questionsSelectedOptions',
      hasSelectedOptions: 'quiz/hasQuestionsSelectedOptions'
    }),
    choices() {
      let choices = []
      const keys = ['quizCategory', 'level']
      // choices = this.selectedOptions.map(option => {
      //   option.quizCategory ? option.quizCategory
      // })
    }
  },
  methods: {
    ...mapMutations({
      setSelectedOptions: 'quiz/setQuestionsSelectedOptions',
      addSelectedOption: 'quiz/addQuestionsSelectedOptions',
      removeSelectedOption: 'quiz/removeQuestionsSelectedOptions'
    }),
    async loadQuestionFacets() {
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchQuestionFacets')
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching question facets!'
      }
      this.isLoading = false
    },
    createCheckboxId(value) {
      return `radioBtn${value.split(' ').join('')}`
    },
    isChecked(code, value) {
      return this.selectedOptions.some((obj) => obj.code === code && obj.value === value)
    },
    check(categoryName, optionName, checked) {
      const optionObj = {}
      optionObj.code = categoryName
      optionObj.value = optionName

      if (checked) {
        //const options = this.selectedOptions.push(optionObj)
        this.addSelectedOption(optionObj)
        //this.$store.commit('setQuestionsSelectedOptions', options)

      } else {
        this.removeSelectedOption(optionObj)
      }
      this.$emit('update:value', checked)
    },
    clearSelectedOptions() {
      this.setSelectedOptions([])
    },
    /*  removeOption(optionObj) {
        const options = this.selectedOptions.filter((option) => {
          return !(option.code === optionObj.code && option.value === optionObj.value)
        })
        this.setSelectedOptions(options)
      }*/
  },
  created() {
    this.loadQuestionFacets()
  }
}
</script>

<style scoped lang="scss">

.questions-facets-container {
  max-width: 20rem;
  width: 100%;
  height: max-content;
}

#clearall {
  font-size: $button-font-size;
}

.card-header {
  border-bottom: 1px solid $border-bottom-color;
  background-color: $link-hover-color;
}

.card-header, .card-body {
  padding: 20px;
}

.choices-item {
  //padding-right: 5px;
  display: inline-block;
  vertical-align: initial;
  border-radius: 7px;
  padding: 2px 15px;
  font-size: 11px;
  font-weight: 400;
  margin: 2px 3.75px 3.75px 0;
  background-color: $link-btn-hover-color;
  border: 1px solid $link-btn-hover-color;
  word-break: break-all;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: $link-hover-color;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.close {
  background-color: transparent;
  margin-left: 8px;
  padding-left: 6px;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, .5);
  border-radius: 0;
  font-size: 12px;
  width: 8px;
  line-height: 1;
  opacity: .75;

  &:hover, &:active {
    color: $link-hover-color;
    border-color: $link-hover-color;
    opacity: 1;
  }
}

.form-check-input {
  padding: 6px;

  &:active {
    -webkit-filter: none;
    filter: none;
  }

  &:focus {
    box-shadow: none;
  }
}

.filter-badge {
  background-color: $link-btn-hover-color;
  font-weight: $font-weight-normal;
}

/*.facets-title {
  color: $facets-title-color;
}

.facets-link {
  color: $facets-link-color
}*/
</style>
