<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AOS from 'aos'
import {
  LayoutDashboard,
  BarChart3,
  Store,
  Bot,
  Menu,
  X,
  Pill,
  ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(true)
const mobileMenuOpen = ref(false)

router.afterEach(() => {
  nextTick(() => {
    AOS.refresh()
  })
})

const iconComponents = {
  LayoutDashboard,
  BarChart3,
  Store,
  Bot
}

const navItems = [
  { path: '/overview', name: '项目概览', icon: 'LayoutDashboard' },
  { path: '/hq-dashboard', name: '总部运营', icon: 'BarChart3' },
  { path: '/store-dashboard', name: '门店工作台', icon: 'Store' },
  { path: '/agent-chat', name: '智能体交互', icon: 'Bot' }
]

const currentRouteName = computed(() => {
  const item = navItems.find(i => i.path === route.path)
  return item ? item.name : '药房智能体解决方案'
})

const navigateTo = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const isActive = (path) => route.path === path
</script>

<template>
  <div class="app-layout">
    <div
      class="mobile-overlay"
      :class="{ 'is-open': mobileMenuOpen }"
      @click="mobileMenuOpen = false"
    ></div>

    <aside class="sidebar" :class="{ 'is-collapsed': !sidebarOpen, 'is-mobile-open': mobileMenuOpen }">
      <div class="sidebar-header">
        <div class="logo">
          <Pill class="logo-icon" :size="24" />
          <span v-show="sidebarOpen" class="logo-text">药房智能体</span>
        </div>
        <button class="mobile-close-btn" @click="mobileMenuOpen = false" aria-label="关闭菜单">
          <X :size="20" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <div
          v-for="item in navItems"
          :key="item.path"
          class="nav-item"
          :class="{ 'is-active': isActive(item.path) }"
          @click="navigateTo(item.path)"
          role="button"
          tabindex="0"
        >
          <component :is="iconComponents[item.icon]" :size="20" class="nav-icon" />
          <span v-show="sidebarOpen" class="nav-text">{{ item.name }}</span>
          <ChevronRight v-show="sidebarOpen && isActive(item.path)" :size="16" class="nav-arrow" />
        </div>
      </nav>

      <div v-show="sidebarOpen" class="sidebar-footer">
        <div class="version-badge">v1.0.0 Demo</div>
        <div class="footer-text">作业演示系统</div>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-header">
        <div class="header-left">
          <button class="mobile-menu-btn" @click="mobileMenuOpen = true" aria-label="打开菜单">
            <Menu :size="24" />
          </button>
          <button class="collapse-btn" @click="toggleSidebar" aria-label="切换侧边栏">
            <Menu :size="20" />
          </button>
          <h1 class="page-title">{{ currentRouteName }}</h1>
        </div>
        <div class="header-right">
          <div class="user-info">
            <span class="user-avatar" role="img" aria-label="用户头像">👤</span>
            <span class="user-name">演示用户</span>
          </div>
        </div>
      </header>

      <div class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100dvh;
  background-color: var(--c-bg-page);
}

/* ─── Sidebar (mobile-first: hidden off-screen) ─── */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100dvh;
  background: linear-gradient(180deg, var(--c-bg-sidebar-start) 0%, var(--c-bg-sidebar-end) 100%);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transform: translateX(-100%);
  transition: transform var(--t-normal);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.sidebar.is-mobile-open {
  transform: translateX(0);
}

@media (min-width: 769px) {
  .sidebar {
    transform: none;
    width: 240px;
    transition: width var(--t-normal);
  }
  .sidebar.is-collapsed {
    width: 72px;
  }
}

/* ─── Mobile overlay ─── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--t-normal), visibility var(--t-normal);
}

.mobile-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

/* ─── Sidebar inner ─── */
.sidebar-header {
  padding: var(--s-5) var(--s-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  color: #fff;
  min-height: 44px;
}

.logo-icon {
  color: var(--c-primary);
  flex-shrink: 0;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--c-text-light);
  cursor: pointer;
  width: 44px;
  height: 44px;
  padding: 8px;
}

@media (min-width: 769px) {
  .mobile-close-btn {
    display: none;
  }
}

.sidebar-nav {
  flex: 1;
  padding: var(--s-3) var(--s-2);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: 14px 12px;
  margin: 4px 0;
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: all var(--t-fast);
  color: var(--c-text-light);
  min-height: 48px;
  user-select: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

.nav-item.is-active {
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.2) 0%, transparent 100%);
  color: var(--c-primary);
  border-left: 3px solid var(--c-primary);
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.nav-arrow {
  margin-left: auto;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: var(--s-4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.version-badge {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(34, 197, 94, 0.2);
  color: var(--c-primary);
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.footer-text {
  color: var(--c-text-light);
  font-size: 12px;
}

/* ─── Main content (mobile-first: full width) ─── */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

@media (min-width: 769px) {
  .main-content {
    margin-left: 240px;
    width: calc(100% - 240px);
    transition: margin-left var(--t-normal), width var(--t-normal);
  }
  .sidebar.is-collapsed ~ .main-content {
    margin-left: 72px;
    width: calc(100% - 72px);
  }
}

/* ─── Top header ─── */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--s-4);
  height: 56px;
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}

@media (min-width: 769px) {
  .top-header {
    height: 64px;
    padding: 0 var(--s-5);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  min-width: 0;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  color: var(--c-text-secondary);
  cursor: pointer;
  flex-shrink: 0;
}

@media (min-width: 769px) {
  .mobile-menu-btn {
    display: none;
  }
}

.collapse-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  color: var(--c-text-muted);
  cursor: pointer;
  border-radius: var(--r-sm);
  transition: all var(--t-fast);
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: var(--c-bg-muted);
  color: var(--c-text-primary);
}

@media (min-width: 769px) {
  .collapse-btn {
    display: flex;
  }
}

.page-title {
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 600;
  color: var(--c-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: 6px 12px;
  background: var(--c-bg-muted);
  border-radius: var(--r-sm);
}

.user-avatar {
  font-size: 18px;
}

.user-name {
  font-size: clamp(12px, 1.4vw, 14px);
  color: var(--c-text-secondary);
  font-weight: 500;
}

@media (max-width: 480px) {
  .user-name {
    display: none;
  }
}

/* ─── Content area ─── */
.content-area {
  flex: 1;
  padding: var(--s-4);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(var(--s-4) + env(safe-area-inset-bottom, 0));
}

@media (min-width: 769px) {
  .content-area {
    padding: var(--s-5);
    padding-bottom: calc(var(--s-5) + env(safe-area-inset-bottom, 0));
  }
}
</style>
