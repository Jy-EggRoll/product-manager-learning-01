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
      position: 'top',
      labels: { boxWidth: 12, padding: 12, font: { size: 12 } }
    }
  },
  scales: {
    y: { beginAtZero: true, ticks: { font: { size: 11 } } },
    x: { ticks: { font: { size: 11 } } }
  },
  interaction: { intersect: false, mode: 'index' }
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
    pointRadius: 3,
    pointHoverRadius: 5
  }))
}

const cardIcons = { Activity, Users, CheckCircle, TrendingUp }

const signalIcons = {
  weather: Thermometer,
  yq: Newspaper,
  season: Flower2
}

const getSignalIcon = (type) => {
  if (type === '天气') return 'weather'
  if (type === '舆情') return 'yq'
  return 'season'
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
    <div class="cards-grid" data-aos="fade-up">
      <div
        v-for="(card, index) in data.overviewCards"
        :key="index"
        class="stat-card"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 80"
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

    <div class="main-grid" data-aos="fade-up">
      <div class="signals-section">
        <div class="section-header">
          <h3 class="section-title">实时信号感知</h3>
          <button class="view-all-btn">
            查看全部 <ChevronRight :size="16" />
          </button>
        </div>
        <div class="signals-list">
          <div
            v-for="(signal, index) in data.activeSignals"
            :key="index"
            class="signal-card"
            :style="{ borderLeftColor: signal.color }"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 80"
          >
            <div class="signal-header">
              <span class="signal-type">
                <component :is="signalIcons[getSignalIcon(signal.type)]" :size="12" />
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

    <div class="activities-section" data-aos="fade-up">
      <div class="section-header">
        <h3 class="section-title">活动管理</h3>
        <button class="action-btn primary">新建活动</button>
      </div>

      <!-- Desktop table -->
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
              <td data-label="活动名称">
                <div class="activity-name">{{ activity.name }}</div>
                <div class="activity-meta">
                  <Clock :size="12" />
                  {{ activity.startTime }} · {{ activity.triggeredBy }}
                </div>
              </td>
              <td data-label="状态">
                <span class="status-badge" :class="getStatusBadge(activity.status).class">
                  {{ getStatusBadge(activity.status).text }}
                </span>
              </td>
              <td data-label="触发类型">
                <span class="type-badge">{{ activity.type }}</span>
              </td>
              <td data-label="触达人数">{{ activity.memberCount.toLocaleString() }}</td>
              <td data-label="转化人数">{{ activity.converted.toLocaleString() }}</td>
              <td data-label="转化率">
                <div class="conversion-rate">
                  <div class="rate-bar">
                    <div class="rate-fill" :style="{ width: activity.conversionRate }"></div>
                  </div>
                  <span>{{ activity.conversionRate }}</span>
                </div>
              </td>
              <td data-label="操作" class="actions-cell">
                <button class="icon-btn" aria-label="查看详情">
                  <Eye :size="16" />
                </button>
                <button class="icon-btn" aria-label="更多操作">
                  <MoreHorizontal :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="activity-cards">
        <div
          v-for="activity in data.recentActivities"
          :key="'card-' + activity.id"
          class="activity-card"
          :data-aos="'fade-up'"
        >
          <div class="ac-header">
            <div class="ac-name">{{ activity.name }}</div>
            <span class="status-badge" :class="getStatusBadge(activity.status).class">
              {{ getStatusBadge(activity.status).text }}
            </span>
          </div>
          <div class="ac-meta">
            <span class="ac-type">{{ activity.type }}</span>
            <span class="ac-triggered">
              <Clock :size="12" />
              {{ activity.startTime }}
            </span>
          </div>
          <div class="ac-stats">
            <div class="ac-stat">
              <span class="ac-stat-label">触达</span>
              <span class="ac-stat-value">{{ activity.memberCount.toLocaleString() }}</span>
            </div>
            <div class="ac-stat">
              <span class="ac-stat-label">转化</span>
              <span class="ac-stat-value">{{ activity.converted.toLocaleString() }}</span>
            </div>
            <div class="ac-stat">
              <span class="ac-stat-label">转化率</span>
              <span class="ac-stat-value ac-rate">{{ activity.conversionRate }}</span>
            </div>
          </div>
          <div class="ac-actions">
            <button class="ac-btn">
              <Eye :size="16" />
              查看
            </button>
            <button class="ac-btn">
              <MoreHorizontal :size="16" />
              更多
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hq-dashboard {
  max-width: 1400px;
}

/* ─── Overview Cards ─── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

@media (min-width: 600px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--s-4);
  }
}

.stat-card {
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  padding: var(--s-4);
  border: 1px solid var(--c-border);
  transition: transform var(--t-fast), box-shadow var(--t-fast);
}

@media (min-width: 600px) {
  .stat-card {
    padding: var(--s-5);
  }
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s-3);
}

.card-icon {
  color: var(--c-primary);
}

.card-trend {
  font-size: clamp(12px, 1.4vw, 13px);
  font-weight: 500;
  color: var(--c-text-muted);
}

.card-trend.is-up {
  color: var(--c-success);
}

.card-value {
  font-size: clamp(20px, 3.5vw, 28px);
  font-weight: 700;
  color: var(--c-text-primary);
  margin-bottom: var(--s-1);
  word-break: break-word;
}

.card-title {
  font-size: clamp(12px, 1.4vw, 14px);
  color: var(--c-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Main Grid ─── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

@media (min-width: 900px) {
  .main-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s-4);
  flex-wrap: wrap;
  gap: var(--s-2);
}

.section-title {
  font-size: clamp(14px, 2vw, 16px);
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
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--r-sm);
  transition: background var(--t-fast);
  min-height: 36px;
}

.view-all-btn:hover {
  background: var(--c-primary-light);
}

/* ─── Signals & Chart ─── */
.signals-section,
.chart-section {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  padding: var(--s-4);
  border: 1px solid var(--c-border);
}

@media (min-width: 768px) {
  .signals-section,
  .chart-section {
    padding: var(--s-5);
  }
}

.signals-list {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.signal-card {
  padding: var(--s-4);
  background: var(--c-bg-page);
  border-radius: var(--r-md);
  border-left: 3px solid;
}

.signal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s-2);
}

