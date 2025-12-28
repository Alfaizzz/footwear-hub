import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Package, DollarSign, Users, TrendingUp, Plus, Settings } from 'lucide-react';
import { mockProducts } from '@/api/mock/mockProducts';
import { mockOrders } from '@/api/mock/mockOrders';

const Admin: React.FC = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login?redirect=/admin" />;
  if (!isAdmin) return <Navigate to="/" />;

  const stats = [
    { label: 'Total Products', value: mockProducts.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Total Orders', value: mockOrders.length, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Total Revenue', value: '$4,299', icon: TrendingUp, color: 'bg-primary' },
    { label: 'Customers', value: '156', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="page-container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your store</p>
          </div>
          <button className="btn-primary gap-2">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sale Settings */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Sale Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sale Status</label>
              <select className="input-field">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Global Discount (%)</label>
              <input type="number" defaultValue="15" className="input-field" />
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">Update Sale</button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Stock</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.slice(0, 5).map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 capitalize">{product.category}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <button className="text-primary hover:underline mr-3">Edit</button>
                      <button className="text-destructive hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
