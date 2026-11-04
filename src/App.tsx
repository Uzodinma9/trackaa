import { useState, type FormEvent, type ReactNode } from 'react'
import './App.css'

type IconName =
  | 'grid'
  | 'arrows'
  | 'pie'
  | 'user'
  | 'plus'
  | 'eye'
  | 'arrow-up-right'
  | 'arrow-down-left'
  | 'shopping'
  | 'utensils'
  | 'car'
  | 'home'
  | 'heart'
  | 'dots'
  | 'close'
  | 'check'

type Transaction = {
  id: number
  name: string
  category: string
  date: string
  amount: number
  direction: 'income' | 'expense'
  icon: IconName
  color: string
}

type SpendingCategory = {
  name: string
  amount: number
  icon: IconName
  color: string
}

const initialTransactions: Transaction[] = [
  { id: 1, name: 'Salary', category: 'Income', date: 'Today, 9:41 AM', amount: 850000, direction: 'income', icon: 'arrow-down-left', color: 'mint' },
  { id: 2, name: 'Groceries', category: 'Food & drink', date: 'Today, 8:20 AM', amount: 18500, direction: 'expense', icon: 'shopping', color: 'peach' },
  { id: 3, name: 'Uber ride', category: 'Transport', date: 'Yesterday', amount: 4200, direction: 'expense', icon: 'car', color: 'blue' },
  { id: 4, name: 'Netflix', category: 'Entertainment', date: 'Yesterday', amount: 4900, direction: 'expense', icon: 'dots', color: 'pink' },
  { id: 5, name: 'Dinner at Nok', category: 'Food & drink', date: 'Nov 2, 2026', amount: 12500, direction: 'expense', icon: 'utensils', color: 'peach' },
]

const initialCategories: SpendingCategory[] = [
  { name: 'Food & drink', amount: 128500, icon: 'utensils' as const, color: 'lime' },
  { name: 'Transport', amount: 64200, icon: 'car' as const, color: 'blue' },
  { name: 'Bills & utilities', amount: 52700, icon: 'home' as const, color: 'purple' },
  { name: 'Shopping', amount: 39100, icon: 'shopping' as const, color: 'orange' },
]

const navigation: { label: string; href: string; icon: IconName }[] = [
  { label: 'Dashboard', href: '#dashboard', icon: 'grid' },
  { label: 'Transactions', href: '#transactions', icon: 'arrows' },
  { label: 'Budgets', href: '#budget', icon: 'pie' },
  { label: 'Profile', href: '#profile', icon: 'user' },
]

const money = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
    arrows: <><path d="M7 7h12l-3.5-3.5" /><path d="M17 17H5l3.5 3.5" /><path d="M19 7l-3.5 3.5M5 17l3.5-3.5" /></>,
    pie: <><path d="M11 3.2a8.8 8.8 0 1 0 9.8 9.8H11z" /><path d="M14 3.2v6h6A8.8 8.8 0 0 0 14 3.2Z" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    eye: <><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    'arrow-up-right': <><path d="M7 17 17 7M7 7h10v10" /></>,
    'arrow-down-left': <><path d="M17 7 7 17M17 17H7V7" /></>,
    shopping: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    utensils: <><path d="M7 3v7M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 9.5V21M16 3v18M16 3c3 2 4 5 0 8" /></>,
    car: <><path d="m5 11 1.5-5h11l1.5 5M3 11h18v7H3z" /><path d="M6 18v2m12-2v2M6 14h.01M18 14h.01" /></>,
    home: <><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 21v-7h6v7" /></>,
    heart: <path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Brand() {
  return (
    <a className="brand" href="#dashboard" aria-label="Tracka dashboard">
      <span className="brand-mark"><span /><span /><span /></span>
      <span>tracka</span>
    </a>
  )
}

