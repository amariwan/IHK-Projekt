<template>
  <nav :class="`nav navbar navbar-expand-lg navbar-light iq-navbar ${headerNavbar}`">
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <div class="input-group search-input" v-if="isSearch">
        <span class="input-group-text" id="search-input">
          <icon-component type="outlined" :size="18" icon-name="search"></icon-component>
        </span>
        <input type="search" class="form-control" placeholder="Search..." />
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <span class="mt-2 navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
          <li class="nav-item dropdown">
            <a href="#" class="nav-link" id="notification-drop" data-bs-toggle="dropdown">
              <icon-component type="dual-tone" icon-name="bell"></icon-component>
              <span class="bg-danger dots"></span>
            </a>
            <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="notification-drop">
              <b-card no-body class="m-0 shadow-none">
                <div class="py-3 card-header d-flex justify-content-between bg-primary">
                  <b-card-title>
                    <h5 class="mb-0 text-white">All Notifications</h5>
                  </b-card-title>
                </div>
                <b-card-body class="p-0">
                  <a href="#" class="iq-sub-card">
                    <div class="d-flex align-items-center">
                      <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="@/assets/images/shapes/01.png" alt="" />
                      <div class="ms-3 w-100">
                        <h6 class="mb-0">Emma Watson Bni</h6>
                        <div class="d-flex justify-content-between align-items-center">
                          <p class="mb-0">95 MB</p>
                          <small class="float-end font-size-12">Just Now</small>
                        </div>
                      </div>
                    </div>
                  </a>
                </b-card-body>
              </b-card>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link" id="mail-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <icon-component type="dual-tone" icon-name="message"></icon-component>
              <span class="bg-primary count-mail"></span>
            </a>
            <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="mail-drop">
              <b-card no-body class="m-0 shadow-none">
                <div class="py-3 card-header d-flex justify-content-between bg-primary">
                  <b-card-title>
                    <h5 class="mb-0 text-white">All Message</h5>
                  </b-card-title>
                </div>
                <b-card-body class="p-0">
                  <a href="#" class="iq-sub-card">
                    <div class="d-flex align-items-center">
                      <div class="">
                        <img class="avatar-40 rounded-pill bg-soft-primary p-1" src="@/assets/images/shapes/01.png" alt="" />
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">Bni Emma Watson</h6>
                        <small class="float-start font-size-12">13 Jun</small>
                      </div>
                    </div>
                  </a>
                </b-card-body>
              </b-card>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="@/assets/images/avatars/avtar_1.png" alt="User-Profile" class="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="@/assets/images/avatars/avtar_2.png" alt="User-Profile" class="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="@/assets/images/avatars/avtar_4.png" alt="User-Profile" class="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="@/assets/images/avatars/avtar_5.png" alt="User-Profile" class="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
              <img src="@/assets/images/avatars/avtar_3.png" alt="User-Profile" class="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
              <div class="caption ms-3 d-none d-md-block">
                <h6 class="mb-0 caption-title">Aland Mariwan</h6>
                <p class="mb-0 caption-sub-title">dev</p>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{ name: 'default.user-profile' }">Profile</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'default.user-privacy-setting' }">Privacy Setting</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link class="dropdown-item" :to="{ name: 'auth.login' }">Logout</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {},
  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const isHidden = ref(false)

    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector('.navs-sticky')
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add('menu-sticky')
        } else {
          navbar.classList.remove('menu-sticky')
        }
      }
    }

    const carts = computed(() => store.getters.carts)

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())
    })
    return {
      headerNavbar,
      isHidden,
      carts,
      emit
    }
  }
}
</script>
