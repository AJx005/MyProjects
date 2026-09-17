# AI Calendar Optimizer

A responsive browser-based scheduling prototype that turns a list of tasks into a structured daily plan using priority, category, duration and break-insertion rules.

## What It Does

Users can add tasks with a **duration**, **priority level** and **category**, then generate an optimized daily schedule. The interface displays each task as a timeline block with start/end times, category labels and priority indicators.

### Main Features

- Add and remove tasks dynamically
- High / medium / low priority levels
- Work, health, learning, personal and break categories
- Priority-based task ordering
- Duration-based tie breaking
- Slight morning preference for health tasks
- Automatic short/long break insertion
- Timeline-style schedule output starting from 9:00 AM
- Responsive dark UI with animations and category-specific styling

## Scheduling Logic

The current prototype uses a **rule-based heuristic scheduling algorithm** implemented in JavaScript:

1. Tasks are sorted by priority weight: high → medium → low.
2. Health tasks receive a slight preference when priorities are equal.
3. Longer tasks are placed first when the earlier rules still result in a tie.
4. The schedule begins at **9:00 AM**.
5. Breaks are automatically inserted after groups of tasks before subsequent high/medium-priority work.
6. Each task is converted into a time block and rendered on the daily timeline.

> **Implementation note:** the interface is AI-themed, but this version does not call an external AI model or train a machine-learning model. Its optimization is deterministic and heuristic-based. A future version could connect the interface to an LLM, constraint solver or learned scheduling model.

## Tech Stack

- **HTML5** — structure and task-entry interface
- **CSS3** — responsive layout, visual system and animations
- **Vanilla JavaScript** — state management, scheduling logic and dynamic rendering
- **Google Fonts / Inter** — typography

## Project Structure

```text
AI-Calendar-Optimizer/
├── index.html
├── style.css
├── app.js
└── README.md
```

## How to Run

No build step or package installation is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.
3. Add tasks and click **Optimize Schedule**.

## How the Code Is Organized

`app.js` keeps tasks in a small in-memory state object, renders the task list, sorts tasks using the scheduling rules, generates time blocks, inserts breaks and then renders the optimized timeline.

`style.css` defines the dark interface, responsive two-column layout, task/priority colors, animations and timeline components.

## Possible Next Steps

- Let users set their own workday start/end times
- Add deadlines and fixed calendar events
- Persist tasks with local storage or a database
- Drag and reorder generated tasks
- Export schedules to Google Calendar / Outlook
- Add conflict detection and available-time constraints
- Replace or supplement the heuristic logic with an AI/optimization service

---

**Project context:** Digital Business & Data Science portfolio project.
