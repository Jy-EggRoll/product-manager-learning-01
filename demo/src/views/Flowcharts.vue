<script setup>
import { ref } from 'vue'
import {
  GitBranch,
  Users,
  Layers,
  ChevronDown,
  Copy,
  Check,
  Code
} from 'lucide-vue-next'
import { plantumlCode } from '@/data/mockData'

const activeTab = ref('flow')
const copiedCode = ref(null)

const tabs = [
  { id: 'flow', name: '业务闭环流程', icon: GitBranch },
  { id: 'collaboration', name: '角色协作关系', icon: Users },
  { id: 'architecture', name: '系统技术架构', icon: Layers }
]

const iconComponents = {
  GitBranch,
  Users,
  Layers
}

const getCode = () => {
  return plantumlCode[activeTab.value]
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(getCode())
    copiedCode.value = activeTab.value
    setTimeout(() => {
      copiedCode.value = null
    }, 2000)
  } catch (err) {
    console.log('Copy failed')
  }
}

const flowStages = [
  {
    name: '感知层',
    color: '#3b82f6',
    items: ['季节变化', '天气突变', '舆情热点', '地理位置']
  },
  {
    name: '洞察层',
    color: '#8b5cf6',
    items: ['会员画像分析', '用药周期计算', '药品标签匹配', '关联推荐计算']
  },
  {
    name: '决策层',
    color: '#ec4899',
    items: ['策略规则引擎', '券包自动生成', '时机判定', '渠道选择']
  },
  {
    name: '触达层',
    color: '#f59e0b',
    items: ['企业微信', '短信通知', '小程序推送', 'APP消息']
  },
  {
    name: '履约层',
    color: '#10b981',
    items: ['会员到店', '店员承接', '核销券码', '补货确认']
  },
  {
    name: '复盘层',
    color: '#06b6d4',
    items: ['转化数据分析', '库存消化统计', '策略效果评估', '规则迭代优化']
  }
]

const architectureLayers = [
  {
    name: '接入层',
    desc: '用户界面入口',
    color: '#3b82f6',
    components: ['运营管理后台', '店长工作台', '企微侧边栏', '会员小程序', 'API开放平台']
  },
  {
    name: '应用层',
    desc: '核心业务逻辑',
    color: '#8b5cf6',
    components: ['智能体核心引擎', '策略规则引擎', '活动编排引擎', '触达渠道管理', '数据分析中心']
  },
  {
    name: '能力层',
    desc: '通用能力服务',
    color: '#10b981',
    components: ['会员画像服务', '药品知识图谱', '外部信号感知', '推荐算法服务', '自然语言处理']
  },
  {
    name: '数据层',
    desc: '数据持久化',
    color: '#f59e0b',
    components: ['会员数据库', '药品数据库', '策略数据库', '活动数据库', '日志分析库']
  }
]
</script>

