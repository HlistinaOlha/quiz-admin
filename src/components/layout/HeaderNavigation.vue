<template>
  <nav v-if="isAuthenticated" class="navbar mb-3 d-flex align-items-center justify-content-start">
    <div class="container d-flex flex-column align-items-start justify-content-between">
      <ul ref="navigation" class="header-nav d-flex flex-wrap align-items-center">
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0);">
            <span class="material-symbols-outlined menu-icon">menu_book</span>
            <span class="menu-title">General</span>
            <span class="material-symbols-outlined menu-arrow">expand_more</span>
          </a>
          <ul class="submenu">
            <li class="nav-item submenu-item-container">
              <p class="category-heading menu-title nav-link ">
                <span class="material-symbols-outlined menu-icon">play_shapes</span>Quiz</p>
              <ul class="submenu-item submenu">
                <li class="nav-item">
                  <router-link :to="{name: 'quizDashboard'}" class="nav-link">
                    <span class="material-symbols-outlined menu-icon">monitoring</span>
                    <span class="menu-title">Dashboard</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'quizCategories'}" class="nav-link">
                    <span class="material-symbols-outlined menu-icon">difference</span>
                    <span class="menu-title">Categories</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'quizQuizzes'}" class="nav-link">
                    <span class="material-symbols-outlined menu-icon">stadia_controller</span>
                    <span class="menu-title">Quizzes</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{name: 'quizQuestions'}" class="nav-link">
                    <span class="material-symbols-outlined menu-icon">help</span>
                    <span class="menu-title">Questions</span>
                  </router-link>
                </li>
                <li class="nav-item submenu-item-container">
                  <p class="category-heading menu-title nav-link ">
                    <span class="material-symbols-outlined menu-icon">mark_chat_unread</span>Chat</p>
                  <ul class="submenu-item submenu">
                    <li class="nav-item">
                      <router-link :to="{name: 'quizUserScores'}" class="nav-link">
                        <span class="material-symbols-outlined menu-icon">social_leaderboard</span>
                        <span class="menu-title">User Scores</span>
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link :to="{name: 'quizChatHistory'}" class="nav-link">
                        <span class="material-symbols-outlined menu-icon">history_edu</span>
                        <span class="menu-title">Chat History</span>
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0);">
            <span class="material-symbols-outlined menu-icon">settings</span>
            <span class="menu-title">Settings</span>
            <span class="material-symbols-outlined menu-arrow d-inline-block">expand_more</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from '@/store'

export default {
  name: 'HeaderNavigation',
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background: $navbar-bg-color;
  border-right-color: transparent;
  padding: 0 calc(1.5rem / 2);
  -webkit-box-shadow: 0 2px 4px rgba(15, 34, 58, .12);
  box-shadow: 0 2px 4px rgba(15, 34, 58, .12);
  width: 100%;
}

.menu-icon{
  font-size: 1.25rem;
  margin-right: 10px;
}

.menu-icon, .menu-arrow {
  font-weight: $font-weight-normal;
}

.menu-arrow {
  margin-left: 5px;
  transform: rotate(0deg);
  transform-origin: center;
  transition-duration: .25s;
}

.nav-item:hover > .nav-link .menu-arrow {
  transform: rotate(-180deg);
}

.submenu-item .menu-icon {
  color: $menu-icon-color;
}

.header-nav {
  width: 100%;
  transition-duration: .2s;
  transition-property: background, box-shadow;
  font-size: $secondary-font-size;
}

.header-nav .nav-link {
  display: flex;
  align-items: center;
  padding: $nav-link-padding;
}

.header-nav .nav-item:first-of-type .nav-link {
  padding-left: 0;
}

.submenu {
  display: none;
  position: absolute;
  top: 16px;
  right: 0;
  left: 1.5rem;
  width: 14rem;
  z-index: 999;
  background: #fff;
  border-top: none;
  -webkit-animation-name: dropdownAnimation;
  animation-name: dropdownAnimation;
  -webkit-animation-duration: .25s;
  animation-duration: .25s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  box-shadow: 0 0 15px 1px rgba(69, 65, 78, .2);
  border-radius: 5px;
  -webkit-transform: translateY(2rem);
  transform: translateY(2rem);
  transition: -webkit-transform .2s ease-in;
  -webkit-transition: opacity .3s linear;
  -moz-transition: opacity .3s linear;
  -o-transition: opacity .3s linear;
  transition: opacity .3s linear;
}

.header-nav .submenu .nav-item .nav-link {
  padding: 0.7rem 1rem;
}

.submenu:hover {
  display: block;
}

.submenu .nav-item {
  margin: 0;
  width: 100%;
  position: relative;
}

.submenu .nav-link {
  padding: 0.75rem 1rem;
}

.submenu .nav-item {
  padding: 0;
}

.submenu-item-container p:after {
  content: "arrow_forward_ios";
  font-family: Material Symbols Outlined, serif;
  position: absolute;
  right: 18px;
}

.submenu-item {
  left: 14rem;
  top: -34px;
}

.submenu-item .nav-link {
  color: #000;
  text-decoration: none;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  -webkit-transition-duration: .2s;
  transition-duration: .2s;
  -webkit-transition-property: background;
  transition-property: background;
  border-radius: 6px;
}

.submenu-item .nav-item:hover > .nav-link .menu-title,
.submenu .nav-item:hover > .nav-link .menu-icon {
  color: #3f50f6;
  -webkit-transition: color .1s linear;
  transition: color .1s linear;
}

.submenu-item .nav-link:hover:before {
  background: #3f50f6;
}

.submenu-item .nav-link:hover .nav-link {
  color: $base-color;
}

.submenu .nav-item:hover > .nav-link .menu-title, .submenu .nav-item:hover > .menu-title {
  color: #3f50f6;
}

.submenu .category-heading {
  font-size: .875rem;
  text-align: left;
  margin: 0;
}

.submenu-item .nav-item .menu-title {
  color: $menu-icon-color;
}

.nav-item {
  position: relative;
}

.submenu .nav-item:after {
  content: "";
  left: 0;
  top: 0;
  bottom: 0;
  border-left: 5px solid #3f50f6;
  position: absolute;
  opacity: 0;
  transition: all .3s ease-in-out;
}

.submenu .nav-item:hover:after {
  opacity: 1;
}

.submenu-item .nav-item:hover:after {
  opacity: 0;
}

.nav-item:hover > .nav-link .menu-title,
.nav-item:hover > .nav-link .menu-arrow,
.nav-item:hover > .nav-link .menu-icon {
  color: #97a0fa;
  -webkit-transition: color 1s ease;
  transition: color 1s ease;
}

.nav-item:hover > .submenu {
  display: block;
}
</style>
