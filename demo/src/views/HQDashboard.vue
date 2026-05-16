<script setup>
import { ref } from 'vue'
import {
  Activity,
  Users,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Thermometer,
  Newspaper,
  Flower2
} from 'lucide-vue-next'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { hqDashboardData } from '@/data/mockData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const data = hqDashboardData

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
}

const weeklyChartData = {
  labels: data.weeklyChart.labels,
  datasets: data.weeklyChart.datasets.map((ds, idx) => ({
    label: ds.label,
    data: ds.data,
    borderColor: idx === 0 ? '#22c55e' : '#10b981',
    backgroundColor: idx === 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 6
  }))
}

const cardIcons = {
  Activity,
  Users,
  CheckCircle,
  TrendingUp
}

const signalIcons = {
  weather: Thermometer,
  yq: Newspaper,
  season: Flower2
}

const getSeverityBadge = (severity) => {
  const badges = {
    high: { class: 'badge-high', text: '紧急' },
    medium: { class: 'badge-medium', text: '关注' },
    low: { class: 'badge-low', text: '普通' }
  }
  return badges[severity] || badges.low
}

const getStatusBadge = (status) => {
  const badges = {
    running: { class: 'status-running', text: '进行中' },
    completed: { class: 'status-completed', text: '已完成' },
    pending: { class: 'status-pending', text: '待执行' }
  }
  return badges[status] || badges.pending
}
</script>

<template>
  <div class="hq-dashboard">
    <div class="cards-grid">
      <div
        v-for="(card, index) in data.overviewCards"
        :key="index"
        class="stat-card"
      >
        <div class="card-header">
          <component :is="cardIcons[card.icon]" :size="20" class="card-icon" />
          <span class="card-trend" :class="{ 'is-up': card.trendUp }">
            {{ card.trend }}
          </span>
        </div>
        <div class="card-value">{{ card.value }}</div>
        <div class="card-title">{{ card.title }}</div>
      </div>
    </div>

    <div class="main-grid">
      <div class="signals-section">
        <div class="section-header">
          <h3 class="section-title">实时信号感知</h3>
          <button class="view-all-btn">
            查看全部
            <ChevronRight :size="16" />
          </button>
        </div>
        <div class="signals-list">
          <div
            v-for="(signal, index) in data.activeSignals"
            :key="index"
            class="signal-card"
            :style="{ borderLeftColor: signal.color }"
          >
            <div class="signal-header">
              <span class="signal-type">
                <component
                  :is="signalIcons[signal.type === '天气' ? 'weather' : signal.type === '舆情' ? 'yq' : 'season']"
                  :size="12"
                />
                {{ signal.type }}
              </span>
              <span class="signal-time">{{ signal.time }}</span>
            </div>
            <div class="signal-title">
              <AlertTriangle v-if="signal.severity === 'high'" :size="16" :style="{ color: '#dc2626' }" />
              <AlertCircle v-else-if="signal.severity === 'medium'" :size="16" :style="{ color: '#d97706' }" />
              <CheckCircle2 v-else :size="16" :style="{ color: '#16a34a' }" />
              <span>{{ signal.title }}</span>
              <span class="severity-badge" :class="getSeverityBadge(signal.severity).class">
                {{ getSeverityBadge(signal.severity).text }}
              </span>
            </div>
            <p class="signal-desc">{{ signal.desc }}</p>
          </div>
        </div>
      </div>

      <div class="chart-section">
        <div class="section-header">
          <h3 class="section-title">本周触达转化趋势</h3>
        </div>
        <div class="chart-container">
          <Line :data="weeklyChartData" :options="lineChartOptions" />
        </div>
      </div>
    </div>

    <div class="activities-section">
      <div class="section-header">
        <h3 class="section-title">活动管理</h3>
        <div class="header-actions">
          <button class="action-btn primary">新建活动</button>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="activities-table">
          <thead>
            <tr>
              <th>活动名称</th>
              <th>状态</th>
              <th>触发类型</th>
              <th>触达人数</th>
              <th>转化人数</th>
              <th>转化率</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in data.recentActivities" :key="activity.id">
              <td>
                <div class="activity-name">{{ activity.name }}</div>
                <div class="activity-meta">
                  <Clock :size="12" />
                  {{ activity.startTime }} · {{ activity.triggeredBy }}
                </div>
              </td>
              <td>
                <span class="status-badge" :class="getStatusBadge(activity.status).class">
                  {{ getStatusBadge(activity.status).text }}
                </span>
              </td>
              <td>
                <span class="type-badge">{{ activity.type }}</span>
              </td>
              <td class="number-cell">{{ activity.memberCount.toLocaleString() }}</td>
              <td class="number-cell">{{ activity.converted.toLocaleString() }}</td>
              <td>
                <div class="conversion-rate">
                  <div class="rate-bar">
                    <div class="rate-fill" :style="{ width: activity.conversionRate }"></div>
                  </div>
                  <span>{{ activity.conversionRate }}</span>
                </div>
              </td>
              <td>
                <button class="icon-btn">
                  <Eye :size="16" />
                </button>
                <button class="icon-btn">
                  <MoreHorizontal :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hq-dashboard {
  max-width: 1400px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: var(--c-bg-card);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--c-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-icon {
  color: var(--c-primary);
}

.card-trend {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-text-muted);
}

