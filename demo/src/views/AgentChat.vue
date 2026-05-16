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

const iconComponents = { CloudRain, Package, UserCircle }

const roleIcons = { agent: Bot, human: User }

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
      <div class="scenarios-panel" data-aos="fade-right">
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
            自动播放
          </button>
        </div>
      </div>

      <div class="chat-main" data-aos="fade-left">
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
              <Bot :size="40" />
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
              :class="message.role === 'agent' ? 'message-agent' : 'message-human'"
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
        </div>

        <transition name="typing-fade">
          <div v-if="isTyping" class="message-wrapper message-agent typing-indicator">
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

        <div class="chat-input-area">
          <div class="input-wrapper">
            <input
              v-model="userInput"
              type="text"
              placeholder="输入消息与智能体对话..."
              class="chat-input"
              @keyup.enter="sendMessage"
            />
            <button class="send-btn" @click="sendMessage" :disabled="!userInput.trim()" aria-label="发送">
              <Send :size="18" />
            </button>
          </div>
          <div class="quick-commands">
            <span class="quick-hint">快捷：</span>
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
  height: calc(100vh - 56px - var(--s-4) * 2);
  height: calc(100dvh - 56px - var(--s-4) * 2);
  min-height: 500px;
}

@media (min-width: 769px) {
  .agent-chat-page {
    height: calc(100vh - 64px - var(--s-5) * 2);
    height: calc(100dvh - 64px - var(--s-5) * 2);
  }
}

.chat-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-4);
  height: 100%;
}

@media (min-width: 769px) {
  .chat-layout {
    grid-template-columns: 280px 1fr;
  }
}

/* ─── Scenarios Panel ─── */
.scenarios-panel {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  max-height: 200px;
}

@media (min-width: 769px) {
  .scenarios-panel {
    height: 100%;
    max-height: none;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-4);
  border-bottom: 1px solid var(--c-border);
  flex-shrink: 0;
}

.panel-title {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: clamp(14px, 1.6vw, 15px);
}

.scenarios-list {
  display: flex;
  gap: var(--s-2);
  padding: var(--s-3);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

@media (min-width: 769px) {
  .scenarios-list {
    flex-direction: column;
    flex: 1;
    overflow-x: visible;
    overflow-y: auto;
  }
}

.scenario-item {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: 12px;
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: background var(--t-fast);
  white-space: nowrap;
  flex-shrink: 0;
  scroll-snap-align: start;
  border: 1px solid transparent;
}

@media (min-width: 769px) {
  .scenario-item {
    white-space: normal;
  }
}

.scenario-item:hover {
  background: var(--c-bg-muted);
}

.scenario-item.is-active {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
  border-color: var(--c-primary);
}

.scenario-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: var(--r-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.scenario-icon.weather { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); }
.scenario-icon.replenishment { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.scenario-icon.member_service { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }

.scenario-info {
  min-width: 0;
}

.scenario-name {
  font-weight: 600;
  color: var(--c-text-primary);
  font-size: clamp(12px, 1.4vw, 14px);
}

.scenario-desc {
  display: none;
  font-size: 12px;
  color: var(--c-text-muted);
}

@media (min-width: 769px) {
  .scenario-desc {
    display: block;
  }
}

.scenario-arrow {
  color: var(--c-text-light);
  flex-shrink: 0;
}

.panel-footer {
  padding: var(--s-3);
  border-top: 1px solid var(--c-border);
  flex-shrink: 0;
}

.play-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  padding: 10px;
  background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-accent) 100%);
  color: #fff;
  border: none;
  border-radius: var(--r-sm);
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  cursor: pointer;
  transition: opacity var(--t-fast), transform var(--t-fast);
  min-height: 44px;
}

.play-btn:hover {
  opacity: 0.9;
}

/* ─── Chat Main ─── */
.chat-main {
  background: var(--c-bg-card);
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto;
  min-height: 400px;
}

@media (min-width: 769px) {
  .chat-main {
    height: 100%;
  }
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--s-3) var(--s-4);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  min-width: 0;
}

.agent-avatar {
  width: 40px;
  height: 40px;
  min-width: 40px;
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
  font-size: clamp(14px, 1.6vw, 15px);
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.chat-actions {
  flex-shrink: 0;
}

.quick-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-sm);
  font-size: 13px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 40px;
}

.quick-action:hover {
  border-color: var(--c-border-light);
  color: var(--c-text-primary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--s-4);
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
  padding: var(--s-4);
}

.welcome-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  margin-bottom: var(--s-4);
}

.welcome-title {
  font-size: clamp(17px, 2.5vw, 20px);
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0 0 var(--s-3) 0;
}

.welcome-desc {
  font-size: clamp(13px, 1.5vw, 14px);
  color: var(--c-text-muted);
  margin: 0 0 var(--s-4) 0;
  line-height: 1.6;
}

.welcome-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
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
  font-size: clamp(12px, 1.4vw, 13px);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}

.message-wrapper {
  display: flex;
  gap: var(--s-2);
  max-width: 100%;
}

.message-wrapper.message-human {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 80%;
  min-width: 0;
}

@media (min-width: 768px) {
  .message-content {
    max-width: 70%;
  }
}

.message-human .message-content {
  text-align: right;
}

.message-bubble {
  display: inline-block;
  padding: 12px 16px;
  border-radius: var(--r-md);
  max-width: 100%;
  text-align: left;
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
  font-size: clamp(13px, 1.5vw, 14px);
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

.typing-indicator {
  padding: var(--s-2) var(--s-4);
}

.typing-bubble {
  padding: 14px 18px;
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

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.typing-fade-enter-active { transition: opacity 0.2s ease; }
.typing-fade-leave-active { transition: opacity 0.15s ease; }
.typing-fade-enter-from,
.typing-fade-leave-to { opacity: 0; }

/* ─── Input Area ─── */
.chat-input-area {
  padding: var(--s-3) var(--s-4);
  border-top: 1px solid var(--c-border);
  background: var(--c-bg-muted);
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  gap: var(--s-2);
  margin-bottom: var(--s-2);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  font-size: clamp(14px, 1.6vw, 15px);
  font-family: inherit;
  outline: none;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
  background: var(--c-bg-card);
  min-height: 44px;
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
  border-radius: var(--r-md);
  cursor: pointer;
  transition: opacity var(--t-fast), transform var(--t-fast);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-commands {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.quick-hint {
  font-size: 12px;
  color: var(--c-text-light);
  flex-shrink: 0;
}

.quick-cmd {
  padding: 8px 14px;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-sm);
  font-size: 12px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 40px;
  white-space: nowrap;
}

.quick-cmd:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  background: var(--c-primary-light);
}

@media (min-width: 769px) {
  .quick-cmd {
    min-height: 36px;
  }
}
</style>