<template>
  <div class="flowcharts-page">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ 'is-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <component :is="iconComponents[tab.icon]" :size="18" />
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <div class="content-area">
      <div class="visualization-section">
        <h3 class="section-title">流程图预览</h3>
        <p class="section-desc">
          以下是 {{ tabs.find(t => t.id === activeTab)?.name }} 的可视化展示。
          完整的 PlantUML 代码可在下方查看和复制。
        </p>
        
        <div class="flow-visualization">
          <div v-if="activeTab === 'flow'" class="flow-steps">
            <div class="flow-stage" v-for="(stage, idx) in flowStages" :key="idx">
              <div class="stage-header" :style="{ background: stage.color }">
                <span class="stage-number">{{ idx + 1 }}</span>
                <span class="stage-name">{{ stage.name }}</span>
              </div>
              <div class="stage-items">
                <div class="stage-item" v-for="(item, iIdx) in stage.items" :key="iIdx">
                  {{ item }}
                </div>
              </div>
              <ChevronDown v-if="idx < flowStages.length - 1" class="stage-arrow" :size="24" />
            </div>
          </div>

          <div v-if="activeTab === 'collaboration'" class="collaboration-diagram">
            <div class="collab-row">
              <div class="collab-card operator">
                <div class="collab-icon">👩‍💼</div>
                <h4>总部运营</h4>
                <ul>
                  <li>配置策略规则</li>
                  <li>维护标签规则</li>
                  <li>管理券模板</li>
                  <li>活动复盘分析</li>
                </ul>
              </div>
              <div class="collab-arrow">
                <div class="arrow-line"></div>
                <span class="arrow-text">配置 →</span>
              </div>
              <div class="collab-card agent">
                <div class="collab-icon">🤖</div>
                <h4>数字副店长</h4>
                <ul>
                  <li>实时感知信号</li>
                  <li>智能匹配会员</li>
                  <li>自动生成方案</li>
                  <li>学习迭代优化</li>
                </ul>
              </div>
              <div class="collab-arrow">
                <div class="arrow-line"></div>
                <span class="arrow-text">→ 推送</span>
              </div>
              <div class="collab-card store">
                <div class="collab-icon">👨‍⚕️</div>
                <h4>门店店长</h4>
                <ul>
                  <li>查看今日任务</li>
                  <li>确认补货建议</li>
                  <li>会员到店承接</li>
                  <li>券码核销确认</li>
                </ul>
              </div>
            </div>
            
            <div class="collab-note">
              <div class="note-icon">💡</div>
              <div class="note-text">
                <strong>协作模式：</strong>运营从"做活动"变成"养策略"，智能体负责执行，运营负责审核调优；
                智能体是店长的"外挂大脑"，提供每日重点名单、补货建议、话术提示。
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'architecture'" class="architecture-diagram">
            <div class="arch-layer" v-for="(layer, idx) in architectureLayers" :key="idx">
              <div class="layer-header">
                <span class="layer-name">{{ layer.name }}</span>
                <span class="layer-desc">{{ layer.desc }}</span>
              </div>
              <div class="layer-components">
                <div 
                  class="layer-component" 
                  v-for="(comp, cIdx) in layer.components" 
                  :key="cIdx"
                  :style="{ background: layer.color + '20', borderColor: layer.color }"
                >
                  {{ comp }}
                </div>
              </div>
            </div>
            
            <div class="data-flow">
              <div class="flow-line"></div>
              <span class="flow-label">数据流向：接入层 → 应用层 → 能力层 → 数据层</span>
            </div>
          </div>
        </div>
      </div>

      <div class="code-section">
        <div class="code-header">
          <h3 class="section-title">
            <Code :size="18" />
            PlantUML 源代码
          </h3>
          <button class="copy-btn" @click="copyCode">
            <Check v-if="copiedCode === activeTab" :size="16" />
            <Copy v-else :size="16" />
            <span>{{ copiedCode === activeTab ? '已复制' : '复制代码' }}</span>
          </button>
        </div>
        <div class="code-container">
          <pre class="code-block">{{ getCode() }}</pre>
        </div>
        <div class="usage-note">
          <h4>使用说明</h4>
          <p>
            1. 复制上方 PlantUML 代码<br>
            2. 访问 <a href="https://www.plantuml.com/plantuml/uml/" target="_blank">PlantUML 在线编辑器</a><br>
            3. 粘贴代码即可生成完整的流程图
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flowcharts-page {
  max-width: 1200px;
}

.tabs-header {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-family: inherit;
}

.tab-btn:hover {
  border-color: #cbd5e1;
  color: #1e293b;
}

.tab-btn.is-active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  color: #3b82f6;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-desc {
  font-size: 14px;
  color: #64748b;
  margin: 8px 0 20px 0;
  line-height: 1.6;
}

.visualization-section,
.code-section {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.flow-visualization {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flow-stage {
  width: 100%;
  max-width: 500px;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-weight: 600;
}

.stage-number {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.stage-name {
  font-size: 15px;
}

.stage-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 10px 10px;
}

.stage-item {
  padding: 6px 14px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 13px;
}

.stage-arrow {
  color: #94a3b8;
}

.collaboration-diagram {
  padding: 20px;
}

.collab-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.collab-card {
  min-width: 180px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.collab-card.operator {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
}

.collab-card.agent {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  border: 1px solid #c4b5fd;
}

.collab-card.store {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #86efac;
}

.collab-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.collab-card h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.collab-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.collab-card li {
  font-size: 12px;
  color: #475569;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.collab-card li::before {
  content: '•';
  color: #94a3b8;
}

.collab-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.arrow-line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #94a3b8, #64748b);
  position: relative;
}

.arrow-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  border: 4px solid transparent;
  border-left-color: #64748b;
}

.arrow-text {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.collab-note {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
}

.note-icon {
  font-size: 24px;
}

.note-text {
  font-size: 13px;
  color: #92400e;
  line-height: 1.7;
}

.architecture-diagram {
  padding: 20px;
}

.arch-layer {
  margin-bottom: 16px;
}

.layer-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.layer-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.layer-desc {
  font-size: 12px;
  color: #64748b;
}

.layer-components {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.layer-component {
  padding: 10px 18px;
  border-radius: 8px;
  border: 2px solid;
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
}

.data-flow {
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
  text-align: center;
}

.flow-label {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.copy-btn:hover {
  background: #e2e8f0;
}

.code-container {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
}

.code-block {
  margin: 0;
  padding: 20px;
  font-size: 13px;
  line-height: 1.6;
  color: #e2e8f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  overflow-x: auto;
  white-space: pre;
}

.usage-note {
  margin-top: 20px;
  padding: 16px 20px;
  background: #f8fafc;
  border-radius: 10px;
  border-left: 3px solid #3b82f6;
}

.usage-note h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.usage-note p {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.8;
}

.usage-note a {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
