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
    <section class="hero-section" data-aos="fade-down">
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

    <section class="benefits-section" data-aos="fade-up">
      <h2 class="section-title">预期收益</h2>
      <div class="benefits-grid">
        <div
          v-for="(benefit, index) in overview.expectedBenefits"
          :key="index"
          class="benefit-card"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
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

    <section class="flow-section" data-aos="fade-up">
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
          :data-aos="'fade-up'"
          :data-aos-delay="index * 80"
        >
          <div class="step-icon-wrapper" :style="{ background: step.color }">
            <component :is="stepIcons[index]" :size="18" />
          </div>
          <div class="step-content">
            <div class="step-name" :style="{ color: step.color }">{{ step.name }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
          <div v-if="index < overview.businessProcess.length - 1" class="step-connector">
            <ChevronRight :size="20" />
          </div>
        </div>
      </div>
    </section>

    <section class="roles-section" data-aos="fade-up">
      <h2 class="section-title">
        <Users :size="24" />
        角色协作关系
      </h2>
      <div class="roles-tabs" role="tablist">
        <button
          v-for="(role, index) in overview.roles"
          :key="index"
          class="role-tab"
          :class="{ 'is-active': activeRole === index }"
          @click="activeRole = index"
          role="tab"
          :aria-selected="activeRole === index"
        >
          <span class="tab-avatar">{{ role.avatar }}</span>
          <span class="tab-name">{{ role.name }}</span>
        </button>
      </div>
      <div class="role-detail" data-aos="fade-up" :data-aos-key="activeRole">
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

/* ─── Hero ─── */
.hero-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-6);
  align-items: center;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: var(--r-lg);
  padding: var(--s-6) var(--s-5);
  margin-bottom: var(--s-6);
  overflow: hidden;
  position: relative;
}

@media (min-width: 640px) {
  .hero-section {
    grid-template-columns: 1fr auto;
    padding: var(--s-6);
  }
}

.hero-content {
  min-width: 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  margin-bottom: var(--s-4);
}

.hero-title {
  font-size: clamp(24px, 5vw, 40px);
  font-weight: 700;
  color: #fff;
  margin: 0 0 var(--s-3) 0;
  line-height: 1.15;
}

.hero-subtitle {
  font-size: clamp(14px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
}

.hero-graphic {
  display: none;
  position: relative;
  height: 180px;
  width: 180px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .hero-graphic {
    display: flex;
  }
}

@media (min-width: 480px) and (max-width: 639px) {
  .hero-graphic {
    display: flex;
    height: 140px;
    width: 140px;
    justify-self: center;
  }
}

.graphic-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.circle-1 {
  width: 160px;
  height: 160px;
  animation: pulse 3s ease-in-out infinite;
}

.circle-2 {
  width: 130px;
  height: 130px;
  animation: pulse 3s ease-in-out infinite 0.5s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  animation: pulse 3s ease-in-out infinite 1s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.graphic-center {
  width: 70px;
  height: 70px;
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
  width: 32px;
  height: 32px;
}

/* ─── Section title ─── */
.section-title {
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 var(--s-2) 0;
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.section-desc {
  color: var(--c-text-muted);
  margin: 0 0 var(--s-4) 0;
  font-size: clamp(13px, 1.6vw, 15px);
  line-height: 1.6;
}

/* ─── Benefits ─── */
.benefits-section {
  margin-bottom: var(--s-6);
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-4);
}

@media (min-width: 480px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.benefit-card {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  padding: var(--s-5);
  border: 1px solid var(--c-border);
  transition: transform var(--t-fast), box-shadow var(--t-normal);
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: var(--s-4);
}

.benefit-value {
  font-size: clamp(22px, 3.5vw, 30px);
  font-weight: 700;
  color: var(--c-text-primary);
  margin-bottom: var(--s-1);
}

.benefit-metric {
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  color: var(--c-primary);
  margin-bottom: var(--s-2);
}

.benefit-desc {
  font-size: clamp(12px, 1.4vw, 13px);
  color: var(--c-text-muted);
  line-height: 1.5;
}

/* ─── Flow ─── */
.flow-section {
  margin-bottom: var(--s-6);
}

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

@media (min-width: 768px) {
  .flow-container {
    flex-direction: row;
    gap: var(--s-3);
  }
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: var(--s-3);
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  padding: var(--s-4);
  border: 1px solid var(--c-border);
  position: relative;
  transition: transform var(--t-fast), box-shadow var(--t-fast);
  flex: 1;
}

.flow-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .flow-step {
    min-width: 0;
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

.step-content {
  min-width: 0;
  flex: 1;
}

.step-name {
  font-weight: 600;
  font-size: clamp(14px, 1.6vw, 15px);
  margin-bottom: var(--s-1);
}

.step-desc {
  font-size: clamp(12px, 1.3vw, 13px);
  color: var(--c-text-muted);
  line-height: 1.5;
}

.step-connector {
  display: none;
  color: var(--c-text-light);
  flex-shrink: 0;
  align-self: center;
}

@media (min-width: 768px) {
  .step-connector {
    display: flex;
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
}

/* ─── Roles ─── */
.roles-section {
  margin-bottom: var(--s-5);
}

.roles-tabs {
  display: flex;
  gap: var(--s-2);
  margin-bottom: var(--s-4);
  overflow-x: auto;
  padding-bottom: var(--s-2);
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.role-tab {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: 12px var(--s-4);
  background: var(--c-bg-card);
  border: 2px solid var(--c-border);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all var(--t-fast);
  font-family: inherit;
  white-space: nowrap;
  min-height: 48px;
  scroll-snap-align: start;
  flex-shrink: 0;
}

.role-tab:hover {
  border-color: var(--c-border-light);
}

.role-tab.is-active {
  border-color: var(--c-primary);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
}

.tab-avatar {
  font-size: clamp(20px, 3vw, 24px);
}

.tab-name {
  font-weight: 600;
  color: var(--c-text-secondary);
  font-size: clamp(13px, 1.5vw, 14px);
}

.role-detail {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.role-header {
  display: flex;
  align-items: center;
  gap: var(--s-4);
  padding: var(--s-5);
  background: linear-gradient(135deg, var(--c-bg-muted) 0%, var(--c-bg-page) 100%);
  border-bottom: 1px solid var(--c-border);
}

.role-avatar-large {
  font-size: 36px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .role-avatar-large {
    font-size: 48px;
    width: 72px;
    height: 72px;
  }
}

.role-name {
  font-size: clamp(17px, 2.5vw, 20px);
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 4px 0;
}

.role-count {
  font-size: clamp(13px, 1.5vw, 14px);
  color: var(--c-text-muted);
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: var(--c-border);
}

@media (min-width: 768px) {
  .role-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.role-card {
  background: var(--c-bg-card);
  padding: var(--s-5);
}

.role-card-title {
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 600;
  color: var(--c-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 var(--s-4) 0;
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
  gap: var(--s-2);
  padding: var(--s-2) 0;
  font-size: clamp(13px, 1.5vw, 14px);
  color: var(--c-text-secondary);
  line-height: 1.5;
}

.list-dot {
  width: 6px;
  height: 6px;
  min-width: 6px;
  background: var(--c-primary);
  border-radius: 50%;
  margin-top: 7px;
}

.pain-dot {
  background: var(--c-danger);
}

.collaboration-card {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%);
}

.collaboration-text {
  font-size: clamp(14px, 1.6vw, 15px);
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}
</style>