function App() {
  const [today] = useState(() => new Date())
  const [transactions, setTransactions] = useState(initialTransactions)
  const [categories, setCategories] = useState<SpendingCategory[]>(initialCategories)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food & drink')

  const categoryTotal = categories.reduce((total, item) => total + item.amount, 0)
  const addedExpenses = transactions
    .filter((transaction) => transaction.id > initialTransactions.length && transaction.direction === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const monthlyExpenses = 284500 + addedExpenses
  const availableBalance = 1245800 - addedExpenses
  const budgetProgress = Math.min((monthlyExpenses / 420000) * 100, 100)

  function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const expenseAmount = Number(amount)
    if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) return

    const categoryIcon: Record<string, IconName> = {
      'Food & drink': 'utensils',
      Transport: 'car',
      'Bills & utilities': 'home',
      Shopping: 'shopping',
      Health: 'heart',
    }
    const categoryColor: Record<string, string> = {
      'Food & drink': 'peach',
      Transport: 'blue',
      'Bills & utilities': 'mint',
      Shopping: 'orange',
      Health: 'purple',
    }
    const newTransaction: Transaction = {
      id: Date.now(),
      name: category,
      category,
      date: 'Just now',
      amount: expenseAmount,
      direction: 'expense',
      icon: categoryIcon[category] ?? 'dots',
      color: categoryColor[category] ?? 'mint',
    }
    setTransactions((current) => [newTransaction, ...current])
    setCategories((current) =>
      current.some((item) => item.name === category)
        ? current.map((item) =>
            item.name === category ? { ...item, amount: item.amount + expenseAmount } : item,
          )
        : [...current, {
            name: category,
            amount: expenseAmount,
            icon: categoryIcon[category] ?? 'heart',
            color: category === 'Health' ? 'purple' : 'orange',
          }],
    )
    setAmount('')
    setShowAddExpense(false)
  }

  const nav = (
    <nav className="navigation" aria-label="Main navigation">
      {navigation.map((item) => (
        <a
          className={`nav-link${activeSection === item.label ? ' active' : ''}`}
          href={item.href}
          key={item.label}
          onClick={() => setActiveSection(item.label)}
        >
          <Icon name={item.icon} size={19} />
          <span>{item.label}</span>
          {item.label === 'Transactions' && <span className="nav-count">{transactions.length}</span>}
        </a>
      ))}
    </nav>
  )

  return (
    <div className="app-shell" id="dashboard">
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-label">MENU</div>
        {nav}
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-sparkle">✳</span>
            <p>A little progress<br />adds up every day.</p>
            <span className="tip-caption">You’re doing great, Ada.</span>
          </div>
          <div className="sidebar-user">
            <div className="avatar">AO</div>
            <div className="user-copy"><strong>Ada Okafor</strong><span>Personal account</span></div>
            <Icon name="dots" size={19} />
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="breadcrumb"><span>Pages</span><span className="breadcrumb-slash">/</span><strong>Dashboard</strong></div>
          <div className="topbar-actions">
            <span className="today-label">
              {new Intl.DateTimeFormat('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(today)}
            </span>
            <a className="topbar-profile" id="profile" href="#profile" aria-label="Go to profile"><span className="avatar avatar-small">AO</span><span>Ada</span><span className="chevron">⌄</span></a>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">{new Intl.DateTimeFormat('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(today).toUpperCase()} <span className="eyebrow-dot" /></p>
              <h1>Good morning, Ada <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">Here’s what’s happening with your money.</p>
            </div>
            <button className="button button-primary add-expense" aria-label="Add expense" onClick={() => setShowAddExpense(true)}>
              <Icon name="plus" size={18} />
              <span>Add expense</span>
            </button>
          </section>

          <section className="overview-grid" aria-label="Monthly financial overview">
            <article className="balance-card">
              <div className="balance-card-top">
                <span className="balance-label"><span className="balance-indicator" /> Available balance</span>
                <button className="icon-button balance-visibility" aria-label={showBalance ? 'Hide balance' : 'Show balance'} onClick={() => setShowBalance((visible) => !visible)}>
                  <Icon name="eye" size={18} />
                </button>
              </div>
              <div className="balance-amount">{showBalance ? money(availableBalance) : '₦ ••••••••'}</div>
              <div className="balance-bottom">
                <span className="balance-period">Your total across accounts</span>
                <span className="balance-change"><Icon name="arrow-up-right" size={14} /> 8.2%</span>
              </div>
              <div className="balance-orb balance-orb-one" />
              <div className="balance-orb balance-orb-two" />
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon income-icon"><Icon name="arrow-down-left" size={18} /></span>
                <span className="metric-trend positive"><Icon name="arrow-up-right" size={14} /> 12.8%</span>
              </div>
              <p className="metric-label">Total income <span>THIS MONTH</span></p>
              <p className="metric-amount">{money(1850000)}</p>
              <div className="mini-chart income-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span className="metric-icon expense-icon"><Icon name="arrow-up-right" size={18} /></span>
                <span className="metric-trend negative"><Icon name="arrow-down-left" size={14} /> 4.3%</span>
              </div>
              <p className="metric-label">Total expenses <span>THIS MONTH</span></p>
              <p className="metric-amount">{money(monthlyExpenses)}</p>
              <div className="mini-chart expense-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
          </section>

          <section className="middle-grid">
            <article className="panel budget-panel" id="budget">
              <div className="panel-heading">
                <div><p className="section-kicker">STAY ON TRACK</p><h2>Monthly budget</h2></div>
                <button className="more-button" aria-label="More budget options"><Icon name="dots" size={20} /></button>
              </div>
              <div className="budget-main">
                <div className="budget-copy"><span>Spent so far</span><strong>{money(monthlyExpenses)}</strong></div>
                <div className="budget-total">of <strong>{money(420000)}</strong></div>
              </div>
              <div className="progress-track" role="progressbar" aria-label="Monthly budget used" aria-valuenow={Math.round(budgetProgress)} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-fill" style={{ width: `${budgetProgress}%` }} />
              </div>
              <div className="budget-footer">
                <span><span className="legend-dot green-dot" /> {Math.round(budgetProgress)}% used</span>
                <span>{money(Math.max(420000 - monthlyExpenses, 0))} left</span>
              </div>
              <div className="budget-note"><span className="note-icon">✳</span><span>You’re spending <strong>15% less</strong> than this time last month. Keep it up!</span></div>
            </article>

            <article className="panel breakdown-panel">
              <div className="panel-heading">
                <div><p className="section-kicker">WHERE IT GOES</p><h2>Spending breakdown</h2></div>
                <button className="period-select" aria-label="Spending breakdown period">This month <span>⌄</span></button>
              </div>
              <div className="breakdown-content">
                <div className="donut-wrap">
                  <div className="donut-chart" style={{ background: `conic-gradient(${categories.map((item, index) => {
                    const colors: Record<string, string> = { lime: '#a6d260', blue: '#80b4c3', purple: '#aa9ad6', orange: '#e8b47d', pink: '#d68bb0', mint: '#85bf91', peach: '#e8b47d' }
                    const previous = categories.slice(0, index).reduce((total, itemBefore) => total + itemBefore.amount, 0)
                    const start = categoryTotal > 0 ? (previous / categoryTotal) * 100 : 0
                    const end = categoryTotal > 0 ? ((previous + item.amount) / categoryTotal) * 100 : 100
                    return `${colors[item.color] ?? colors.lime} ${start}% ${end}%`
                  }).join(', ')})` }}><div className="donut-center"><strong>₦{new Intl.NumberFormat('en-NG', { notation: 'compact', maximumFractionDigits: 0 }).format(monthlyExpenses)}</strong><span>Total spent</span></div></div>
                </div>
                <div className="category-list">
                  {categories.map((item) => (
                    <div className="category-row" key={item.name}>
                      <span className={`category-icon category-${item.color}`}><Icon name={item.icon} size={16} /></span>
                      <span className="category-name">{item.name}</span>
                      <strong>{money(item.amount)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="panel transactions-panel" id="transactions">
            <div className="panel-heading transactions-heading">
              <div><p className="section-kicker">YOUR LATEST ACTIVITY</p><h2>Recent transactions</h2></div>
              <a className="view-all" href="#transactions">View all <Icon name="arrow-up-right" size={16} /></a>
            </div>
            <div className="transaction-table">
              <div className="table-header"><span>TRANSACTION</span><span>CATEGORY</span><span>DATE</span><span className="amount-heading">AMOUNT</span></div>
              {transactions.slice(0, 5).map((transaction) => (
                <div className="transaction-row" key={transaction.id}>
                  <span className={`transaction-icon transaction-${transaction.color}`}><Icon name={transaction.icon} size={18} /></span>
                  <div className="transaction-name"><strong>{transaction.name}</strong><span>{transaction.direction === 'income' ? 'Received' : 'Payment'}</span></div>
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{transaction.date}</span>
                  <strong className={`transaction-amount ${transaction.direction === 'income' ? 'income-amount' : ''}`}>{transaction.direction === 'income' ? '+' : '−'}{money(transaction.amount)}</strong>
                </div>
              ))}
            </div>
            <a className="mobile-view-all" href="#transactions">View all transactions <Icon name="arrow-up-right" size={16} /></a>
          </section>

          <footer className="dashboard-footer">
            <span>Made for your money, made for you.</span>
            <span className="sample-note"><span className="sample-dot" /> Sample data · Not your actual account balance</span>
          </footer>
        </main>
      </div>

      <div className="mobile-nav">{nav}</div>

      {showAddExpense && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddExpense(false) }}>
          <section className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading">
              <div><p className="section-kicker">KEEP YOUR TRACKING UP TO DATE</p><h2 id="modal-title">Add an expense</h2></div>
              <button className="icon-button close-button" aria-label="Close dialog" onClick={() => setShowAddExpense(false)}><Icon name="close" size={20} /></button>
            </div>
            <form onSubmit={addExpense}>
              <label className="form-label" htmlFor="expense-amount">Amount</label>
              <div className="amount-input-wrap"><span>₦</span><input id="expense-amount" autoFocus type="number" min="1" step="1" required placeholder="0" value={amount} onChange={(event) => setAmount(event.target.value)} /></div>
              <label className="form-label" htmlFor="expense-category">Category</label>
              <select id="expense-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                {['Food & drink', 'Transport', 'Bills & utilities', 'Shopping', 'Health'].map((item) => <option key={item}>{item}</option>)}
              </select>
              <button className="button button-primary modal-submit" type="submit"><Icon name="plus" size={18} /> Save expense</button>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
