import { useMemo, useState } from "react";
import { TrendingUp, ShoppingBag, Plus, Users, BarChart3, Star, Activity, Clock, ThumbsUp, DollarSign, Eye, RefreshCw, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, Area, AreaChart } from "recharts";
import { useDashboard } from "../hooks/useDashboard";
import "./Dashboard.scss";

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

const renderStars = (rating = 0) => "★".repeat(rating) + "☆".repeat(5 - rating);

export default function Dashboards() {
  const { data, isLoading, isError, refetch } = useDashboard();

  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("All");
  const [invoiceCategoryFilter, setInvoiceCategoryFilter] = useState("All");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [reviewRatingFilter, setReviewRatingFilter] = useState(0);
  const [searchInvoice, setSearchInvoice] = useState("");
  const [searchProduct, setSearchProduct] = useState("");

  const dashboard = data?.data || {};
  const summary = dashboard.summary || {};
  const revenueByCategory = dashboard.revenueByCategory || [];
  const monthlyData = dashboard.monthlyData || [];
  const invoices = dashboard.invoices || [];
  const products = dashboard.products || [];
  const reviews = dashboard.reviews || [];
  const satisfactionData = dashboard.satisfactionData || [];
  const recentActivities = dashboard.recentActivities || [];
  const aiInsights = dashboard.aiInsights || [];

  const invoiceCategories = useMemo(() => ["All", ...new Set(invoices.map((i) => i.category).filter(Boolean))], [invoices]);

  const productCategories = useMemo(() => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))], [products]);

  const filteredInvoices = useMemo(() => invoices.filter((inv) => {
    const statusMatch = invoiceStatusFilter === "All" || inv.status === invoiceStatusFilter;
    const categoryMatch = invoiceCategoryFilter === "All" || inv.category === invoiceCategoryFilter;
    const searchMatch = !searchInvoice || inv.customer?.name?.toLowerCase().includes(searchInvoice.toLowerCase()) || inv.id?.toLowerCase().includes(searchInvoice.toLowerCase());
    return statusMatch && categoryMatch && searchMatch;
  }), [invoices, invoiceStatusFilter, invoiceCategoryFilter, searchInvoice]);

  const filteredProducts = useMemo(() => products.filter((p) => {
    const categoryMatch = productCategoryFilter === "All" || p.category === productCategoryFilter;
    const searchMatch = !searchProduct || p.name?.toLowerCase().includes(searchProduct.toLowerCase());
    return categoryMatch && searchMatch;
  }), [products, productCategoryFilter, searchProduct]);

  const filteredReviews = useMemo(() => !reviewRatingFilter ? reviews : reviews.filter((r) => r.rating === reviewRatingFilter), [reviews, reviewRatingFilter]);

  const stats = [
    { title: "Total Revenue", value: formatCurrency(summary.totalRevenue), delta: "+12.5%", icon: TrendingUp },
    { title: "Customers", value: summary.totalCustomers || 0, delta: "+8.2%", icon: Users },
    { title: "Invoices", value: summary.totalInvoices || 0, delta: "+5.1%", icon: BarChart3 },
    { title: "Avg Order", value: formatCurrency(summary.avgOrderValue), delta: "+3.2%", icon: DollarSign },
  ];

  const totalRevenue = monthlyData.reduce((sum, item) => sum + (item.revenue || 0), 0);

  const avgRevenue = totalRevenue / (monthlyData.length || 1);

  if (isLoading) return <div className="dashboard-loading"><div className="spinner" /></div>;

  if (isError || !data?.success) return <div className="dashboard-error"><p>Failed to load dashboard</p><button onClick={refetch} className="retry-btn"><RefreshCw size={16} />Retry</button></div>;

  return (
    <div className="dashboard">
      <div className="header-section">
        <div>
          <p className="time-text">Welcome Back, Admin</p>
          <h1>Dashboard Overview</h1>
        </div>

        <button className="report-btn" onClick={refetch}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">
                  <Icon size={20} />
                </div>

                <span className="delta up">{stat.delta}</span>
              </div>

              <p className="stat-title">{stat.title}</p>

              <h2 className="stat-value">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h2>Revenue Trend</h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          <div className="chart-summary">
            <div className="summary-box">
              <span>Total</span>
              <strong>{formatCurrency(totalRevenue)}</strong>
            </div>

            <div className="summary-box">
              <span>Average</span>
              <strong>{formatCurrency(avgRevenue)}</strong>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h2>Revenue by Category</h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={revenueByCategory} dataKey="value" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {revenueByCategory.map((item, index) => <Cell key={index} fill={item.color || "#10b981"} />)}
              </Pie>

              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Monthly Performance</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" />
              <Bar dataKey="expenses" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="secondary-charts">
        <div className="chart-card">
          <h2>Profit Margin</h2>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Area type="monotone" dataKey="profit" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Customer Satisfaction</h2>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={satisfactionData} dataKey="value" innerRadius={50} outerRadius={80}>
                {satisfactionData.map((item, index) => <Cell key={index} fill={item.color || "#10b981"} />)}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn invoice"><Plus size={16} />New Invoice</button>
        <button className="action-btn customer"><Users size={16} />Add Customer</button>
        <button className="action-btn product"><ShoppingBag size={16} />Add Product</button>
        <button className="action-btn reports"><Eye size={16} />Reports</button>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h2>Recent Invoices</h2>

          <div className="filter-controls">
            <div className="search-box">
              <Search size={16} />

              <input type="text" placeholder="Search invoice" value={searchInvoice} onChange={(e) => setSearchInvoice(e.target.value)} />
            </div>

            <select value={invoiceStatusFilter} onChange={(e) => setInvoiceStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>

            <select value={invoiceCategoryFilter} onChange={(e) => setInvoiceCategoryFilter(e.target.value)}>
              {invoiceCategories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="invoice-list">
          {filteredInvoices.map((inv) => (
            <div key={inv._id || inv.id} className="invoice-item">
              <div>
                <h4>{inv.invoiceNumber || inv.id}</h4>
                <p>{inv.customer?.name || "Unknown"}</p>
              </div>

              <div className="text-right">
                <strong>{formatCurrency(inv.amount)}</strong>

                <span className={`status ${inv.status?.toLowerCase() || "pending"}`}>
                  {inv.status || "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col-grid">
        <div className="section-card">
          <div className="section-header">
            <h2>Top Products</h2>

            <div className="filter-group">
              <div className="search-box small">
                <Search size={14} />

                <input type="text" placeholder="Search product" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
              </div>

              <select value={productCategoryFilter} onChange={(e) => setProductCategoryFilter(e.target.value)}>
                {productCategories.map((cat) => <option key={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="product-list">
            {filteredProducts.map((p) => (
              <div key={p._id || p.id} className="product-row">
                <span>{p.name}</span>

                <div className="product-stats">
                  <strong>{formatCurrency(p.sales)}</strong>
                  <span>{p.growth || "+0%"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h2>Recent Activity</h2>

          <div className="activity-list">
            {recentActivities.map((act) => (
              <div key={act._id || act.id} className="activity-item">
                <div className="activity-icon">
                  <Clock size={14} />
                </div>

                <div>
                  <p><strong>{act.user || act.performedBy || "System"}</strong> {act.action}</p>

                  <small>{act.timeAgo || new Date(act.createdAt).toLocaleTimeString()}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h2>Customer Reviews</h2>

          <div className="filter-pills">
            {[0, 5, 4, 3, 2, 1].map((rating) => (
              <button key={rating} className={`pill ${reviewRatingFilter === rating ? "active" : ""}`} onClick={() => setReviewRatingFilter(rating)}>
                {rating === 0 ? "All" : renderStars(rating)}
              </button>
            ))}
          </div>
        </div>

        <div className="reviews-list">
          {filteredReviews.map((r) => (
            <div key={r._id || r.id} className="review-item">
              <div className="reviewer">
                <strong>{r.user?.name || r.reviewer || "Anonymous"}</strong>
                <span>{renderStars(r.rating)}</span>
              </div>

              <p>{r.text || r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h2>AI Insights</h2>

        <div className="insights-grid">
          {aiInsights.map((insight) => (
            <div key={insight._id || insight.id} className={`insight-card type-${insight.type || "info"}`}>
              <ThumbsUp size={16} />
              <p>{insight.message || insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}