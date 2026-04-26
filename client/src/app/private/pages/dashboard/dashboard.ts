import { Component, signal } from '@angular/core';

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  todayOrders: number;
  conversionRate: number;
}

interface RecentActivity {
  user: {
    name: string;
    email: string;
    initials: string;
    avatarColor: string;
  };
  action: string;
  product: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = signal<DashboardStats>({
    totalUsers: 1234,
    totalRevenue: 45678,
    todayOrders: 89,
    conversionRate: 3.24
  });

  activities = signal<RecentActivity[]>([
    {
      user: {
        name: 'João Silva',
        email: 'joao@email.com',
        initials: 'JS',
        avatarColor: 'bg-brand'
      },
      action: 'Compra realizada',
      product: 'iPhone 15 Pro',
      date: '15/04/2024',
      status: 'completed'
    },
    {
      user: {
        name: 'Maria Santos',
        email: 'maria@email.com',
        initials: 'MS',
        avatarColor: 'bg-green-500'
      },
      action: 'Cadastro realizado',
      product: '-',
      date: '14/04/2024',
      status: 'pending'
    },
    {
      user: {
        name: 'Pedro Costa',
        email: 'pedro@email.com',
        initials: 'PC',
        avatarColor: 'bg-purple-500'
      },
      action: 'Compra realizada',
      product: 'MacBook Pro',
      date: '13/04/2024',
      status: 'completed'
    },
    {
      user: {
        name: 'Ana Lima',
        email: 'ana@email.com',
        initials: 'AL',
        avatarColor: 'bg-red-500'
      },
      action: 'Cancelamento',
      product: 'AirPods',
      date: '12/04/2024',
      status: 'cancelled'
    }
  ]);

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(2)}%`;
  }
}
