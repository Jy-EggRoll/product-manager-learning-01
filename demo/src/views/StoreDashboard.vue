<script setup>import { ref, nextTick } from 'vue'
import {
  Store,
  Users,
  DollarSign,
  Tag,
  Package,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Send,
  Phone,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Check,
  X,
  HeartPulse,
  Droplets,
  Wind,
  Activity
} from 'lucide-vue-next'
import { storeDashboardData } from '@/data/mockData'

const data = storeDashboardData

const selectedMember = ref(null)
const showReplenishConfirm = ref(false)
const replenishItems = ref(
  data.replenishmentList.map(item => ({ ...item, confirmed: false, adjustedAmount: item.suggestedAmount }))
)

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up':
      return TrendingUp
    case 'down':
      return TrendingDown
    default:
      return Minus
  }
}

const getTrendColor = (trend) => {
  switch (trend) {
    case 'up':
      return '#16a34a'
    case 'down':
      return '#dc2626'
    default:
      return '#6b7280'
  }
}

const adjustReplenish = (item, delta) => {
  const idx = replenishItems.value.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    replenishItems.value[idx].adjustedAmount = Math.max(0, replenishItems.value[idx].adjustedAmount + delta)
  }
}

const confirmReplenish = () => {
  replenishItems.value.forEach(item => {
    item.confirmed = true
  })
  showReplenishConfirm.value = true
  setTimeout(() => {
    showReplenishConfirm.value = false
  }, 2000)
}

const getRiskBadge = (risk) => {
  const badges = {
    high: { class: 'risk-high', text: '高优先级' },
    medium: { class: 'risk-medium', text: '中优先级' },
    low: { class: 'risk-low', text: '低优先级' }
  }
  return badges[risk] || badges.low
}

const diseaseIcons = {
  '高血压': HeartPulse,
  '糖尿病': Droplets,
  '过敏性鼻炎': Wind,
  '高血脂': Activity
}
</script>

