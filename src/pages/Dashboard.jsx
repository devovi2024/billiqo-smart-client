// src/components/Dashboard/Dashboard.jsx
import React, { useState, useMemo } from "react";
import {
  TrendingUp, ShoppingBag, Plus, Users, BarChart3,
  Star, Activity, Clock, ThumbsUp, Download, Filter,
  Calendar, DollarSign, Eye, RefreshCw
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line, Area, AreaChart
} from "recharts";

import { useDashboard } from "../hooks/useDashboard";
import "./Dashboard.scss";

// Helper: format currency
const formatCurrency = (value) => `$${value?.toLocaleString() ?? 0}`;
const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  // --- Loading & Error states ---
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="dashboard-error">
        <p>⚠️ Failed to load dashboard. Please refresh or try again later.</p>
      </div>
    );
  }

  // --- Destructure data from hook (expected shape) ---
  const {
    summary,
    revenueByCategory,
    monthlyData,
    invoices,
    products,
    reviews,
    satisfactionData,
    recentActivities,
    aiInsights
  } = data;

  // Stats cards derived from summary
  const stats = [
    { title: "Total Revenue", value: formatCurrency(summary?.totalRevenue), delta: summary?.revenueDelta || "+12.5%", icon: TrendingUp },
    { title: "Total Customers", value: summary?.totalCustomers?.toLocaleString() ?? "0", delta: summary?.customersDelta || "+8.2%", icon: Users },
    { title: "Invoices", value: summary?.totalInvoices?.toLocaleString() ?? "0", delta: summary?.invoicesDelta || "+5.1%", icon: BarChart3 },
    { title: "Avg Order Value", value: formatCurrency(summary?.avgOrderValue), delta: summary?.avgOrderDelta || "+3.2%", icon: DollarSign },
  ];

  // --- Filter states (section-specific) ---
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("All");
  const [invoiceCategoryFilter, setInvoiceCategoryFilter] = useState("All");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [reviewRatingFilter, setReviewRatingFilter] = useState(0);

  // Unique filter options
  const invoiceCategories = ["All", ...new Set((invoices || []).map(inv => inv.category))];
  const productCategories = ["All", ...new Set((products || []).map(p => p.category))];

  // Filtered data
  const filteredInvoices = useMemo(() => {
    let filtered = invoices || [];
    if (invoiceStatusFilter !== "All") filtered = filtered.filter(inv => inv.status === invoiceStatusFilter);
    if (invoiceCategoryFilter !== "All") filtered = filtered.filter(inv => inv.category === invoiceCategoryFilter);
    return filtered;
  }, [invoices, invoiceStatusFilter, invoiceCategoryFilter]);

  const filteredProducts = useMemo(() => {
    if (productCategoryFilter === "All") return products || [];
    return (products || []).filter(p => p.category === productCategoryFilter);
  }, [products, productCategoryFilter]);

  const filteredReviews = useMemo(() => {
    if (reviewRatingFilter === 0) return reviews || [];
    return (reviews || []).filter(r => r.rating === reviewRatingFilter);
  }, [reviews, reviewRatingFilter]);

  // Fallback empty arrays if data is missing
  const safeMonthlyData = monthlyData || [];
  const safeRevenueByCategory = revenueByCategory || [];
  const safeSatisfaction = satisfactionData || [];
  const safeActivities = recentActivities || [];
  const safeAIInsights = aiInsights || [];

  return (
    <div className="dashboard">
      {/* ========== HEADER ========== */}
      <div className="header-section">
        <div className="greeting">
          <p className="time-text">Good Morning, Admin</p>
          <h1>Dashboard Overview</h1>
        </div>
        <div className="header-actions">
          <button className="report-btn"><BarChart3 size={18} /> Export Report</button>
          <button className="report-btn"><RefreshCw size={18} /> Refresh</button>
        </div>
      </div>

      {/* ========== STATS CARDS ========== */}
      <div className="stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-header">
                <Icon size={22} />
                <span className="delta">{stat.delta}</span>
              </div>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* ========== CHARTS ROW ========== */}
      <div className="charts-row">
        {/* Revenue Trend (Line Chart) */}
        <div className="chart-card">
          <h2>Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={safeMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <div className="summary-box">
              <p>Total Revenue</p>
              <p>{formatCurrency(safeMonthlyData.reduce((s, m) => s + m.revenue, 0))}</p>
            </div>
            <div className="summary-box">
              <p>Avg Monthly</p>
              <p>{formatCurrency(safeMonthlyData.reduce((s, m) => s + m.revenue, 0) / (safeMonthlyData.length || 1))}</p>
            </div>
          </div>
        </div>

        {/* Revenue by Category (Pie Chart) */}
        <div className="chart-card">
          <h2>Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={safeRevenueByCategory}
                dataKey="value"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {safeRevenueByCategory.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Performance (Bar Chart) */}
        <div className="chart-card">
          <h2>Monthly Performance</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={safeMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========== SECONDARY CHARTS ========== */}
      <div className="secondary-charts">
        <div className="chart-card">
          <h2>Profit Margin <TrendingUp size={16} /></h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={safeMonthlyData}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Area type="monotone" dataKey="profit" stroke="#8b5cf6" fill="url(#profitGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h2>Customer Satisfaction</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={safeSatisfaction}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {safeSatisfaction.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========== QUICK ACTIONS ========== */}
      <div className="quick-actions">
        <button className="action-btn invoice"><Plus size={16} /> New Invoice</button>
        <button className="action-btn customer"><Users size={16} /> Add Customer</button>
        <button className="action-btn product"><ShoppingBag size={16} /> Add Product</button>
        <button className="action-btn reports"><Eye size={16} /> View Reports</button>
      </div>

      {/* ========== INVOICES SECTION ========== */}
      <div className="section-card invoices-section">
        <div className="section-header">
          <h2>Recent Invoices</h2>
          <div className="filter-group">
            <select value={invoiceStatusFilter} onChange={(e) => setInvoiceStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select value={invoiceCategoryFilter} onChange={(e) => setInvoiceCategoryFilter(e.target.value)}>
              {invoiceCategories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        <div className="invoice-list">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map(inv => (
              <div key={inv.id} className="invoice-item">
                <div>
                  <p className="invoice-id">{inv.id}</p>
                  <p className="customer-name">{inv.customer}</p>
                  <small>{inv.date} • {inv.category}</small>
                </div>
                <div className="text-right">
                  <p className="amount">{formatCurrency(inv.amount)}</p>
                  <span className={`status ${inv.status}`}>{inv.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No invoices match the filters.</div>
          )}
        </div>
      </div>

      {/* ========== TWO COLUMN GRID: PRODUCTS + ACTIVITY ========== */}
      <div className="two-col-grid">
        {/* Products with category filter */}
        <div className="section-card">
          <div className="section-header">
            <h2><TrendingUp size={18} /> Top Products</h2>
            <select value={productCategoryFilter} onChange={(e) => setProductCategoryFilter(e.target.value)}>
              {productCategories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="product-list">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-row">
                <div className="product-info">
                  <span className={`product-dot ${p.category === "Electronics" ? "dot-emerald" : p.category === "Clothing" ? "dot-blue" : "dot-amber"}`}></span>
                  <span className="product-name">{p.name}</span>
                </div>
                <div className="product-stats">
                  <span className="product-value">{formatCurrency(p.sales)}</span>
                  <span className="growth">{p.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="section-card">
          <h2><Activity size={18} /> Recent Activity</h2>
          <div className="activity-list">
            {safeActivities.map(act => (
              <div key={act.id} className="activity-item">
                <div className="activity-icon"><Clock size={14} /></div>
                <div className="activity-details">
                  <p><strong>{act.user}</strong> {act.action}</p>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== REVIEWS SECTION ========== */}
      <div className="section-card reviews-section">
        <div className="section-header">
          <h2><Star size={18} /> Customer Reviews</h2>
          <div className="filter-pills">
            <button className={`pill ${reviewRatingFilter === 0 ? "active" : ""}`} onClick={() => setReviewRatingFilter(0)}>All</button>
            <button className={`pill ${reviewRatingFilter === 5 ? "active" : ""}`} onClick={() => setReviewRatingFilter(5)}>★★★★★</button>
            <button className={`pill ${reviewRatingFilter === 4 ? "active" : ""}`} onClick={() => setReviewRatingFilter(4)}>★★★★☆</button>
            <button className={`pill ${reviewRatingFilter === 3 ? "active" : ""}`} onClick={() => setReviewRatingFilter(3)}>★★★☆☆</button>
          </div>
        </div>
        <div className="reviews-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(r => (
              <div key={r.id} className="review-item">
                <div className="reviewer">
                  <span className="name">{r.reviewer}</span>
                  <span className="stars">{renderStars(r.rating)}</span>
                  {r.verified && <span className="verified-badge">✓ Verified</span>}
                </div>
                <p className="review-text">{r.text}</p>
                <small>{r.date} • {r.product}</small>
              </div>
            ))
          ) : (
            <div className="no-results">No reviews match.</div>
          )}
        </div>
      </div>

      {/* ========== AI INSIGHTS ========== */}
      <div className="section-card ai-insights">
        <h2><ThumbsUp size={18} /> AI Business Insights</h2>
        <div className="insights-grid">
          {safeAIInsights.map(insight => (
            <div key={insight.id} className={`insight-card type-${insight.type}`}>
              <p>{insight.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}