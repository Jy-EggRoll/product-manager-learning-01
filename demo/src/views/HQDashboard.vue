<script setup>
import { ref, onMounted } from 'vue'
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
  Eye
} from 'lucide-vue-next'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const data = hqDashboardData

const chartOptions = {
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
  }
}

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
    borderColor: ds.color,
    backgroundColor: idx === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
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
              <span class="signal-type">{{ signal.type }}</span>
              <span class="signal-time">{{ signal.time }}</span>
            </div>
            <div class="signal-title">
              <AlertTriangle v-if="signal.severity === 'high'" :size="16" :style="{ color: '#ef4444' }" />
              <AlertCircle v-else-if="signal.severity === 'medium'" :size="16" :style="{ color: '#f59e0b' }" />
              <CheckCircle2 v-else :size="16" :style="{ color: '#10b981' }" />
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
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-icon {
  color: #3b82f6;
}

.card-trend {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
}

.card-trend.is-up {
  color: #10b981;
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.card-title {
  font-size: 14px;
  color: #64748b;
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
  color: #1e293b;
  margin: 0;
}

.view-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.view-all-btn:hover {
  background: #eff6ff;
}

.signals-section,
.chart-section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.signals-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.signal-card {
  padding: 16px;
  background: #f8fafc;
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
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
}

.signal-time {
  font-size: 12px;
  color: #94a3b8;
}

.signal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1e293b;
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
  background: #fef2f2;
  color: #dc2626;
}

.badge-medium {
  background: #fffbeb;
  color: #d97706;
}

.badge-low {
  background: #f0fdf4;
  color: #16a34a;
}

.signal-desc {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.chart-container {
  height: 280px;
}

.activities-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
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
}

.action-btn.primary {
  background: #3b82f6;
  color: #fff;
}

.action-btn.primary:hover {
  background: #2563eb;
}

.table-wrapper {
  overflow-x: auto;
}

.activities-table {
  width: 100%;
  border-collapse: collapse;
}

.activities-table th {
  text-align: left;
  padding: 16px 24px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.activities-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.activities-table tbody tr:hover {
  background: #f8fafc;
}

.activity-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
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
  background: #dbeafe;
  color: #1d4ed8;
}

.status-completed {
  background: #dcfce7;
  color: #16a34a;
}

.status-pending {
  background: #fef3c7;
  color: #b45309;
}

.type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: #f1f5f9;
  color: #475569;
}

.number-cell {
  font-weight: 500;
  color: #1e293b;
}

.conversion-rate {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rate-bar {
  width: 80px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.rate-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}
</style>