<template>
  <div class="store-dashboard">
    <div class="store-info-card">
      <div class="store-main">
        <div class="store-icon">
          <Store :size="28" />
        </div>
        <div class="store-details">
          <h2 class="store-name">{{ data.storeInfo.name }}</h2>
          <p class="store-address">{{ data.storeInfo.address }}</p>
        </div>
      </div>
      <div class="store-stats">
        <div class="mini-stat">
          <Users :size="18" class="stat-icon" />
          <div>
            <div class="stat-value">{{ data.storeInfo.members.toLocaleString() }}</div>
            <div class="stat-label">会员数</div>
          </div>
        </div>
        <div class="mini-stat">
          <Tag :size="18" class="stat-icon" />
          <div>
            <div class="stat-value">{{ data.storeInfo.todayTasks }}</div>
            <div class="stat-label">今日任务</div>
          </div>
        </div>
        <div class="mini-stat">
          <Package :size="18" class="stat-icon" />
          <div>
            <div class="stat-value">{{ data.storeInfo.replenishmentItems }}</div>
            <div class="stat-label">待补货</div>
          </div>
        </div>
      </div>
    </div>

    <div class="today-overview">
      <div class="overview-card">
        <div class="overview-icon visitors">
          <Users :size="24" />
        </div>
        <div class="overview-value">{{ data.todayOverview.visitorCount }}</div>
        <div class="overview-label">今日到店</div>
      </div>
      <div class="overview-card">
        <div class="overview-icon coupons">
          <Tag :size="24" />
        </div>
        <div class="overview-value">{{ data.todayOverview.couponUsed }}</div>
        <div class="overview-label">用券人数</div>
      </div>
      <div class="overview-card">
        <div class="overview-icon new-members">
          <TrendingUp :size="24" />
        </div>
        <div class="overview-value">{{ data.todayOverview.newMembers }}</div>
        <div class="overview-label">新增会员</div>
      </div>
      <div class="overview-card">
        <div class="overview-icon sales">
          <DollarSign :size="24" />
        </div>
        <div class="overview-value">¥{{ data.todayOverview.salesAmount.toLocaleString() }}</div>
        <div class="overview-label">今日销售额</div>
      </div>
    </div>

    <div class="main-grid">
      <div class="priority-section">
        <div class="section-header">
          <h3 class="section-title">今日重点会员</h3>
          <span class="section-badge">{{ data.priorityMembers.length }}位</span>
        </div>
        <div class="members-list">
          <div
            v-for="member in data.priorityMembers"
            :key="member.id"
            class="member-card"
            :class="{ 'is-selected': selectedMember === member.id }"
            @click="selectedMember = selectedMember === member.id ? null : member.id"
          >
            <div class="member-header">
              <div class="member-avatar">{{ member.avatar }}</div>
              <div class="member-info">
                <div class="member-name">
                  {{ member.name }}
                  <span class="member-age">{{ member.age }}岁</span>
                </div>
                <div class="member-tag">
                  <component
                    :is="diseaseIcons[member.tag] || Activity"
                    :size="12"
                    class="disease-icon"
                  />
                  {{ member.tag }}患者
                </div>
              </div>
              <span class="risk-badge" :class="getRiskBadge(member.risk).class">
                {{ getRiskBadge(member.risk).text }}
              </span>
            </div>
            
            <div class="member-detail" v-if="selectedMember === member.id">
              <div class="detail-row">
                <Clock :size="14" />
                <span>上次购药：{{ member.lastPurchase }}</span>
              </div>
              <div class="detail-row highlight">
                <AlertTriangle :size="14" />
                <span>预计用完：{{ member.nextRefill }}</span>
              </div>
              <div class="detail-section">
                <div class="section-label">推荐药品</div>
                <div class="drug-tags">
                  <span v-for="(drug, idx) in member.recommendedDrugs" :key="idx" class="drug-tag">
                    {{ drug }}
                  </span>
                </div>
              </div>
              <div class="detail-section">
                <div class="section-label">推荐券包</div>
                <div class="coupon-card">
                  <Tag :size="16" />
                  <span class="coupon-text">{{ member.suggestedCoupon }}</span>
                </div>
              </div>
              <div class="member-actions">
                <button class="action-btn primary">
                  <MessageSquare :size="16" />
                  发送消息
                </button>
                <button class="action-btn secondary">
                  <Phone :size="16" />
                  电话提醒
                </button>
              </div>
            </div>
            
            <div class="member-expand" v-else>
              <ChevronDown :size="16" />
            </div>
          </div>
        </div>
      </div>

      <div class="replenish-section">
        <div class="section-header">
          <h3 class="section-title">智能补货建议</h3>
          <button v-if="!showReplenishConfirm" class="confirm-all-btn" @click="confirmReplenish">
            确认全部
          </button>
          <CheckCircle v-else :size="20" style="color: #16a34a" />
        </div>
        <div class="replenish-list">
          <div
            v-for="item in replenishItems"
            :key="item.id"
            class="replenish-item"
            :class="{ 'is-confirmed': item.confirmed }"
          >
            <div class="item-main">
              <div class="item-info">
                <div class="item-name">{{ item.drugName }}</div>
                <div class="item-category">{{ item.category }}</div>
              </div>
              <div class="item-status">
                <component
                  :is="getTrendIcon(item.trend)"
                  :size="16"
                  :style="{ color: getTrendColor(item.trend) }"
                />
                <span :style="{ color: getTrendColor(item.trend) }">
                  近7天 {{ item.lastSales }}盒
                </span>
              </div>
            </div>
            <div class="item-stocks">
              <div class="stock-item">
                <div class="stock-label">当前库存</div>
                <div class="stock-value" :class="{ 'is-low': item.currentStock < item.minStock }">
                  {{ item.currentStock }}盒
                </div>
              </div>
              <div class="stock-arrow">→</div>
              <div class="stock-item">
                <div class="stock-label">安全库存</div>
                <div class="stock-value">{{ item.minStock }}盒</div>
              </div>
              <div class="stock-arrow">→</div>
              <div class="stock-item suggested">
                <div class="stock-label">建议补货</div>
                <div class="adjust-group">
                  <button class="adjust-btn" @click.stop="adjustReplenish(item, -10)">-</button>
                  <span class="adjust-value">{{ item.adjustedAmount }}</span>
                  <button class="adjust-btn" @click.stop="adjustReplenish(item, 10)">+</button>
                </div>
              </div>
              <div v-if="item.confirmed" class="confirmed-badge">
                <Check :size="16" />
                已确认
              </div>
            </div>
          </div>
        </div>
        <transition name="toast">
          <div v-if="showReplenishConfirm" class="success-toast">
            <CheckCircle :size="20" />
            补货单已确认，已同步至采购系统
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.store-dashboard {
  max-width: 1400px;
}