.card-trend.is-up {
  color: var(--c-success);
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--c-text-primary);
  margin-bottom: 4px;
}

.card-title {
  font-size: 14px;
  color: var(--c-text-muted);
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0;
}

.view-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--c-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
  min-height: 36px;
}

.view-all-btn:hover {
  background: var(--c-primary-light);
}

.signals-section,
.chart-section {
  background: var(--c-bg-card);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--c-border);
}

.signals-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.signal-card {
  padding: 16px;
  background: var(--c-bg-page);
  border-radius: 12px;
  border-left: 3px solid;
}

.signal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.signal-type {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-muted);
  background: var(--c-border);
  padding: 2px 8px;
  border-radius: 4px;
}

.signal-time {
  font-size: 12px;
  color: var(--c-text-light);
}

.signal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 14px;
}

.severity-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.badge-high {
  background: var(--c-danger-bg);
  color: var(--c-danger);
}

.badge-medium {
  background: var(--c-warning-bg);
  color: var(--c-warning);
}

.badge-low {
  background: var(--c-success-bg);
  color: var(--c-success);
}

.signal-desc {
  font-size: 13px;
  color: var(--c-text-muted);
  margin: 0;
  line-height: 1.5;
}

.chart-container {
  height: 280px;
}

.activities-section {
  background: var(--c-bg-card);
  border-radius: 16px;
  border: 1px solid var(--c-border);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.activities-section .section-header {
  padding: 24px 24px 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
}

.action-btn.primary {
  background: var(--c-primary);
  color: #fff;
}

.action-btn.primary:hover {
  background: var(--c-primary-dark);
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.activities-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.activities-table th {
  text-align: left;
  padding: 16px 24px;
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg-muted);
}

.activities-table td {
  padding: 16px 24px;
  border-bottom: 1px solid var(--c-border);
  vertical-align: middle;
}

.activities-table tbody tr:hover {
  background: var(--c-bg-muted);
}

.activity-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 14px;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--c-text-muted);
  margin-top: 4px;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-running {
  background: var(--c-primary-lighter);
  color: var(--c-primary-dark);
}

.status-completed {
  background: var(--c-success-bg);
  color: var(--c-success);
}

.status-pending {
  background: var(--c-warning-bg);
  color: var(--c-warning);
}

.type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: var(--c-bg-muted);
  color: var(--c-text-secondary);
}

.number-cell {
  font-weight: 500;
  color: var(--c-text-primary);
}

.conversion-rate {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rate-bar {
  width: 80px;
  height: 6px;
  background: var(--c-border);
  border-radius: 3px;
  overflow: hidden;
}

.rate-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-btn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--c-text-muted);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: var(--c-bg-muted);
  color: var(--c-text-primary);
}
</style>
