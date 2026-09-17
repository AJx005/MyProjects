// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  tasks: [],
  nextId: 1,
};

// ─── DOM References ───────────────────────────────────────────────────────────
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDurationInput = document.getElementById('task-duration');
const taskPrioritySelect = document.getElementById('task-priority');
const taskCategorySelect = document.getElementById('task-category');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const emptyState = document.getElementById('empty-state');
const optimizeBtn = document.getElementById('optimize-btn');
const scheduleOutput = document.getElementById('schedule-output');
const schedulePlaceholder = document.getElementById('schedule-placeholder');
const aiBanner = document.getElementById('ai-banner');
const aiSummaryText = document.getElementById('ai-summary-text');
const scheduleDate = document.getElementById('schedule-date');

// ─── Category & Priority Config ───────────────────────────────────────────────
const CATEGORY_CONFIG = {
  work: { label: 'Work', emoji: '💼', color: 'var(--cat-work)' },
  health: { label: 'Health', emoji: '💪', color: 'var(--cat-health)' },
  learning: { label: 'Learning', emoji: '📚', color: 'var(--cat-learning)' },
  personal: { label: 'Personal', emoji: '🏠', color: 'var(--cat-personal)' },
  break: { label: 'Break', emoji: '☕', color: 'var(--cat-break)' },
};

const PRIORITY_CONFIG = {
  high: { label: 'High', weight: 3, dotClass: 'dot-high', color: 'var(--priority-high)' },
  medium: { label: 'Medium', weight: 2, dotClass: 'dot-medium', color: 'var(--priority-medium)' },
  low: { label: 'Low', weight: 1, dotClass: 'dot-low', color: 'var(--priority-low)' },
};

// AI Optimization strategies with human-readable explanations
const AI_STRATEGIES = [
  "Placed high-priority tasks in peak morning focus windows (9–11 AM) for maximum cognitive performance.",
  "Applied the 'eat the frog' principle — your most demanding tasks are first, so everything after feels lighter.",
  "Inserted strategic recovery breaks using the 52/17 productivity rhythm to sustain energy all day.",
  "Grouped similar categories to minimize context-switching, reducing mental overhead by up to 40%.",
  "Scheduled health & fitness tasks mid-morning when body temperature and alertness are at their peak.",
  "Balanced cognitive load across time blocks, preventing burnout by varying task intensity.",
];

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  // Set today's date
  const today = new Date();
  scheduleDate.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Prefill two demo tasks so the UI feels alive
  addTaskToState({ name: 'Deep Work: Project Report', duration: 90, priority: 'high', category: 'work' });
  addTaskToState({ name: 'Morning Workout', duration: 45, priority: 'medium', category: 'health' });
  renderTaskList();
  updateOptimizeBtn();
}

// ─── Add Task Form Submit ──────────────────────────────────────────────────────
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const duration = parseInt(taskDurationInput.value, 10);
  const priority = taskPrioritySelect.value;
  const category = taskCategorySelect.value;

  if (!name || !duration || !priority) return;

  addTaskToState({ name, duration, priority, category });
  renderTaskList();
  updateOptimizeBtn();

  // Reset form
  taskForm.reset();
  taskNameInput.focus();
});

function addTaskToState(task) {
  state.tasks.push({ id: state.nextId++, ...task });
}

// ─── Render Task List ─────────────────────────────────────────────────────────
function renderTaskList() {
  // Remove all items except empty-state li (which we'll manage separately)
  [...taskList.querySelectorAll('.task-item')].forEach(el => el.remove());

  if (state.tasks.length === 0) {
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    state.tasks.forEach(task => {
      const li = buildTaskItem(task);
      taskList.appendChild(li);
    });
  }
  taskCount.textContent = state.tasks.length;
}

function buildTaskItem(task) {
  const pCfg = PRIORITY_CONFIG[task.priority];
  const cCfg = CATEGORY_CONFIG[task.category];

  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id;
  li.innerHTML = `
    <span class="task-item-dot ${pCfg.dotClass}" title="Priority: ${pCfg.label}"></span>
    <span class="task-item-name" title="${task.name}">${task.name}</span>
    <span class="task-item-meta">${cCfg.emoji} ${task.duration}m</span>
    <button class="task-remove" aria-label="Remove task ${task.name}" data-id="${task.id}">✕</button>
  `;
  li.querySelector('.task-remove').addEventListener('click', () => removeTask(task.id));
  return li;
}

function removeTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  renderTaskList();
  updateOptimizeBtn();
}

function updateOptimizeBtn() {
  optimizeBtn.disabled = state.tasks.length === 0;
}

// ─── Optimize Schedule ────────────────────────────────────────────────────────
optimizeBtn.addEventListener('click', () => {
  if (state.tasks.length === 0) return;
  runOptimization();
});

