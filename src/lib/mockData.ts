export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  payment: 'UPI' | 'Card' | 'Cash';
}

export const mockOrders: Order[] = [
  { id: '#ORD-9281', customer: 'Anjali Sharma', date: '2026-05-04', amount: 1250, status: 'Delivered', payment: 'UPI' },
  { id: '#ORD-9282', customer: 'Rahul Varma', date: '2026-05-04', amount: 450, status: 'Pending', payment: 'Cash' },
  { id: '#ORD-9283', customer: 'Sneha Kapur', date: '2026-05-03', amount: 890, status: 'Delivered', payment: 'Card' },
  { id: '#ORD-9284', customer: 'Vikram Singh', date: '2026-05-03', amount: 2100, status: 'Cancelled', payment: 'UPI' },
  { id: '#ORD-9285', customer: 'Priya Mani', date: '2026-05-03', amount: 560, status: 'Delivered', payment: 'Cash' },
  { id: '#ORD-9286', customer: 'Karan Mehra', date: '2026-05-02', amount: 1500, status: 'Pending', payment: 'Card' },
  { id: '#ORD-9287', customer: 'Sita Ram', date: '2026-05-02', amount: 720, status: 'Delivered', payment: 'UPI' },
  { id: '#ORD-9288', customer: 'Amitabh B', date: '2026-05-02', amount: 3200, status: 'Delivered', payment: 'Card' },
  { id: '#ORD-9289', customer: 'Rajesh K', date: '2026-05-01', amount: 1100, status: 'Pending', payment: 'Cash' },
  { id: '#ORD-9290', customer: 'Deepika P', date: '2026-05-01', amount: 950, status: 'Delivered', payment: 'UPI' },
];

export const salesData = [
  { day: 'Mon', sales: 4000, orders: 120 },
  { day: 'Tue', sales: 3000, orders: 90 },
  { day: 'Wed', sales: 2000, orders: 75 },
  { day: 'Thu', sales: 2780, orders: 85 },
  { day: 'Fri', sales: 4890, orders: 140 },
  { day: 'Sat', sales: 6390, orders: 190 },
  { day: 'Sun', sales: 5490, orders: 160 },
];

export const categoryData = [
  { name: 'Vegetables', value: 400 },
  { name: 'Fruits', value: 300 },
  { name: 'Meat', value: 200 },
  { name: 'Dairy', value: 100 },
];

export const COLORS = ['#1B4332', '#2D6A4F', '#A3936A', '#D1D5DB'];
