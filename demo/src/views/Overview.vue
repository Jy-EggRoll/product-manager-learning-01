<script setup>
import { ref } from 'vue'
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ChevronRight,
  Zap,
  Target,
  BarChart3,
  Bot,
  Eye,
  Search,
  BrainCircuit,
  Send,
  CheckCircle,
  RefreshCw
} from 'lucide-vue-next'
import { projectOverview } from '@/data/mockData'

const activeRole = ref(0)

const overview = projectOverview

const stepIcons = [Eye, Search, BrainCircuit, Send, CheckCircle, RefreshCw]

const iconComponents = {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Zap,
  Target,
  BarChart3
}

const benefitIcons = ['TrendingUp', 'Clock', 'DollarSign', 'Users']
</script>

<template>
  <div class="overview-page">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <Zap :size="16" />
          <span>智能体解决方案</span>
        </div>
        <h1 class="hero-title">{{ overview.title }}</h1>
        <p class="hero-subtitle">{{ overview.subtitle }}</p>
      </div>
      <div class="hero-graphic">
        <div class="graphic-circle circle-1"></div>
        <div class="graphic-circle circle-2"></div>
        <div class="graphic-circle circle-3"></div>
        <div class="graphic-center">
          <Bot class="center-icon" />
        </div>
      </div>
    </section>

    <section class="benefits-section">
      <h2 class="section-title">预期收益</h2>
      <div class="benefits-grid">
        <div
          v-for="(benefit, index) in overview.expectedBenefits"
          :key="index"
          class="benefit-card"
        >
          <div class="benefit-icon">
            <component :is="iconComponents[benefitIcons[index]]" :size="24" />
          </div>
          <div class="benefit-value">{{ benefit.value }}</div>
          <div class="benefit-metric">{{ benefit.metric }}</div>
          <div class="benefit-desc">{{ benefit.desc }}</div>
        </div>
      </div>
    </section>

    <section class="flow-section">
      <h2 class="section-title">
        <Target :size="24" />
        业务闭环流程
      </h2>
      <p class="section-desc">六大环节形成完整自动化闭环，实现"人找药"到"药找人"的转变</p>
      <div class="flow-container">
        <div
          v-for="(step, index) in overview.businessProcess"
          :key="step.step"
          class="flow-step"
        >
          <div class="step-icon-wrapper" :style="{ background: step.color }">
            <component :is="stepIcons[index]" :size="18" />
          </div>
          <div class="step-content">
            <div class="step-name" :style="{ color: step.color }">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
          <ChevronRight v-if="index < overview.businessProcess.length - 1" class="step-arrow" :size="20" />
        </div>
      </div>
    </section>

    <section class="roles-section">
      <h2 class="section-title">
        <Users :size="24" />
        角色协作关系
      </h2>
      <div class="roles-tabs">
        <button
          v-for="(role, index) in overview.roles"
          :key="index"
          class="role-tab"
          :class="{ 'is-active': activeRole === index }"
          @click="activeRole = index"
        >
          <span class="tab-avatar">{{ role.avatar }}</span>
          <span class="tab-name">{{ role.name }}</span>
        </button>
      </div>
      <div class="role-detail">
        <div class="role-header">
          <div class="role-avatar-large">{{ overview.roles[activeRole].avatar }}</div>
          <div>
            <h3 class="role-name">{{ overview.roles[activeRole].name }}</h3>
            <div class="role-count">{{ overview.roles[activeRole].count }}</div>
          </div>
        </div>
        <div class="role-grid">
          <div class="role-card">
            <h4 class="role-card-title">主要职责</h4>
            <ul class="role-list">
              <li v-for="(item, idx) in overview.roles[activeRole].responsibilities" :key="idx">
                <span class="list-dot"></span>
                {{ item }}
              </li>
            </ul>
          </div>
          <div v-if="overview.roles[activeRole].painPoints.length > 0" class="role-card">
            <h4 class="role-card-title pain-title">原有痛点</h4>
            <ul class="role-list">
              <li v-for="(item, idx) in overview.roles[activeRole].painPoints" :key="idx">
                <span class="list-dot pain-dot"></span>
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="role-card collaboration-card">
            <h4 class="role-card-title">与智能体协作模式</h4>
            <p class="collaboration-text">{{ overview.roles[activeRole].collaborationMode }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.overview-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: 20px;
  padding: 48px;
  margin-bottom: 40px;
  overflow: hidden;
  position: relative;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 32px 24px;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
  }
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.hero-graphic {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero-graphic {
    display: none;
  }
}

.graphic-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.circle-1 {
  width: 180px;
  height: 180px;
  animation: pulse 3s ease-in-out infinite;
}

.circle-2 {
  width: 140px;
  height: 140px;
  animation: pulse 3s ease-in-out infinite 0.5s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  animation: pulse 3s ease-in-out infinite 1s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.graphic-center {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.center-icon {
  color: #fff;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-desc {
  color: var(--c-text-muted);
  margin: 0 0 24px 0;
  font-size: 15px;
}

.benefits-section {
  margin-bottom: 48px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  background: var(--c-bg-card);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--c-border);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 16px;
}

.benefit-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--c-text-primary);
  margin-bottom: 4px;
}

.benefit-metric {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-primary);
  margin-bottom: 8px;
}

.benefit-desc {
  font-size: 13px;
  color: var(--c-text-muted);
}

.flow-section {
  margin-bottom: 48px;
}

.flow-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 4px;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 768px) {
  .flow-container {
    flex-direction: column;
  }
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--c-bg-card);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--c-border);
  flex: 1;
  min-width: 160px;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.flow-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .flow-step {
    width: 100%;
    min-width: auto;
  }
}

.step-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.step-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 12px;
  color: var(--c-text-muted);
  line-height: 1.5;
}

.step-arrow {
  color: var(--c-text-light);
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .step-arrow {
    position: static;
    transform: rotate(90deg);
    margin: 8px auto;
    display: block;
  }
}

.roles-section {
  margin-bottom: 24px;
}

.roles-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}

.role-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: var(--c-bg-card);
  border: 2px solid var(--c-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
}

.role-tab:hover {
  border-color: var(--c-border-light);
}

.role-tab.is-active {
  border-color: var(--c-primary);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
}

.tab-avatar {
  font-size: 24px;
}

.tab-name {
  font-weight: 600;
  color: var(--c-text-secondary);
}

.role-detail {
  background: var(--c-bg-card);
  border-radius: 16px;
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.role-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, var(--c-bg-muted) 0%, var(--c-bg-page) 100%);
  border-bottom: 1px solid var(--c-border);
}

.role-avatar-large {
  font-size: 48px;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-card);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.role-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 4px 0;
}

.role-count {
  font-size: 14px;
  color: var(--c-text-muted);
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--c-border);
}

@media (max-width: 1024px) {
  .role-grid {
    grid-template-columns: 1fr;
  }
}

.role-card {
  background: var(--c-bg-card);
  padding: 24px;
}

.role-card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
}

.pain-title {
  color: var(--c-danger);
}

.role-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.role-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: var(--c-text-secondary);
  line-height: 1.5;
}

.list-dot {
  width: 6px;
  height: 6px;
  background: var(--c-primary);
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
}

.pain-dot {
  background: var(--c-danger);
}

.collaboration-card {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%);
}

.collaboration-text {
  font-size: 15px;
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}
</style>