.store-info-card {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .store-info-card {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}

.store-main {
  display: flex;
  align-items: center;
  gap: 16px;
}

.store-icon {
  width: 56px;
  height: 56px;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
}

.store-name {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.store-address {
  font-size: 14px;
  color: #a7f3d0;
  margin: 0;
}

.store-stats {
  display: flex;
  gap: 32px;
}

@media (max-width: 480px) {
  .store-stats {
    width: 100%;
    justify-content: space-between;
  }
}

.mini-stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  color: #4ade80;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: #a7f3d0;
}

.today-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .today-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .today-overview {
    grid-template-columns: 1fr;
  }
}

.overview-card {
  background: var(--c-bg-card);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--c-border);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: #fff;
}

.overview-icon.visitors {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}

.overview-icon.coupons {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.overview-icon.new-members {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.overview-icon.sales {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.overview-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--c-text-primary);
  margin-bottom: 4px;
}

.overview-label {
  font-size: 13px;
  color: var(--c-text-muted);
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
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

.section-badge {
  font-size: 12px;
  font-weight: 500;
  color: var(--c-primary);
  background: var(--c-primary-lighter);
  padding: 2px 10px;
  border-radius: 20px;
}

.priority-section,
.replenish-section {
  background: var(--c-bg-card);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--c-border);
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-card {
  background: var(--c-bg-page);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--c-border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.member-card:hover {
  border-color: var(--c-border-light);
}

.member-card.is-selected {
  border-color: var(--c-primary);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-card);
  border-radius: 50%;
}

.member-info {
  flex: 1;
}

.member-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 14px;
}

.member-age {
  font-size: 12px;
  color: var(--c-text-muted);
  font-weight: 400;
}

.member-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--c-text-muted);
  margin-top: 2px;
}

.disease-icon {
  color: var(--c-primary);
  flex-shrink: 0;
}

.risk-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

.risk-high {
  background: var(--c-danger-bg);
  color: var(--c-danger);
}

.risk-medium {
  background: var(--c-warning-bg);
  color: var(--c-warning);
}

.risk-low {
  background: var(--c-success-bg);
  color: var(--c-success);
}

.member-expand {
  color: var(--c-text-light);
}

.member-detail {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--c-border);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--c-text-muted);
  margin-bottom: 8px;
}

.detail-row.highlight {
  color: var(--c-danger);
  font-weight: 500;
}

.detail-section {
  margin-top: 12px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.drug-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.drug-tag {
  font-size: 12px;
  padding: 4px 12px;
  background: var(--c-primary-lighter);
  color: var(--c-primary-dark);
  border-radius: 4px;
  font-weight: 500;
}

.coupon-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 8px;
}

.coupon-text {
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}

.member-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--c-border);
  background: var(--c-bg-card);
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.action-btn:hover {
  border-color: var(--c-border-light);
  background: var(--c-bg-page);
}

.action-btn.primary {
  background: var(--c-primary);
  color: #fff;
  border: none;
}

.action-btn.primary:hover {
  background: var(--c-primary-dark);
}

.confirm-all-btn {
  padding: 8px 16px;
  background: var(--c-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  min-height: 44px;
}

.confirm-all-btn:hover {
  background: var(--c-primary-dark);
}

.replenish-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.replenish-item {
  background: var(--c-bg-page);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--c-border);
  transition: all 0.3s ease;
}

.replenish-item.is-confirmed {
  border-color: var(--c-success);
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(21, 128, 61, 0.05) 100%);
}

.item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 14px;
}

.item-category {
  font-size: 12px;
  color: var(--c-text-muted);
  margin-top: 2px;
}

.item-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
}

.item-stocks {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stock-item {
  text-align: center;
}

.stock-label {
  font-size: 11px;
  color: var(--c-text-light);
  margin-bottom: 4px;
}

.stock-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-primary);
}

.stock-value.is-low {
  color: var(--c-danger);
}

.stock-arrow {
  color: var(--c-text-light);
  font-size: 14px;
}

.adjust-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.adjust-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.adjust-btn:hover {
  background: var(--c-bg-muted);
}

.adjust-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--c-primary);
  min-width: 32px;
  text-align: center;
}

.confirmed-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-success);
  padding: 4px 12px;
  background: var(--c-success-bg);
  border-radius: 20px;
  margin-left: auto;
}

.success-toast {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: var(--c-success-bg);
  color: var(--c-success);
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
}

.toast-enter-active {
  animation: toastIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  animation: toastOut 0.25s ease-in;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.96);
  }
}
</style>
