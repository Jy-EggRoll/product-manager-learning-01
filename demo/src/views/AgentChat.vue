<script setup>
import { ref, computed, nextTick } from 'vue'
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

const roleIcons = {
  agent: Bot,
  human: User
}

const activeScenario = ref(0)
const messages = ref([])
const userInput = ref('')
const isTyping = ref(false)
const chatContainer = ref(null)

const currentMessages = computed(() => {
  return messages.value.length > 0 ? messages.value : scenarios[activeScenario.value].messages
})

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

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
  scrollToBottom()
  
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
    scrollToBottom()
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
    await scrollToBottom()
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
              <span class="welcome-tag">
                <CloudRain :size="14" />
                天气触发活动
              </span>
              <span class="welcome-tag">
                <Package :size="14" />
                智能补货建议
              </span>
              <span class="welcome-tag">
                <UserCircle :size="14" />
                会员服务辅助
              </span>
              <span class="welcome-tag">
                <Sparkles :size="14" />
                活动方案生成
              </span>
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
                <component :is="roleIcons[message.role]" :size="18" />
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <pre class="message-text">{{ message.content }}</pre>
                </div>
                <div class="message-time">{{ message.time }}</div>
              </div>
            </div>
          </div>

          <transition name="typing-fade">
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
          </transition>
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
  height: calc(100dvh - 112px);
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
  background: var(--c-bg-card);
  border-radius: 16px;
  border: 1px solid var(--c-border);
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
  border-bottom: 1px solid var(--c-border);
  flex-shrink: 0;
}

.panel-title {
  font-weight: 600;
  color: var(--c-text-primary);
}

.scenarios-list {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.scenario-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 4px;
}

.scenario-item:hover {
  background: var(--c-bg-muted);
}

.scenario-item.is-active {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
  border: 1px solid var(--c-primary);
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
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
}

.scenario-icon.replenishment {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.scenario-icon.member_service {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.scenario-info {
  flex: 1;
  min-width: 0;
}

.scenario-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 14px;
  margin-bottom: 2px;
}

.scenario-desc {
  font-size: 12px;
  color: var(--c-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scenario-arrow {
  color: var(--c-text-light);
  flex-shrink: 0;
}

.panel-footer {
  padding: 16px;
  border-top: 1px solid var(--c-border);
  flex-shrink: 0;
}

.play-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  min-height: 44px;
}

.play-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.play-btn:active {
  transform: translateY(0);
}

.chat-main {
  background: var(--c-bg-card);
  border-radius: 16px;
  border: 1px solid var(--c-border);
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
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.agent-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: 15px;
}

.agent-status {
  font-size: 12px;
  color: var(--c-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #16a34a;
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
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-size: 13px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.quick-action:hover {
  border-color: var(--c-border-light);
  color: var(--c-text-primary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
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
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 12px 0;
}

.welcome-desc {
  font-size: 14px;
  color: var(--c-text-muted);
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  background: var(--c-bg-muted);
  color: var(--c-text-secondary);
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
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  color: #fff;
}

.message-human .message-avatar {
  background: var(--c-border);
  color: var(--c-text-secondary);
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
  background: var(--c-bg-page);
  border: 1px solid var(--c-border);
  border-bottom-left-radius: 4px;
}

.message-human .message-bubble {
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
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
  color: var(--c-text-light);
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
  background: var(--c-text-light);
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

.typing-fade-enter-active {
  transition: opacity 0.2s ease;
}

.typing-fade-leave-active {
  transition: opacity 0.15s ease;
}

.typing-fade-enter-from,
.typing-fade-leave-to {
  opacity: 0;
}

.chat-input-area {
  padding: 16px 24px;
  border-top: 1px solid var(--c-border);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.chat-input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid var(--c-border);
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: var(--c-bg-card);
}

.chat-input:focus {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.send-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.send-btn:active:not(:disabled) {
  transform: translateY(0);
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
  color: var(--c-text-light);
}

.quick-cmd {
  padding: 8px 14px;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  font-size: 12px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
}

.quick-cmd:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  background: var(--c-primary-light);
}
</style>
