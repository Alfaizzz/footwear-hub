export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '2',
    items: [
      {
        productId: '1',
        name: 'Air Max Velocity',
        quantity: 1,
        price: 189.99,
        size: 10,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
      },
      {
        productId: '3',
        name: 'Classic Leather Oxford',
        quantity: 1,
        price: 219.99,
        size: 10,
        imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200',
      },
    ],
    total: 409.98,
    status: 'delivered',
    paymentId: 'pay_mock_12345',
    paymentStatus: 'completed',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 234 567 8900',
    },
    createdAt: '2024-10-15T10:30:00Z',
    updatedAt: '2024-10-20T14:00:00Z',
  },
];

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        ...orderData,
        id: 'ORD-' + String(mockOrders.length + 1).padStart(3, '0'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockOrders.push(newOrder);
      resolve(newOrder);
    }, 600);
  });
};

export const getUserOrders = (userId: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = mockOrders.filter((o) => o.userId === userId);
      resolve(userOrders);
    }, 400);
  });
};

export const getAllOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrders), 400);
  });
};
