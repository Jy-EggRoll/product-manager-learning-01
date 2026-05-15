<script setup>
import { ref, computed } from 'vue'
import {
  Bot,
  User,
  CloudRain,
  Package,
  UserCircle,
  Send,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-vue-next'
import { agentChatData } from '@/data/mockData'

const scenarios = agentChatData.scenarios

const iconComponents = {
  CloudRain,
  Package,
  UserCircle
}

const activeScenario = ref(0)
const messages = ref([])
const userInput = ref('')
const isTyping = ref(false)
const chatContainer = ref(null)

const currentMessages = computed(() => {
  return messages.value.length > 0 ? messages.value : scenarios[activeScenario.value].messages
})

const selectScenario = (index) => {
  activeScenario.value = index
  messages.value = []
}

const sendMessage = () => {
  if (!userInput.value.trim()) return
  
  const newMessage = {
    role: 'human',
    content: userInput.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  
  if (messages.value.length === 0) {
    messages.value = [...scenarios[activeScenario.value].messages]
  }
  messages.value.push(newMessage)
  userInput.value = ''
  
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    const responses = [
      {
        role: 'agent',
        content: '🤔 收到您的消息，正在为您分析...',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      },
      {
        role: 'agent',
        content: '💡 根据当前业务场景，我建议可以优先查看相关会员的用药周期和历史消费记录，以便给出更精准的推荐方案。是否需要我帮您生成具体的活动方案？',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
    ]
    messages.value.push(...responses)
  }, 1500)
}

const getMessageClass = (role) => {
  return role === 'agent' ? 'message-agent' : 'message-human'
}

const playScenario = async () => {
  messages.value = []
  const scenarioMessages = scenarios[activeScenario.value].messages
  
  for (let i = 0; i < scenarioMessages.length; i++) {
    isTyping.value = scenarioMessages[i].role === 'agent'
    await new Promise(resolve => setTimeout(resolve, isTyping.value ? 1200 : 300))
    isTyping.value = false
    messages.value.push(scenarioMessages[i])
  }
}
</script>

<template>
  <div class="agent-chat-page">
    <div class="chat-layout">
      <div class="scenarios-panel">
        <div class="panel-header">
          <Sparkles :size="20" />
          <span class="panel-title">场景演示</span>
        </div>
        <div class="scenarios-list">
          <div
            v-for="(scenario, index) in scenarios"
            :key="scenario.id"
            class="scenario-item"
            :class="{ 'is-active': activeScenario === index }"
            @click="selectScenario(index)"
          >
            <div class="scenario-icon" :class="scenario.id">
              <component :is="iconComponents[scenario.icon]" :size="20" />
            </div>
            <div class="scenario-info">
              <div class="scenario-name">{{ scenario.name }}</div>
              <div class="scenario-desc">{{ scenario.description }}</div>
            </div>
            <ChevronRight :size="16" class="scenario-arrow" />
          </div>
        </div>
        
        <div class="panel-footer">
          <button class="play-btn" @click="playScenario">
            <Sparkles :size="16" />
            自动播放场景
          </button>
        </div>
      </div>

      <div class="chat-main">
        <div class="chat-header">
          <div class="chat-title">
            <div class="agent-avatar">
              <Bot :size="24" />
            </div>
            <div>
              <div class="agent-name">数字副店长</div>
              <div class="agent-status">
                <span class="status-dot"></span>
                在线 · 实时响应
              </div>
            </div>
          </div>
          <div class="chat-actions">
            <button class="quick-action">
              <Clock :size="14" />
              历史对话
            </button>
          </div>
        </div>

        <div class="chat-messages" ref="chatContainer">
          <div v-if="messages.length === 0" class="welcome-screen">
            <div class="welcome-icon">
              <Bot :size="48" />
            </div>
            <h3 class="welcome-title">您好，我是数字副店长</h3>
            <p class="welcome-desc">
              选择左侧场景或直接发送消息开始对话<br>
              我可以帮您处理：
            </p>
            <div class="welcome-tags">
              <span class="welcome-tag">天气触发活动</span>
              <span class="welcome-tag">智能补货建议</span>
              <span class="welcome-tag">会员服务辅助</span>
              <span class="welcome-tag">活动方案生成</span>
            </div>
          </div>

          <div v-else class="messages-list">
            <div
              v-for="(message, index) in currentMessages"
              :key="index"
              class="message-wrapper"
              :class="getMessageClass(message.role)"
            >
              <div class="message-avatar">
                <Bot v-if="message.role === 'agent'" :size="18" />
                <User v-else :size="18" />
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <pre class="message-text">{{ message.content }}</pre>
                </div>
                <div class="message-time">{{ message.time }}</div>
              </div>
            </div>
          </div>

          <div v-if="isTyping" class="message-wrapper message-agent">
            <div class="message-avatar">
              <Bot :size="18" />
            </div>
            <div class="message-content">
              <div class="message-bubble typing-bubble">
                <div class="typing-dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-area">
          <div class="input-wrapper">
            <input
              v-model="userInput"
              type="text"
              placeholder="输入消息与智能体对话..."
              class="chat-input"
              @keyup.enter="sendMessage"
            />
            <button class="send-btn" @click="sendMessage" :disabled="!userInput.trim()">
              <Send :size="18" />
            </button>
          </div>
          <div class="quick-commands">
            <span class="quick-hint">快捷指令：</span>
            <button class="quick-cmd" @click="userInput = '查看今日信号'">查看今日信号</button>
            <button class="quick-cmd" @click="userInput = '生成补货建议'">生成补货建议</button>
            <button class="quick-cmd" @click="userInput = '分析会员活跃度'">分析会员活跃度</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-chat-page {
  height: calc(100vh - 112px);
  min-height: 600px;
}

.chat-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  height: 100%;
}

