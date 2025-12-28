// src/pages/Admin.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Settings,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from '@/api/mock/mockProducts';
import { mockOrders } from '@/api/mock/mockOrders';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Admin: React.FC = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    stock: 0,
    imageUrl: '',
    category: 'sneakers',
    gender: 'unisex',
    brand: 'FootVibe',
    rating: 4.5,
    reviews: 0,
    sizes: [7, 8, 9, 10, 11],
    colors: ['Black', 'White'],
    featured: false,
    new: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      toast({ title: 'Failed to load products', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(formData);
      toast({ title: 'Product added successfully!' });
      setOpenAddDialog(false);
      resetForm();
      loadProducts();
    } catch (err) {
      toast({ title: 'Failed to add product', variant: 'destructive' });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, formData as Partial<Product>);
      toast({ title: 'Product updated successfully!' });
      setOpenEditDialog(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (err) {
      toast({ title: 'Failed to update product', variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast({ title: 'Product deleted successfully!' });
      loadProducts();
    } catch (err) {
      toast({ title: 'Failed to delete product', variant: 'destructive' });
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setOpenEditDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      category: 'sneakers',
      gender: 'unisex',
      brand: 'FootVibe',
      rating: 4.5,
      reviews: 0,
      sizes: [7, 8, 9, 10, 11],
      colors: ['Black', 'White'],
      featured: false,
      new: false,
    });
  };

  if (!isAuthenticated) return <Navigate to="/login?redirect=/admin" />;
  if (!isAdmin) return <Navigate to="/" />;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
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

          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-5 h-5" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm formData={formData} setFormData={setFormData} />
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
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
              <Label>Sale Status</Label>
              <Select defaultValue="inactive">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Global Discount (%)</Label>
              <Input type="number" defaultValue="15" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Update Sale</Button>
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
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 capitalize">{product.category}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4 flex gap-2">
                      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEdit(product)}>
                            <Edit className="w-4 h-4 mr-1" /> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <ProductForm formData={formData} setFormData={setFormData} />
                          <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateProduct}>Update Product</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
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

// Reusable Product Form Component
const ProductForm: React.FC<{
  formData: Omit<Product, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Product, 'id'>>>;
}> = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Product name"
        />
      </div>
      <div>
        <Label>Brand</Label>
        <Input
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label>Original Price (optional)</Label>
        <Input
          type="number"
          value={formData.originalPrice || ''}
          onChange={(e) =>
            setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })
          }
        />
      </div>
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as Product['category'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sneakers">Sneakers</SelectItem>
            <SelectItem value="boots">Boots</SelectItem>
            <SelectItem value="sandals">Sandals</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value as Product['gender'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      <div className="md:col-span-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label>Colors (comma separated)</Label>
        <Input
          value={formData.colors.join(', ')}
          onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(',').map(c => c.trim()) })}
        />
      </div>
      <div className="md:col-span-2">
        <Label>Sizes (comma separated)</Label>
        <Input
          value={formData.sizes.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              sizes: e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)),
            })
          }
        />
      </div>
    </div>
  );
};

export default Admin;