.signal-type {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: clamp(11px, 1.2vw, 12px);
  font-weight: 500;
  color: var(--c-text-muted);
  background: var(--c-border);
  padding: 2px 8px;
  border-radius: 4px;
}

.signal-time {
  font-size: clamp(11px, 1.2vw, 12px);
  color: var(--c-text-light);
}

.signal-title {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  margin-bottom: var(--s-2);
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: clamp(13px, 1.5vw, 14px);
  flex-wrap: wrap;
}

.severity-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.badge-high { background: var(--c-danger-bg); color: var(--c-danger); }
.badge-medium { background: var(--c-warning-bg); color: var(--c-warning); }
.badge-low { background: var(--c-success-bg); color: var(--c-success); }

.signal-desc {
  font-size: clamp(12px, 1.4vw, 13px);
  color: var(--c-text-muted);
  margin: 0;
  line-height: 1.5;
}

.chart-container {
  height: clamp(200px, 40vw, 280px);
  width: 100%;
}

/* ─── Activities Section ─── */
.activities-section {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.activities-section .section-header {
  padding: var(--s-4) var(--s-4) 0;
}

@media (min-width: 768px) {
  .activities-section .section-header {
    padding: var(--s-5) var(--s-5) 0;
  }
}

.action-btn {
  padding: 10px 18px;
  border-radius: var(--r-sm);
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}

.action-btn.primary {
  background: var(--c-primary);
  color: #fff;
}

.action-btn.primary:hover {
  background: var(--c-primary-dark);
}

/* ─── Desktop Table ─── */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.activities-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 0;
}

@media (max-width: 767px) {
  .activities-table {
    display: none;
  }
}

.activities-table th {
  text-align: left;
  padding: 14px var(--s-4);
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg-muted);
  white-space: nowrap;
}

.activities-table td {
  padding: 14px var(--s-4);
  border-bottom: 1px solid var(--c-border);
  vertical-align: middle;
  font-size: clamp(13px, 1.4vw, 14px);
}

.activities-table tbody tr:hover {
  background: var(--c-bg-muted);
}

.activity-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: clamp(13px, 1.4vw, 14px);
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--c-text-muted);
  margin-top: 4px;
  flex-wrap: wrap;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.status-running { background: var(--c-primary-lighter); color: var(--c-primary-dark); }
.status-completed { background: var(--c-success-bg); color: var(--c-success); }
.status-pending { background: var(--c-warning-bg); color: var(--c-warning); }

.type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: var(--c-bg-muted);
  color: var(--c-text-secondary);
  white-space: nowrap;
}

.conversion-rate {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.rate-bar {
  width: 60px;
  height: 6px;
  background: var(--c-border);
  border-radius: 3px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .rate-bar {
    width: 80px;
  }
}

.rate-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.actions-cell {
  white-space: nowrap;
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
  border-radius: var(--r-sm);
  transition: all var(--t-fast);
}

.icon-btn:hover {
  background: var(--c-bg-muted);
  color: var(--c-text-primary);
}

/* ─── Mobile Activity Cards ─── */
.activity-cards {
  display: none;
  padding: var(--s-4);
  gap: var(--s-3);
}

@media (max-width: 767px) {
  .activity-cards {
    display: flex;
    flex-direction: column;
  }
}

.activity-card {
  background: var(--c-bg-page);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: var(--s-4);
}

.ac-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s-2);
  margin-bottom: var(--s-2);
}

.ac-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: clamp(14px, 1.6vw, 15px);
  word-break: break-word;
}

.ac-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  align-items: center;
  margin-bottom: var(--s-3);
  font-size: 12px;
  color: var(--c-text-muted);
}

.ac-triggered {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ac-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--s-2);
  margin-bottom: var(--s-3);
  padding: var(--s-3);
  background: var(--c-bg-card);
  border-radius: var(--r-sm);
  border: 1px solid var(--c-border);
}

.ac-stat {
  text-align: center;
}

.ac-stat-label {
  display: block;
  font-size: 11px;
  color: var(--c-text-light);
  margin-bottom: 4px;
}

.ac-stat-value {
  display: block;
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 700;
  color: var(--c-text-primary);
}

.ac-rate {
  color: var(--c-primary);
}

.ac-actions {
  display: flex;
  gap: var(--s-2);
}

.ac-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-sm);
  font-size: 13px;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}

.ac-btn:hover {
  background: var(--c-bg-muted);
  border-color: var(--c-border-light);
}
</style>