@media (max-width: 1024px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }
}

.scenarios-panel {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 1024px) {
  .scenarios-panel {
    height: auto;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.panel-title {
  font-weight: 600;
  color: #1e293b;
}

.scenarios-list {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.scenario-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.scenario-item:hover {
  background: #f8fafc;
}

.scenario-item.is-active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
  border: 1px solid #3b82f6;
}

.scenario-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.scenario-icon.weather {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.scenario-icon.replenishment {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.scenario-icon.member_service {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
}

.scenario-info {
  flex: 1;
  min-width: 0;
}

.scenario-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 2px;
}

.scenario-desc {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scenario-arrow {
  color: #94a3b8;
  flex-shrink: 0;
}

.panel-footer {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
}

.play-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.play-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.chat-main {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  background: #fafafa;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.agent-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 15px;
}

.agent-status {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-action:hover {
  border-color: #cbd5e1;
  color: #1e293b;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.welcome-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.welcome-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.welcome-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.welcome-tag {
  padding: 6px 14px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 13px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-wrapper {
  display: flex;
  gap: 12px;
}

.message-wrapper.message-human {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-agent .message-avatar {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
}

.message-human .message-avatar {
  background: #e2e8f0;
  color: #475569;
}

.message-content {
  max-width: 75%;
}

.message-wrapper.message-human .message-content {
  text-align: right;
}

.message-bubble {
  display: inline-block;
  padding: 14px 18px;
  border-radius: 16px;
  max-width: 100%;
}

.message-agent .message-bubble {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 4px;
}

.message-human .message-bubble {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}

.message-time {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}

.typing-bubble {
  padding: 16px 20px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #94a3b8;
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-6px);
  }
}

.chat-input-area {
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  background: #fafafa;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.chat-input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  background: #fff;
}

.chat-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.send-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-commands {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.quick-hint {
  font-size: 12px;
  color: #94a3b8;
}

.quick-cmd {
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-cmd:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}
</style>