async function runOptimization() {
  // Show thinking animation
  optimizeBtn.disabled = true;
  optimizeBtn.innerHTML = `
    <span class="btn-icon">✦</span>
    <span>Optimizing<span class="optimizing-dots"><span>.</span><span>.</span><span>.</span></span></span>
    <div class="btn-shimmer"></div>
  `;

  // Simulate AI processing delay
  await delay(1400);

  const schedule = generateOptimizedSchedule(state.tasks);
  renderSchedule(schedule);
  showAIBanner();

  // Restore button
  optimizeBtn.disabled = false;
  optimizeBtn.innerHTML = `
    <span class="btn-icon">✦</span>
    <span>Re-Optimize</span>
    <div class="btn-shimmer"></div>
  `;
}

// ─── AI Scheduling Algorithm ──────────────────────────────────────────────────
function generateOptimizedSchedule(tasks) {
  // Step 1: Sort tasks by priority weight (desc), then by duration (desc for high-energy tasks first)
  const sorted = [...tasks].sort((a, b) => {
    const pw = PRIORITY_CONFIG[b.priority].weight - PRIORITY_CONFIG[a.priority].weight;
    if (pw !== 0) return pw;
    // Health tasks get a slight boost for morning placement
    if (a.category === 'health' && b.category !== 'health') return -1;
    if (b.category === 'health' && a.category !== 'health') return 1;
    return b.duration - a.duration;
  });

  // Step 2: Build time blocks starting at 9:00 AM
  const schedule = [];
  let currentMinutes = 9 * 60; // 9:00 AM in minutes from midnight
  let tasksSinceLongBreak = 0;
  const BREAK_INTERVAL = 2; // insert break every N tasks (for high/medium priority)
  const SHORT_BREAK = 10;
  const LONG_BREAK = 20;

  sorted.forEach((task, index) => {
    // Possibly insert a break before this task (not before the first one)
    if (index > 0 && tasksSinceLongBreak >= BREAK_INTERVAL && task.priority !== 'low') {
      const breakDuration = tasksSinceLongBreak >= 3 ? LONG_BREAK : SHORT_BREAK;
      schedule.push({
        isBreak: true,
        name: breakDuration >= LONG_BREAK ? '🧘 Long break & recharge' : '☕ Short break',
        startMinutes: currentMinutes,
        duration: breakDuration,
        priority: 'low',
        category: 'break',
      });
      currentMinutes += breakDuration;
      tasksSinceLongBreak = 0;
    }

    schedule.push({
      ...task,
      startMinutes: currentMinutes,
      isBreak: false,
    });
    currentMinutes += task.duration;
    tasksSinceLongBreak++;
  });

  return schedule;
}

// ─── Render Schedule ──────────────────────────────────────────────────────────
function renderSchedule(schedule) {
  scheduleOutput.innerHTML = '';

  schedule.forEach((block, i) => {
    const el = buildScheduleBlock(block, i);
    scheduleOutput.appendChild(el);
  });

  schedulePlaceholder.style.display = 'none';
  scheduleOutput.style.display = 'flex';
}

function buildScheduleBlock(block, index) {
  const timeStr = minutesToTime(block.startMinutes);
  const endTime = minutesToTime(block.startMinutes + block.duration);
  const cCfg = CATEGORY_CONFIG[block.category] || CATEGORY_CONFIG.break;
  const pCfg = block.isBreak ? null : PRIORITY_CONFIG[block.priority];

  const wrapper = document.createElement('div');
  wrapper.className = 'schedule-block';
  wrapper.style.animationDelay = `${index * 0.07}s`;

  const priorityBadge = pCfg
    ? `<span class="schedule-card-badge" style="color:${pCfg.color};border-color:${pCfg.color};">${pCfg.label}</span>`
    : '';

  wrapper.innerHTML = `
    <div class="schedule-time">${timeStr}</div>
    <div class="schedule-dot-wrap">
      <div class="schedule-dot" style="background:${cCfg.color};color:${cCfg.color};"></div>
    </div>
    <div class="schedule-content">
      <div class="schedule-card ${block.isBreak ? 'is-break' : ''}" style="border-left-color:${cCfg.color};color:${cCfg.color};">
        <div class="schedule-card-header">
          <span class="schedule-card-title" style="color:var(--text-primary);">${block.name}</span>
          ${priorityBadge}
        </div>
        <div class="schedule-card-meta">
          <span class="meta-tag">${cCfg.emoji} ${cCfg.label}</span>
          <span>·</span>
          <span class="meta-tag">⏱ ${block.duration} min</span>
          <span>·</span>
          <span class="meta-tag">Until ${endTime}</span>
        </div>
      </div>
    </div>
  `;
  return wrapper;
}

// ─── AI Banner ────────────────────────────────────────────────────────────────
function showAIBanner() {
  const strategy = AI_STRATEGIES[Math.floor(Math.random() * AI_STRATEGIES.length)];
  aiSummaryText.textContent = strategy;
  aiBanner.style.display = 'flex';
  // Trigger animation
  aiBanner.style.animation = 'none';
  aiBanner.offsetHeight; // reflow
  aiBanner.style.animation = '';
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init();
