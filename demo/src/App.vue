<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
          <Pill class="logo-icon" />
          <span v-if="sidebarOpen" class="logo-text">药房智能体</span>
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
        >
          <component :is="iconComponents[item.icon]" :size="20" class="nav-icon" />
          <span v-if="sidebarOpen" class="nav-text">{{ item.name }}</span>
          <ChevronRight v-if="sidebarOpen && isActive(item.path)" :size="16" class="nav-arrow" />
        </div>
      </nav>

      <div v-if="sidebarOpen" class="sidebar-footer">
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
            <span class="user-avatar">👤</span>
            <span class="user-name">演示用户</span>
          </div>
        </div>
      </header>

      <div class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
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
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--c-bg-page);
}

.sidebar {
  width: 240px;
  background: linear-gradient(180deg, var(--c-bg-sidebar-start) 0%, var(--c-bg-sidebar-end) 100%);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  height: 100dvh;
  z-index: 100;
}

.sidebar.is-collapsed {
  width: 72px;
}

.sidebar.is-mobile-open {
  transform: translateX(0);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 260px;
  }
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.sidebar-header {
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
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
  display: none;
  background: none;
  border: none;
  color: var(--c-text-light);
  cursor: pointer;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .mobile-close-btn {
    display: flex;
  }
}

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--c-text-light);
  min-height: 48px;
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
}

.sidebar-footer {
  padding: 16px;
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

.main-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  min-height: 100dvh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

.sidebar.is-collapsed ~ .main-content {
  margin-left: 72px;
}

@media (max-width: 768px) {
  .sidebar.is-collapsed ~ .main-content {
    margin-left: 0;
  }
}

.top-header {
  height: 64px;
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--c-text-secondary);
  cursor: pointer;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--c-text-muted);
  cursor: pointer;
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: var(--c-bg-muted);
  color: var(--c-text-primary);
}

@media (max-width: 768px) {
  .collapse-btn {
    display: none;
  }
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--c-bg-muted);
  border-radius: 8px;
}

.user-avatar {
  font-size: 20px;
}

.user-name {
  font-size: 14px;
  color: var(--c-text-secondary);
  font-weight: 500;
}

.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .content-area {
    padding: 16px;
  }
}
</style>
